import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({
    message: 'Name field cannot be empty',
  })
  @MinLength(4, {
    message: 'Name field must be at least 5 characters long',
  })
  name: string;

  @IsNotEmpty({
    message: 'Description field cannot be empty',
  })
  @IsString()
  @MinLength(10, {
    message: 'Description field must be at least 10 characters long',
  })
  description: string;

  @IsNotEmpty({
    message: 'Price field cannot be empty',
  })
  @IsNumber(
    {
      allowNaN: false,
      allowInfinity: false,
      maxDecimalPlaces: 2,
    },
    {
      message: 'Price field must be a number',
    },
  )
  @Min(0, {
    message: 'Price field must be at least 0',
  })
  price: number;

  @IsNotEmpty({
    message: 'Stock field cannot be empty',
  })
  @IsNumber(
    {
      allowNaN: false,
      allowInfinity: false,
      maxDecimalPlaces: 0,
    },
    {
      message: 'Stock field must be a number',
    },
  )
  @Min(1, {
    message: 'Stock field must be at least 1',
  })
  stock: number;

  @IsNotEmpty({
    message: 'Category field cannot be empty',
  })
  @IsInt()
  categoryId: number;
}
