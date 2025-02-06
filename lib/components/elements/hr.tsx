import { ColorPicker } from "@/components/custom/color-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Hr as Component } from "@react-email/hr";
import { useCallback } from "react";
import { z } from "zod";

export const HrSchema = z.object({
  id: z.string(),
  title: z.string().optional().default("Untitled divider"),
  width: z.string().optional().default("100%"),
  thickness: z.string().optional().default("2px"),
  color: z.string().optional().default("#000000"),
  horizontalMargin: z.number().optional().default(0),
  verticalMargin: z.number().optional().default(0),
});

export type HrSchemaType = z.infer<typeof HrSchema>;

export const Hr = ({
  id,
  width,
  thickness,
  color,
  horizontalMargin,
  verticalMargin,
}: HrSchemaType) => {
  const halfVerticalMargin = verticalMargin / 2;
  const innerWidth =
    typeof width === "string" && width.endsWith("%")
      ? `${parseInt(width) - horizontalMargin / 6}%` // Scale down percentage by margin
      : `${parseInt(width) - horizontalMargin}px`; // Direct pixel subtraction

  return (
    <table
      data-el-type="hr"
      data-el-id={id}
      style={{
        width: "100%",
        borderSpacing: "0",
        borderCollapse: "collapse",
        marginTop: `${halfVerticalMargin}px`,
        marginBottom: `${halfVerticalMargin}px`,
      }}
    >
      <tr>
        <td align="center">
          <Component
            style={{
              width: innerWidth,
              height: thickness,
              backgroundColor: color,
              borderRadius: "50px",
            }}
          />
        </td>
      </tr>
    </table>
  );
};

interface HrEditorProps extends HrSchemaType {
  onChange?: (values: Partial<HrSchemaType>) => void;
}

export const HrEditor = ({ onChange, ...props }: HrEditorProps) => {
  const handleChange = useCallback(
    (field: keyof HrSchemaType, value: string | number) => {
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
        <Label htmlFor={`${props.id}-color`} className="text-xs">
          Color
        </Label>
        <ColorPicker
          color={props.color}
          onChange={(color) => handleChange("color", color.hex)}
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
          value={[parseInt(props.width)]}
          onValueChange={(value: number[]) =>
            handleChange("width", `${value[0]}%`)
          }
        />
      </div>

      <div className="space-y-2 gap-2">
        <Label htmlFor={`${props.id}-thickness`} className="text-xs">
          Thickness
        </Label>
        <Slider
          id={`${props.id}-thickness`}
          min={0}
          max={10}
          step={0.5}
          showTooltip={true}
          tooltipContent={(value) => `${value}px`}
          value={[parseInt(props.thickness)]}
          onValueChange={(value: number[]) =>
            handleChange("thickness", `${value[0]}px`)
          }
        />
      </div>

      <div className="space-y-2 gap-2">
        <Label htmlFor={`${props.id}-vertical-padding`} className="text-xs">
          Vertical margin
        </Label>
        <Slider
          id={`${props.id}-vertical-padding`}
          min={0}
          max={100}
          step={1}
          showTooltip={true}
          tooltipContent={(value) => `${value}px`}
          value={[props.verticalMargin / 2]}
          onValueChange={(value: number[]) =>
            handleChange("verticalMargin", value[0] * 2)
          }
        />
      </div>
      <div className="space-y-2 gap-2">
        <Label htmlFor={`${props.id}-horizontal-margin`} className="text-xs">
          Horizontal margin
        </Label>
        <Slider
          id={`${props.id}-horizontal-margin`}
          min={0}
          max={250}
          step={1}
          showTooltip={true}
          tooltipContent={(value) => `${value}px`}
          value={[props.horizontalMargin / 2]}
          onValueChange={(value: number[]) =>
            handleChange("horizontalMargin", value[0] * 2)
          }
        />
      </div>
    </div>
  );
};

Hr.defaultProps = HrSchema.parse({
  id: "hr-1",
  width: "100%",
  thickness: "2px",
  color: "#000000",
  horizontalMargin: 0,
  verticalMargin: 0,
});
