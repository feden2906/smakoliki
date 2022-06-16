import { AuthEntity } from '../entities/auth.entity';

export type AuthType = Omit<AuthEntity, 'password'>;