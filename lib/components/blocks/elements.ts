import { z } from "zod";
import { ButtonSchema } from "./button";
import { DividerSchema } from "./divider";
import { HeadingSchema } from "./heading";
import { ImageSchema } from "./image";
import { RowSchema } from "./row";
import { SpacerSchema } from "./spacer";
import { TextSchema } from "./text";

// Element schema for all block types
export const ElementsSchema = z.discriminatedUnion("type", [
  HeadingSchema,
  TextSchema,
  ButtonSchema,
  ImageSchema,
  DividerSchema,
  SpacerSchema,
  RowSchema,
]);

export type ElementsType = z.infer<typeof ElementsSchema>;
