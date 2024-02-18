import { Test, TestingModule } from '@nestjs/testing';
import { Product } from '@prisma/client';

import { PrismaService } from 'src/prisma.service';

import { ProductService } from './product.service';

jest.mock('src/prisma.service');
describe('ProductService', () => {
  let service: ProductService;
  const productExample: Product = {
    id: Math.random().toString(36).substring(7),
    name: 'Test Product',
    description: 'Test Description',
    price: 100,
    stock: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const updatedProductExample: Product = {
    id: productExample.id,
    name: 'Updated Test Product',
    description: 'Updated Test Description',
    price: 200,
    stock: 20,
    createdAt: productExample.createdAt,
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, ProductService],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('should create a product', () => {
    it('should create a product', async () => {
      jest.spyOn(service, 'create').mockResolvedValue(productExample);

      expect(await service.create(productExample)).toEqual(productExample);
    });

    it('should throw an error if the product name is empty', async () => {
      const productWithoutName = { ...productExample, name: '' };

      await expect(service.create(productWithoutName)).rejects.toThrow();
    });

    it('should throw an error if the product description is empty', async () => {
      const productWithoutDescription = { ...productExample, description: '' };

      await expect(service.create(productWithoutDescription)).rejects.toThrow();
    });
  });

  describe('should find all products', () => {
    it('should find all products', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue([productExample]);

      expect(await service.findAll()).toEqual([productExample]);
    });

    it('should find no products', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue([]);

      expect(await service.findAll()).toEqual([]);
    });
  });

  describe('should find one product', () => {
    it('should find one product', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(productExample);

      expect(await service.findOne(productExample.id)).toEqual(productExample);
    });
  });

  describe('should update product', () => {
    it('should update product', async () => {
      jest.spyOn(service, 'update').mockResolvedValue(updatedProductExample);

      expect(
        await service.update(productExample.id, updatedProductExample),
      ).toEqual(updatedProductExample);
    });
  });

  describe('should remove product', () => {
    it('should remove product', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue(productExample);

      expect(await service.remove(productExample.id)).toEqual(productExample);
    });
  });
});
