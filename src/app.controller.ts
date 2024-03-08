import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';
import { CanAccessPublic } from './auth/decorators/public.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @CanAccessPublic()
  getHello(): string {
    return this.appService.getHello();
  }
}
