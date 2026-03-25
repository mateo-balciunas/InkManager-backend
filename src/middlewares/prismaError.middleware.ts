import { Response } from "express";
import { Prisma } from "@prisma/client";

export const prismaErrorHandler = (
    err: any,
    res: Response,
) => {
    
    if( err instanceof Prisma.PrismaClientKnownRequestError) {
        switch (err.code) {
            case 'P2002':
                // eslint-disable-next-line no-case-declarations
                const target = (err.meta?.target as string[])?.join(', ') || 'field';
                return res.status(409).json({ message: `Regisrty already exists as ${target}` });
            case 'P2025':
                return res.status(404).json({ message: 'Record not found'});
            default:
                return res.status(400).json({ message: `Database error: ${err.code}` })
        }
    }

    return null;
}
