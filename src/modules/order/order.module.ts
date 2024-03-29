import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'nestjs-prisma';

import { AuthService } from 'src/modules/auth/auth.service';
import { OrderDetailService } from 'src/modules/order-detail/order-detail.service';
import { ProductService } from 'src/modules/product/product.service';

import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  controllers: [OrderController],
  providers: [
    PrismaService,
    ProductService,
    OrderService,
    OrderDetailService,
    AuthService,
    JwtService,
  ],
})
export class OrderModule {}
