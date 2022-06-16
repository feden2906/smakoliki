import { PartialType, PickType } from '@nestjs/swagger';

import { BaseAuthDto } from '../base.auth.dto';

export class ActivateLinkResDto extends PartialType(
  PickType(BaseAuthDto, ['verifiedEmail'] as const),
) {}
