import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ type: 'string', required: true })
  @IsEmail()
  email: string;

  @ApiProperty({ type: 'string', required: true })
  @IsString()
  password: string;
}
