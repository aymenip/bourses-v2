import { z } from "zod";

export const ConferenceSchema = z.object({
  id: z.number(),
  documentId: z.number({ required_error: "required-input" }),
  title: z.string({ required_error: "required-input" }).min(1),
  conferenceName: z.string({ required_error: "required-input" }).min(1),
  location: z.string({ required_error: "required-input" }).min(1),
  date: z.string().optional(),
  classification: z.enum(["A", "B", "C", "D", "E", "F"]),
  userId: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CreateConferenceSchema = ConferenceSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  userId: true,
});


export const UpdateConferenceSchema = CreateConferenceSchema.partial().extend({
  id: z.number(),
});

export type TConference = z.infer<typeof ConferenceSchema>;
export type TCreateConference = z.infer<typeof CreateConferenceSchema>;
export type TUpdateConference = z.infer<typeof UpdateConferenceSchema>;
