import prisma from "../config/db.js";
import { CreateAppointmentSchema, UpdateAppointmentSchema } from "../schemas/appointment.schema.js";

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
export class AppointmentService {

    //CREATE APPOINTMENT
    async create(data: CreateAppointmentSchema) {

        const start = new Date(data.scheduleAt);
        const end = new Date(start.getTime() + data.duration * 60000);

        const overlap = await prisma.appointment.findFirst({
            where: {
                artistId: data.artistId,
                status: {not: 'CANCELLED'},
                scheduleAt:{ lt: end },
            }
        });

        if (overlap) {
            throw new Error("El artista ya tiene una cita programada en este horario.");
        }
        return await prisma.appointment.create({
            data: {
                scheduleAt: new Date(data.scheduleAt),
                duration: data.duration,
                status: data.status,
                price: data.price,
                artistId: data.artistId,
                clientId: data.clientId,
                companyId: data.companyId
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
        return await prisma.appointment.findMany({
            where: { artistId },
            select: appointmentSelect
        });
    }

    async findByCompanyId( companyId: string ) {
        return await prisma.appointment.findMany({
            where: { companyId },
            select: appointmentSelect
        });
    }

    async findByClientId( clientId: string ) {
        return await prisma.appointment.findMany({
            where: { clientId },
            select: appointmentSelect
        });
    }

    //Update appointment
    async updateAppointment( id: string, data: UpdateAppointmentSchema) {
        const updateData: any = {};
        
        if( data.scheduleAt !== undefined ){
            updateData.scheduleAt = new Date(data.scheduleAt);
        }
        if( data.duration !== undefined ) updateData.duration = data.duration;
        if( data.status !== undefined ) updateData.status = data.status;
        if( data.price !== undefined ) updateData.price = data.price;

        return await prisma.appointment.update({
            where: { id },
            data: updateData,
            select: appointmentSelect
        });
    }

    //Delete appointment
    async deleteAppointment( id: string ) {
        return await prisma.appointment.delete({
            where: { id },
            select: appointmentSelect
        })
    }

}