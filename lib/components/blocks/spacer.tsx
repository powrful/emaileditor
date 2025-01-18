import { z } from "zod";

export const SpacerSchema = z.object({
  id: z.string(),
  type: z.literal("spacer"),
  height: z.string(),
});
