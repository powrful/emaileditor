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
  padding: StyleSchema.Padding.optional().default({
    paddingTop: "5px",
    paddingRight: "5px",
    paddingBottom: "5px",
    paddingLeft: "5px",
  }),
  backgroundColor: z.string().optional().default("white"),
  border: StyleSchema.Border.optional().default({
    borderWidth: "1px",
    borderColor: "black",
    borderRadius: "0",
  }),
  width: z.string().optional().default("100%"),
  align: z.enum(["left", "center", "right"]).optional().default("left"),
});

export type BaseStyle = z.infer<typeof BaseStyleSchema>;
