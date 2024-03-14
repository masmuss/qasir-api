import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  name: string;

  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsOptional()
  password: string;

  @IsNumber()
  @IsNotEmpty()
  roleId: number;
}
