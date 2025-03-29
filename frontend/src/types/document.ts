import { z } from "zod";

export const DocumentSchema = z.object({
  id: z.number(),
  type: z.string(),
  path: z.string(),
  userId: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const UploadDocumentSchema = z.object({
  file: z.instanceof(File),
  type: z.string(),
});



export type TUploadDocument = z.infer<typeof UploadDocumentSchema>;
export type TDocument = z.infer<typeof DocumentSchema>;
