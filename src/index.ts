import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";

import { corsOptions } from "./config/cors.config.js";
import { globalErrorHandler } from "./middlewares/globalErrorHandler.middleware.js";

//Initialize dotenv to import env variables from .env file
dotenv.config();

const app = express();

//Cors middleware to connect the backend to the frontend
app.use(cors(corsOptions))

//Use helmet for setting security-related HTTP headers
app.use(helmet());
//Middleware to parse JSON bodies
app.use(express.json());

//Simple route to test the server
app.get("/", (_req, res) => {
    res.send("Hello World!");
});

app.use(globalErrorHandler);

export default app;