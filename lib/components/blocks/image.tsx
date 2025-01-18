import { z } from "zod";
import { BaseStyleSchema } from "./base";

export const ImageSchema = z.object({
  id: z.string(),
  type: z.literal("image"),
  src: z.string().url(),
  alt: z.string(),
  style: BaseStyleSchema.extend({
    maxWidth: z.string().optional(),
  }),
});
