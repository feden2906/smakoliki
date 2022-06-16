import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { AuthEntity } from '../entities/auth.entity';
import { AuthRolesEnum } from '../types/auth-roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<AuthRolesEnum[]>(
      'roles',
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }
    const req = context.switchToHttp().getRequest();
    const user: AuthEntity = req.user;

    if ('password' in user) {
      user.password = '<privacy-masked>';
    }
    if ('currentRefreshToken' in user) {
      user.currentRefreshToken = '<privacy-masked>';
    }

    console.log('RoleG', user);

    try {
      return requiredRoles.some((role) => user.roles?.includes(role));
    } catch (e) {
      console.log(e);
    }
  }
}
