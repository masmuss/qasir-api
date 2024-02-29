import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Response,
} from '@nestjs/common';

import { AuthService } from 'src/auth/auth.service';
import { CanAccessWithRoles } from 'src/auth/decorators/role.decorator';
import { Role } from 'src/auth/enums/role.enum';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
@CanAccessWithRoles(Role.ADMIN)
export class UserController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Response() response) {
    const result: boolean = await this.authService.signup(createUserDto);

    if (result) return response.status(201).send({ message: 'User created' });
    return response.status(400).send();
  }

  @Get()
  async findAll(@Response() response) {
    const users = await this.userService.findAll();
    return response.status(200).send(users);
  }

  @Patch(':id')
  async update(
    @Response() response,
    @Body() createUserDto: UpdateUserDto,
    @Param('id') id: string,
  ) {
    const user = await this.userService.update(id, createUserDto);
    return response.status(200).send(user);
  }

  @Delete(':id')
  async remove(@Response() response, @Param('id') id: string) {
    await this.userService.remove(id);
    return response.status(200).send({
      message: 'User deleted',
    });
  }
}
