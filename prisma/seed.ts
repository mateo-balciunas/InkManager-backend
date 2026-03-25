import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("Initializing seeding...");

    const userExample = await prisma.user.upsert({
        where: { email: "testUser@example.com"},
        update: {},
        create: {
            email: "testUser@example.com",
            password: "12345678",
            role: "ADMIN",
            
        },
    });
    console.log(`User created or found ${userExample.email}`);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error('Error during seeding', e);
        await prisma.$disconnect();
        process.exit(1);
    });