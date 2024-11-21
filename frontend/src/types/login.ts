
import { z } from 'zod';

export const LoginSchema = z.object({
    email: z.string().email({ "message": "invalid-email" }),
    password: z.string().min(8, "at-least-8"),
});


export type TLogin = z.infer<typeof LoginSchema>;


