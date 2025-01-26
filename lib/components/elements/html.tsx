import { Html as Component } from "@react-email/html";
import { z } from "zod";

export const HtmlSchema = z.object({
  lang: z.string().optional().default("en"),
  dir: z.enum(["ltr", "rtl"]).optional().default("ltr"),
});

export type HtmlSchemaType = z.infer<typeof HtmlSchema>;
type HtmlProps = HtmlSchemaType & { children: React.ReactNode };

export const Html = ({ lang, dir, children }: HtmlProps) => {
  return (
    <Component lang={lang} dir={dir}>
      {children}
    </Component>
  );
};

export const HtmlEditor = ({ ...props }: HtmlSchemaType) => {
  return (
    <div>
      <p>HTML Editor</p>
      <p>
        <pre>{JSON.stringify(props, null, 2)}</pre>
      </p>
    </div>
  );
};

Html.defaultProps = HtmlSchema.parse({});
