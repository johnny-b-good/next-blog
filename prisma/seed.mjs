import { PrismaClient } from "@prisma/client";

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

  await prisma.user.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      password: "admin",
      username: "admin@example.com",
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
