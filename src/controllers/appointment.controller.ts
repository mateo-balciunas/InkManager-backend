import { Request, Response, NextFunction } from "express";
import { AppointmentService } from "../services/appointment.service.js";
import { ErrorHandler } from "../middlewares/errorHandler.middleware.js";

const appointmentService = new AppointmentService();

export class AppointmentController {

    //CRUD
    //Create
    async createAppointment( req: Request, res: Response, next: NextFunction ){
        try{
            const appointment = await appointmentService.create( req.body );
            res.status(201).json({ status: "success", data: { appointment }});
        } catch( error ) {
            next( error );
        } 
    }

    //READ
    async getAll( _req: Request, res: Response, next: NextFunction ){
        try {
            const appointments = await appointmentService.findAllAppointments();
            return res.json({ status: "success", data: { appointments }});
        } catch( error ){
            next( error );
        }
    }

    async getOne( req: Request, res: Response, next: NextFunction ) {
        try {
            const { id } = req.params;
            if( !id ) {
                return res.status(400).json({ status: "error", message: "Invalid ID"});
            }
            const appointment = await appointmentService.findById( id )

            if( !appointment ) {
                return res.status(404).json({ message: ErrorHandler.badRequest });
            }
            return res.json({ status: "success", data: { appointment }});
        } catch( error ) {
            next( error );
        }
    }

    async getByArtist( req: Request, res: Response, next: NextFunction ) {
        try {
            const { artistId } = req.params;
            if( !artistId || typeof artistId !== "string") {
                return res.status(400).json({ status: "error", message: "Invalid ID"});
            }
            const appointments = await appointmentService.findByArtistId ( artistId );
            if( !appointments || appointments.length === 0 ) {
                return res.status(404).json({ message: ErrorHandler.badRequest });
            }

            return res.json({ status: "success", data: { appointments }});
        } catch( error ){
            next( error );
        }
    }

    async getByCompany( req: Request, res: Response, next: NextFunction ){
        try {
            const { companyId } = req.params;
            if( !companyId || typeof companyId !== "string") {
                return res.status(400).json({ status: "error", message: "Invalid company Id"});
            }
            const appointments = await appointmentService.findByCompanyId( companyId );
            if( !appointments || appointments.length === 0) {
                return res.status(404).json({ message: ErrorHandler.badRequest });
            }

            return res.json({ status: "success", data: { appointments }});
        } catch( error ){
            next( error );
        }
    }

    //UPDATE
    async updateAppointment( req: Request, res: Response, next: NextFunction ){
        try{
            const { id } = req.params;
            if( !id || typeof id !== "string") {
                return res.status(400).json({ status: "error", message: "Invalid ID"});
            }

            const appointmentUpdated = await appointmentService.updateAppointment( id, req.body );
            return res.json({ status: "success", data: { appointmentUpdated }})
        } catch ( error ){
            next( error );
        }
    }

    //DELETE
    async deleteAppointment( req: Request, res: Response, next: NextFunction ){
        try{
            const { id } = req.params;
            if( !id || typeof id !== "string" ){
                return res.status(400).json({ status: "error", message: "Invalid ID"});
            }
            await appointmentService.deleteAppointment( id );
            return res.status(204).send();
        } catch( error ){
            next( error );
        }
    }
}