import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePlayerTourDto {
  @ApiProperty({ example: 1, description: 'ID of the player' })
  @IsNumber()
  playerId: number;

  @ApiProperty({ example: 1, description: 'ID of the tournament' })
  @IsNumber()
  tournamentId: number;
}
