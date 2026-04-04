import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/user.service.js";
import { ErrorHandler } from "../middlewares/errorHandler.middleware.js";

const userService = new UserService();

export class UserController {

    //CRUD
    //CREATE
    async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await userService.create( req.body );

            res.status(201).json({ status: "success", data: { user }});
        } catch( error ){
            next( error );
        }
    }
    //READ
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
            const { id } = req.params;
            if( !id || typeof id !== "string") {
                return res.status(400).json({ status: "error", message: "Invalid ID"});
            }    
            const user = await userService.findUser( id );

            if( !user ) {
                return res.status(404).json({ message: ErrorHandler.badRequest });
            }
            res.json({ status: "success", data: { user } });
        } catch( error ) {
            next(error);
        }
    }

    //UPDATE
    async updateUser( req: Request, res: Response, next: NextFunction ){
        try {
            const { id } = req.params;
            if( !id || typeof id !== "string") {
                return res.status(400).json({ status: "error", message: "Invalid ID"});
            }
            const user = await userService.updateUser( id, req.body );
            res.json({ status: "success", data: { user }});
        } catch( error ) {
            next(error);
        }
    }

    //DELETE
    async deleteUser(req: Request, res: Response, next: NextFunction ) {
        try {
            const { id } = req.params;
            if( !id || typeof id !== "string") {
                return res.status(400).json({ status: "error", message: "Invalid ID"});)
            }
            await userService.deleteUser( id );
            res.status(204).send();
        } catch( error ) {
            next(error);
        }
    }
}
