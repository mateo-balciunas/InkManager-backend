import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";

//Initialize dotenv to import env variables from .env file
dotenv.config();

const app = express();

//Use helmet for setting security-related HTTP headers
app.use(helmet());

//Middleware to parse JSON bodies
app.use(express.json());

//Simple route to test the server
app.get("/", (_req, res) => {
    res.send("Hello World!");
});

export default app;