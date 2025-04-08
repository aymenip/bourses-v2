import { z } from "zod";

export const SubmissionSchema = z.object({
  id: z.number(),
  formId: z.number(),
  userId: z.number(),
  status: z.enum(["draft", "submitted"]),
  data: z.record(z.string(), z.any()), // better than z.string().transform(...) for working with raw objects
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CreateSubmissionSchema = SubmissionSchema.omit({
  id: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
});

const DashboardSubmissionSchema = SubmissionSchema.omit({
  data: true,
});

export type TSubmission = z.infer<typeof SubmissionSchema>;
export type TCreateSubmission = z.infer<typeof CreateSubmissionSchema>;
export type TDashboardSubmission = z.infer<typeof DashboardSubmissionSchema>;
