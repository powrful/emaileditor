import { nanoid } from "nanoid";
import { z } from "zod";
import { BaseStyleSchema } from "./base";
import type { TemplateType } from "./elements";

export const TextSchema = z.object({
  id: z.string().default(nanoid()),
  type: z.literal("text").default("text"),
  content: z.string().default("Text"),
  style: BaseStyleSchema.extend({
    fontSize: z.string().optional().default("16px"),
    color: z.string().optional().default("black"),
    lineHeight: z.string().optional().default("1.5"),
  }),
});

export type TextType = z.infer<typeof TextSchema>;

export const TextEditor = ({
  id,
  content,
  style,
  template,
}: TextType & { template: TemplateType }) => {
  return <div>{content}</div>;
};
