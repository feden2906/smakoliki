import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { SwaggerMethodDoc } from '../../../utils/swagger.types';
import { AuthController } from '../auth.controller';
import { LoginReqDto } from '../presenters/request/login.req.dto';
import { RegisterReqDto } from '../presenters/request/register.req.dto';
import { UpdateReqDto } from '../presenters/request/update.req.dto';
import { UpdateRolesReqDto } from '../presenters/request/update.roles.req.dto';
import {
  ActivateLinkResMapper,
  LoginResMapper,
  RegisterResMapper,
  RegisterResMapperMany,
  UpdateResMapper,
  UpdateRolesResMapper,
} from './swagger.mapper';

export const docs: SwaggerMethodDoc<AuthController> = {
  findAll(summary: string) {
    return applyDecorators(
      ApiBearerAuth(),
      ApiOperation({
        description: 'ROLES: ADMIN',
        summary,
      }),
      ApiOkResponse({
        description: 'EXAMPLE for ADMIN get all',
        type: RegisterResMapperMany,
      }),
    );
  },

  getProfile(summary: string) {
    return applyDecorators(
      ApiBearerAuth(),
      ApiOperation({
        summary,
      }),
      ApiOkResponse({
        description: 'EXAMPLE my profile',
        type: RegisterResMapper,
      }),
      ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    );
  },

  googleCallback(summary: string) {
    return applyDecorators(
      ApiOperation({
        description: 'googleCallback',
        summary,
      }),
      ApiCreatedResponse({
        type: 'example: http://localhost:3000/auth/google/callback',
      }),
    );
  },

  googleLogin(summary: string) {
    return applyDecorators(
      ApiOperation({
        description: 'googleLogin',
        summary,
      }),
      ApiCreatedResponse({
        type: LoginResMapper,
      }),
    );
  },

  loginBearer(summary: string) {
    return applyDecorators(
      ApiOperation({
        description: 'login',
        summary,
      }),
      ApiBody({ type: LoginReqDto }),
      ApiCreatedResponse({
        description: 'EXAMPLE  login response',
        type: LoginResMapper,
      }),
    );
  },

  logout(summary: string) {
    return applyDecorators(
      ApiBearerAuth(),
      ApiOperation({
        description: 'Logout',
        summary,
      }),
      ApiCreatedResponse({
        description: 'EXAMPLE logout response',
        type: Object,
      }),
    );
  },

  refreshTokens(summary: string) {
    return applyDecorators(
      ApiBearerAuth(),
      ApiOperation({
        description: 'refreshTokens',
        summary,
      }),
      ApiOkResponse({
        description: 'EXAMPLE refresh tokens',
        type: LoginResMapper,
      }),
    );
  },

  signup(summary: string) {
    return applyDecorators(
      ApiOperation({
        description: 'register new User',
        summary,
      }),
      ApiBody({ type: RegisterReqDto }),
      ApiCreatedResponse({
        description: 'EXAMPLE register',
        type: RegisterResMapper,
      }),
    );
  },

  updateAuth(summary: string) {
    return applyDecorators(
      ApiBearerAuth(),
      ApiOperation({
        description: 'can update:  password firstName lastName picture email',
        summary,
      }),
      ApiBody({ description: 'values for update', type: UpdateReqDto }),
      ApiOkResponse({
        description: 'EXAMPLE update response',
        type: UpdateResMapper,
      }),
      ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    );
  },

  updateRoles(summary: string) {
    return applyDecorators(
      ApiBearerAuth(),
      ApiOperation({
        description: 'ROLES: ADMIN ',
        summary,
      }),
      ApiBody({ description: 'values for update', type: UpdateRolesReqDto }),
      ApiOkResponse({
        description: 'EXAMPLE ROLES  update response',
        type: UpdateRolesResMapper,
      }),
      ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    );
  },

  verifyEmail(summary: string) {
    return applyDecorators(
      ApiOperation({
        description: 'verify Email link',
        summary,
      }),
      ApiOkResponse({
        description: 'EXAMPLE verifyEmail response',
        status: 200,
        type: ActivateLinkResMapper,
      }),
    );
  },
};
