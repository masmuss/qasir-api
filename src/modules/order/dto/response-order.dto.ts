import { Exclude, Expose, Type } from 'class-transformer';

import { ProductResponseDto } from 'src/modules/product/dto/response-product.dto';

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

  @Exclude()
  customerId: string;

  @Type(() => OrderDetailsResponseDto)
  @Expose()
  orderDetails: OrderDetailsResponseDto[];
}
