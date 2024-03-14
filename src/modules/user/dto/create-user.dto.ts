import {
  IsAlpha,
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @MinLength(4, {
    message: 'Name is too short',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @MinLength(4, {
    message: 'Username is too short',
  })
  @IsAlpha()
  username: string;

  @IsEmail(
    {
      allow_ip_domain: false,
      allow_utf8_local_part: true,
      require_tld: true,
    },
    {
      message: 'Invalid email',
    },
  )
  email: string;

  @MinLength(8, {
    message: 'Password is too short',
  })
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;

  @IsEmpty()
  roleId: number;
}
