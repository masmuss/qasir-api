import { Exclude, Expose } from 'class-transformer';

export class CustomerResponseDto {
  @Exclude()
  id: string;

  firstName: string;
  lastName: string;

  @Expose()
  get name(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  @Expose()
  email: string;

  @Expose()
  phone: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
