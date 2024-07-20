import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class LeaderboardService {
  constructor(private readonly prismaService: PrismaService) {}


 
//   async leaderTable() {
//     const leaderboard = [];
//     const matches = await this.prismaService.match.findMany()
//     for (let match of matches) {
//       const player1 = await this.prismaService.player.findUnique({
//         where: { id: match.player1_Id },
//       });
//       const player2 = await this.prismaService.player.findUnique({
//         where: { id: match.player2_Id },
//       });
// const matchRound = await this.prismaService.leaderboard.findMany({where:{round:match.round}})
//       if (player1 && !matchRound) {
//         const leaderboardEntry1 = await this.prismaService.leaderboard.create({
//           data: {
//             players: JSON.stringify(player1),
//             score: match.player1Score,
//             round: match.round,
//           },
//         });
//         leaderboard.push(leaderboardEntry1);
//       }else{
//         throw new BadRequestException("Bunday match round mavjud")
//       }

//       if (player2 && !matchRound) {
//         const leaderboardEntry2 = await this.prismaService.leaderboard.create({
//           data: {
//             players: JSON.stringify(player2),
//             score: match.player2Score,
//             round: match.round,
//           },
//         });
//         leaderboard.push(leaderboardEntry2);
//       }else{
//         throw new BadRequestException("Bunday match round mavjud")
//       }
//     }

//     const sortedLeaderboard = leaderboard.sort((a, b) => b.score - a.score); 
//     const data = {
//       Leaderboard: sortedLeaderboard
//     };
//     return data;
//   }


  async leaderTable() {
    const leaderboard = [];
    const matches = await this.prismaService.match.findMany();

    for (let match of matches) {
      const player1 = await this.prismaService.player.findUnique({
        where: { id: match.player1_Id },
      });
      const player2 = await this.prismaService.player.findUnique({
        where: { id: match.player2_Id },
      });

      // Проверка существующих записей для текущего раунда
      const existingEntries = await this.prismaService.leaderboard.findMany({
        where: { round: match.round },
      });

      // Проверка наличия записи для player1
      const player1Exists = existingEntries.some(
        (entry) => entry.players=== player1.id
      );

      // Проверка наличия записи для player2
      const player2Exists = existingEntries.some(
        (entry) => entry.players === player2.id
      );

      if (player1 && !player1Exists) {
        const leaderboardEntry1 = await this.prismaService.leaderboard.create({
          data: {
            players: player1,
            score: match.player1Score,
            round: match.round,
          },
        });
        leaderboard.push(leaderboardEntry1);
      }

      if (player2 && !player2Exists) {
        const leaderboardEntry2 = await this.prismaService.leaderboard.create({
          data: {
            players: player2,
            score: match.player2Score,
            round: match.round,
          },
        });
        leaderboard.push(leaderboardEntry2);
      }
    }

    const sortedLeaderboard = leaderboard.sort((a, b) => b.score - a.score);
    const data = {
      Leaderboard: sortedLeaderboard,
    };
    return data;
  }
}








