import { z } from "zod";
import { BaseStyleSchema } from "./base";

export const TextSchema = z.object({
  id: z.string(),
  type: z.literal("text"),
  content: z.string(),
  style: BaseStyleSchema.extend({
    fontSize: z.string().optional(),
    color: z.string().optional(),
    lineHeight: z.string().optional(),
  }),
});

export type TextType = z.infer<typeof TextSchema>;
