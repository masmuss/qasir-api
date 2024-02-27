import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { CanAccessWithRoles } from 'decorators/role.decorator';
import { Role } from 'enums/role.enum';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @CanAccessWithRoles(Role.ADMIN, Role.MANAGER)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  @CanAccessWithRoles(Role.ADMIN, Role.MANAGER, Role.CASHIER)
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  @CanAccessWithRoles(Role.ADMIN, Role.MANAGER, Role.CASHIER)
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
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
