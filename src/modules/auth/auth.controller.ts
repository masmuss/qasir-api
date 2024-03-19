import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { CanAccessPublic } from 'src/core/decorators/public.decorator';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/log-in.dto';
import { JwtGuard } from '../../core/guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @CanAccessPublic()
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(JwtGuard)
  @Get('profile')
  getProfile(@Request() req) {
    const authHeader = req.headers.authorization;
    if (authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      return this.authService.decodeTokenFromHeader(token);
    }
  }
}
