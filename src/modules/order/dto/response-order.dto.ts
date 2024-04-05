import { Exclude, Expose, Type } from 'class-transformer';

import { CustomerResponseDto } from 'src/modules/customer/dto/response-customer.dto';
import { ProductResponseDto } from 'src/modules/product/dto/response-product.dto';
import { UserResponseDto } from 'src/modules/user/dto/response-user.dto';

class OrderDetailsResponseDto {
  id: string;

  @Expose()
  quantity: number;

  @Expose()
  subtotal: number;

  @Expose()
  orderId: string;

  @Expose()
  createdAt: Date;
  updatedAt: Date;

  @Type(() => ProductResponseDto)
  @Expose()
  product: ProductResponseDto;
}

export class OrderResponseDto {
  @Expose()
  id: string;

  @Expose()
  code: string;

  @Expose()
  total: number;

  @Expose()
  status: string;

  @Expose()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  customerId: string;

  @Expose()
  @Type(() => CustomerResponseDto)
  customer: CustomerResponseDto;

  @Exclude()
  userId: string;

  @Type(() => UserResponseDto)
  user: UserResponseDto;

  @Expose()
  get cashier(): string {
    return this.user.name;
  }

  @Type(() => OrderDetailsResponseDto)
  @Expose()
  orderDetails: OrderDetailsResponseDto[];
}
