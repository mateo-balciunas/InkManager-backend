import z from "zod";

export const createCompanySchema = z.object({
    id: z.uuid({ error: 'ID does not match UUID valid format.'}),
    name: z.string(),
    address: z.string().optional(),
    contact_info: z.string().optional(),
    artists: z.array(z.uuid()).min(1, 'A company must have at least 1 artist'),
    appointments: z.array(z.uuid()).default([]),
});

export type CreateCompanySchema = z.infer<typeof createCompanySchema>;