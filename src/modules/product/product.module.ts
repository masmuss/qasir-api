import { Module } from '@nestjs/common';

import { PrismaService } from 'src/modules/prisma/prisma.service';

import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [PrismaService, ProductService],
})
export class ProductModule {}
