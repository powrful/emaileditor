import { z } from "zod";
import { ElementsSchema } from "./elements";

export type ColumnType = {
  id: string;
  type: "column";
  width: string;
  elements: Array<z.infer<typeof ElementsSchema>>;
};

export const ColumnSchema: z.ZodType<ColumnType> = z.object({
  id: z.string(),
  type: z.literal("column"),
  width: z.string(),
  elements: z.lazy(() => ElementsSchema.array()),
});
