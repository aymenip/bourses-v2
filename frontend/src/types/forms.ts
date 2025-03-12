import { z } from "zod";

export const FormSchema = z.object({
  id: z.number(),
  title: z.string(),
  creator: z.number(),
});

export const CreateFormSchema = z.object({
  id: z.number().optional(),
  title: z.string(),
});

export const FormBlockSchema = z.object({
  id: z.number(),
  label: z.string(),
});

export const CreateFormBlockSchema = z.object({
  label: z.string(),
  formId: z.number(),
});

export const FieldSchema = z.object({
  label: z.string(),
  type: z.string(),
  source: z.string().optional(),
});

export const FullFormBlockSchema = z.object({
  label: z.string(),
  subfields: z.array(FieldSchema).optional(),
});

export type TForm = z.infer<typeof FormSchema>;
export type TCreateForm = z.infer<typeof CreateFormSchema>;
export type TFormBlock = z.infer<typeof FormBlockSchema>;
export type TCreateFormBlock = z.infer<typeof CreateFormBlockSchema>;
export type TField = z.infer<typeof FieldSchema>;
export type TFullFormBlock = z.infer<typeof FullFormBlockSchema>;
