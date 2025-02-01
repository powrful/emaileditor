import { type RowProps } from "@react-email/row";
import React from "react";
import { z } from "zod";

export const RowSchema = z.object({
  id: z.string(),
  title: z.string().optional().default("Untitled row"),
  columns: z
    .enum(["100", "50/50", "33/33/33", "70/30", "30/70"])
    .default("100"),
  gap: z.string().default("10px"),
  style: z.object({
    backgroundColor: z.string().default("#ffffff"),
    paddingTop: z.string().default("5px"),
    paddingRight: z.string().default("5px"),
    paddingBottom: z.string().default("5px"),
    paddingLeft: z.string().default("5px"),
  }),
});

export type { RowProps };
export type RowType = z.infer<typeof RowSchema>;

export const Row = ({
  id,
  children,
  columns = "100",
  ...props
}: RowType & RowProps) => {
  const getColumnWidths = () => {
    switch (columns) {
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
    <React.Fragment>
      <div
        dangerouslySetInnerHTML={{
          __html: `<!--[if mso]>
<table role="presentation" width="100%">
<tr>
<td>
<![endif]-->`,
        }}
      />
      <table
        width="100%"
        align="center"
        bgcolor={props.style?.backgroundColor}
        cellPadding={halfGap}
        cellSpacing={halfGap}
        border={0}
        style={{
          paddingTop: props.style?.paddingTop,
          paddingRight: props.style?.paddingRight,
          paddingBottom: props.style?.paddingBottom,
          paddingLeft: props.style?.paddingLeft,
        }}
      >
        <tbody>
          <tr>
            {childrenArray.map((child, index) => {
              if (!React.isValidElement(child)) return null;
              const typedChild = child as React.ReactElement<{
                style?: React.CSSProperties;
                width?: string;
                align?: string;
              }>;

              const width = columnWidths[index] || "100%";

              return (
                <td
                  key={index}
                  align="center"
                  width={width}
                  valign="top"
                  style={{
                    width,
                  }}
                >
                  {React.cloneElement(typedChild, {
                    style: {
                      width: "100%",
                      ...(typedChild.props.style && {
                        color: typedChild.props.style.color,
                        backgroundColor: typedChild.props.style.backgroundColor,
                        fontSize: typedChild.props.style.fontSize,
                        fontFamily: typedChild.props.style.fontFamily,
                        textAlign: typedChild.props.style.textAlign,
                      }),
                    },
                  })}
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
      <div
        dangerouslySetInnerHTML={{
          __html: `<!--[if mso]>
</td>
</tr>
</table>
<![endif]-->`,
        }}
      />
    </React.Fragment>
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
  id: "row-1",
  columns: "100",
  gap: "10px",
  style: {
    backgroundColor: "#ffffff",
    paddingTop: "5px",
    paddingRight: "5px",
    paddingBottom: "5px",
    paddingLeft: "5px",
  },
});
