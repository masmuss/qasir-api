import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.product.upsert({
    where: { name: 'Cappucino' },
    update: {},
    create: {
      name: 'Cappucino',
      description: 'A delicious coffee with milk',
      price: 15000,
      stock: 10,
    },
  });

  await prisma.product.upsert({
    where: { name: 'Latte' },
    update: {},
    create: {
      name: 'Latte',
      description: 'A delicious coffee with milk',
      price: 15000,
      stock: 10,
    },
  });

  await prisma.product.upsert({
    where: { name: 'Espresso' },
    update: {},
    create: {
      name: 'Espresso',
      description: 'A delicious coffee with milk',
      price: 15000,
      stock: 10,
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
