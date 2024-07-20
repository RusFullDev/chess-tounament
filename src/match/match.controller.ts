import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { MatchService } from './match.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { AdminGuard } from '../common/guards/admin.guard';

@UseGuards(AdminGuard)
@ApiTags('match')
@Controller('match')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Post('start')
  @ApiOperation({ summary: 'Start a new match' })
  @ApiResponse({ status: 201, description: 'Match started successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async createMatches(@Body() createMatchDto: CreateMatchDto) {
    return this.matchService.startMatch(createMatchDto);
  }

  @Post('next-match')
  @ApiOperation({ summary: 'Get next matches based on current match data' })
  @ApiResponse({ status: 200, description: 'Next matches retrieved successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  nextMatches(@Body() createMatchDto: CreateMatchDto) {
    return this.matchService.nextMatch(createMatchDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a match by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the match to update' })
  @ApiResponse({ status: 200, description: 'Match updated successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Match not found' })
  evaluation(@Param('id') id: string, @Body() updateMatchDto: UpdateMatchDto) {
    return this.matchService.assessment(+id, updateMatchDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a match by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the match to delete' })
  @ApiResponse({ status: 200, description: 'Match deleted successfully' })
  @ApiResponse({ status: 404, description: 'Match not found' })
  remove(@Param('id') id: string) {
    return this.matchService.remove(+id);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all matches' })
  @ApiResponse({ status: 200, description: 'All matches retrieved successfully' })
  findAll() {
    return this.matchService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a match by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the match to retrieve' })
  @ApiResponse({ status: 200, description: 'Match retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Match not found' })
  findOne(@Param('id') id: string) {
    return this.matchService.findOne(+id);
  }
}
