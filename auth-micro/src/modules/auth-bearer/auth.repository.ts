import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AuthMapper } from './auth.mapper';
import { AuthEntity } from './entities/auth.entity';
import { ActivateLinkResDto } from './presenters/response/activate.link.res.dto';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectRepository(AuthEntity)
    private readonly auth: Repository<AuthEntity>,
    readonly authMapper: AuthMapper,
  ) {}

  async findByEmail(email: string) {
    const found = await this.auth.findOne({ where: { email } });
    return found ? this.authMapper.mapOneAuth(found) : null;
  }

  async findById(id: string) {
    const found = await this.auth.findOne({ where: { id } });
    return found ? this.authMapper.mapOneAuth(found) : null;
  }

  async register(auth: AuthEntity) {
    const newAuth = await this.auth.save(auth);
    return newAuth ? this.authMapper.mapOneAuth(newAuth) : null;
  }

  async saveGoogle(auth: AuthEntity) {
    const newAuth = await this.auth.save(auth);
    return newAuth ? this.authMapper.mapOneAuth(newAuth) : null;
  }

  async setCurrentRefreshToken(currentRefreshToken: string, id: string) {
    await this.auth.update(id, { currentRefreshToken });
  }

  async removeRefreshToken(id: string) {
    return this.auth.update(id, {
      currentRefreshToken: null,
    });
  }

  async findAll(): Promise<AuthEntity[]> {
    const found = await this.auth.find();
    return this.authMapper.mapManyAuths(found);
  }

  //for LocalStrategy
  async findOneWithPass(email: string) {
    const found = await this.auth.findOne({
      select: [
        'id',
        'email',
        'firstName',
        'lastName',
        'email',
        'password',
        'roles',
        'picture',
        'verifiedEmail',
        'currentRefreshToken',
        'verificationLink',
        'createdAt',
        'updatedAt',
      ],
      where: { email },
    });
    if (!found) throw new NotFoundException(`email = ${email} not found!!!`);
    return found ? this.authMapper.mapOneAuth(found) : null;
  }

  //verify user email by link
  async verifyEmail(email: string): Promise<ActivateLinkResDto> {
    try {
      const currentUser = await this.findByEmail(email);
      const result = await this.auth.save({
        ...currentUser,
        verifiedEmail: true,
      });
      const { verifiedEmail } = result;
      return { verifiedEmail };
    } catch (e) {
      console.error(e.message);
    }
  }

  async updateAuth(result) {
    try {
      const updAuth = await this.auth.save(result);
      return updAuth ? this.authMapper.mapOneAuth(updAuth) : null;
    } catch (e) {
      console.log(e);
    }
  }
}
