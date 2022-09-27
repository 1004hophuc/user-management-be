import { IsAlphanumeric, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsAlphanumeric()
  userName: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
