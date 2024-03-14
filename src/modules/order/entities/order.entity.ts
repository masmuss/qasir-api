import { OrderDetail } from '@prisma/client';

export class Order {
  id?: string;
  status?: string;
  total?: number;
  customerId: string;
  orderDetails: OrderDetail[];
}
