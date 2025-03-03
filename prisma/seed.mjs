import { PrismaClient } from "@prisma/client";
import { scryptSync } from "node:crypto";

const PASSWORD_SALT = process.env.PASSWORD_SALT;

if (!PASSWORD_SALT) {
  console.error("Please provide a PASSWORD_SALT environment variable");
  process.exit(1);
}

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
      name: "admin",
      password: scryptSync("admin", PASSWORD_SALT, 64).toString("hex"),
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
