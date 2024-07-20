import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PlayerTourService } from './player_tour.service';
import { CreatePlayerTourDto } from './dto/create-player_tour.dto';
import { UpdatePlayerTourDto } from './dto/update-player_tour.dto';
import { AdminGuard } from '../common/guards/admin.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('player-tour')
@UseGuards(AdminGuard)
@Controller('player-tour')
export class PlayerTourController {
  constructor(private readonly playerTourService: PlayerTourService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new player tour' })
  @ApiResponse({ status: 201, description: 'Player tour created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() createPlayerTourDto: CreatePlayerTourDto) {
    return this.playerTourService.create(createPlayerTourDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all player tours' })
  @ApiResponse({ status: 200, description: 'List of player tours retrieved successfully' })
  findAll() {
    return this.playerTourService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a player tour by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the player tour to retrieve' })
  @ApiResponse({ status: 200, description: 'Player tour retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Player tour not found' })
  findOne(@Param('id') id: string) {
    return this.playerTourService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a player tour by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the player tour to update' })
  @ApiResponse({ status: 200, description: 'Player tour updated successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Player tour not found' })
  update(@Param('id') id: string, @Body() updatePlayerTourDto: UpdatePlayerTourDto) {
    return this.playerTourService.update(+id, updatePlayerTourDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a player tour by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the player tour to delete' })
  @ApiResponse({ status: 200, description: 'Player tour deleted successfully' })
  @ApiResponse({ status: 404, description: 'Player tour not found' })
  remove(@Param('id') id: string) {
    return this.playerTourService.remove(+id);
  }
}
