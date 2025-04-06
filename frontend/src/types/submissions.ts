import { z } from "zod";

export const SubmissionSchema = z.object({
  id: z.number(),
  formId: z.number(),
  userId: z.number(),
  status: z.enum(["draft", "submitted"]),
  data: z.string().transform((data) => JSON.parse(data)),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CreateSubmissionSchema = SubmissionSchema.omit({
  id: true,
  userId: true,
  formId: true,
  createdAt: true,
  updatedAt: true,
});

const DashboardSubmissionSchema = SubmissionSchema.omit({
  data: true,
});

export type TSubmission = z.infer<typeof SubmissionSchema>;
export type TCreateSubmission = z.infer<typeof CreateSubmissionSchema>;
export type TDashboardSubmission = z.infer<typeof DashboardSubmissionSchema>;
