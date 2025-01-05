import { z } from "zod";

export const FormSchema = z.object({
  id: z.number(),
  title: z.string(),
  creator: z.number(),
});

export type TForm = z.infer<typeof FormSchema>;
