import { SetMetadata } from '@nestjs/common';

import { AuthRolesEnum } from '../types/auth-roles.enum';

export const RolesDec = (...roles: AuthRolesEnum[]) =>
  SetMetadata('roles', roles);
