import { JwtPayload } from 'jsonwebtoken';

export type VerifiedEmailLinkType = JwtPayload & { email: string };
