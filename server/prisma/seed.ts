import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const password = '12345';

async function main() {
  const salt1 = await bcrypt.genSalt(10);
  const hashedPassword1 = await bcrypt.hash(password, salt1);
  const user1 = await prisma.user.upsert({
    where: { email: 'user1@prisma.io' },
    update: { password: hashedPassword1 },
    create: {
      email: 'user1@prisma.io',
      name: 'User1',
      password: hashedPassword1,
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
  const salt2 = await bcrypt.genSalt(10);
  const hashedPassword2 = await bcrypt.hash(password, salt2);
  const user2 = await prisma.user.upsert({
    where: { email: 'user2@prisma.io' },
    update: { password: hashedPassword2 },
    create: {
      email: 'user2@prisma.io',
      name: 'User2',
      password: hashedPassword2,
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
