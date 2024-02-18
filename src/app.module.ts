import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [ProductModule, CustomerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
