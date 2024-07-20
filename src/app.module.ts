import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';
import { PlayerModule } from './player/player.module';
import { TournamentModule } from './tournament/tournament.module';
import { PlayerTourModule } from './player_tour/player_tour.module';
import { LeaderboardModule } from './leaderboard/leaderboard.module';
import { MatchModule } from './match/match.module';


@Module({
 providers: [PrismaService],
  exports: [PrismaService],
  imports: [UserModule, PlayerModule, TournamentModule, PlayerTourModule, LeaderboardModule, MatchModule],
})
export class AppModule {}
