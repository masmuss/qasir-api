import { Controller } from '@nestjs/common';
import { OrderDetailService } from './order-detail.service';

@Controller('order-detail')
export class OrderDetailController {
  constructor(private readonly orderDetailService: OrderDetailService) {}
}
