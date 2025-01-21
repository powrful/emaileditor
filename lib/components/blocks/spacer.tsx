import { nanoid } from "nanoid";
import { z } from "zod";

export const SpacerSchema = z.object({
  id: z.string().default(nanoid()),
  type: z.literal("spacer").default("spacer"),
  height: z.string().default("100px"),
});

export type SpacerType = z.infer<typeof SpacerSchema>;
