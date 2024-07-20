import { IsNumber, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateMatchDto {
  @ApiProperty({ example: '1', description: 'Round of the match' })
  @IsString()
  round: string;

  @ApiProperty({ example: 1, description: 'ID of the tournament' })
  @IsNumber()
  tournamentId: number;

  @ApiProperty({ example: 1, description: 'ID of player 1' })
  // @IsNumber()
  player1_Id: number;

  @ApiProperty({ example: 2, description: 'ID of player 2' })
  // @IsNumber()
  player2_Id: number;
}
