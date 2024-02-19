import { Test, TestingModule } from '@nestjs/testing';
import { Customer } from '@prisma/client';

import { PrismaService } from 'src/prisma/prisma.service';

import { CustomerService } from './customer.service';

jest.mock('src/prisma/prisma.service');
describe('CustomerService', () => {
  let service: CustomerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, CustomerService],
    }).compile();

    service = module.get<CustomerService>(CustomerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('should create a customer', () => {
    it('should create a customer', async () => {
      const customerExample: Customer = {
        id: Math.random().toString(36).substring(7),
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndo@email.com',
        phone: '62 82-9521-3127',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'create').mockResolvedValue(customerExample);

      expect(await service.create(customerExample)).toEqual(customerExample);
    });
  });

  describe('should find all customers', () => {
    it('should find all customers', async () => {
      const customersExample: Customer[] = [
        {
          id: Math.random().toString(36).substring(7),
          firstName: 'John',
          lastName: 'Doe',
          email: 'johndoe@mail.com',
          phone: '62 82-9521-3127',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: Math.random().toString(36).substring(7),
          firstName: 'Jane',
          lastName: 'Doe',
          email: 'janedoe@mail.com',
          phone: '62 82-9521-3127',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(customersExample);

      expect(await service.findAll()).toEqual(customersExample);
    });
  });

  describe('should find one customer', () => {
    it('should find one customer', async () => {
      const customerExample: Customer = {
        id: Math.random().toString(36).substring(7),
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@mail.com',
        phone: '62 82-9521-3127',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(customerExample);

      expect(await service.findOne(customerExample.id)).toEqual(
        customerExample,
      );
    });
  });

  describe('should update a customer', () => {
    it('should update a customer', async () => {
      const customerExample: Customer = {
        id: Math.random().toString(36).substring(7),
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@mail.com',
        phone: '62 82-9521-3127',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const updatedCustomerExample: Customer = {
        id: customerExample.id,
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'janedoe@mail.com',
        phone: '62 82-9521-3127',
        createdAt: customerExample.createdAt,
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'update').mockResolvedValue(updatedCustomerExample);

      expect(
        await service.update(customerExample.id, updatedCustomerExample),
      ).toEqual(updatedCustomerExample);
    });
  });

  describe('should remove a customer', () => {
    it('should remove a customer', async () => {
      const customerExample: Customer = {
        id: Math.random().toString(36).substring(7),
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@mail.com',
        phone: '62 82-9521-3127',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'remove').mockResolvedValue(customerExample);

      expect(await service.remove(customerExample.id)).toEqual(customerExample);
    });
  });
});
