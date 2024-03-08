import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';

import { CreateProductDto } from './dto/create-product.dto';
import { FilterProductDto } from './dto/filter-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      return await this.prisma.product.create({
        data: createProductDto,
        include: {
          category: {
            select: { name: true },
          },
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  private convertToPrismaWhere(filter: FilterProductDto): Record<string, any> {
    const where: Record<string, any> = {};

    if (filter.category) where.categoryId = +filter.category;
    if (filter.name) where.name = { contains: filter.name };

    return where;
  }

  private convertToPrismaOrderBy(
    filter: FilterProductDto,
  ): Record<string, 'asc' | 'desc'> | undefined {
    if (filter.orderBy) {
      const order: Record<string, 'asc' | 'desc'> = {};
      order[filter.orderBy] = filter.order || 'asc';
      return order;
    }
    return undefined;
  }

  async findAll(filter?: FilterProductDto): Promise<Product[]> {
    try {
      const where = this.convertToPrismaWhere(filter);
      const orderBy = this.convertToPrismaOrderBy(filter);

      return await this.prisma.product.findMany({
        where,
        orderBy,
        include: {
          category: {
            select: { name: true },
          },
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: string): Promise<Product | null> {
    try {
      return await this.prisma.product.findUnique({
        where: { id },
        include: {
          category: {
            select: { name: true },
          },
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    try {
      return await this.prisma.product.update({
        where: { id },
        data: updateProductDto,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(id: string): Promise<Product> {
    try {
      return await this.prisma.product.delete({
        where: { id },
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
