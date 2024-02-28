import { Body, Controller, Post, Response } from '@nestjs/common';

import { CanAccessWithRoles } from 'decorators/role.decorator';
import { Role } from 'enums/role.enum';
import { AuthService } from 'src/auth/auth.service';

import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @CanAccessWithRoles(Role.ADMIN)
  async create(@Body() createUserDto: CreateUserDto, @Response() response) {
    const result: boolean = await this.authService.signup(createUserDto);

    if (result) return response.status(201).send({ message: 'User created' });
    return response.status(400).send();
  }
}
