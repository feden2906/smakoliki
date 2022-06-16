import { OmitType, PartialType, PickType } from '@nestjs/swagger';

import { BaseAuthDto } from '../base.auth.dto';
import { RegisterResDto } from './register.res.dto';

export class LoginResDto extends PartialType(
  PickType(BaseAuthDto, ['accessToken', 'refreshToken'] as const),
) {}
