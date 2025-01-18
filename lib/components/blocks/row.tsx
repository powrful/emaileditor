import { z } from "zod";
import { BaseStyleSchema } from "./base";
import { ColumnSchema } from "./column";

export const RowSchema = z.object({
  id: z.string(),
  type: z.literal("row"),
  row: z.array(ColumnSchema),
  style: BaseStyleSchema,
});
