import prisma from "../config/db.js";
import { CreateCompanySchema, UpdateCompanySchema } from "../schemas/company.schema.js";

const companySelect = {
    id: true,
    name: true,
    address: true,
    contact_info: true
}

export class Company {

    //Create company
    async create( data: CreateCompanySchema ) {
        return await prisma.company.create({
            data: {
                name: data.name,
                address: data.address,
                contact_info: data.contact_info
            },
            select: companySelect
        });
    }

    //Find all companies, find by id
    async findAllCompanies() {
        return await prisma.company.findMany({
            select: companySelect
        });
    }

    async findCompanyById( id: string ) {
        return await prisma.company.findUnique({
            where: { id },
            select: companySelect
        });
    }

    //Update company
    async updateCompany( id: string, data: UpdateCompanySchema ){
        const updateData: any = {};

        if( data.name ) updateData.name = data.name;
        if( data.address ) updateData.address = data.address;
        if( data.contact_info ) updateData.contact_info = data.contact_info;

        return await prisma.company.update({
            where: { id },
            data: updateData,
            select: companySelect
        });
    }

    //Delete company
    async deleteCompany( id: string ){
        return await prisma.company.delete({
            where: { id },
            select: companySelect
        });
    }
}