import { Row as Component, type RowProps } from "@react-email/row";
import React from "react";
import { z } from "zod";

export const RowSchema = z.object({
  type: z.enum(["100", "50/50", "33/33/33", "70/30", "30/70"]).default("100"),
  gap: z.string().default("10px"),
  style: z.object({
    backgroundColor: z.string().default("#ffffff"),
    // align: z.enum(["left", "center", "right"]).default("center"),
    paddingTop: z.string().default("5px"),
    paddingRight: z.string().default("5px"),
    paddingBottom: z.string().default("5px"),
    paddingLeft: z.string().default("5px"),
  }),
});

export type { RowProps };
export type RowType = z.infer<typeof RowSchema>;

export const Row = ({
  children,
  type = "100",
  ...props
}: RowType & RowProps) => {
  const getColumnWidths = () => {
    switch (type) {
      case "50/50":
        return ["50%", "50%"];
      case "33/33/33":
        return ["33.33%", "33.33%", "33.33%"];
      case "70/30":
        return ["70%", "30%"];
      case "30/70":
        return ["30%", "70%"];
      default:
        return ["100%"];
    }
  };

  const columnWidths = getColumnWidths();
  const childrenArray = React.Children.toArray(children);
  const gapSize = parseInt(props.gap || "0px");
  const halfGap = `${Math.floor(gapSize / 2)}px`;

  return (
    <Component
      style={{
        ...props.style,
        width: "100%",
        textAlign: props.style?.textAlign || "center",
      }}
      align={"center"}
      bgcolor={props.style?.backgroundColor}
      cellPadding={halfGap}
      cellSpacing={halfGap}
    >
      {childrenArray.map((child, index) => {
        if (!React.isValidElement(child)) return null;
        const typedChild = child as React.ReactElement<{
          style?: React.CSSProperties;
          width?: string;
          align?: string;
        }>;

        const width = columnWidths[index] || "100%";

        const el = React.cloneElement(typedChild, {
          key: index,
          align: typedChild.props.align || "center",
          style: {
            ...typedChild.props.style,
            width,
          },
        });

        return (
          <td
            className="column"
            align="center"
            width={width}
            style={
              {
                ...typedChild.props.style,
                width,
              } as React.CSSProperties
            }
          >
            <style>
              {`
                @media only screen and (max-width: 600px) {
                  .column {
                    width: 92% !important;
                    margin-bottom: ${halfGap};
                    display: block;
                    text-size-adjust: 100%;
                    webkit-text-size-adjust: 100%;
                    ms-text-size-adjust: 100%;
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                  }
                }
              `}
            </style>
            {el}
          </td>
        );
      })}
    </Component>
  );
};

export const RowEditor = ({ props }: { props: RowType }) => {
  return (
    <div>
      <p>Row Editor</p>
      <p>
        <pre>{JSON.stringify(props, null, 2)}</pre>
      </p>
    </div>
  );
};

Row.defaultProps = RowSchema.parse({
  type: "100",
  gap: "10px",
  style: {
    backgroundColor: "#ffffff",
    align: "center",
    paddingTop: "5px",
    paddingRight: "5px",
    paddingBottom: "5px",
    paddingLeft: "5px",
  },
});
