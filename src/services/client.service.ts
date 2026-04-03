import prisma from "../config/db.js";
import { CreateClientSchema, UpdateClientSchema } from "../schemas/client.schema.js";

const clientSelect = {
    id: true,
    name: true,
    lastName: true,
    userId: true,
    phoneNumber: true,
    medicalNotes: true
}

export class Client {

    //Create client
    async create( data: CreateClientSchema ) {
        return await prisma.client.create({
            data: {
                name: data.name,
                lastName: data.lastName,
                userId: data.userId,
                phoneNumber: data.phoneNumber,
                medicalNotes: data.medicalNotes
            },
            select: clientSelect
        });
    }

    //Find clients by id, userId
    async findAllClients() {
        return await prisma.client.findMany({
            select: clientSelect
        });
    }

    async findClientById( id: string ) {
        return await prisma.client.findUnique({
            where: { id },
            select: clientSelect
        });
    }

    async findClientByUserId ( userId: string ) {
        return await prisma.client.findUnique({
            where: { userId },
            select: clientSelect
        });
    }

    //Update Client
    async updateClient( id: string, data: UpdateClientSchema) {
        const updateData: any = {};

        if( data.name ) updateData.name = data.name;
        if( data.lastName ) updateData.lastName = data.lastName;
        if( data.phoneNumber !== undefined ){
            updateData.phoneNumber = data.phoneNumber ?? null;
        }
        if( data.medicalNotes !== undefined ) {
            updateData.medicalNotes = data.medicalNotes ?? null;
        }
        return await prisma.client.update({
            where: { id },
            data: updateData,
            select: clientSelect
        });
    }

    //Delete client
    async deleteClient ( id: string ) {
        return await prisma.client.delete({
            where: { id },
            select: clientSelect
        })
    }
}