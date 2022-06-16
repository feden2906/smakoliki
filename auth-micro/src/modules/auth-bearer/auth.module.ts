import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { getJWTConfig } from '../../configs/jwt.config';
import { PresenterInterceptor } from '../../interceptors/presenter.interceptor';
import { PrivacyReplacer } from '../../utils/PrivacyReplacer';
import { TransformInterceptor } from '../../interceptors/transform.interceptor';
import { AuthController } from './auth.controller';
import { AuthMapper } from './auth.mapper';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';
import { AuthEntity } from './entities/auth.entity';
import { GoogleStrategy } from './strategy/google.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';
import { RefreshStrategy } from './strategy/refresh.strategy';
import { LogInterceptor } from '../../interceptors/log.interceptor';
import { ErrorFilter } from '../../filters/error.filter';

@Module({
  controllers: [AuthController],
  exports: [AuthService],
  imports: [
    TypeOrmModule.forFeature([AuthEntity]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJWTConfig,
    }),
  ],
  providers: [
    LocalStrategy,
    JwtStrategy,
    AuthService,
    AuthRepository,
    AuthMapper,
    RefreshStrategy,
    GoogleStrategy,
    PrivacyReplacer,
    {
      provide: APP_INTERCEPTOR,
      useClass: PresenterInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LogInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: ErrorFilter,
    },
  ],
})
export class AuthModule {}
