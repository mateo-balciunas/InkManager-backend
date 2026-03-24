import { PrismaClient } from "@prisma/client";

const globalPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

//If the global object exists, we use it, else we create it
export const prisma = globalPrisma.prisma ?? new PrismaClient();

//In development, save the instance for the restart
if (process.env.NODE_ENV !== 'production') globalPrisma.prisma = prisma;

export default prisma;