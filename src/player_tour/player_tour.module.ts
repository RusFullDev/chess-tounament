import { Module } from '@nestjs/common';
import { PlayerTourService } from './player_tour.service';
import { PlayerTourController } from './player_tour.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, JwtModule.register({})],
  controllers: [PlayerTourController],
  providers: [PlayerTourService],
})
export class PlayerTourModule {}
