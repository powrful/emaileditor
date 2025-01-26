import { z } from "zod";

export const FontSchema = z.object({
  fontFamily: z.string().default("Inter"),
  webFont: z.object({
    url: z
      .string()
      .url()
      .default(
        "https://fonts.googleapis.com/css2?family=Inter:wght@400&display=swap",
      ),
    format: z.enum(["woff2", "woff", "truetype", "opentype"]).default("woff2"),
  }),
  fontWeight: z
    .enum(["100", "200", "300", "400", "500", "600", "700", "800", "900"])
    .default("400"),
  fontStyle: z.enum(["normal", "italic"]).default("normal"),
});

export const ColorSchema = z.object({
  text: z.string().default("#000000"),
  background: z.string().default("#ffffff"),
  link: z.string().default("#0000FF"),
});

export const HeadingSizeSchema = z.object({
  h1: z
    .number()
    .default(24)
    .transform((value) => `${value}px`),
  h2: z
    .number()
    .default(20)
    .transform((value) => `${value}px`),
  h3: z
    .number()
    .default(18)
    .transform((value) => `${value}px`),
  h4: z
    .number()
    .default(16)
    .transform((value) => `${value}px`),
  h5: z
    .number()
    .default(14)
    .transform((value) => `${value}px`),
  h6: z
    .number()
    .default(12)
    .transform((value) => `${value}px`),
});

export const GlobalSchema = z.object({
  font: FontSchema,
  colors: ColorSchema,
  headings: HeadingSizeSchema,
});

export type GlobalSchemaType = z.infer<typeof GlobalSchema>;

export const GlobalsEditor = ({ font, colors, headings }: GlobalSchemaType) => {
  return (
    <div>
      <p>Globals editor</p>
      <p>
        <pre>Font: {JSON.stringify(font, null, 2)}</pre>
      </p>
      <p>
        <pre>Colors: {JSON.stringify(colors, null, 2)}</pre>
      </p>
      <p>
        <pre>Headings: {JSON.stringify(headings, null, 2)}</pre>
      </p>
    </div>
  );
};
