import { Injectable } from '@nestjs/common';
import { CreatePlayerTourDto } from './dto/create-player_tour.dto';
import { UpdatePlayerTourDto } from './dto/update-player_tour.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PlayerTourService {
   constructor(private readonly prismaService:PrismaService){}

  create(createPlayerTourDto: CreatePlayerTourDto) {
    return this.prismaService.player_tour.create({data:createPlayerTourDto})
  }

  findAll() {
    // return this.prismaService.player_tour.findMany({include:{Player:true,Tournament:true}})
    return this.prismaService.player_tour.findMany({select:{Player:true,Tournament:true}})
  }

  findOne(id: number) {
    return this.prismaService.player_tour.findUnique({where:{id}})
  }

  update(id: number, updatePlayerTourDto: UpdatePlayerTourDto) {
    return this.prismaService.player_tour.update({where:{id},data:updatePlayerTourDto})
  }

  remove(id: number) {
    return this.prismaService.player_tour.delete({where:{id}})
  }
}
