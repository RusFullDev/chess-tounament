import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PlayerService } from './player.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { AdminGuard } from '../common/guards/admin.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('player')
@UseGuards(AdminGuard)
@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new player' })
  @ApiResponse({ status: 201, description: 'Player created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() createPlayerDto: CreatePlayerDto) {
    return this.playerService.create(createPlayerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all players' })
  @ApiResponse({ status: 200, description: 'List of players retrieved successfully' })
  findAll() {
    return this.playerService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a player by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the player to retrieve' })
  @ApiResponse({ status: 200, description: 'Player retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Player not found' })
  findOne(@Param('id') id: string) {
    return this.playerService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a player by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the player to update' })
  @ApiResponse({ status: 200, description: 'Player updated successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Player not found' })
  update(@Param('id') id: string, @Body() updatePlayerDto: UpdatePlayerDto) {
    return this.playerService.update(+id, updatePlayerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a player by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the player to delete' })
  @ApiResponse({ status: 200, description: 'Player deleted successfully' })
  @ApiResponse({ status: 404, description: 'Player not found' })
  remove(@Param('id') id: string) {
    return this.playerService.remove(+id);
  }
}
