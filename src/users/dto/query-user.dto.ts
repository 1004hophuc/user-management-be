import { ApiProperty } from '@nestjs/swagger';
import { AccountRoles } from 'src/common/enum';

/**
 * Query user dto Class
 */
export class QueryUserDto {
  @ApiProperty()
  userName: string;

  @ApiProperty()
  role: AccountRoles;

  // @ApiProperty()
  // position: StaffRoles;

  @ApiProperty()
  page: number;

  @ApiProperty()
  limit: number;
}
