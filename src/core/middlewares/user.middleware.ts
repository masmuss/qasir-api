import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';

declare module 'express' {
  interface Request {
    user: Record<string, unknown>;
  }
}

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    // const authCookie = req.cookies.access_token;
    // if (authCookie) {
    //   const decoded =
    //     this.jwtService.decode<Record<string, unknown>>(authCookie);
    //   req.user = decoded;
    // }
    //
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      const decoded = this.jwtService.decode<Record<string, unknown>>(token);
      req.user = decoded;
    }
    next();
  }
}
