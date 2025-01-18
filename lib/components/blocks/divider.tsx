import { z } from "zod";
import { BaseStyleSchema } from "./base";

export const DividerSchema = z.object({
  id: z.string(),
  type: z.literal("divider"),
  style: BaseStyleSchema.extend({
    color: z.string().optional(),
    thickness: z.string().optional(),
  }),
});

export type DividerType = z.infer<typeof DividerSchema>;
