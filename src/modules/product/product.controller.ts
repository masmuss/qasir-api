import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Product } from '@prisma/client';
import { plainToInstance } from 'class-transformer';

import { CanAccessWithRoles } from 'src/core/decorators/role.decorator';
import { Role } from 'src/core/enums/role.enum';

import { CreateProductDto } from './dto/create-product.dto';
import { FilterProductDto } from './dto/filter-product.dto';
import { ProductResponseDto } from './dto/response-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @CanAccessWithRoles(Role.ADMIN, Role.MANAGER)
  create(@Body() createProductDto: CreateProductDto) {
    const newProduct: Promise<Product> =
      this.productService.create(createProductDto);
    return plainToInstance(ProductResponseDto, newProduct);
  }

  @Get()
  @CanAccessWithRoles(Role.ADMIN, Role.MANAGER, Role.CASHIER)
  findAll(@Query() filterProductDto?: FilterProductDto) {
    const products: Promise<Product[]> =
      this.productService.findAll(filterProductDto);
    return plainToInstance(ProductResponseDto, products);
  }

  @Get(':id')
  @CanAccessWithRoles(Role.ADMIN, Role.MANAGER, Role.CASHIER)
  findOne(@Param('id') id: string) {
    const product = this.productService.findOne(id);
    return plainToInstance(ProductResponseDto, product);
  }

  @Put(':id')
  @CanAccessWithRoles(Role.ADMIN, Role.MANAGER)
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  @CanAccessWithRoles(Role.ADMIN, Role.MANAGER)
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
