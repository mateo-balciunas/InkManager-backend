import { Request, Response, NextFunction } from "express";
import { PortfolioItemService } from "../services/portfolio-item.service.js";
import { ErrorHandler } from "../middlewares/errorHandler.middleware.js";

const portfolioItemService = new PortfolioItemService();

export class PortfolioItemController {

    //CRUD
    //Create
    async createItem( req: Request, res: Response, next: NextFunction ){
        try{
            const item = await portfolioItemService.create( req.body );
            return res.status(201).json({ status: "success", data: { item }});
        } catch( error ) {
            next( error );
        }
    }

    //Read
    //Find all, find by id, find by artistId
    async getAllItems( _req: Request, res: Response, next: NextFunction ){
        try{
            const items = await portfolioItemService.findAll();
            return res.json({ status: "success", data: { items }});
        } catch( error ){
            next( error );
        }
    }

    async findItemById( req: Request, res: Response, next: NextFunction ){
        try{
            const{ id } = req.params;
            if( !id || typeof id !== "string"){
                return res.status(400).json({ status: "error", message: "Invalid ID"});
            }
            const item = await portfolioItemService.findById( id );
            if( !item ){
                return res.status(404).json({ status: "error", message: ErrorHandler.badRequest });
            }
            return res.json({ status: "success", data: { item }});
        } catch( error ){
            next( error );
        }
    }

    async findItemByArtist( req: Request, res: Response, next: NextFunction ){
        try{
            const{ artistId } = req.params;
            if( !artistId || typeof artistId !== "string"){
                return res.status(400).json({ status: "error", message: "Invalid artistId" });
            }
            const item = await portfolioItemService.findByArtistId( artistId );
            if( !item ){
                return res.status(404).json({ status: "error", message: ErrorHandler.badRequest });
            }
            return res.json({ status: "success", data: { item }});
        } catch( error ){
            next( error );
        }
    }

    //Update
    async updateItem( req: Request, res: Response, next: NextFunction ){
        try{
            const { id } = req.params;
            if( !id || typeof id !== "string"){
                return res.status(400).json({ status: "error", message: "Invalid id"});
            }
            const updatedItem = await portfolioItemService.updateItem( id, req.body );
            return res.json({ status: "success", data: { updatedItem }});
        } catch( error ){
            next( error );
        }
    }

    //Delete
    async deleteItem( req: Request, res: Response, next: NextFunction ){
        try{
            const { id } = req.params;
            if( !id || typeof id !== "string"){
                return res.status(400).json({ status: "error", message: "Invalid Id"});
            }
            await portfolioItemService.deleteItem( id );
            return res.status(204).send();
        } catch( error ){
            next( error );
        }
    }
}