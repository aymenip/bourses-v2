import { z } from "zod";

export const RoleSchema = z.object({
    id: z.number(),
    code: z.string(),
    title: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
});


export type TRole = z.infer<typeof RoleSchema>;