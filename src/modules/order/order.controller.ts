import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';

import { CanAccessPublic } from 'src/modules/auth/decorators/public.decorator';
import { CanAccessWithRoles } from 'src/modules/auth/decorators/role.decorator';
import { Role } from 'src/modules/auth/enums/role.enum';

import { CreateOrderDto } from './dto/create-order.dto';
import { FilterOrderDto } from './dto/filter-order.dto';
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
  findAll(@Query() filterOrderDto?: FilterOrderDto) {
    return this.orderService.findAll(filterOrderDto);
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
