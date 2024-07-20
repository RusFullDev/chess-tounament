import { Injectable } from '@nestjs/common';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { PrismaService } from '../prisma/prisma.service';
import { truncate } from 'fs';

@Injectable()
export class TournamentService {
    constructor(private readonly prismaService:PrismaService){}

  create(createTournamentDto: CreateTournamentDto) {
    return this.prismaService.tournament.create({data:createTournamentDto})
  }

  findAll() {
    return this.prismaService.tournament.findMany({select:{name:true,startDate:true,endDate:true,player_tour:{select:{Player:true}}}})
  }

  findOne(id: number) {
    return this.prismaService.tournament.findUnique({where:{id}})
  }

  update(id: number, updateTournamentDto: UpdateTournamentDto) {
    return this.prismaService.tournament.update({where:{id},data:updateTournamentDto})
  }

  remove(id: number) {
    return this.prismaService.tournament.delete({where:{id}})
  }
}
