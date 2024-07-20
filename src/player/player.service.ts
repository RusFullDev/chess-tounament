import { Injectable } from "@nestjs/common";
import { CreatePlayerDto } from "./dto/create-player.dto";
import { UpdatePlayerDto } from "./dto/update-player.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class PlayerService {
  constructor(private readonly prismaService: PrismaService) {}


  create(createPlayerDto: CreatePlayerDto) {
    return this.prismaService.player.create({data:createPlayerDto})
  }

  

  update(id: number, updatePlayerDto: UpdatePlayerDto) {
    return this.prismaService.player.update({where:{id},data:updatePlayerDto})
  }

  findAll() {
    return this.prismaService.player.findMany({})
  }

  findOne(id: number) {
    return this.prismaService.player.findUnique({where:{id}})
  }
  remove(id: number) {
    return this.prismaService.player.delete({where:{id}})
  }
}
