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
});

export type TUser = z.infer<typeof UserSchema>;
