import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { PrismaService } from 'src/prisma/prisma.service';

import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(id: string): Promise<User> {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async findOneByUsername(username: string): Promise<User> {
    return await this.prisma.user.findUnique({
      where: {
        username,
      },
    });
  }

  async create(createUserDto: CreateUserDto): Promise<{
    id: string;
    username: string;
    email: string;
  }> {
    const user = await this.prisma.user.create({
      data: createUserDto,
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return result;
  }
}
