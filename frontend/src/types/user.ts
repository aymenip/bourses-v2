import { z } from "zod";

export const UserSchema = z.object({
  id: z.number(),
  firstname: z.string(),
  lastname: z.string(),
  dob: z.date(),
  matrialStatus: z.enum(["أعزب", "متزوج"]),
  email: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  roleId: z.number(),
  positionId: z.number(),
  is_active: z.boolean().optional(),
  password_changed: z.boolean().optional(),
  google_scholar: z.string().optional(),
  research_gate: z.string().optional(),
});

export const UpdateUserSchema = UserSchema.partial()
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    roleId: true,
  })
  .extend({
    new_password: z.string().optional(),
  });

export type TUser = z.infer<typeof UserSchema>;
export type TUpdateUser = z.infer<typeof UpdateUserSchema>;
