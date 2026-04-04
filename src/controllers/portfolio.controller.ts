import { Request, Response, NextFunction } from "express";
import { PortfolioService } from "../services/portfolio.service.js";
import { ErrorHandler } from "../middlewares/errorHandler.middleware.js";

const portfolioService = new PortfolioService();

export class PortfolioController {

    //CRUD
    //Create
    async createPortfolio ( req: Request, res: Response, next: NextFunction ) {
        try{
            const portfolio = await portfolioService.create( req.body );
    
            return res.status(201).json({ status: "success", data: { portfolio }});
        } catch ( error ){
            next( error );
        }
    }

    //Read
    //Get all portfolios, get by id and get by artistId
    async getAll( _req: Request, res: Response, next: NextFunction ){
        try {
            const portfolios = await portfolioService.findAll();
            return res.json({ status: "success", data: { portfolios }});
        } catch( error ){
            next( error );
        }
    }

    async getById( req: Request, res: Response, next: NextFunction ){
        try{
            const { id } = req.params;
            if( !id || typeof id !== "string"){
                return res.status(400).json({ status: "error", message: "Invalid Id"});
            }
            const portfolio = await portfolioService.findById( id );
            if( !portfolio ){
                return res.status(404).json({ status: "error", message: ErrorHandler.badRequest });
            }
            return res.json({ status: "success", data: { portfolio }});
        } catch( error ){
            next( error );
        }
    }

    async getByArtistId( req: Request, res: Response, next: NextFunction ){
        try {
            const { artistId } = req.params;
            if( !artistId || typeof artistId !== "string"){
                return res.status(400).json({ status: "error", message: "Invalid artistId" });
            }
            const portfolio = await portfolioService.findArtistById( artistId );
            if( !portfolio ){
                return res.status(404).json({ status: "error", message: ErrorHandler.badRequest });
            }
    
            return res.json({ status: "success", data: { portfolio }});
        } catch( error ){
            next( error );
        }
    }

    //Update
    async updatePortfolio( req: Request, res: Response, next: NextFunction ){
        try{
            const { id } = req.params;
            if( !id || typeof id !== "string"){
                return res.status(400).json({ status: "error", message: "Invalid ID"});
            }
            const portfolio = await portfolioService.updatePortfolio( id, req.body );
            return res.json({ status: "success", data: { portfolio }});
        } catch( error ){
            next( error);
        }
    }

    //Delete
    async deletePortfolio( req: Request, res: Response, next: NextFunction ){
        try{
            const { id } = req.params;
            if( !id || typeof id !== "string" ){
                return res.status(400).json({ status: "error", message: "Invalid Id"});
            }
            await portfolioService.deletePortfolio( id );
            return res.status(204).send();
        } catch( error ){
            next( error );
        }
    }
}