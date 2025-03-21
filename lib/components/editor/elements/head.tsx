import { Head as Component } from "@react-email/head";
import { z } from "zod";

export const HeadSchema = z.object({
  title: z.string().default("Title of the email"),
});

export type HeadSchemaType = z.infer<typeof HeadSchema>;

export const Head = ({ title }: HeadSchemaType) => {
  return (
    <Component>
      <title>{title}</title>
    </Component>
  );
};

export const HeadEditor = ({ ...props }: HeadSchemaType) => {
  return (
    <div>
      <p>Head Editor</p>
      <p>
        <pre>{JSON.stringify(props, null, 2)}</pre>
      </p>
    </div>
  );
};

Head.defaultProps = HeadSchema.parse({});
