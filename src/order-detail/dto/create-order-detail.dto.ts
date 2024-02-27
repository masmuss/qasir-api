import { IsNumber, IsString, Min } from 'class-validator';

export class CreateOrderDetailDto {
  @IsString()
  productId: number;

  @IsNumber()
  @Min(1)
  quantity: number;
}
