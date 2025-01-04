import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "invalid-email" }),
  password: z.string().min(8, "at-least-8"),
});

export const LoginResponseSchema = z.object({
  token: z.string().min(9),
  id: z.number(),
  roleId: z.number(),
});

const AuthenticationContextSchema = z.object({
  isAuthenticated: z.boolean(),
  role: z.string().or(z.null()),
});

export type TLogin = z.infer<typeof LoginSchema>;
export type TLoginResponse = z.infer<typeof LoginResponseSchema>;
export type TAuthenticationContext = z.infer<
  typeof AuthenticationContextSchema
>;
