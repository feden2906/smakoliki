import { PartialType, PickType } from '@nestjs/swagger';

import { BaseAuthDto } from '../base.auth.dto';

export class UpdateReqDto extends PartialType(
  PickType(BaseAuthDto, [
    'password',
    'firstName',
    'lastName',
    'picture',
    'email',
  ] as const),
) {}
