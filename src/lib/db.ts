// Для предотвращения ошибки превышения числа соединений БД,
// возникающей при пересборке модулей NextJS, создающих новый клиент Prisma,
// создается глобальный инстанс клиента.
// Взято отсюда: https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices

// Lib
// -----------------------------------------------------------------------------
import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = prisma;
}
