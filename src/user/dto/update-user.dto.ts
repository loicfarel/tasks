import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ type: 'string', required: false })
  password?: string;

  @ApiProperty({ type: 'string', required: false })
  profile?: string;
}
