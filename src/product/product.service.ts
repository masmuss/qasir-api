import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      return await this.prisma.product.create({
        data: createProductDto,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(): Promise<Product[]> {
    try {
      return await this.prisma.product.findMany();
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: string): Promise<Product | null> {
    try {
      return await this.prisma.product.findUnique({
        where: { id },
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
      return this.prisma.product.update({
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

  async getProductDetails(productId: string) {
    return this.prisma.product.findUnique({
      where: { id: productId },
      select: { price: true, stock: true },
    });
  }

  async decrementProductStock(productId: string, quantity: number) {
    await this.prisma.product.update({
      where: { id: productId },
      data: {
        stock: {
          decrement: quantity,
        },
      },
    });
  }
}
