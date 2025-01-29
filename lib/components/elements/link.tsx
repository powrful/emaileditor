import { Link as Component } from "@react-email/link";
import { z } from "zod";

export const LinkSchema = z.object({
  id: z.string(),
  title: z.string().optional().default("Untitled link"),
  href: z.string(),
  text: z.string().optional().default("Link"),
  style: z.object({
    textDecoration: z.enum(["none", "underline"]).optional().default("none"),
    fontWeight: z.enum(["normal", "bold"]).optional().default("normal"),
    color: z.string().optional().default("#155dfc"),
  }),
});

export type LinkSchemaType = z.infer<typeof LinkSchema>;

export const Link = ({ id, href, text, style }: LinkSchemaType) => {
  return (
    <Component
      data-element-type="link"
      data-element-id={id}
      href={href}
      style={style}
    >
      {text}
    </Component>
  );
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
  id: "link-1",
  href: "https://www.example.com",
  text: "Link",
  style: {
    textDecoration: "underline",
    fontWeight: "bold",
    color: "#155dfc",
  },
});
