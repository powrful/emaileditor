import { nanoid } from "nanoid";
import { z } from "zod";
import { BaseStyleSchema } from "./base";

export const ButtonSchema = z.object({
  id: z.string().default(nanoid()),
  type: z.literal("button").default("button"),
  text: z.string().default("Button"),
  href: z.string().url().default("https://www.example.com"),
  style: BaseStyleSchema.extend({
    color: z.string().optional().default("white"),
    backgroundColor: z.string().optional().default("black"),
  }),
});

export type ButtonType = z.infer<typeof ButtonSchema>;
