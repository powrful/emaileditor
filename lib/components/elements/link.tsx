import { Link as Component } from "@react-email/link";
import { z } from "zod";

export const LinkSchema = z.object({
  href: z.string(),
  style: z.object({
    textDecoration: z.enum(["none", "underline"]).optional().default("none"),
    fontWeight: z.enum(["normal", "bold"]).optional().default("normal"),
    color: z.string().optional().default("#155dfc"),
  }),
});

export type LinkSchemaType = z.infer<typeof LinkSchema>;

export const Link = ({ href, style }: LinkSchemaType) => {
  return <Component href={href} style={style} />;
};

export const LinkEditor = ({ ...props }: LinkSchemaType) => {
  return (
    <div>
      <p>Link Editor</p>
      <p>
        <pre>{JSON.stringify(props, null, 2)}</pre>
      </p>
    </div>
  );
};

Link.defaultProps = LinkSchema.parse({
  href: "https://www.example.com",
  style: {
    textDecoration: "underline",
    fontWeight: "bold",
    color: "#155dfc",
  },
});
