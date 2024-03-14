import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { PrismaService } from 'src/modules/prisma/prisma.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany({
      include: {
        role: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async findOne(id: string): Promise<User | null> {
    try {
      return await this.prisma.user.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
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

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      return await this.prisma.user.update({
        where: {
          id,
        },
        data: updateUserDto,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(id: string): Promise<User> {
    try {
      return await this.prisma.user.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
