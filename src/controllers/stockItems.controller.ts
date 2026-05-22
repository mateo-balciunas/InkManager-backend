import { Request, Response, NextFunction } from "express";
import { StockItemService } from "../services/stockItems.service.js";
import { ErrorHandler } from "../middlewares/errorHandler.middleware.js";

const stockItemService = new StockItemService();

export class StockItemsController {

    //CRUD
    //Create
    async createItem( req: Request, res: Response, next: NextFunction ){
        try{
            const item = await stockItemService.create( req.body );
            return res.status(201).json({status: "success", data: { item }});
        } catch( error ){
            next( error );
        }
    }

    //Read
    // Get all items, get items by id, get items by artistId
    async getAll( _req: Request, res: Response, next: NextFunction ){
        try{
            const items = await stockItemService.findAll();
            return res.json({ status: "success", data: { items }});
        } catch( error ){
            next( error );
        }
    }

    async getItemById( req: Request, res: Response, next: NextFunction ){
        try{
            const { id } = req.params;
            if( !id || typeof id !== "string") {
                return res.status(400).json({ status: "error", message: "Invalid Id"});
            }
            const item = await stockItemService.findById( id );
            if( !item ){
                return res.status(404).json({ status: "error", message: ErrorHandler.badRequest });
            }
            return res.json({ status: "success", data: { item }});
        } catch( error ){
            next( error );
        }
    } 

    async getByArtistId( req: Request, res: Response, next: NextFunction ){
        try{
            const { artistId } = req.params;
            if( !artistId || typeof artistId !== "string") {
                return res.status(400).json({ status: "error", message: "Invalid artistId" });
            }
            const item = await stockItemService.findByArtistId( artistId );
            return res.json({ status: "success", data: { item }});
        } catch( error ) {
            next( error );
        }
    }

    //Update
    async updateItem( req: Request, res: Response, next: NextFunction ){
        try{
            const { id } = req.params;
            if( !id || typeof id !== "string"){
                return res.status(400).json({ status: "error", message: "Invalid Id" });
            }
            const updateItem = await stockItemService.updateItems( id, req.body );
            return res.json({ status: "success", data: { updateItem }});
        } catch( error ){
            next( error );
        }
    }

    //Delete
    async deleteItem( req: Request, res: Response, next: NextFunction ){
        try{
            const { id } = req.params;
            if( !id || typeof id !== "string") {
                return res.status(400).json({ status: "error", message: "Invalid Id"});
            }
            await stockItemService.deleteItems( id );
            return res.status(204).send();
        } catch( error ) {
            next( error );
        }
    }

    //Decrement stock items after appointment
    async decrementStock( req: Request, res: Response, next: NextFunction ) {
        try {
            const { id , amount } = req.params;
            if (!id || typeof id !== "string") {
                return res.status(400).json({ status: "error", message: "Invalid ID" });
            }

            // Asegurarse de que 'amount' es un string antes de pasarlo a parseInt
            if (typeof amount !== "string") {
                return res.status(400).json({ status: "error", message: "Invalid amount parameter type" });
            }
            const parsedAmount = parseInt(amount); // Convertir a número
            if (isNaN(parsedAmount) || parsedAmount <= 0) { // Validar si es un número válido y mayor que 0
                return res.status(400).json({ status: "error", message: "Invalid amount" });
            }

            await stockItemService.decrementStock( id, parsedAmount );
            return res.status(204).send();
        } catch (error) {
            next( error );
        }
    }
} 