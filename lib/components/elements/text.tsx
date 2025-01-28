import { Text as Component } from "@react-email/text";
import { z } from "zod";

export const TextSchema = z.object({
  id: z.string(),
  text: z.string().optional().default("Text"),
  style: z.object({
    color: z.string().optional().default("#155dfc"),
    fontWeight: z.enum(["normal", "bold"]).optional().default("normal"),
    fontSize: z.string().optional().default("16px"),
    lineHeight: z.string().optional().default("1.5"),
    letterSpacing: z.string().optional().default("0"),
    textAlign: z.enum(["left", "center", "right"]).optional().default("left"),
  }),
});

export type TextSchemaType = z.infer<typeof TextSchema>;

export const Text = ({ id, text, style }: TextSchemaType) => {
  return (
    <Component data-element-type="text" data-element-id={id} style={style}>
      {text}
    </Component>
  );
};

export const TextEditor = ({ ...props }: TextSchemaType) => {
  return (
    <div>
      <p>Text Editor</p>
      <p>
        <pre>{JSON.stringify(props, null, 2)}</pre>
      </p>
    </div>
  );
};

Text.defaultProps = TextSchema.parse({
  id: "text-1",
  text: "Text",
  style: {
    fontWeight: "normal",
    color: "#000000",
    fontSize: "16px",
    lineHeight: "1.5",
    letterSpacing: "0",
    textAlign: "left",
  },
});
