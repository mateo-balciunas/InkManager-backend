import z from "zod";

export const createClientSchema = z.object({
    id: z.uuid({ error: 'ID does not match valid UUID format'}),
    name: z.string(),
    lastName: z.string(),
    userId: z.uuid({ error: 'userId does not match valid UUID format'}),
    phoneNumber: z.string().optional(),
    medicalNotes: z.string().optional(),
    appointments: z.array(z.uuid()),
});

export const updateClientSchema = createClientSchema.partial();

export type CreateClientSchema = z.infer<typeof createClientSchema>;
export type UpdateClientSchema = z.infer<typeof updateClientSchema>;