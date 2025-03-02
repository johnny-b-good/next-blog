import { PrismaClient } from "@prisma/client";
import { scrypt } from "node:crypto";

const prisma = new PrismaClient();

async function main() {
  await prisma.settings.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      siteName: "Next Blog",
      copyright: "Next Blog, 2024",
    },
  });

  const userId = "1";

  const now = new Date();

  await prisma.user.upsert({
    where: { id: userId },
    update: {},
    create: {
      id: userId,
      email: "test@example.com",
      name: "admin",
      username: "admin",
      emailVerified: true,
      createdAt: now,
      updatedAt: now,
    },
  });

  const accountId = "1";

  await prisma.account.upsert({
    where: { id: accountId },
    update: {},
    create: {
      id: accountId,
      userId,
      password: scrypt("swordfish", "salt", 64),
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
