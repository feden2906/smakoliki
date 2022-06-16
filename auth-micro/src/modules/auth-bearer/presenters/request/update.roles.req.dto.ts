import { PartialType, PickType } from '@nestjs/swagger';

import { BaseAuthDto } from '../base.auth.dto';

export class UpdateRolesReqDto extends PartialType(
  PickType(BaseAuthDto, ['roles'] as const),
) {}
