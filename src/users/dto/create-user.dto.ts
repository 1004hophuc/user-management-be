import { IsBoolean, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { AccountRoles, StaffRoles } from 'src/common/enum';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  refCode: string;

  @IsNotEmpty()
  @IsEnum(AccountRoles)
  role: AccountRoles;

  @IsNotEmpty()
  @IsEnum(StaffRoles)
  position: StaffRoles;

  @IsBoolean()
  @Type(() => Boolean)
  isAccept: boolean;
}
