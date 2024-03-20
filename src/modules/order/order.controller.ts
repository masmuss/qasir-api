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
import { Request } from 'express';

import { CanAccessPublic } from 'src/core/decorators/public.decorator';
import { CanAccessWithRoles } from 'src/core/decorators/role.decorator';
import { Role } from 'src/core/enums/role.enum';
import { AuthService } from 'src/modules/auth/auth.service';

import { CreateOrderDto } from './dto/create-order.dto';
import { FilterOrderDto } from './dto/filter-order.dto';
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
      req.headers.authorization,
    );
    createOrderDto.userId = user.id;
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
