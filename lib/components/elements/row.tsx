import { ColorPicker } from "@/components/custom/color-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { createId } from "@/utils";
import { type RowProps } from "@react-email/row";
import React, { useCallback } from "react";
import { z } from "zod";
import { ColumnSchema, type ColumnSchemaType, newColumn } from "./column";

export const RowSchema = z.object({
  id: z.string(),
  type: z.literal("row"),
  title: z.string().optional().default("Untitled row"),
  columns: z
    .enum(["100", "50/50", "33/33/33", "70/30", "30/70"])
    .default("100"),
  gap: z.number().default(10),
  backgroundColor: z.string().default("#ffffff"),
  horizontalPadding: z.number().default(5),
  verticalPadding: z.number().default(5),
  children: z.array(ColumnSchema).default([]),
});

export const newRow = ({ columns = "100" }: { columns?: string }) => {
  let children: ColumnSchemaType[] = [];

  if (columns === "50/50") {
    children = [newColumn(), newColumn()];
  } else if (columns === "33/33/33") {
    children = [newColumn(), newColumn(), newColumn()];
  } else if (columns === "70/30") {
    children = [newColumn(), newColumn()];
  } else if (columns === "30/70") {
    children = [newColumn(), newColumn()];
  } else {
    children = [newColumn()];
  }

  return RowSchema.parse({
    id: createId(),
    type: "row",
    columns,
    title: "Untitled row",
    backgroundColor: "#ffffff",
    horizontalPadding: 0,
    verticalPadding: 0,
    gap: 10,
    children,
  });
};

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
  const gapSize = props.gap || 0;
  const halfGap = `${Math.floor(gapSize / 2)}px`;
  const paddingTop = props.verticalPadding / 2;
  const paddingRight = props.horizontalPadding / 2;
  const paddingBottom = props.verticalPadding / 2;
  const paddingLeft = props.horizontalPadding / 2;

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
        bgcolor={props.backgroundColor}
        cellPadding={halfGap}
        cellSpacing={halfGap}
        border={0}
        style={{
          paddingTop: `${paddingTop}px`,
          paddingRight: `${paddingRight}px`,
          paddingBottom: `${paddingBottom}px`,
          paddingLeft: `${paddingLeft}px`,
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

export const RowEditor = ({
  onChange,
  ...props
}: RowType & { onChange?: (values: Partial<RowType>) => void }) => {
  const handleChange = useCallback(
    (field: keyof RowType, value: string | number) => {
      onChange?.({
        [field]: value,
      });
    },
    [onChange],
  );

  return (
    <div className="space-y-5">
      <div className="space-y-2 gap-2">
        <Label htmlFor={`${props.id}-title`} className="text-xs">
          Title
        </Label>
        <Input
          id={`${props.id}-title`}
          placeholder="Heading title"
          type="text"
          className="h-7 text-sm"
          value={props.title}
          onChange={(e) => handleChange("title", e.target.value)}
        />
      </div>

      <div className="space-y-2 gap-2">
        <Label htmlFor={`${props.id}-background-color`} className="text-xs">
          Background color
        </Label>
        <ColorPicker
          color={props.backgroundColor}
          onChange={(color) => handleChange("backgroundColor", color.hex)}
        />
      </div>

      <div className="space-y-2 gap-2">
        <Label htmlFor={`${props.id}-gap`} className="text-xs">
          Gap
        </Label>
        <Slider
          id={`${props.id}-gap`}
          min={0}
          max={100}
          step={1}
          showTooltip={true}
          tooltipContent={(value) => `${value}`}
          value={[props.gap]}
          onValueChange={(value: number[]) => handleChange("gap", value[0])}
        />
      </div>

      <div className="space-y-2 gap-2">
        <Label htmlFor={`${props.id}-horizontal-padding`} className="text-xs">
          Horizontal padding
        </Label>
        <Slider
          id={`${props.id}-horizontal-padding`}
          min={0}
          max={100}
          step={1}
          showTooltip={true}
          tooltipContent={(value) => `${value}px`}
          value={[props.horizontalPadding]}
          onValueChange={(value: number[]) =>
            handleChange("horizontalPadding", value[0])
          }
        />
      </div>

      <div className="space-y-2 gap-2">
        <Label htmlFor={`${props.id}-vertical-padding`} className="text-xs">
          Vertical padding
        </Label>
        <Slider
          id={`${props.id}-vertical-padding`}
          min={0}
          max={100}
          step={1}
          showTooltip={true}
          tooltipContent={(value) => `${value}px`}
          value={[props.verticalPadding / 2]}
          onValueChange={(value: number[]) =>
            handleChange("verticalPadding", value[0] * 2)
          }
        />
      </div>
    </div>
  );
};
