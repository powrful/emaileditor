import { z } from "zod";
import { BaseStyleSchema } from "./base";
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

// Section schema
const SectionSchema = z.object({
  id: z.string(),
  style: BaseStyleSchema,
  elements: ElementsSchema.array(),
});

// Update the TemplateSchema
const TemplateSchema = z.object({
  container: z.object({
    style: BaseStyleSchema,
    sections: SectionSchema.array().optional(),
    elements: ElementsSchema.array().optional(),
  }),
});

export type TemplateType = z.infer<typeof TemplateSchema>;
