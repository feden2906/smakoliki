import { PartialType, PickType } from '@nestjs/swagger';

import { BaseAuthDto } from '../base.auth.dto';

export class UpdateRolesResDto extends PartialType(
  PickType(BaseAuthDto, [
    'firstName',
    'lastName',
    'email',
    'picture',
    'roles',
    'id',
    'createdAt',
    'updatedAt',
  ] as const),
) {}
