import { AuthEntity } from './entities/auth.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthMapper {
  mapOneAuth(auth: AuthEntity) {
    return { ...auth };
  }

  mapManyAuths(auths: AuthEntity[]) {
    return auths.map((auth) => this.mapOneAuth(auth));
  }
}
