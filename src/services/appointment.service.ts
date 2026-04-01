import prisma from "../config/db.js";
import { Request, Response, NextFunction } from "express";
import { CreateAppointmentSchema, UpdateAppointmentSchema } from "../schemas/appointment.schema.js";
import { dmmfToRuntimeDataModel } from "@prisma/client/runtime/library";

const appointmentSelect = {
    id: true,
    scheduleAt: true,
    duration: true,
    status: true,
    price: true,
    artistId: true,
    clientId: true,
    companyId: true
}
export class Appointment {

    //CREATE APPOINTMENT
    async create(data: CreateAppointmentSchema) {
        return await prisma.appointment.create({
            data: {
                ...data
            },
            select: appointmentSelect
        });
    }

    //FIND ALL APPOINTMENTS
    async findAllAppointments() {
        return await prisma.appointment.findMany({
            select: appointmentSelect
        });
    }

    //FIND APPOINTMENTS BY DIFFERENT IDS(Id, artistId, companyId)
    async findById( id: string ){
        return await prisma.appointment.findUnique({
            where: { id },
            select: appointmentSelect
        });
    }

    async findByArtistId( artistId: string ) {
        await prisma.appointment.findMany({
            where: { artistId },
            select: appointmentSelect
        });
    }

    async findByCompanyId( companyId: string ) {
        await prisma.appointment.findMany({
            where: { companyId },
            select: appointmentSelect
        });
    }

    async deleteAppointment( id: string ) {
        return await prisma.appointment.delete({
            where: { id },
            select: appointmentSelect
        })
    }

    async updateAppointment( id: string, data: UpdateAppointmentSchema) {
        const updateData: any = { ...data };
        
        if( data.scheduleAt ){
            updateData.scheduleAt = new Date(data.scheduleAt);
        }

        return await prisma.appointment.update({
            where: { id },
            data: updateData,
            select: {
                id: true,
                scheduleAt: true,
                duration: true,
                status: true,
                price: true
            }
        });


    }

}