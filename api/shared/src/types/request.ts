import { JwtPayload } from 'jsonwebtoken';

export type AuthRequest = Request & { user: JwtPayload; headers: any };
