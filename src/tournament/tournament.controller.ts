import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TournamentService } from './tournament.service';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { AdminGuard } from '../common/guards/admin.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('tournament')
@UseGuards(AdminGuard)
@Controller('tournament')
export class TournamentController {
  constructor(private readonly tournamentService: TournamentService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new tournament' })
  @ApiResponse({ status: 201, description: 'Tournament created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() createTournamentDto: CreateTournamentDto) {
    return this.tournamentService.create(createTournamentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all tournaments' })
  @ApiResponse({ status: 200, description: 'All tournaments retrieved successfully' })
  findAll() {
    return this.tournamentService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a tournament by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the tournament to retrieve' })
  @ApiResponse({ status: 200, description: 'Tournament retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Tournament not found' })
  findOne(@Param('id') id: string) {
    return this.tournamentService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a tournament by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the tournament to update' })
  @ApiResponse({ status: 200, description: 'Tournament updated successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Tournament not found' })
  update(@Param('id') id: string, @Body() updateTournamentDto: UpdateTournamentDto) {
    return this.tournamentService.update(+id, updateTournamentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a tournament by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the tournament to delete' })
  @ApiResponse({ status: 200, description: 'Tournament deleted successfully' })
  @ApiResponse({ status: 404, description: 'Tournament not found' })
  remove(@Param('id') id: string) {
    return this.tournamentService.remove(+id);
  }
}
``
