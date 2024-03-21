import { Injectable } from '@nestjs/common';
import { OrderDetail, Product } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

import { ProductService } from 'src/modules/product/product.service';

import { CreateOrderDetailDto } from './dto/create-order-detail.dto';

@Injectable()
export class OrderDetailService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly productService: ProductService,
  ) {}

  async createOrderDetail(
    createOrderDetailDto: CreateOrderDetailDto,
    orderId: string,
  ): Promise<OrderDetail> {
    const { productId, quantity } = createOrderDetailDto;

    const product: Product = await this.productService.findOne(productId);
    const subtotal: number = quantity * product.price;

    if (product.stock < quantity) {
      throw new Error('Insufficient stock');
    }

    await this.productService.update(productId, {
      stock: product.stock - quantity,
    });

    return await this.prisma.orderDetail.create({
      data: {
        orderId,
        productId,
        quantity,
        subtotal,
      },
    });
  }
}
