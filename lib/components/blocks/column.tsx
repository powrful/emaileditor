import { nanoid } from "nanoid";
import { z } from "zod";
import { ElementsSchema } from "./elements";

export const ColumnSchema: z.ZodType = z.object({
  id: z.string().default(nanoid()),
  type: z.literal("column").default("column"),
  width: z.string().default("100%"),
  elements: z.lazy(() => ElementsSchema).array(),
});

export type ColumnType = z.infer<typeof ColumnSchema>;
