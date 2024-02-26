import { Body, Controller, Post, Response } from '@nestjs/common';

import { CreateUserDto } from 'src/user/dto/create-user.dto';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/log-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('signup')
  async signup(@Body() createUser: CreateUserDto, @Response() response) {
    const result: boolean = await this.authService.signup(createUser);

    if (result) return response.status(201).send({ message: 'User created' });
    return response.status(400).send();
  }
}
