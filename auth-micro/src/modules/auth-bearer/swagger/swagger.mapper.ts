import { ApiProperty } from '@nestjs/swagger';

import { ActivateLinkReqDto } from '../presenters/request/activate.link.req.dto';
import { LoginReqDto } from '../presenters/request/login.req.dto';
import { RegisterReqDto } from '../presenters/request/register.req.dto';
import { UpdateReqDto } from '../presenters/request/update.req.dto';
import { ActivateLinkResDto } from '../presenters/response/activate.link.res.dto';
import { LoginResDto } from '../presenters/response/login.res.dto';
import { RegisterResDto } from '../presenters/response/register.res.dto';
import { UpdateResDto } from '../presenters/response/update.res.dto';
import { UpdateRolesResDto } from '../presenters/response/update.roles.res.dto';

export class RegisterReqMapper {
  @ApiProperty({ type: () => RegisterReqDto })
  auth: RegisterReqDto;
}

export class RegisterResMapper {
  @ApiProperty({ type: () => RegisterResDto })
  auth: RegisterResDto;
}

export class RegisterResMapperMany {
  @ApiProperty({ type: () => [RegisterResDto] })
  auth: RegisterResDto;
}

export class LoginReqMapper {
  @ApiProperty({ type: () => LoginReqDto })
  auth: LoginReqDto;
}

export class LoginResMapper {
  @ApiProperty({ type: () => LoginResDto })
  auth: LoginResDto;
}

export class UpdateReqMapper {
  @ApiProperty({ type: () => UpdateReqDto })
  auth: UpdateReqDto;
}

export class UpdateResMapper {
  @ApiProperty({ type: () => UpdateResDto })
  auth: UpdateResDto;
}

export class ActivateLinkReqMapper {
  @ApiProperty({ type: () => ActivateLinkReqDto })
  auth: ActivateLinkReqDto;
}

export class ActivateLinkResMapper {
  @ApiProperty({
    example: { verifiedEmail: true },
    type: () => ActivateLinkResDto,
  })
  // @ApiProperty({ example: { verifiedEmail: true } })
  auth: ActivateLinkResDto;
}

export class UpdateRolesResMapper {
  @ApiProperty({ type: () => UpdateRolesResDto })
  auth: UpdateRolesResDto;
}
