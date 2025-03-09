import { z } from "zod";

export const FormSchema = z.object({
  id: z.number(),
  title: z.string(),
  creator: z.number(),
});

export const CreateFormSchema = z.object({
  title: z.string(),
  id: z.number().optional(),
});

export const FieldSchema = z.object({
  label: z.string(),
  type: z.string(),
  source: z.string().optional(),
});

export const FormElementSchema = z.object({
  title: z.string(),
  subelements: z.array(FieldSchema),
});

export type TForm = z.infer<typeof FormSchema>;
export type TCreateForm = z.infer<typeof CreateFormSchema>;
export type TField = z.infer<typeof FieldSchema>;
export type TFormElement = z.infer<typeof FormElementSchema>;
