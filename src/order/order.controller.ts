import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

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
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  // @Put(':id')
  // update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
  //   return this.orderService.update(id, updateOrderDto);
  // }

  @Delete(':id')
  @CanAccessWithRoles(Role.ADMIN, Role.MANAGER)
  remove(@Param('id') id: string) {
    return this.orderService.remove(id);
  }
}
