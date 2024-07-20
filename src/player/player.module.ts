import { Module } from '@nestjs/common';
import { PlayerService } from './player.service';
import { PlayerController } from './player.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [PrismaModule, JwtModule.register({})],
  controllers: [PlayerController],
  providers: [PlayerService],
})
export class PlayerModule {}
