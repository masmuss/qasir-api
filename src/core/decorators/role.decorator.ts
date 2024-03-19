import { SetMetadata } from '@nestjs/common';

import { Role } from '../enums/role.enum';

export const ROLES_KEY = 'roles';
export const CanAccessWithRoles = (...roles: Role[]) =>
  SetMetadata(ROLES_KEY, roles);
