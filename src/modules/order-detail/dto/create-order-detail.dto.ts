import { IsNumber, IsString, Min } from 'class-validator';

export class CreateOrderDetailDto {
  @IsString()
  productId: string;

  @IsNumber()
  subtotal: number;

  @IsNumber()
  @Min(1)
  quantity: number;
}
