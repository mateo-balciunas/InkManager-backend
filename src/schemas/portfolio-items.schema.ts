import z from "zod";

export const createPortfolioItemSchema = z.object({
    portfolioId: z.uuid("portfolioId does not match UUID format"),
    imageUrl: z.url("imageUrl does not match URL format"),
    description: z.string().optional(),
});

export const updatePortfolioItemSchema = createPortfolioItemSchema.partial();

export type CreatePortfolioItemSchema = z.infer<typeof createPortfolioItemSchema>;
export type UpdatePortfolioItemSchema = z.infer<typeof updatePortfolioItemSchema>;