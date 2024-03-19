import { PrismaClient } from '@prisma/client';
import { Sql, sqltag } from '@prisma/client/runtime/library';

import productCategoryCollection from './collection/product-category.collection';
import productCollection from './collection/product.collection';
import roleCollection from './collection/role.collection';
import userCollection from './collection/users.collection';

const prisma = new PrismaClient();

async function main() {
  const truncateAllTable: Sql = sqltag`TRUNCATE TABLE "order_details", "orders", "customers", "products", "roles" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw(truncateAllTable);

  await roleCollection();
  await userCollection();
  await productCategoryCollection();
  await productCollection();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
