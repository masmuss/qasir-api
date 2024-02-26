import { Injectable } from '@nestjs/common';
import { Order } from '@prisma/client';

import { PrismaService } from 'src/prisma/prisma.service';

import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    try {
      const calculatedOrderDetails = await Promise.all(
        createOrderDto.orderDetails.map(async (orderDetail) => {
          const product = await this.prisma.product.findUnique({
            where: { id: orderDetail.productId },
            select: { price: true, stock: true },
          });

          const countSubTotal: number = orderDetail.quantity * product.price;

          await this.prisma.product.update({
            where: { id: orderDetail.productId },
            data: {
              stock: {
                decrement: orderDetail.quantity,
              },
            },
          });

          return {
            ...orderDetail,
            subtotal: countSubTotal,
          };
        }),
      );

      const createdOrder = await this.prisma.$transaction(async (prisma) => {
        const orderWithDetails = await prisma.order.create({
          data: {
            ...createOrderDto,
            orderDetails: {
              create: calculatedOrderDetails,
            },
          },
          include: { orderDetails: true },
        });

        const total = orderWithDetails.orderDetails.reduce(
          (sum, detail) => sum + detail.subtotal,
          0,
        );

        const finalOrderData = await prisma.order.update({
          where: { id: orderWithDetails.id },
          data: { total },
          include: { orderDetails: true },
        });

        return finalOrderData;
      });

      return createdOrder;
    } catch (error) {
      throw new Error(error);
    }
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
