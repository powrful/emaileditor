import { z } from "zod";
import { BaseStyleSchema } from "./base";
import type { TemplateType } from "./elements";

export const TextSchema = z.object({
  id: z.string(),
  type: z.literal("text"),
  content: z.string(),
  style: BaseStyleSchema.extend({
    fontSize: z.string().optional(),
    color: z.string().optional(),
    lineHeight: z.string().optional(),
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
