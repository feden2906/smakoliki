import { PartialType, PickType } from '@nestjs/swagger';

import { BaseAuthDto } from '../base.auth.dto';

export class UpdateResDto extends PartialType(
  PickType(BaseAuthDto, [
    'firstName',
    'lastName',
    'email',
    'picture',
    'roles',
    'id',
    'createdAt',
    'updatedAt',
    'verificationLink',
    'verifiedEmail',
  ] as const),
) {}
