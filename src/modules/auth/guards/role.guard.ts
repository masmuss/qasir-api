import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

import { ROLES_KEY } from 'src/modules/auth/decorators/role.decorator';
import { Role } from 'src/modules/auth/enums/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const request = context.switchToHttp().getRequest();
    const token: string = this.extractTokenFromHeader(request);

    if (!requiredRoles) return true;
    if (!token) return false;

    const payload = await this.verifyToken(token);
    return requiredRoles.some((role) => payload.roleId === role);
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private async verifyToken(token: string) {
    const jwtService = new JwtService({});
    return await jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET,
    });
  }
}
