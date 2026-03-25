import z from "zod";

export const createArtistSchema = z.object({
    id: z.uuid({ error: 'ID does not match valid UUID format'}),
    userId: z.uuid({ error: 'userID does not match valid UUID format'}),
    companyId: z.uuid({ error: 'companyId does not match valid UUID format'}),
    bio: z.string().optional(),
    specialties: z.array(z.uuid()).min(1, 'An artist must hae at least one specialty.'),
    appointments: z.array(z.uuid()).min(0)

});

export type CreateArtistSchema = z.infer<typeof createArtistSchema>;