import { z } from "zod";

export const FormAccessSchema = z.object({
  id: z.number(),
  formId: z.number(),
  positionId: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CreateFormAccessSchema = z.object({
  formId: z.number(),
  positionId: z.number().array(),
});

export type TFormAccess = z.infer<typeof FormAccessSchema>;
export type TCreateFormAccess = z.infer<typeof CreateFormAccessSchema>;
