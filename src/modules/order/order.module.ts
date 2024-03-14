import { Module } from '@nestjs/common';

import { PrismaService } from 'src/modules/prisma/prisma.service';
import { ProductService } from 'src/modules/product/product.service';

import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  controllers: [OrderController],
  providers: [PrismaService, ProductService, OrderService],
})
export class OrderModule {}
