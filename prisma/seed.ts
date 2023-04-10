import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const afonso = await prisma.user.upsert({
    where: { email: 'fernando.analista.si@gmail.com' },
    update: {},
    create: {
      email: 'fernando.analista.si@gmail.com',
      name: 'Afonso Fernando',
      password: '$2a$10$D5C5caBvwN2adZiVGQOlW.w.C5u35XxllIiQzLSAEY8rB0jaB7Zka',
      created_at: new Date(),
      updated_at: new Date(),
    },
  });
  const geiza = await prisma.user.upsert({
    where: { email: 'geiza.santana.gf@gmail.com' },
    update: {},
    create: {
      email: 'geiza.santana.gf@gmail.com',
      name: 'Geiza Santana',
      password: '$2a$10$D5C5caBvwN2adZiVGQOlW.w.C5u35XxllIiQzLSAEY8rB0jaB7Zka',
      created_at: new Date(),
      updated_at: new Date(),
    },
  });
  console.log({ afonso, geiza });
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
