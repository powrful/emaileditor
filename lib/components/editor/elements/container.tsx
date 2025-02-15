import { Container as Component } from "@react-email/container";
import type { ReactNode } from "react";
import { z } from "zod";

export const ContainerSchema = z.object({
  id: z.string(),
  horizontalPadding: z.number().default(10),
  verticalPadding: z.number().default(10),
  backgroundColor: z.string().default("#ffffff"),
  width: z.string().default("600px"),
  height: z.string().default("auto"),
  borderRadius: z.number().default(0),
  borderColor: z.string().default("#000000"),
  borderWidth: z.number().default(0),
  borderStyle: z
    .enum(["solid", "dashed", "dotted", "double", "none"])
    .default("none"),
});

export type ContainerSchemaType = z.infer<typeof ContainerSchema>;

export const Container = ({
  id,
  style,
  children,
}: ContainerSchemaType & {
  children: ReactNode;
}) => {
  return (
    <Component data-el-type="container" data-el-id={id} style={style}>
      {children}
    </Component>
  );
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
  id: "container-1",
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
