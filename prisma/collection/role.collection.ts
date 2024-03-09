import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default function roleCollection() {
  return prisma.role.createMany({
    data: [{ name: 'ADMIN' }, { name: 'MANAGER' }, { name: 'CASHIER' }],
  });
}
