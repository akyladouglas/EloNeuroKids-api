import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seeding...');

  // 1. Criar Roles
  const roles = ['ADMIN', 'PROFESSIONAL', 'FAMILY'];

  for (const roleName of roles) {
    await prisma.role.upsert({
      where: { name: roleName },
      update: {},
      create: { name: roleName },
    });
    console.log(`✅ Role ${roleName} ensured.`);
  }

  // 2. Criar Usuário Admin
  const adminEmail = 'admin@eloneurokids.com';
  const hashedPassword = await bcrypt.hash('password123', 10);

  const adminRole = await prisma.role.findUnique({ where: { name: 'ADMIN' } });

  if (!adminRole) throw new Error('Role ADMIN not found');

  const adminUser = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {}, // Se já existe, não faz nada
    create: {
      email: adminEmail,
      name: 'Admin Inicial',
      passwordHash: hashedPassword,
      roles: {
        create: {
          roleId: adminRole.id,
        },
      },
    },
  });

  console.log(`✅ Admin User created: ${adminUser.email}`);
  console.log('🌱 Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
