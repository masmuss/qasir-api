import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Request } from 'express';

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
  async login(
    @Body() loginDto: LoginDto,
    // @Res({ passthrough: true }) response: Response,
  ) {
    const result = this.authService.login(loginDto);
    return plainToInstance(AuthResponseDto, result);
  }

  @UseGuards(JwtGuard)
  @Get('profile')
  getProfile(@Req() req: Request) {
    const authCookie = req.cookies.access_token;
    console.log('auth cookie ', authCookie);
    const user = this.authService.decodeTokenFromHeader(authCookie);
    return plainToInstance(AuthUserResponseDto, user);
  }
}
