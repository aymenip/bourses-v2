import { z } from "zod";

export const BookSchema = z.object({
  id: z.number(),
  documentId: z.number({ required_error: "required-input" }),
  title: z.string({ required_error: "required-input" }).min(1),
  author: z.string({ required_error: "required-input" }).min(1),
  year: z.date({ required_error: "required-input" }),
  isbn: z
    .string({ required_error: "required-input" })
    .min(20, { message: "isbn-error" })
    .max(20, { message: "isbn-error" }),
  publisher: z.string({ required_error: "required-input" }).min(1),
  userId: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CreateBookSchema = BookSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  userId: true,
});

export type TBook = z.infer<typeof BookSchema>;
export type TCreateBook = z.infer<typeof CreateBookSchema>;
