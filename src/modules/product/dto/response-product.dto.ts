import { Exclude, Expose, Type } from 'class-transformer';

export class ProductCategoryResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;
}

export class ProductResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  price: number;

  @Expose()
  stock: number;

  @Type(() => ProductCategoryResponseDto)
  @Expose()
  category: ProductCategoryResponseDto;

  @Exclude()
  categoryId: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
