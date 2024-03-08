import { IsDateString, IsIn, IsOptional, IsString } from 'class-validator';

export class FilterOrderDto {
  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsIn(['createdAt', 'total'])
  @IsString()
  orderBy?: 'createdAt' | 'total';

  @IsOptional()
  @IsString()
  @IsIn(['asc', 'desc'])
  order?: 'asc' | 'desc';
}
