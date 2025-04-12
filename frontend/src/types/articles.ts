import { z } from "zod";

export const ArticleSchema = z.object({
  id: z.number(),
  documentId: z.number({ required_error: "required-input" }),
  title: z.string({ required_error: "required-input" }).min(1),
  authors: z.string({ required_error: "required-input" }).min(1),
  journal: z.string({ required_error: "required-input" }),
  volume: z.string({ required_error: "required-input" }).optional(),
  issue: z.string({ required_error: "required-input" }).optional(),
  pages: z.string({ required_error: "required-input" }).optional(),
  publicationDate: z.string().optional(),
  doi: z.string().optional(),
  classification: z.enum(["A", "B", "C", "D", "E", "F"]),
  userId: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CreateArticleSchema = ArticleSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  userId: true,
});

export const UpdateArticleSchema = CreateArticleSchema.partial().extend({
  id: z.number(),
});

export type TArticle = z.infer<typeof ArticleSchema>;
export type TCreateArticle = z.infer<typeof CreateArticleSchema>;
export type TUpdateArticle = z.infer<typeof UpdateArticleSchema>;
