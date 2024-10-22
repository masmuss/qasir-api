import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    // super({
    //   jwtFromRequest: ExtractJwt.fromExtractors([
    //     JwtStrategy.extractJWTFromCookie,
    //   ]),
    //   ignoreExpiration: false,
    //   secretOrKey: `${process.env.JWT_SECRET}`,
    // });
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: `${process.env.JWT_SECRET}`,
    });
  }

  private static extractJWTFromCookie(req: Request): string | null {
    if (req.cookies?.access_token) {
      return req.cookies.access_token;
    }
    return null;
  }

  async validate(payload: any) {
    return { user: payload.sub, username: payload.username };
  }
}
