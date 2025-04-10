import { z } from "zod";

export const SubmissionSchema = z.object({
  id: z.number(),
  formId: z.number(),
  userId: z.number(),
  status: z.enum(["draft", "submitted"]),
  formTitle: z.string(),
  data: z.record(z.string(), z.any()), // better than z.string().transform(...) for working with raw objects
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CreateSubmissionSchema = SubmissionSchema.omit({
  id: true,
  userId: true,
  formTitle: true,
  createdAt: true,
  updatedAt: true,
});

// For update (make all fields optional except id + formId)
export const UpdateSubmissionSchema = CreateSubmissionSchema.partial().extend({
  id: z.number(),
  formId: z.number(),
});

const DashboardSubmissionSchema = SubmissionSchema.omit({
  data: true,
});

const SubmissionsWithUserInfoSchema = z.object({
  id: z.number(),
  formId: z.number(),
  userId: z.number(),
  status: z.enum(["draft", "submitted"]),
  firstname: z.string(),
  lastname: z.string(),
  position: z.string(),
  updatedAt: z.date(),
  createdAt: z.date(),
})



export type TSubmission = z.infer<typeof SubmissionSchema>;
export type TSubmissionsWithUserInfo = z.infer<typeof SubmissionsWithUserInfoSchema>;
export type TCreateSubmission = z.infer<typeof CreateSubmissionSchema>;
export type TUpdateSubmission = z.infer<typeof UpdateSubmissionSchema>;
export type TDashboardSubmission = z.infer<typeof DashboardSubmissionSchema>;
