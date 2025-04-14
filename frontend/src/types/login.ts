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
  position: z.string(),
  is_active: z.boolean(),
  google_scholar: z.string().optional(),
  research_gate: z.string().optional(),
});

const AuthenticationContextSchema = z.object({
  token: z.string().or(z.null()),
  isAuthenticated: z.boolean(),
  role: z.string().or(z.null()),
  positionId: z.string().or(z.null()),
  position: z.string().or(z.null()),
  is_active: z.boolean().or(z.null()),
  google_scholar: z.string().or(z.null()).optional(),
  research_gate: z.string().or(z.null()).optional(),
});

export type TLogin = z.infer<typeof LoginSchema>;
export type TLoginResponse = z.infer<typeof LoginResponseSchema>;
export type TAuthenticationContext = z.infer<
  typeof AuthenticationContextSchema
>;
