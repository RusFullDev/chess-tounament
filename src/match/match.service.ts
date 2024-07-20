import { Injectable } from '@nestjs/common';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Decimal } from '@prisma/client/runtime/library';



@Injectable()
export class MatchService {
  constructor(private readonly prismaService:PrismaService){}


async startMatch(createMatchDto: CreateMatchDto) {

  try {
     const { tournamentId } = createMatchDto;
      const playerTour = await this.prismaService.player_tour.findMany({
      select: { playerId: true },
      where: { tournamentId: tournamentId },
    });
    
    if (playerTour.length < 2) {
      throw new Error('Not enough players to create a match');
    }
    
    const randomPlayers = playerTour.sort(() => 0.5 - Math.random());
    const matches = [];
    for (let i = 0; i < randomPlayers.length; i += 2) {
      if (i + 1 < randomPlayers.length) {
        const player1 = randomPlayers[i];
        const player2 = randomPlayers[i + 1];
        const match = await this.prismaService.match.create({
          data: {
            player1_Id:player1.playerId,
            player2_Id:player2.playerId,
            ...createMatchDto
          },
        });
        matches.push(match);
      }
    }
console.log(matches);
    return matches;
  } catch (error) {
    console.log(error);
    
  } 
  }
  


  assessment(id: number, updateMatchDto: UpdateMatchDto) {
    try {
      return this.prismaService.match.update({where:{id},data:updateMatchDto})
    } catch (error) {
      console.log(error);
    }
  }



async nextMatch(createMatchDto: CreateMatchDto) {
  try {
    const nextMatch = await this.prismaService.leaderboard.findMany({});
    const ratingGroups: { [key: string]: any[] } = {
      '1': [],
      '0': [],
      '0.5': [],
    };

    for (const match of nextMatch) {
      const score = new Decimal(match.score);
      const players = Array.isArray(match.players) ? match.players : [match.players];

      if (score.equals(new Decimal(1))) {
        ratingGroups['1'].push(...players);
      } else if (score.equals(new Decimal(0))) {
        ratingGroups['0'].push(...players);
      } else if (score.equals(new Decimal(0.5))) {
        ratingGroups['0.5'].push(...players);
      }
    }

    for (const key in ratingGroups) {
      ratingGroups[key] = ratingGroups[key].sort(() => 0.5 - Math.random());
    }

    console.log('ratingGroups:', ratingGroups);
    const matches = [];
    for (const key in ratingGroups) {
      const players = ratingGroups[key];
      for (let i = 0; i < players.length; i += 2) {
        if (i + 1 < players.length) {
          const player1 = players[i];
          const player2 = players[i + 1];

          if (player1.id && player2.id && player1.id !== player2.id) {
            const match = await this.prismaService.match.create({
              data: {
                player1_Id: player1.id,
                player2_Id: player2.id,
                ...createMatchDto,
              },
            });
            matches.push(match);
          } 
          if (players.length % 2 !== 0) {
        const lastPlayer = players[players.length - 1];
        await this.prismaService.leaderboard.update({
          where: { id: lastPlayer.id },
          data: { score: Number(new Decimal(lastPlayer.score).plus(new Decimal(1)).toFixed(1)) },
        });
        console.log(`Oyinchi  ${lastPlayer.name}  1 ochko oldi guruhda toq ishtrokchi bo'lgani uchun`);
      }
    }
        }
      }
    

    console.log('matches:', matches);

    return {
      nextMatches: matches,
    };
  } catch (error) {
    console.error('Match yaratishda xatolik:', error);
    throw new Error('Keyingi match yaratishda xatolik');
  }
}

 findAll() {
    return this.prismaService.match.findMany({})
  }

  findOne(id: number) {
    return this.prismaService.match.findUnique({where:{id}})
  }
  remove(id: number) {
    return this.prismaService.match.delete({where:{id}})
  }

}