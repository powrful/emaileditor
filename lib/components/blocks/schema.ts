import { z } from "zod";

export const TextSchema = z.object({
  fontSize: z.string(),
  fontWeight: z.string(),
  color: z.string(),
  textAlign: z.string(),
  fontFamily: z.string(),
});

export const BorderSchema = z.object({
  borderWidth: z.string(),
  borderColor: z.string(),
  borderRadius: z.string(),
});

export const PaddingSchema = z.object({
  paddingTop: z.string(),
  paddingRight: z.string(),
  paddingBottom: z.string(),
  paddingLeft: z.string(),
});

export const BackgroundSchema = z.object({
  backgroundColor: z.string(),
});

export const ButtonSchema = z.object({
  backgroundColor: z.string(),
  color: z.string(),
  borderRadius: z.string(),
  border: z.string(),
});

export const HeaderSchema = z.object({
  type: z.enum(["h1", "h2", "h3", "h4", "h5", "h6"]),
  color: z.string(),
  fontFamily: z.string(),
  textAlign: z.string(),
});

export type BorderType = z.infer<typeof BorderSchema>;
export type BackgroundType = z.infer<typeof BackgroundSchema>;
export type ButtonType = z.infer<typeof ButtonSchema>;
export type TextType = z.infer<typeof TextSchema>;
export type HeaderType = z.infer<typeof HeaderSchema>;
export type PaddingType = z.infer<typeof PaddingSchema>;
