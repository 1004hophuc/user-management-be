// import { ApiProperty } from '@nestjs/swagger';
// import {
//   IsEnum,
//   IsNotEmpty,
//   IsOptional,
//   IsString,
//   IsUrl,
// } from 'class-validator';

// export class LoginDto {
//   @IsNotEmpty()
//   @IsString()
//   @ApiProperty()
//   username: string;

//   @IsNotEmpty()
//   @IsString()
//   @ApiProperty()
//   password: string;
// }

import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}
