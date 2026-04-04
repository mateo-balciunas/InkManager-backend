import { Request, Response, NextFunction } from "express";
import { CompanyService } from "../services/company.service.js";

const companyService = new CompanyService();

export class CompanyController {
    //CRUD
    //Create
    async createCompany( req: Request, res: Response, next: NextFunction ){
        try{
            const company = await companyService.create( req.body );
            return res.status(201).json({ status: "success", data: { company }});
        } catch( error ){
            next( error );
        }
    }

    //Read
    //Get all companies and get company by id
    async getAllCompanies( req: Request, res: Response, next: NextFunction ){
        try{
            const companies = await companyService.findAllCompanies();
            return res.json({ status: "success", data: { companies }});
        } catch( error ){
            next( error );
        }
    }

    async getCompanyById( req: Request, res: Response, next: NextFunction ){
        try{
            const { id } = req.params;
            if( !id || typeof id !== "string"){
                return res.status(400).json({ status: "error", message: "Invalid Id"});
            }
            const company = await companyService.findCompanyById( id );
            if( !company ){
                return res.status(404).json({ status: "error", message: "Company not found"});
            }

            return res.json({ status: "success", data: { company }});
        } catch( error ){
            next( error );
        }
    }

    //Update
    async updateCompany( req: Request, res: Response, next: NextFunction ){
        try{
            const { id } = req.params;
            if( !id || typeof id !== "string"){
                return res.status(400).json({ status: "error", message: "Invalid Id"});
            }
            const companyUpdated = await companyService.updateCompany( id, req.body );
            return res.json({ status: "success", data: { companyUpdated }});
        } catch( error ){
            next( error);
        }
    }

    //Delete company
    async deleteCompany( req: Request, res: Response, next: NextFunction ){
        try{ 
            const { id } = req.params;
            if( !id || typeof id !== "string"){
                return res.status(400).json({ status: "error", message: "Invalid ID"});
            }
            await companyService.deleteCompany( id );
            return res.status(204).send();
        } catch( error ){
            next( error );
        }
    }
}