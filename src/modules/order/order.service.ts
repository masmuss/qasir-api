import { Injectable } from '@nestjs/common';
import { Order, OrderDetail } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

import { ProductService } from 'src/modules/product/product.service';

import { CreateOrderDto } from './dto/create-order.dto';
import { FilterOrderDto } from './dto/filter-order.dto';

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

  private async generateOrderCode(): Promise<string> {
    const randomChars = Math.random()
      .toString(36)
      .substring(2, 5)
      .toUpperCase();
    const year = new Date().getFullYear().toString().slice(-2);
    const month = (new Date().getMonth() + 1).toString().padStart(2, '0');
    const date = new Date().getDate().toString().padStart(2, '0');
    const today = new Date().toISOString().split('T')[0];
    const existingOrdersCount = await this.prisma.order.count({
      where: {
        createdAt: {
          gte: new Date(today),
          lt: new Date(new Date(today).getTime() + 24 * 60 * 60 * 1000),
        },
      },
    });

    const sequence = existingOrdersCount.toString().padStart(3, '0');

    return `${randomChars}${year}${month}${date}${sequence}`;
  }

  private async calculateOrderDetails(createOrderDto: CreateOrderDto) {
    return Promise.all(
      createOrderDto.orderDetails.map(async (orderDetail: OrderDetail) => {
        const product = await this.productService.findOne(
          orderDetail.productId,
        );
        const countSubTotal: number = orderDetail.quantity * product.price;

        if (createOrderDto.status !== 'CANCELLED') {
          await this.productService.update(orderDetail.productId, {
            stock: product.stock - orderDetail.quantity,
          });
        }

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
        code: await this.generateOrderCode(),
        userId: createOrderDto.userId,
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
      include: { orderDetails: { include: { product: true } } },
    });
  }

  private convertToPrismaWhere(filter: FilterOrderDto): Record<string, any> {
    const where: Record<string, any> = {};

    if (filter.status) where.status = filter.status;
    if (filter.startDate) where.createdAt = { gte: filter.startDate };
    if (filter.endDate)
      where.createdAt = { ...where.createdAt, lte: filter.endDate };

    return where;
  }

  private convertToPrismaOrderBy(
    filter: FilterOrderDto,
  ): Record<string, 'asc' | 'desc'> | undefined {
    if (filter.orderBy) {
      const order: Record<string, 'asc' | 'desc'> = {};
      order[filter.orderBy] = filter.order || 'asc';
      return order;
    }
    return undefined;
  }

  async findAll(filter?: FilterOrderDto): Promise<Order[]> {
    try {
      const where = this.convertToPrismaWhere(filter);
      const orderBy = this.convertToPrismaOrderBy(filter);

      return await this.prisma.order.findMany({
        where,
        orderBy,
        include: {
          orderDetails: {
            include: {
              product: {
                select: { name: true },
              },
            },
          },
        },
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
