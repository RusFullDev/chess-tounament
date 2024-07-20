import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePlayerDto {
  @ApiProperty({ example: 'John Doe', description: 'Name of the player' })
  @IsString()
  name: string;

  @ApiProperty({ example: 25, description: 'Age of the player' })
  @IsNumber()
  age: number;

  @ApiProperty({ example: '1500', description: 'Rating of the player' })
  @IsString()
  rating: string;

  @ApiProperty({ example: 'USA', description: 'Country of the player' })
  @IsString()
  country: string;
}
