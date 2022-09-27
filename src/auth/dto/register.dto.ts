import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, IsAlphanumeric } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    required: true,
  })
  @IsAlphanumeric()
  @IsNotEmpty()
  userName: string;

  /**
   * Password field
   */
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
