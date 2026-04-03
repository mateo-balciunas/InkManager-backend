import z from "zod";

export const createStockItemSchema = z.object({
    id: z.uuid("id does not match UUID format"),
    name: z.string(),
    description: z.string().optional(),
    brand: z.string().optional(),
    price: z.number(),
    quantity: z.number(),
    companyId: z.uuid("companyId does not match UUID format").optional(),
    artistId: z.uuid("artistId does not match UUID format").optional(),
});

export const updateStockItemSchema = createStockItemSchema.partial();

export type CreateStockItemSchema = z.infer<typeof createStockItemSchema>;
export type UpdateStockItemSchema = z.infer<typeof updateStockItemSchema>;