import z from "zod";

export const createPortfolioSchema = z.object({
    id: z.uuid({ error: 'ID does not match valid UUID format' }),
    artistId: z.uuid({ error: 'artistId does not match valid UUID format'}),
    items: z.array(z.uuid()).min(1, 'A portfolio must have at least one item.'),
});

export const updatePortfolioSchema = createPortfolioSchema.partial();

export type CreatePortfolioSchema = z.infer<typeof createPortfolioSchema>;
export type UpdatePortfolioSchema = z.infer<typeof updatePortfolioSchema>;