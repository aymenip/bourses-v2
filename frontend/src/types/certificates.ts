import { z } from "zod";

export const CertificateSchema = z.object({
  id: z.number(),
  documentId: z.number({ required_error: "required-input" }),
  title: z.string({ required_error: "required-input" }).min(1),
  issuer: z.string({ required_error: "required-input" }).min(1),
  issueDate: z.string({ required_error: "required-input" }),
  expirationDate: z.string({ required_error: "required-input" }).optional(),
  certificateId: z.string({ required_error: "required-input" }).optional(),
  userId: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CreateCertificateSchema = CertificateSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  userId: true,
});

export const UpdateCertificateSchema = CreateCertificateSchema.partial().extend(
  {
    id: z.number(),
  }
);

export type TCertificate = z.infer<typeof CertificateSchema>;
export type TCreateCertificate = z.infer<typeof CreateCertificateSchema>;
export type TUpdateCertificate = z.infer<typeof UpdateCertificateSchema>;
