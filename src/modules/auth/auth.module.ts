import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from 'nestjs-prisma';

import { JwtStrategy } from 'src/core/strategies/jwt.strategy';
import { LocalStrategy } from 'src/core/strategies/local.strategy';
import { RefreshJwtStrategy } from 'src/core/strategies/refreshToken.strategy';
import { UserService } from 'src/modules/user/user.service';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '1d',
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
