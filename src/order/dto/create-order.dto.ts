import { $Enums, OrderDetail } from '@prisma/client';
import { IsEmpty, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsEmpty()
  total: number;

  @IsNotEmpty({
    message: 'Order status field cannot be empty',
  })
  @IsEnum($Enums.OrderStatus, {
    message: 'Order status field must be a PENDING or COMPLETED or CANCELLED',
  })
  status: $Enums.OrderStatus;

  @IsNotEmpty({
    message: 'Customer ID field cannot be empty',
  })
  @IsString({
    message: 'Customer ID field must be a string',
  })
  customerId: string;

  @IsNotEmpty({
    message: 'Order detail(s) field cannot be empty',
  })
  orderDetails: OrderDetail[];
}
