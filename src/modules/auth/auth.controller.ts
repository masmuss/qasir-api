import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { plainToClass, plainToInstance } from 'class-transformer';

import { CanAccessPublic } from 'src/core/decorators/public.decorator';
import { JwtGuard } from 'src/core/guards/jwt-auth.guard';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/log-in.dto';
import { AuthResponseDto, AuthUserResponseDto } from './dto/response-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @CanAccessPublic()
  async login(@Body() loginDto: LoginDto) {
    const result = this.authService.login(loginDto);
    return plainToInstance(AuthResponseDto, result);
  }

  @UseGuards(JwtGuard)
  @Get('profile')
  getProfile(@Request() req) {
    const authHeader = req.headers.authorization;
    const user = this.authService.decodeTokenFromHeader(authHeader);
    return plainToClass(AuthUserResponseDto, user);
  }
}
