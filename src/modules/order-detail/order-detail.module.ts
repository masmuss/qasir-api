import { Module } from '@nestjs/common';

import { OrderDetailService } from './order-detail.service';

@Module({
  controllers: [],
  providers: [OrderDetailService],
})
export class OrderDetailModule {}
