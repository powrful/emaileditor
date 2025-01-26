import { Font as Component, type FontProps } from "@react-email/font";
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

export type FontType = z.infer<typeof FontSchema>;

export const Font = ({ ...props }: FontProps) => {
  return <Component {...props} />;
};

export const FontEditor = ({ props }: { props: FontType }) => {
  return (
    <div>
      <p>Font Editor</p>
      <p>
        <pre>{JSON.stringify(props, null, 2)}</pre>
      </p>
    </div>
  );
};

Font.defaultProps = FontSchema.parse({
  fontFamily: "Inter",
  webFont: {
    url: "https://fonts.googleapis.com/css2?family=Inter:wght@400&display=swap",
    format: "woff2",
  },
  fontWeight: "400",
  fontStyle: "normal",
});
