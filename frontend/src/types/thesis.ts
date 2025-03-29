import { z } from "zod";

export const ThesisSchema = z.object({
  id: z.number(),
  documentId: z.number({ required_error: "required-input" }),
  title: z.string({ required_error: "required-input" }).min(1),
  isSupervisor: z.boolean(),
  year: z.date({ required_error: "required-input" }),
  type: z.enum(["phd", "master", "license"], {
    required_error: "required-input",
  }),
  userId: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CreateThesisSchema = ThesisSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  userId: true
});

export type TThesis = z.infer<typeof ThesisSchema>;
export type TCreateThesis = z.infer<typeof CreateThesisSchema>;
