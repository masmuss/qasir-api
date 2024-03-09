import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma.service';

import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [PrismaService, JwtService, AuthService, UserService],
})
export class UserModule {}
