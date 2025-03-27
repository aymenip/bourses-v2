import { z } from "zod";

export const FormSchema = z.object({
  id: z.number(),
  title: z.string(),
  creator: z.number(),
});

export const CreateFormSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1),
});

export const FormBlockSchema = z.object({
  id: z.number(),
  label: z.string().min(1),
  formId: z.number(),
});

export const CreateFormBlockSchema = z.object({
  label: z.string().min(1),
  formId: z.number(),
});

export const TypedFieldSchema = z.object({
  id: z.number(),
  type: z.enum(["text", "date", "number", "url", "email"], {
    required_error: "required-input",
  }),
  points: z.number({ required_error: "required-input" }).min(0).default(0),
  label: z.string({ required_error: "required-input" }).min(1),
  blockId: z.number(),
});

export const SourceableFieldSchema = z.object({
  id: z.number(),
  type: z.enum(["certificate", "book", "article", "conference", "thesis"], {
    required_error: "required-input",
  }),
  points: z.number({ required_error: "required-input" }).min(0).default(0),
  label: z.string({ required_error: "required-input" }).min(1),
  blockId: z.number(),
});

export const FullFormBlockSchema = z.object({
  id: z.number(),
  label: z.string(),
  formId: z.number(),
  fields: z.array(z.union([TypedFieldSchema, SourceableFieldSchema])),
});

export const FullFormSchema = z.object({
  id: z.number(),
  title: z.string(),
  creator: z.number(),
  blocks: z.array(FullFormBlockSchema).optional(),
});

export type TForm = z.infer<typeof FormSchema>;
export type TCreateForm = z.infer<typeof CreateFormSchema>;
export type TFormBlock = z.infer<typeof FormBlockSchema>;
export type TCreateFormBlock = z.infer<typeof CreateFormBlockSchema>;
export type TTypedField = z.infer<typeof TypedFieldSchema>;
export type TSourceableField = z.infer<typeof SourceableFieldSchema>;
export type TFullFormBlock = z.infer<typeof FullFormBlockSchema>;
export type TFullForm = z.infer<typeof FullFormSchema>;
export type TField = TTypedField | TSourceableField;
