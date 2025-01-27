import { Heading as Component } from "@react-email/heading";
import { z } from "zod";

export const HeadingSchema = z.object({
  as: z.enum(["h1", "h2", "h3", "h4", "h5", "h6"]).optional().default("h1"),
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
type HeadingProps = HeadingSchemaType & { children: React.ReactNode };

export const Heading = ({ as, style, children }: HeadingProps) => {
  return (
    <Component as={as} style={style}>
      {children}
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
  as: "h1",
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
