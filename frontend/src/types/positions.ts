import { z } from "zod";

export const PositionSchema = z.object({
  id: z.number(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type TPosition = z.infer<typeof PositionSchema>;
