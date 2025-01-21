import { nanoid } from "nanoid";
import { z } from "zod";
import { BaseStyleSchema } from "./base";

export const HeadingSchema = z.object({
  id: z.string().default(nanoid()),
  type: z.literal("heading").default("heading"),
  text: z.string().default("Heading"),
  level: z.enum(["h1", "h2", "h3", "h4", "h5", "h6"]).default("h1"),
  style: BaseStyleSchema.extend({
    fontSize: z.string().optional().default("24px"),
    color: z.string().optional().default("black"),
  }),
});

export type HeadingType = z.infer<typeof HeadingSchema>;
