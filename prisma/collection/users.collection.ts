import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export default function userCollection(): void {
  const users = [
    {
      name: 'John Doe',
      username: 'johndoe',
      email: 'johndoe@exaple.com',
      password: 'Isstrongpassword1',
      roleId: 1,
    },
    {
      name: 'Jane Doe',
      username: 'janedoe',
      email: 'janedoe@example.com',
      password: 'Isstrongpassword1',
      roleId: 2,
    },
    {
      name: 'Alex Doe',
      username: 'alexdoe',
      email: 'alexdoe@mail.com',
      password: 'Isstrongpassword1',
      roleId: 3,
    },
  ];

  users.forEach(async (user) => {
    await prisma.user.create({
      data: {
        name: user.name,
        username: user.username,
        email: user.email,
        password: await bcrypt.hash(user.password, 10),
        roleId: user.roleId,
      },
    });
  });
}
