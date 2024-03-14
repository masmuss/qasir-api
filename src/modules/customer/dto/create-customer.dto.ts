import { IsEmail, IsNotEmpty, IsPhoneNumber, MinLength } from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty({
    message: 'First name field cannot be empty',
  })
  @MinLength(3, {
    message: 'First name field must be at least 3 characters long',
  })
  firstName: string;

  @MinLength(3, {
    message: 'Last name field must be at least 3 characters long',
  })
  lastName?: string;

  @IsEmail(
    {
      allow_ip_domain: false,
      allow_utf8_local_part: true,
      require_tld: true,
      ignore_max_length: false,
    },
    {
      message: 'Email field must be a valid email address',
    },
  )
  @IsNotEmpty({
    message: 'Email field cannot be empty',
  })
  email: string;

  @IsPhoneNumber('ID', {
    message: 'Phone field must be a valid phone number',
  })
  @IsNotEmpty({
    message: 'Phone field cannot be empty',
  })
  phone: string;
}
