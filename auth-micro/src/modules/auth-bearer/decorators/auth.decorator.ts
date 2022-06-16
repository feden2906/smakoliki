import { ExecutionContext,createParamDecorator } from '@nestjs/common';

import { AuthEntity } from '../entities/auth.entity';

export const AuthDec = createParamDecorator(
  (data: any, ctx: ExecutionContext): AuthEntity => {
    const req = ctx.switchToHttp().getRequest();

    const user = req.user;

    if ('password' in user) {
      user.password = '<privacy-masked>';
    }
    if ('currentRefreshToken' in user) {
      user.currentRefreshToken = '<privacy-masked>';
    }
    console.log('AuthDec', user);

    return data ? user?.[data] : user;
  },
);
