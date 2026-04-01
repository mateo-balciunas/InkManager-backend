import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/user.service.js";
import { ErrorHandler } from "../middlewares/errorHandler.middleware.js";

const userService = new UserService();
const errorHandler = new ErrorHandler();

export class UserController {
    
    async getAll(_req: Request, res: Response, next: NextFunction) {
        try {
            const users = await userService.findAllUsers();
            res.json({ status: "success", data: {users} });
        } catch( error ) {
            next(error);
        }
    }

    async getOne(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await userService.findUser( req.params.id );

            if( !user ) {
                return res.status(404).json({ message: ErrorHandler.badRequest });
            }
            res.json({ status: "success", data: { user } });
        } catch( error ) {
            next(error);
        }
    }

    async deleteUser(req: request, res: response, next: NextFunction ) {
        try {
            await userService.deleteUser( req.params );
            res.status(204).send();
        } catch( error ) {
            next(error);
        }
    }
}