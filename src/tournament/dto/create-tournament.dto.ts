import { Type } from 'class-transformer';
import { IsDate, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTournamentDto {
  @ApiProperty({ example: 'Spring Chess Tournament', description: 'Name of the tournament' })
  @IsString()
  name: string;

  @ApiProperty({ example: '2024-08-01T00:00:00Z', description: 'Start date of the tournament' })
  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @ApiProperty({ example: '2024-08-31T00:00:00Z', description: 'End date of the tournament' })
  @IsDate()
  @Type(() => Date)
  endDate: Date;
}

