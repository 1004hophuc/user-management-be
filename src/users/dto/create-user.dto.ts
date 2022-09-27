import {
  IsAlphanumeric,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { AccountRoles } from 'src/common/enum';

export class CreateUserDto {
  @ApiProperty({ required: true })
  @IsAlphanumeric()
  @IsNotEmpty()
  userName: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @MinLength(8)
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  refCode: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsEnum(AccountRoles)
  role: AccountRoles;

  // @IsNotEmpty()
  // @IsEnum(StaffRoles)
  // position: StaffRoles;

  @IsBoolean()
  @Type(() => Boolean)
  isAccept: boolean;
}
