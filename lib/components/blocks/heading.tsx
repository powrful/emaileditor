import { z } from "zod";
import { BaseStyleSchema } from "./base";

export const HeadingSchema = z.object({
  id: z.string(),
  type: z.literal("heading"),
  text: z.string(),
  level: z.enum(["h1", "h2", "h3", "h4", "h5", "h6"]),
  style: BaseStyleSchema.extend({
    fontSize: z.string().optional(),
    color: z.string().optional(),
  }),
});
