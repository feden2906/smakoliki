import { PartialType, PickType } from '@nestjs/swagger';

import { BaseAuthDto } from '../base.auth.dto';

export class RegisterReqDto extends PartialType(
  PickType(BaseAuthDto, [
    'password',
    'firstName',
    'lastName',
    'email',
    'repeatPassword',
  ] as const),
) {}
