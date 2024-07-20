import { Controller, Get, UseGuards } from '@nestjs/common';
import { LeaderboardService } from './leaderboard.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AdminGuard } from '../common/guards/admin.guard';


@UseGuards(AdminGuard)
@ApiTags('leaderboard')
@Controller('leaderboard')
export class LeaderboardController {
  constructor(private readonly leaderboardService: LeaderboardService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve leaderboard' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved leaderboard' })
  findAll() {
    return this.leaderboardService.leaderTable();
  }
}
