import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "invalid-email" }),
  password: z.string().min(8, "at-least-8"),
});

export const LoginResponseSchema = z.object({
  id: z.number(),
  token: z.string().min(9),
  roleId: z.number(),
  positionId: z.number(),
});

const AuthenticationContextSchema = z.object({
  token: z.string().or(z.null()),
  isAuthenticated: z.boolean(),
  role: z.string().or(z.null()),
  position: z.string().or(z.null()),
});

export type TLogin = z.infer<typeof LoginSchema>;
export type TLoginResponse = z.infer<typeof LoginResponseSchema>;
export type TAuthenticationContext = z.infer<
  typeof AuthenticationContextSchema
>;
