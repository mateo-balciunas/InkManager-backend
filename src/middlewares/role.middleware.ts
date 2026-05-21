import { Request, Response, NextFunction } from "express";

export const authorize = (allowedRoles: string[]) => {
    return ( req: Request, res: Response, next: NextFunction ) => {
        const user = (req as any).user;

        if( !user || !allowedRoles.includes(user.role) ){
            return res.status(401).json({ message: "Forbidden Access.  Invalid role" });
        }

        next();
    }
}