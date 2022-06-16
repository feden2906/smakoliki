import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

import { AuthService } from '../auth.service';
import { AuthEntity } from '../entities/auth.entity';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      callbackURL: configService.get('GOOGLE_CALLBACK_URL'),
      clientID: configService.get('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    const { name, emails, photos } = profile;
    const { value: email, verified } = emails[0];
    const user = await this.authService.findByEmail(email);
    if (user) {
      return done(null, user);
    } else {
      const newAuth = new AuthEntity();
      newAuth.email = email;
      newAuth.firstName = name.givenName;
      newAuth.lastName = name.familyName;
      newAuth.verifiedEmail = verified;
      newAuth.picture = photos[0].value;
      accessToken;
      refreshToken;
      await this.authService.saveGoogle(newAuth);
      return done(null, newAuth);
    }
  }
}
