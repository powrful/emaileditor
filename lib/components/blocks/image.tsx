import { nanoid } from "nanoid";
import { z } from "zod";
import { BaseStyleSchema } from "./base";

export const ImageSchema = z.object({
  id: z.string().default(nanoid()),
  type: z.literal("image").default("image"),
  src: z.string().url().default("https://picsum.photos/500"),
  alt: z.string().default("Image"),
  style: BaseStyleSchema.extend({
    maxWidth: z.string().optional().default("100%"),
  }),
});

export type ImageType = z.infer<typeof ImageSchema>;
