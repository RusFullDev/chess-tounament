import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumber, isPhoneNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'The name of the user',
    example: 'Alisher',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The phone number of the user',
    example: '+998901234569',
  })
  @IsPhoneNumber("UZ")
  phone: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'password123',
  })
  @IsString()
  password: string;

  @ApiProperty({
    description: 'The confirmation of the password',
    example: 'password123',
  })
  @IsString()
  confirm_password: string;
}

