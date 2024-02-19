import { Injectable } from '@nestjs/common';
import { Customer } from '@prisma/client';

import { PrismaService } from 'src/prisma/prisma.service';

import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomerService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    try {
      return this.prisma.customer.create({
        data: createCustomerDto,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(): Promise<Customer[]> {
    try {
      return this.prisma.customer.findMany();
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: string): Promise<Customer | null> {
    try {
      return this.prisma.customer.findUnique({
        where: { id },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(
    id: string,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<Customer | null> {
    try {
      return this.prisma.customer.update({
        where: { id },
        data: updateCustomerDto,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(id: string): Promise<Customer> {
    try {
      return this.prisma.customer.delete({
        where: { id },
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
