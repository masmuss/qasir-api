import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthService } from 'src/modules/auth/auth.service';
import { PrismaService } from 'src/modules/prisma/prisma.service';

import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [PrismaService, JwtService, AuthService, UserService],
})
export class UserModule {}
