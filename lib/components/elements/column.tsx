import { ColorPicker } from "@/components/custom/color-picker";
import { ToggleButton } from "@/components/custom/toggle-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import type { ReactNode } from "react";
import { useCallback } from "react";
import { z } from "zod";

import {
  Maximize as DashedLine,
  SquareDashed as DottedLine,
  AlignCenterHorizontal as HorizontalAlignCenter,
  AlignStartHorizontal as HorizontalAlignLeft,
  AlignEndHorizontal as HorizontalAlignRight,
  Square as SolidLine,
  AlignEndVertical as VerticalAlignBottom,
  AlignCenterVertical as VerticalAlignCenter,
  AlignStartVertical as VerticalAlignTop,
} from "lucide-react";

export const ColumnSchema = z.object({
  id: z.string(),
  title: z.string().optional().default("Untitled column"),
  width: z.string().default("100%").optional(),
  backgroundColor: z.string().default("transparent"),
  horizontalPadding: z.number().default(5),
  verticalPadding: z.number().default(5),

  borderRadius: z.string().default("0px"),
  borderColor: z.string().default("red"),
  borderWidth: z.string().default("2px"),
  borderStyle: z.enum(["solid", "dashed", "dotted", "none"]).default("solid"),
});

export type ColumnSchemaType = z.infer<typeof ColumnSchema>;

export const Column = ({
  id,
  children,
  ...props
}: ColumnSchemaType & { children: ReactNode }) => {
  const paddingTop = props.verticalPadding / 2;
  const paddingRight = props.horizontalPadding / 2;
  const paddingBottom = props.verticalPadding / 2;
  const paddingLeft = props.horizontalPadding / 2;

  return (
    <>
      <div
        dangerouslySetInnerHTML={{
          __html: `<!--[if mso]>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
      <tr><td style="width: ${props.width}">
    <![endif]-->`,
        }}
      />

      <table
        cellPadding="0"
        cellSpacing="0"
        border={0}
        role="presentation"
        width={props.width}
        style={{
          borderCollapse: "collapse",
          ["mso-table-lspace" as any]: "0pt",
          ["mso-table-rspace" as any]: "0pt",
          width: `${props.width} !important`,
          fontSize: "0px",
          lineHeight: "0px",
        }}
      >
        <tr>
          <td
            data-el-type="column"
            data-el-id={id}
            style={{
              paddingTop: `${paddingTop}px`,
              paddingRight: `${paddingRight}px`,
              paddingBottom: `${paddingBottom}px`,
              paddingLeft: `${paddingLeft}px`,
              backgroundColor: props.backgroundColor,
              borderRadius: props.borderRadius,
              borderColor: props.borderColor,
              borderWidth: props.borderWidth,
              borderStyle: props.borderStyle,
              ["mso-line-height-rule" as any]: "exactly",
            }}
          >
            {children}
          </td>
        </tr>
      </table>

      <div
        dangerouslySetInnerHTML={{
          __html: `<!--[if mso]>
      </td></tr></table>
    <![endif]-->`,
        }}
      />
    </>
  );
};

interface ColumnEditorProps extends ColumnSchemaType {
  onChange?: (values: Partial<ColumnSchemaType>) => void;
}

export const ColumnEditor = ({ onChange, ...props }: ColumnEditorProps) => {
  const handleChange = useCallback(
    (field: keyof ColumnSchemaType, value: string | number) => {
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
          placeholder="Column title"
          type="text"
          className="h-7 text-sm"
          value={props.title}
          onChange={(e) => handleChange("title", e.target.value)}
        />
      </div>

      <div className="space-y-2 gap-2">
        <Label htmlFor={`${props.id}-width`} className="text-xs">
          Width
        </Label>
        <Slider
          id={`${props.id}-width`}
          min={0}
          max={100}
          step={1}
          showTooltip={true}
          tooltipContent={(value) => `${value}%`}
          value={[parseInt(props.width || "100")]}
          onValueChange={(value: number[]) =>
            handleChange("width", value[0].toString() + "%")
          }
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
          value={[props.verticalPadding]}
          onValueChange={(value: number[]) =>
            handleChange("verticalPadding", value[0])
          }
        />
      </div>

      <div className="space-y-2 gap-2">
        <Label htmlFor={`${props.id}-border-radius`} className="text-xs">
          Border radius
        </Label>
        <Slider
          id={`${props.id}-border-radius`}
          min={0}
          max={100}
          step={1}
          showTooltip={true}
          tooltipContent={(value) => `${value}px`}
          value={[parseInt(props.borderRadius)]}
          onValueChange={(value: number[]) =>
            handleChange("borderRadius", value[0].toString() + "px")
          }
        />
      </div>

      <div className="space-y-2 gap-2">
        <Label htmlFor={`${props.id}-border-width`} className="text-xs">
          Border width
        </Label>
        <Slider
          id={`${props.id}-border-width`}
          min={0}
          max={10}
          step={1}
          showTooltip={true}
          tooltipContent={(value) => `${value}px`}
          value={[parseInt(props.borderWidth)]}
          onValueChange={(value: number[]) =>
            handleChange("borderWidth", value[0].toString() + "px")
          }
        />
      </div>

      <div className="space-y-2 gap-2">
        <Label htmlFor={`${props.id}-border-color`} className="text-xs">
          Border color
        </Label>
        <ColorPicker
          color={props.borderColor}
          onChange={(color) => handleChange("borderColor", color.hex)}
        />
      </div>

      <div className="space-y-2 gap-2">
        <Label htmlFor={`${props.id}-border-style`} className="text-xs">
          Border style
        </Label>
        <ToggleButton
          id={`${props.id}-border-style`}
          selected={props.borderStyle}
          onChange={(value) => handleChange("borderStyle", value)}
          items={[
            {
              id: "solid",
              label: "Solid",
              icon: <SolidLine />,
            },
            {
              id: "dashed",
              label: "Dashed",
              icon: <DashedLine />,
            },
            {
              id: "dotted",
              label: "Dotted",
              icon: <DottedLine />,
            },
          ]}
        />
      </div>
    </div>
  );
};

Column.defaultProps = ColumnSchema.parse({
  id: "column-1",
  width: "100%",
  backgroundColor: "transparent",
  horizontalPadding: 5,
  verticalPadding: 5,
  borderRadius: "0px",
  borderColor: "red",
  borderWidth: "2px",
  borderStyle: "solid",
});
