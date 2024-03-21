import { Exclude, Expose, Type } from 'class-transformer';

import { ProductResponseDto } from 'src/modules/product/dto/response-product.dto';

export class OrderDetailResponseDto {
  @Exclude()
  id: string;

  @Expose()
  quantity: number;

  @Expose()
  subtotal: number;

  @Exclude()
  productId: string;

  @Type(() => ProductResponseDto)
  @Expose()
  product: ProductResponseDto;

  @Exclude()
  orderId: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
