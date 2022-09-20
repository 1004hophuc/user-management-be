import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { AccountRoles } from 'src/common/enum';

export class CreateAdminDevDto {
  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEnum(AccountRoles)
  role: AccountRoles;

  @IsNotEmpty()
  @IsString()
  refCode: string;
}
