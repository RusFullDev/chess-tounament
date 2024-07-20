import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class StartRoundDto {
  @ApiProperty({ example: 'Round 1', description: 'The name or identifier of the round' })
  @IsString()
  round: string;

  @ApiProperty({ example: 1, description: 'The ID of the tournament' })
  @IsNumber()
  tournamentId: number;
}
