import { CorsOptions } from "cors"

export const corsOptions: CorsOptions = {
    origin: ['http://localhost:3000', 'http://url-de-la-webapp.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true //for the use of cookies
}