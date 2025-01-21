import { nanoid } from "nanoid";
import { z } from "zod";
import { BaseStyleSchema } from "./base";

export const DividerSchema = z.object({
  id: z.string().default(nanoid()),
  type: z.literal("divider").default("divider"),
  style: BaseStyleSchema.extend({
    color: z.string().optional().default("black"),
    thickness: z.string().optional().default("1px"),
  }),
});

export type DividerType = z.infer<typeof DividerSchema>;
