import { ApiProperty } from '@nestjs/swagger';
import { $Enums, Role } from '@prisma/client';
import { IsEnum, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ required: false, description: 'The name of the user' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ required: false, description: 'The phone number of the user' })
  @IsOptional()
  @IsString()
  @IsPhoneNumber("UZ")
  phone?: string;

  @ApiProperty({ required: false, description: 'The password of the user' })
  @IsOptional()
  @IsString()
  hashed_password?: string;

  @ApiProperty({ required: false, description: 'The password of the user' })
  @IsOptional()
  @IsEnum(Role)
  role?: $Enums.Role
}
