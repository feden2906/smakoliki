import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthService } from '../auth.service';
import { AuthEntity } from '../entities/auth.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super({
      passwordField: 'password',
      usernameField: 'email',
    });
  }

  // async validate(email: string, password: string): Promise<AuthEntity> {
  async validate(email: string, password: string) {
    const user = await this.authService.validateUserByEmailAndPassword(
      email,
      password,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
