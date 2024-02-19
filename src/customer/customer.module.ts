import { Module } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';

@Module({
  controllers: [CustomerController],
  providers: [PrismaService, CustomerService],
})
export class CustomerModule {}
