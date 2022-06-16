import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as _ from 'lodash';

import { AuthRepository } from './auth.repository';
import { SignUpDto } from './dto';
import { AuthEntity } from './entities/auth.entity';
import { UpdateReqDto } from './presenters/request/update.req.dto';
import { UpdateRolesReqDto } from './presenters/request/update.roles.req.dto';
import { ActivateLinkResDto } from './presenters/response/activate.link.res.dto';
import { UpdateRolesResDto } from './presenters/response/update.roles.res.dto';
import { AuthRolesEnum } from './types/auth-roles.enum';
import { Tokens } from './types/tokens.type';
import { VerifiedEmailLinkType } from './types/verified-email-link.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async findById(id: string): Promise<AuthEntity> {
    return this.authRepository.findById(id);
  }

  //for Google strategy
  async findByEmail(email: string): Promise<AuthEntity> {
    return this.authRepository.findByEmail(email);
  }

  async saveGoogle(user: AuthEntity): Promise<AuthEntity> {
    return this.authRepository.saveGoogle(user);
  }

  async validateUserByEmailAndPassword(
    email: string,
    password: string,
    // ): Promise<AuthEntity | null> {
  ) {
    const user = await this.authRepository.findOneWithPass(email);
    if (!user) return null;

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    } else {
      return null;
    }
  }

  async signup(dto: SignUpDto): Promise<AuthEntity> {
    const { email, password, repeatPassword } = dto;

    if (password !== repeatPassword)
      throw new UnprocessableEntityException({
        message: 'not correct double password',
        registerSuccess: false,
      });

    const oldAuth = await this.authRepository.findByEmail(email);
    if (oldAuth) {
      throw new HttpException(
        `Auth with email ${dto.email} is exists`,
        HttpStatus.CONFLICT,
      );
    }

    const hashedPassword = await this.hashData(password);

    const linkForActivationAccount = await this.createLink(
      this.hashedLink(email),
    );

    return await this.authRepository.register({
      ...new AuthEntity(),
      ...dto,
      password: hashedPassword,
      roles: AuthRolesEnum.USER,
      verificationLink: linkForActivationAccount,
    });
  }

  //hash link for activation
  private hashedLink(email: string) {
    return jwt.sign({ email }, this.configService.get('JSONWEBTOKEN_SECRET'), {
      expiresIn: this.configService.get('JSONWEBTOKEN_EXP_TIME'),
    });
  }

  //create link for activation
  private async createLink(link: string): Promise<string> {
    return (
      this.configService.get('SERVICE_PROTOCOL') +
      '://' +
      this.configService.get('SERVICE_HOST') +
      ':' +
      this.configService.get<number>('SERVICE_PORT') +
      '/auth/verify_email' +
      '/' +
      `${link}`
    );
  }

  //Tokens
  async login(auth: AuthEntity) {
    const tokens = await this.getTokens(auth.id, auth.email, auth.roles);
    await this.updateRefreshToken(auth.id, tokens.refreshToken);
    return tokens;
  }

  async logout(userId: string) {
    return this.authRepository.removeRefreshToken(userId);
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.authRepository.findById(userId);

    if (!user || !user.currentRefreshToken) {
      throw new ForbiddenException('Invalid user id');
    }

    const refreshTokensMatches = await bcrypt.compare(
      refreshToken,
      user.currentRefreshToken,
    );

    if (!refreshTokensMatches) {
      throw new ForbiddenException('Invalid refreshToken');
    }

    const tokens = await this.getTokens(user.id, user.email, user.roles);

    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const salts = await bcrypt.genSalt();
    const currentRefreshToken = await bcrypt.hash(refreshToken, salts);
    await this.authRepository.setCurrentRefreshToken(
      currentRefreshToken,
      userId,
    );
  }

  async findOneByLogin(email: string) {
    const user = await this.authRepository.findByEmail(email);
    if (user) return email;
    return false;
  }

  private async hashData(data: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(data, salt);
  }

  async getTokens(id: string, email: string, roles: string): Promise<Tokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          email,
          id,
          roles,
        },
        {
          expiresIn: this.configService.get('ACCESS_TOKEN_EXPIRATION'),
          secret: this.configService.get('ACCESS_TOKEN_SECRET'),
        },
      ),
      this.jwtService.signAsync(
        {
          email,
          id,
          roles,
        },
        {
          expiresIn: this.configService.get('REFRESH_TOKEN_EXPIRATION'),
          secret: this.configService.get('REFRESH_TOKEN_SECRET'),
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  //verify user email by link
  verifyEmail(link: string): Promise<ActivateLinkResDto> {
    try {
      const { email } = <VerifiedEmailLinkType>(
        jwt.verify(link, process.env.JSONWEBTOKEN_SECRET)
      );
      return this.authRepository.verifyEmail(email);
    } catch (e) {
      console.error(e.message);
    }
  }

  //for Google redirect
  async redirectUrl() {
    return this.configService.get<string>('MAIN_SERVICE_URL');
  }

  //for Admin
  async findAll(): Promise<AuthEntity[]> {
    return await this.authRepository.findAll();
  }
  async updateRoles(
    authId: string,
    dto: UpdateRolesReqDto,
  ): Promise<UpdateRolesResDto> {
    const auth = await this.findById(authId);
    delete auth.verificationLink;
    delete auth.verifiedEmail;
    Object.assign(auth, dto);
    return await this.authRepository.updateAuth(auth);
  }
  //*****************

  async updateAuth(dto: UpdateReqDto, userId: string) {
    const auth = await this.findById(userId);

    const completeDto = _.omitBy(dto, _.isEmpty);

    if (completeDto.password) {
      completeDto.password = await this.hashData(completeDto.password);
    }

    if (completeDto.email) {
      completeDto.verificationLink = await this.createLink(
        this.hashedLink(completeDto.email),
      );
    }

    Object.assign(auth, completeDto);
    return await this.authRepository.updateAuth(auth);
  }
}
