import app from "./index.js";
import prisma from "./config/db.js";


const PORT = process.env.PORT || 3000;

//Start the server
async function startServer() {
    try{
        await prisma.$connect();

        console.log('Database connection established successfully.');

        app.listen(PORT, () => {
            console.log(`InkManager API is running on port: ${PORT}`);
        });
    } catch(error) {
        console.log("Failed to connect to database.", error);
        process.exit(1);
    }
}

startServer();
