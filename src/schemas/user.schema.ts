import z from "zod";
import { Role } from "@prisma/client";

export const createUserSchema = z.object({
    id: z.uuid({ error: 'ID does not match UUID format.'}),
    email: z.email({ pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, error: 'Invalid email, please insert valid email.' }),
    password: z.string().min(8, "Password must have at least 8 characters"),
    role: z.enum(Role).optional().default(Role.CLIENT),
});

export const updateUserSchema = createUserSchema.partial();

export type CreateUserSchema = z.infer<typeof createUserSchema>;
export type UpdateUserSchema = z.infer<typeof updateUserSchema>;