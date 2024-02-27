import { fakerID_ID as faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import { Sql, sqltag } from '@prisma/client/runtime/library';

const prisma = new PrismaClient();

async function main() {
  const truncateAllTable: Sql = sqltag`TRUNCATE TABLE "OrderDetail", "Order", "Customer", "Product", "Role" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw(truncateAllTable);

  for (let i = 0; i < 10; i++) {
    await prisma.product.create({
      data: {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: +faker.commerce.price({
          dec: 2,
        }),
        stock: faker.number.int({
          min: 50,
          max: 100,
        }),
      },
    });
  }

  for (let i = 0; i < 10; i++) {
    await prisma.customer.create({
      data: {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
      },
    });
  }

  await prisma.role.create({
    data: {
      name: 'ADMIN',
    },
  });

  await prisma.role.create({
    data: {
      name: 'MANAGER',
    },
  });

  await prisma.role.create({
    data: {
      name: 'CASHIER',
    },
  });
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
