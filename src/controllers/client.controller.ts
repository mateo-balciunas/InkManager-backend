import { Request, Response, NextFunction } from "express";
import { ClientService } from "../services/client.service.js";
import { ErrorHandler } from "../middlewares/errorHandler.middleware.js";

const clientService = new ClientService();
export class ClientController {
    //CRUD 
    //Create
    async createClient ( req: Request, res: Response, next: NextFunction ){
        try{
            const client = await clientService.create( req.body );
            return res.status(201).json({ status: "success", data: { client }});
        } catch( error ){
            next( error );
        }
    }

    //Read
    //Get all clients, by id and by user id
    async getAllClients( req: Request, res: Response, next: NextFunction ){
        try {
            const clients = await clientService.findAllClients();
            return res.json({ status: "success", data: { clients }});
        } catch( error ){
            next( error );
        }
    }

    async getClientById( req: Request, res: Response, next: NextFunction ){
        try{
            const { id } = req.params;
            if( !id || typeof id !== "string"){
                return res.status(400).json({ status: "error", message: "Invalid Id"});
            }
            const client = await clientService.findClientById( id );
            if( !client){
                return res.json({ status: "error", message: ErrorHandler.badRequest });
            }
            return res.json({ status: "success", data: { client }});
        } catch( error ){
            next( error );        
        }
    }

    async getClientByUserId( req: Request, res: Response, next: NextFunction ){
        try{
            const { userId } = req.params;
            if( !userId || typeof userId !== "string") {
                return res.status(400).json({ status: "error", message: "Invalid userId"});
            }
            const client = await clientService.findClientByUserId( userId );
            if( !client ){
                return res.status(400).json({ status: "error", message: ErrorHandler.badRequest });
            }
            return res.json({ status: "success", data: { client }});
        } catch( error ){
            next( error );
        }
    }

    //Udate client
    async updateClient( req: Request, res: Response, next: NextFunction ){
        try{
            const { id } = req.params;
            if( !id || typeof id !== "string"){
                return res.status(400).json({ status: "error", message: "Invalid Id"});
            }
            const clientUpdated = await clientService.updateClient( id, req.body );
            return res.json({ status: "success", data: { clientUpdated }});
        } catch( error ){
            next( error );
        }
    }

    //Delete client
    async deleteClient( req: Request, res: Response, next: NextFunction ){
        try{
            const { id } = req.params;
            if( !id || typeof id !== "string"){
                return res.status(400).json({ status: "error", message: "Invalid Id"});
            }
            await clientService.deleteClient( id );
            return res.status(204).send();
        } catch( error ){
            next( error );
        }
    }
}