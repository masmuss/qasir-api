import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Request } from 'express';

import { CanAccessPublic } from 'src/core/decorators/public.decorator';
import { CanAccessWithRoles } from 'src/core/decorators/role.decorator';
import { Role } from 'src/core/enums/role.enum';
import { AuthService } from 'src/modules/auth/auth.service';

import { CreateOrderDto } from './dto/create-order.dto';
import { FilterOrderDto } from './dto/filter-order.dto';
import { OrderResponseDto } from './dto/response-order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  @CanAccessWithRoles(Role.CASHIER)
  create(@Req() req: Request, @Body() createOrderDto: CreateOrderDto) {
    const user = this.authService.decodeTokenFromHeader(
      req.cookies.access_token,
    );
    createOrderDto.userId = user.id;
    const newOrder = this.orderService.create(createOrderDto);

    return plainToInstance(OrderResponseDto, newOrder);
  }

  @Get()
  @CanAccessWithRoles(Role.ADMIN, Role.MANAGER, Role.CASHIER)
  findAll(@Query() filterOrderDto?: FilterOrderDto) {
    const orders = this.orderService.findAll(filterOrderDto);

    return plainToInstance(OrderResponseDto, orders);
  }

  @Get(':id')
  @CanAccessPublic()
  findOne(@Param('id') id: string) {
    const order = this.orderService.findOne(id);
    return plainToInstance(OrderResponseDto, order);
  }

  @Delete(':id')
  @CanAccessWithRoles(Role.ADMIN, Role.MANAGER)
  remove(@Param('id') id: string) {
    return this.orderService.remove(id);
  }
}
