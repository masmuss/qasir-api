import { Injectable } from '@nestjs/common';
import { Order, OrderDetail } from '@prisma/client';

import { PrismaService } from 'src/prisma/prisma.service';
import { ProductService } from 'src/product/product.service';

import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly productService: ProductService,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    try {
      const calculatedOrderDetails =
        await this.calculateOrderDetails(createOrderDto);

      const createdOrder = await this.prisma.$transaction(async () => {
        const orderWithDetails = await this.createOrderAndDetails(
          createOrderDto,
          calculatedOrderDetails,
        );

        const total = this.calculateTotal(orderWithDetails.orderDetails);

        return this.updateOrderTotal(orderWithDetails.id, total);
      });

      return createdOrder;
    } catch (error) {
      throw new Error(error);
    }
  }

  private async calculateOrderDetails(createOrderDto: CreateOrderDto) {
    return Promise.all(
      createOrderDto.orderDetails.map(async (orderDetail: OrderDetail) => {
        const product = await this.productService.getProductDetails(
          orderDetail.productId,
        );
        const countSubTotal: number = orderDetail.quantity * product.price;

        await this.productService.decrementProductStock(
          orderDetail.productId,
          orderDetail.quantity,
        );

        return {
          ...orderDetail,
          subtotal: countSubTotal,
        };
      }),
    );
  }

  private async createOrderAndDetails(
    createOrderDto: CreateOrderDto,
    calculatedOrderDetails: any,
  ) {
    return this.prisma.order.create({
      data: {
        ...createOrderDto,
        orderDetails: {
          create: calculatedOrderDetails,
        },
      },
      include: { orderDetails: true },
    });
  }

  private calculateTotal(orderDetails: OrderDetail[]) {
    return orderDetails.reduce((sum, detail) => sum + detail.subtotal, 0);
  }

  private updateOrderTotal(orderId: string, total: number) {
    return this.prisma.order.update({
      where: { id: orderId },
      data: { total },
      include: { orderDetails: true },
    });
  }

  async findAll(): Promise<Order[]> {
    try {
      return await this.prisma.order.findMany({
        include: { orderDetails: true },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: string): Promise<Order | null> {
    try {
      return await this.prisma.order.findUnique({
        where: { id },
        include: { orderDetails: true },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  // async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
  //   try {
  //     return this.prisma.order.update({
  //       where: { id },
  //       data: updateOrderDto,
  //       include: { orderDetails: true },
  //     });
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // }

  async remove(id: string): Promise<Order> {
    try {
      const order = await this.prisma.order.findUnique({
        where: { id },
        include: { orderDetails: true },
      });

      await this.prisma.orderDetail.deleteMany({
        where: { orderId: id },
      });

      await this.prisma.order.delete({
        where: { id },
      });

      return order;
    } catch (error) {
      throw new Error(error);
    }
  }
}
