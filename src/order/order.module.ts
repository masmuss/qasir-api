import { Module } from '@nestjs/common';

import { PrismaService } from 'src/prisma.service';
import { ProductService } from 'src/product/product.service';

import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  controllers: [OrderController],
  providers: [PrismaService, ProductService, OrderService],
})
export class OrderModule {}
