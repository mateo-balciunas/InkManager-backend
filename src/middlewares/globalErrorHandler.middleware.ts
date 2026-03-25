import { NextFunction, Response, Request } from "express";
import { prismaErrorHandler } from "./prismaError.middleware.js";
import { ErrorHandler } from "./errorHandler.middleware.js";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";


export const globalErrorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    if (err instanceof ErrorHandler) {
        return res.status(err.statusCode).json({ message: err.message });
    }

    if (err instanceof ZodError) {
        return res.status(400).json({
            errors: err.issues.map( e => {
                return {
                    path: e.path.join('.'),
                    message: e.message
                }
            })
        })
    }

    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        return prismaErrorHandler(err, res);
    }

    console.error('[INTERNAL_SERVER_ERROR]: ', err);
    return res.status(500).json({ message: 'Unexpected server error' });
}