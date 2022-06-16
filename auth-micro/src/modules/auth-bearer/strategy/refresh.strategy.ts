import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { JwtAuthPayloadType } from '../types/jwt.auth.payload.type';

type JwtPayload = {
  sub: string;
  login: string;
};

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      passReqToCallback: true,
      secretOrKey: configService.get('REFRESH_TOKEN_SECRET'),
    });
  }

  async validate(req: Request, payload) {
    const refreshToken = req.get('authorization').replace('Bearer', '').trim();
    // console.log('**************');
    // console.log('**************');
    // console.log(req);
    // console.log('**************');
    // console.log('**************');
    console.log('refreshToken Strat', refreshToken);
    console.log('refreshToken payload', payload);
    return {
      ...payload,
      refreshToken,
    };
    // return {
    //   email: payload.email,
    //   id: payload.id,
    //   refreshToken: payload.refreshToken,
    //   roles: payload.roles,
    // };
  }
}
