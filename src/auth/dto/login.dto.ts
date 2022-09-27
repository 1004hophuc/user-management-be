import {
  IsAlphanumeric,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty()
  @IsNotEmpty()
  // @IsAlphanumeric()
  @IsString()
  userName: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
