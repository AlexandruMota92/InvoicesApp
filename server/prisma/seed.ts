import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.upsert({
    where: { email: 'user1@prisma.io' },
    update: {},
    create: {
      email: 'user1@prisma.io',
      name: 'User1',
      password: '12345',
      invoices: {
        create: {
          vendor_name: 'Ebay',
          amount: 0,
          due_date: new Date(),
          description: 'description',
          paid: false,
        },
      },
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'user2@prisma.io' },
    update: {},
    create: {
      email: 'user2@prisma.io',
      name: 'User2',
      password: '12345',
      invoices: {
        create: [
          {
            vendor_name: 'Amazon',
            amount: 0,
            due_date: new Date(),
            description: 'description',
            paid: false,
          },
          {
            vendor_name: 'MEtro',
            amount: 0,
            due_date: new Date(),
            description: 'description',
            paid: false,
          },
        ],
      },
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
