import { z } from "zod";

export const GlobalSchema = z.object({
  fontFamily: z.string().default("Arial, Helvetica, sans-serif"),
});

export type GlobalSchemaType = z.infer<typeof GlobalSchema>;
