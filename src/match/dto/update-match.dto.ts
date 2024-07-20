import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateMatchDto {
  @ApiPropertyOptional({ example: 'Round 2', description: 'The name or identifier of the round' })
  @IsOptional()
  @IsString()
  round?: string;

  @ApiPropertyOptional({ example: 2, description: 'The ID of the tournament' })
  @IsOptional()
  @IsNumber()
  tournamentId?: number;

  @ApiPropertyOptional({ example: 1, description: 'The ID of player 1' })
  @IsOptional()
  @IsNumber()
  player1_Id?: number;

  @ApiPropertyOptional({ example: 2, description: 'The ID of player 2' })
  @IsOptional()
  @IsNumber()
  player2_Id?: number;

  @ApiPropertyOptional({ example: 10, description: 'The score of player 1' })
  @IsOptional()
  @IsNumber()
  player1Score?: number;

  @ApiPropertyOptional({ example: 8, description: 'The score of player 2' })
  @IsOptional()
  @IsNumber()
  player2Score?: number;
}
