import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default function productCollection() {
  const menuItems = [
    {
      name: 'Nasi Goreng',
      description:
        'Nasi yang digoreng dengan bumbu khas Indonesia, disajikan dengan telur mata sapi, ayam, dan acar.',
      price: 35000, // dalam rupiah
      stock: 50,
      categoryId: 3, // Meat
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Gado-Gado',
      description:
        'Sayuran segar seperti kubis, kacang panjang, dan tahu disajikan dengan bumbu kacang khas Indonesia.',
      price: 25000, // dalam rupiah
      stock: 30,
      categoryId: 2, // Vegetables
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Sate Ayam',
      description:
        'Potongan daging ayam yang ditusuk dan dipanggang dengan bumbu kacang, disajikan dengan lontong.',
      price: 30000, // dalam rupiah
      stock: 40,
      categoryId: 3, // Meat
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Rendang',
      description:
        'Daging sapi yang dimasak dalam santan dan rempah-rempah kaya rasa, disajikan dengan nasi.',
      price: 40000, // dalam rupiah
      stock: 20,
      categoryId: 3, // Meat
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Es Teh Manis',
      description:
        'Teh hitam yang manis disajikan dengan es dan dilengkapi dengan potongan jeruk.',
      price: 10000, // dalam rupiah
      stock: 60,
      categoryId: 5, // Beverages
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Pisang Goreng',
      description:
        'Pisang yang digoreng dengan adonan tepung khas Indonesia, menjadi camilan yang lezat.',
      price: 15000, // dalam rupiah
      stock: 50,
      categoryId: 1, // Fruits
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Sop Buntut',
      description:
        'Sup khas Indonesia yang terkenal dengan buntut sapi, disajikan dengan nasi.',
      price: 45000, // dalam rupiah
      stock: 25,
      categoryId: 3, // Meat
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Kerak Telor',
      description:
        'Makanan tradisional Betawi berupa telur dadar dengan beras ketan dan kelapa parut.',
      price: 20000, // dalam rupiah
      stock: 35,
      categoryId: 3, // Meat
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Soto Ayam',
      description:
        'Sup ayam dengan kuah kuning khas Indonesia, disajikan dengan mie, tauge, dan daun seledri.',
      price: 30000, // dalam rupiah
      stock: 30,
      categoryId: 3, // Meat
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Dadar Gulung',
      description:
        'Telur dadar yang digulung dengan isian kelapa parut dan gula merah, menjadi hidangan manis.',
      price: 12000, // dalam rupiah
      stock: 40,
      categoryId: 4, // Dairy
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  return prisma.product.createMany({
    data: menuItems,
  });
}
