import { Container as Component } from "@react-email/container";
import type { ReactNode } from "react";
import { z } from "zod";

export const ContainerSchema = z.object({
  style: z.object({
    backgroundColor: z.string().default("#ffffff"),
    maxWidth: z.string().default("600px"),
    paddingTop: z.string().default("10px").optional(),
    paddingRight: z.string().default("10px").optional(),
    paddingBottom: z.string().default("10px").optional(),
    paddingLeft: z.string().default("10px").optional(),
    borderRadius: z.string().default("0px").optional(),
    borderColor: z.string().default("#000000").optional(),
    borderWidth: z.string().default("0px").optional(),
    borderStyle: z
      .enum(["solid", "dashed", "dotted", "double", "none"])
      .default("none"),
  }),
});

export type ContainerSchemaType = z.infer<typeof ContainerSchema>;

export const Container = ({
  style,
  children,
}: ContainerSchemaType & {
  children: ReactNode;
}) => {
  return <Component style={style}>{children}</Component>;
};

export const ContainerEditor = ({ ...props }: ContainerSchemaType) => {
  return (
    <div>
      <p>Container Editor</p>
      <p>
        <pre>{JSON.stringify(props, null, 2)}</pre>
      </p>
    </div>
  );
};

Container.defaultProps = ContainerSchema.parse({
  style: {
    backgroundColor: "#ffffff",
    maxWidth: "600px",
    paddingTop: "10px",
    paddingRight: "10px",
    paddingBottom: "10px",
    paddingLeft: "10px",
    borderRadius: "0px",
    borderColor: "#000000",
    borderWidth: "0px",
    borderStyle: "none",
  },
});
