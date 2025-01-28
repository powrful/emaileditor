import { Heading as Component } from "@react-email/heading";
import { z } from "zod";

export const HeadingSchema = z.object({
  id: z.string(),
  as: z.enum(["h1", "h2", "h3", "h4", "h5", "h6"]).optional().default("h1"),
  text: z.string().optional().default("Heading"),
  style: z.object({
    color: z.string().optional().default("#000000"),
    paddingTop: z.string().optional().default("0px"),
    paddingBottom: z.string().optional().default("0px"),
    paddingLeft: z.string().optional().default("0px"),
    paddingRight: z.string().optional().default("0px"),
    marginTop: z.string().optional().default("0px"),
    marginBottom: z.string().optional().default("0px"),
    marginLeft: z.string().optional().default("0px"),
    marginRight: z.string().optional().default("0px"),
  }),
});

export type HeadingSchemaType = z.infer<typeof HeadingSchema>;
type HeadingProps = HeadingSchemaType;

export const Heading = ({ id, as, style, text }: HeadingProps) => {
  return (
    <Component
      data-element-type="heading"
      data-element-id={id}
      as={as}
      style={style}
    >
      {text}
    </Component>
  );
};

export const HeadingEditor = ({ ...props }: HeadingSchemaType) => {
  return (
    <div>
      <p>Heading Editor</p>
      <p>
        <pre>{JSON.stringify(props, null, 2)}</pre>
      </p>
    </div>
  );
};

Heading.defaultProps = HeadingSchema.parse({
  id: "heading-1",
  as: "h1",
  text: "Heading",
  style: {
    color: "#000000",
    paddingTop: "0px",
    paddingBottom: "0px",
    paddingLeft: "0px",
    paddingRight: "0px",
    marginTop: "0px",
    marginBottom: "0px",
    marginLeft: "0px",
    marginRight: "0px",
  },
});
