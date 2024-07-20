import { Module } from '@nestjs/common';
import { MatchService } from './match.service';
import { MatchController } from './match.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
     imports: [PrismaModule, JwtModule.register({})],
  controllers: [MatchController],
  providers: [MatchService],
})
export class MatchModule {}
