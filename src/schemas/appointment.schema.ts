import z from "zod";
import { AppointmentStatus } from "@prisma/client";

export const createAppointmentSchema = z.object({
    id: z.uuid({ error: 'ID does not match valid UUID format'}),
    scheduleAt: z.iso.datetime(),
    duration: z.int(),
    status: z.enum(AppointmentStatus).default("PENDING"),
    price: z.number(),
    artistId: z.uuid({ error: 'artistId does not match valid UUID format'}),
    clientId: z.uuid({ error: 'clientId does not match valid UUID format'}),
    companyId: z.uuid({ error: 'companyId does not match valid UUID format'}),
});

export const updateAppointmentSchema = createAppointmentSchema.partial();

export type CreateAppointmentSchema = z.infer<typeof createAppointmentSchema>;
export type UpdateAppointmentSchema = z.infer<typeof updateAppointmentSchema>;