import { PartialType, PickType } from '@nestjs/swagger';

import { BaseAuthDto } from '../base.auth.dto';

export class LoginReqDto extends PartialType(
  PickType(BaseAuthDto, ['password', 'email'] as const),
) {}
