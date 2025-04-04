import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

declare module 'express' {
  interface Request {
    email?: string;
    firstName?: string;
    lastName?: string;
    user?: JwtPayload;
  }
}

// Definining the expected Payload
interface JwtPayload {
  email: string;
  given_name?: string;
  family_name?: string;
  [key: string]: any;
}

// Type guard to safely check the payload
function isJwtPayload(payload: unknown): payload is JwtPayload {
  return (
    typeof payload === 'object' &&
    payload !== null &&
    'email' in payload &&
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    typeof (payload as any)?.email === 'string'
  );
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private publicKey: string;

  constructor() {
    if (!process.env.PUBLIC_KEY) {
      throw new Error('Public key not found');
    }
    this.publicKey = `-----BEGIN PUBLIC KEY-----\n${process.env.PUBLIC_KEY}\n-----END PUBLIC KEY-----`;
  }

  use(req: Request, res: Response, next: NextFunction) {
    // Exempt verification for /health and / routes.
    if (req.path === '/health' || req.path === '/') {
      return next();
    }

    // Retrieve the token from the Authorization header (expects format: "Bearer <token>")
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header not found');
    }

    // console.log('Auth header:', authHeader);

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Token not provided');
    }

    // console.log('token:', token);

    try {
      const decoded = jwt.verify(token, this.publicKey, {
        algorithms: ['RS256'],
      });

      if (!isJwtPayload(decoded)) {
        throw new UnauthorizedException('Invalid token payload');
      }
      // console.log('[AuthMiddleware] Incoming request:', req.path);

      const payload = decoded;
      // console.log('Decoded JWT payload:', payload);
      if (req.path.startsWith('/books')) {
        req.email = payload.email;
      } else if (req.path.startsWith('/profile')) {
        // console.log('payload', payload);
        req.email = payload.email;
        req.firstName = payload.given_name;
        req.lastName = payload.family_name;
      }

      req.user = payload;

      next();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
