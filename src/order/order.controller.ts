import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

import { CanAccessPublic } from 'decorators/public.decorator';
import { CanAccessWithRoles } from 'decorators/role.decorator';
import { Role } from 'enums/role.enum';

import { CreateOrderDto } from './dto/create-order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @CanAccessWithRoles(Role.CASHIER)
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  @CanAccessWithRoles(Role.ADMIN, Role.MANAGER, Role.CASHIER)
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  @CanAccessWithRoles(Role.ADMIN, Role.MANAGER, Role.CASHIER)
  @CanAccessPublic()
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Delete(':id')
  @CanAccessWithRoles(Role.ADMIN, Role.MANAGER)
  remove(@Param('id') id: string) {
    return this.orderService.remove(id);
  }
}
