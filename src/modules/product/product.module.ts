import { Module } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [PrismaService, ProductService],
})
export class ProductModule {}
