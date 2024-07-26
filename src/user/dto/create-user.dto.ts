import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';
import { ROLE, User } from '../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto implements Omit<User, 'id'> {
  @ApiProperty({ type: 'string', required: true })
  @IsEmail()
  email: string;

  @ApiProperty({ type: 'string', required: true })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ type: 'string', required: true, default: ROLE.CUSTOMER })
  @IsEnum(ROLE)
  role: ROLE;

  @ApiProperty({ type: 'string', required: false, default: '' })
  @IsString()
  profile?: string;
}
