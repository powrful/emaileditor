import { Button as Component } from "@react-email/button";
import { z } from "zod";

export const ButtonSchema = z.object({
  text: z.string(),
  href: z.string().optional(),
  style: z.object({
    backgroundColor: z.string().default("#000000"),
    borderRadius: z.string().default("0"),
    color: z.string().default("#ffffff"),
    paddingTop: z
      .number()
      .default(5)
      .transform((value) => `${value}px`),
    paddingRight: z
      .number()
      .default(5)
      .transform((value) => `${value}px`),
    paddingBottom: z
      .number()
      .default(5)
      .transform((value) => `${value}px`),
    paddingLeft: z
      .number()
      .default(5)
      .transform((value) => `${value}px`),
    textAlign: z.enum(["left", "center", "right"]).default("center"),
  }),
});

export type ButtonSchemaType = z.infer<typeof ButtonSchema>;

export const Button = ({ text, href, style }: ButtonSchemaType) => {
  return (
    <table
      width="100%"
      border={0}
      cellPadding={0}
      cellSpacing={0}
      role="presentation"
    >
      <tr>
        <td align={style.textAlign}>
          <Component href={href} style={style}>
            {text}
          </Component>
        </td>
      </tr>
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

Button.defaultProps = ButtonSchema.parse({});
