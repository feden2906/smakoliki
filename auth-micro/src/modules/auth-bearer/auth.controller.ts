import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post, Put, Res, UseGuards, } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UpdateResult } from 'typeorm';

import { AuthService } from './auth.service';
import { AuthDec } from './decorators/auth.decorator';
import { SignUpDto } from './dto';
import { AuthEntity } from './entities/auth.entity';
import { GoogleGuard } from './guard/google.guard';
import { JwtGuard } from './guard/jwt.guard';
import { LocalGuard } from './guard/local.guard';
import { RefreshGuard } from './guard/refresh.guard';
import { UpdateReqDto } from './presenters/request/update.req.dto';
import { UpdateRolesReqDto } from './presenters/request/update.roles.req.dto';
import { ActivateLinkResDto } from './presenters/response/activate.link.res.dto';
import { LoginResDto } from './presenters/response/login.res.dto';
import { RegisterResDto } from './presenters/response/register.res.dto';
import { UpdateResDto } from './presenters/response/update.res.dto';
import { UpdateRolesResDto } from './presenters/response/update.roles.res.dto';
import { docs } from './swagger/auth.docs';
import { AuthEntityType } from './types/auth.entity.type';
import { RolesDec } from './decorators/roles.decorator';
import { AuthRolesEnum } from './types/auth-roles.enum';
import { RolesGuard } from './guard/roles.guard';

@ApiTags('Auth BEARER module')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @docs.signup('create new auth')
  async signup(@Body() dto: SignUpDto): Promise<RegisterResDto> {
    return this.authService.signup(dto);
  }

  //use BEARER
  //***************
  @UseGuards(LocalGuard)
  @Post('login')
  @docs.loginBearer('login with Bearer')
  async loginBearer(@AuthDec() auth: AuthEntity): Promise<LoginResDto> {
    return this.authService.login(auth);
  }

  @UseGuards(JwtGuard)
  @Get('me')
  @docs.getProfile('get Profile')
  async getProfile(@AuthDec('id') userId: string): Promise<RegisterResDto> {
    return await this.authService.findById(userId);
  }

  @UseGuards(RefreshGuard)
  @Post('refresh')
  @docs.refreshTokens('refresh with Bearer')
  async refreshTokens(
    @AuthDec('id') userId: string,
    @AuthDec() data: string,
  ): Promise<LoginResDto> {
    const tokens = await this.authService.refreshTokens(
      userId,
      data['refreshToken'],
    );
    console.log('tokens', tokens);
    return tokens;
  }

  @UseGuards(JwtGuard)
  @Post('logout')
  @docs.logout('logout with Bearer')
  logout(@AuthDec('id') userId: string): Promise<UpdateResult> {
    return this.authService.logout(userId);
  }

  //***************

  // //for Admin
  @UseGuards(JwtGuard, RolesGuard)
  @RolesDec(AuthRolesEnum.ADMIN)
  @Get()
  @docs.findAll('ADMIN ONLY get all auth')
  async findAll(): Promise<AuthEntityType[]> {
    return await this.authService.findAll();
  }

  @UseGuards(JwtGuard)
  @Patch(':authId')
  @docs.updateRoles('ADMIN ONLY update ROLES')
  async updateRoles(
    @Param('authId', new ParseUUIDPipe()) authId: string,
    @Body() dto: UpdateRolesReqDto,
  ): Promise<UpdateRolesResDto> {
    return this.authService.updateRoles(authId, dto);
  }

  //Google auth
  @UseGuards(GoogleGuard)
  @Get('google')
  @docs.googleLogin('login with Google')
  async googleLogin(): Promise<void> {
    return;
  }

  @UseGuards(GoogleGuard)
  @Get('google/callback')
  @docs.googleCallback('redirect for Google auth')
  async googleCallback(
    @AuthDec() auth: AuthEntityType,
    @Res() res,
  ): Promise<void> {
    const redirectUrl = await this.authService.redirectUrl();
    res.redirect(redirectUrl);
  }

  //verification email
  @Get('verify_email/:activationLink')
  @docs.verifyEmail('verifyEmail with link')
  verifyEmail(
    @Param('activationLink') activationLink: string,
  ): Promise<ActivateLinkResDto> {
    return this.authService.verifyEmail(activationLink);
  }

  @UseGuards(JwtGuard)
  @Put('update-auth')
  @docs.updateAuth('update ur profile')
  async updateAuth(
    @Body() dto: UpdateReqDto,
    @AuthDec('id') userId: string,
  ): Promise<UpdateResDto> {
    console.log('UpdateReqDto', dto);
    console.log('userId', userId);
    return this.authService.updateAuth(dto, userId);
  }

  // @Post('reset-password')
  // @docs.resetPassword('alex')
  // async resetPassword(@Body() dto: ResetPasswordDto) {
  //   return this.authService.resetPassword(dto);
  // }
}
