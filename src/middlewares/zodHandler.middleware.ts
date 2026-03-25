import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod/v3";

export const validateSchema = ( schema: AnyZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync({
                body: req.body,
                params: req.params,
                query: req.query
            });
            next();
        } catch( error ) {
            next( error );
        }
    }
}