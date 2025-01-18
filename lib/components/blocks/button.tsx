import { z } from "zod";
import { BaseStyleSchema } from "./base";

export const ButtonSchema = z.object({
  id: z.string(),
  type: z.literal("button"),
  text: z.string(),
  href: z.string().url(),
  style: BaseStyleSchema.extend({
    color: z.string().optional(),
    backgroundColor: z.string().optional(),
  }),
});
