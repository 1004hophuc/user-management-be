import { SetMetadata } from '@nestjs/common';
import { AccountRoles } from 'src/common/enum';

export const ROLES_KEY = 'roles';
export const Role = (...roles: AccountRoles[]) => SetMetadata(ROLES_KEY, roles);
