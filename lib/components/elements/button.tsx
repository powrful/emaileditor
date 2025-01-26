import { Button as Component } from "@react-email/button";
import { z } from "zod";

export const ButtonSchema = z.object({
  text: z.string(),
  href: z.string().optional(),
  align: z.enum(["left", "center", "right"]).default("left"),
  full: z.boolean().default(false),
  style: z.object({
    backgroundColor: z.string().default("#000000"),
    borderRadius: z.string().default("0"),
    color: z.string().default("#ffffff"),
    paddingTop: z.string().default("5px"),
    paddingRight: z.string().default("5px"),
    paddingBottom: z.string().default("5px"),
    paddingLeft: z.string().default("5px"),
    fontSize: z.string().default("14px"),
    textAlign: z.enum(["left", "center", "right"]).default("center"),
  }),
});

export type ButtonSchemaType = z.infer<typeof ButtonSchema>;

export const Button = ({
  text,
  href,
  align,
  style,
  full,
}: ButtonSchemaType) => {
  return (
    <table
      width={full ? "100%" : "auto"}
      border={0}
      cellSpacing="0"
      cellPadding="0"
    >
      <tbody>
        <tr>
          <td align={align} width="100%">
            <Component
              href={href}
              style={{
                ...style,
                display: "block",
                textAlign: style.textAlign,
              }}
            >
              {text}
            </Component>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export const ButtonEditor = ({ ...props }: ButtonSchemaType) => {
  return (
    <div>
      <p>Button Editor</p>
      <p>
        <pre>{JSON.stringify(props, null, 2)}</pre>
      </p>
    </div>
  );
};

Button.defaultProps = ButtonSchema.parse({
  text: "Click me",
  href: "https://www.example.com",
  align: "left",
  full: false,
  style: {
    backgroundColor: "#000000",
    borderRadius: "0",
    color: "#ffffff",
    paddingTop: "5px",
    paddingRight: "5px",
    paddingBottom: "5px",
    paddingLeft: "5px",
    fontSize: "14px",
    textAlign: "center",
  },
});
