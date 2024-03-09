import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default function productCategoryCollection() {
  return prisma.productCategory.createMany({
    data: [
      { name: 'Fruits' },
      { name: 'Vegetables' },
      { name: 'Meat' },
      { name: 'Dairy' },
      { name: 'Beverages' },
    ],
  });
}
