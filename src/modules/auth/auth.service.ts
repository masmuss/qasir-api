import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'nestjs-prisma';

import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';

import { LoginDto } from './dto/log-in.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  private async comparePassword(
    password: string,
    hash: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  async validateUser(username: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        username: username,
      },
      include: {
        role: {
          select: {
            name: true,
          },
        },
      },
    });

    if (user && (await this.comparePassword(password, user.password))) {
      return user;
    }

    return null;
  }

  async signup(createUserDto: CreateUserDto): Promise<boolean> {
    try {
      await this.prisma.user.create({
        data: {
          ...createUserDto,
          password: await this.hashPassword(createUserDto.password),
        },
      });

      return true;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.username, loginDto.password);
    const payload = {
      id: user.id,
      sub: {
        name: user.name,
        username: user.username,
        roleId: user.roleId,
      },
    };

    return {
      ...user,
      access_token: this.jwtService.sign(payload, { expiresIn: '1d' }),
      refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }

  async refreshToken(user: User): Promise<{
    accessToken: string;
  }> {
    const payload = {
      id: user.id,
      sub: {
        name: user.name,
        username: user.username,
        roleId: user.roleId,
      },
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  decodeTokenFromHeader(token: string) {
    if (token && token.startsWith('Bearer ')) {
      const tokenString = token.substring(7);
      return this.jwtService.decode(tokenString);
    }
  }

  async getUserIdFromToken(token: string) {
    const payload: Record<string, unknown> =
      this.jwtService.decode<Record<string, unknown>>(token);
    return payload.id;
  }
}
