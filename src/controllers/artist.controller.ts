import { Request, Response, NextFunction } from "express";
import { ArtistService } from "../services/artist.service.js";
import { ErrorHandler } from "../middlewares/errorHandler.middleware.js";

const artistService = new ArtistService();

export class ArtistController {

    //CRUD
    //CREATE
    async createArtist( req: Request, res: Response, next: NextFunction ){
        try{
            const artist = await artistService.create( req.body );
            return res.status(201).json({ status: "success", data: { artist }});
        } catch( error ){
            next( error ); 
        }
    }

    //READ
    async getAll( _req: Request, res: Response, next: NextFunction ){
        try{
            const artists = await artistService.findAllArtists();
            return res.json({ status: "success", data: { artists }});
        } catch( error ){
            next( error );
        }
    }

    async getOne( req: Request, res: Response, next: NextFunction ){
        try{
            const { id } = req.params;
            if( !id || typeof id !== "string") {
                return res.status(400).json({ status: "error", message: "Invalid Id"});
            }

            const artist = await artistService.findById( id );
            if( !artist ){
                return res.status(404).json({ message: ErrorHandler.badRequest});
            }
            return res.json({ status: "success", data: { artist } });
        } catch( error ){
            next( error );
        }
    }

    async getByUser( req: Request, res: Response, next: NextFunction ) {
        try {
            const { userId }= req.params;
            if( !userId || typeof userId !== "string" ){
                return res.status(400).json({ status: "error", message: "Invalid ID"});
            }

            const artists = await artistService.findByUserId( userId );
            if( !artists || artists.length === 0){
                return res.status(404).json({ message: ErrorHandler.badRequest });
            }

            return res.json({ status: "success", data: { artists} });
        } catch( error ){
            next( error );
        }
    }

    async getByCompany( req: Request, res: Response, next: NextFunction ){
        try {
            const { companyId } = req.params;
            if( !companyId || typeof companyId !== "string"){
                res.status(400).json({ status: "error", message: "Invalid companyId" });
            }

            const artists = await artistService.findByCompanyId( companyId );
            if( !artists || artists.length === 0){
                return res.status(404).json({ status: "error", message: ErrorHandler.badRequest});
            }
            return res.json({ status: "success", data: { artists }});
        } catch ( error ) {
            next( error );
        }
    }

    //Update
    async updateArtist( req: Request, res: Response, next: NextFunction ){
        try{
            const { id } = req.params;
            if( !id || typeof id !== "string"){
                return res.status(400).json({ status: "error", message: "Invalid ID"});
            }
            
            const artistUpdated = await artistService.updateArtist( id, req.body );
            return res.json({ status: "success", data: { artistUpdated }});
        } catch ( error ){
            next( error );
        }
    }

    //Delete
    async deleteArtist( req: Request, res: Response, next: NextFunction ){
        try{
            const { id } = req.params;
            if( !id || typeof id !== "string" ){
                return res.status(400).json({ status: "error", message: "Invalid ID"});
            }
            const deletedArtist = await artistService.deleteArtist( id );
            return res.status(204).send();
        } catch( error ){
            next( error );
        }
    }


}