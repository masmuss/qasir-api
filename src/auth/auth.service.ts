import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

import { LoginDto } from './dto/log-in.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
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
      username: user.username,
      sub: {
        name: user.name,
        username: user.username,
        roleId: user.roleId,
      },
      roleId: user.roleId,
    };

    return {
      ...user,
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }

  async refreshToken(user: User): Promise<{
    accessToken: string;
  }> {
    const payload = {
      username: user.email,
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
}
