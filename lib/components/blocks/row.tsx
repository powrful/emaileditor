import { nanoid } from "nanoid";
import { z } from "zod";
import { BaseStyleSchema } from "./base";
import { ColumnSchema } from "./column";

export const RowSchema = z.object({
  id: z.string().default(nanoid()),
  type: z.literal("row").default("row"),
  row: z.array(ColumnSchema),
  style: BaseStyleSchema,
});

export type RowType = z.infer<typeof RowSchema>;
