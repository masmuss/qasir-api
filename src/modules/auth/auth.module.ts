import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { PrismaService } from 'src/modules/prisma/prisma.service';
import { UserService } from 'src/modules/user/user.service';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { RefreshJwtStrategy } from './strategies/refreshToken.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '1h',
      },
    }),
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
  ],
  controllers: [AuthController],
  providers: [
    PrismaService,
    AuthService,
    LocalStrategy,
    JwtStrategy,
    RefreshJwtStrategy,
    UserService,
  ],
})
export class AuthModule {}
