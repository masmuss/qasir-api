import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { OrderModule } from './order/order.module';
import { OrderDetailModule } from './order-detail/order-detail.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [ProductModule, CustomerModule, OrderModule, OrderDetailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
