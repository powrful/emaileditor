import { z } from "zod";

// Style-related schemas
export const StyleSchema = {
  Border: z.object({
    borderWidth: z.string(),
    borderColor: z.string(),
    borderRadius: z.string(),
  }),

  Background: z.object({
    backgroundColor: z.string(),
  }),

  Padding: z.object({
    paddingTop: z.string(),
    paddingRight: z.string(),
    paddingBottom: z.string(),
    paddingLeft: z.string(),
  }),
} as const;

// Export types for the style schemas
export type BorderStyle = z.infer<typeof StyleSchema.Border>;
export type BackgroundStyle = z.infer<typeof StyleSchema.Background>;
export type PaddingStyle = z.infer<typeof StyleSchema.Padding>;

// Base style schema that can be extended by other components
export const BaseStyleSchema = z.object({
  padding: StyleSchema.Padding.optional(),
  backgroundColor: z.string().optional(),
  border: StyleSchema.Border.optional(),
  width: z.string().optional(),
  align: z.enum(["left", "center", "right"]).optional(),
});

export type BaseStyle = z.infer<typeof BaseStyleSchema>;
