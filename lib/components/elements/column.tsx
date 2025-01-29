import { Column as Component } from "@react-email/column";
import type { ReactNode } from "react";
import { z } from "zod";

export const ColumnSchema = z.object({
  id: z.string(),
  title: z.string().optional().default("Untitled column"),
  style: z.object({
    width: z.string().default("100%").optional(),
    backgroundColor: z.string().default("transparent"),
    paddingTop: z.string().default("5px"),
    paddingRight: z.string().default("5px"),
    paddingBottom: z.string().default("5px"),
    paddingLeft: z.string().default("5px"),

    align: z.enum(["left", "center", "right"]).default("left"),
    textAlign: z.enum(["left", "center", "right"]).default("left"),
    verticalAlign: z.enum(["top", "middle", "bottom"]).default("middle"),

    borderRadius: z.string().default("0px"),
    borderColor: z.string().default("red"),
    borderWidth: z.string().default("2px"),
    borderStyle: z.enum(["solid", "dashed", "dotted", "none"]).default("solid"),
  }),
});

export type ColumnSchemaType = z.infer<typeof ColumnSchema>;

export const Column = ({
  id,
  style,
  children,
}: ColumnSchemaType & { children: ReactNode }) => {
  return (
    <Component data-element-type="column" data-element-id={id} style={style}>
      {children}
    </Component>
  );
};

export const ColumnEditor = ({ style }: ColumnSchemaType) => {
  return (
    <div>
      <p>Column editor</p>
      <p>
        <pre>{JSON.stringify(style, null, 2)}</pre>
      </p>
    </div>
  );
};

Column.defaultProps = ColumnSchema.parse({
  id: "column-1",
  style: {
    width: "100%",
    backgroundColor: "transparent",
    paddingTop: "5px",
    paddingRight: "5px",
    paddingBottom: "5px",
    paddingLeft: "5px",
    align: "left",
    textAlign: "left",
    verticalAlign: "middle",
    borderRadius: "0px",
    borderColor: "red",
    borderWidth: "2px",
    borderStyle: "solid",
  },
});
