import { ColorPicker } from "@/components/custom/color-picker";
import { FontPicker } from "@/components/custom/font-picker";
import { ToggleButton } from "@/components/custom/toggle-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { createId } from "@/utils";
import { Button as Component } from "@react-email/button";
import { AlignCenter, AlignLeft, AlignRight } from "lucide-react";
import { useCallback } from "react";
import { z } from "zod";

export const ButtonSchema = z.object({
  id: z.string(),
  type: z.literal("button"),
  title: z.string().optional().default("Untitled button"),
  text: z.string().default("Click me"),
  fontFamily: z.string().optional().default("Arial, Helvetica, sans-serif"),
  href: z.string().optional().default("#"),
  align: z.enum(["left", "center", "right"]).default("left"),
  width: z.string().default("50%"),
  height: z.number().min(0).max(500).default(10),
  horizontalMargin: z.number().min(0).max(100).default(0),
  verticalMargin: z.number().min(0).max(100).default(0),
  backgroundColor: z.string().default("#000000"),
  color: z.string().default("#ffffff"),
  fontSize: z.string().default("16px"),
  borderRadius: z.number().min(0).max(100).default(4),
});

export type ButtonSchemaType = z.infer<typeof ButtonSchema>;

export function buttonDefaultValues(
  props: Partial<ButtonSchemaType> = {},
): ButtonSchemaType {
  return {
    id: createId(),
    type: "button",
    title: "Button",
    text: "Click me",
    fontFamily: "Arial, Helvetica, sans-serif",
    href: "#",
    align: "left",
    width: "25%",
    height: 16,
    horizontalMargin: 16,
    verticalMargin: 10,
    backgroundColor: "#000000",
    color: "#ffffff",
    fontSize: "16px",
    borderRadius: 5,
    ...props,
  };
}

export const Button = ({
  id = buttonDefaultValues().id,
  ...props
}: ButtonSchemaType) => {
  // Merge props with default values
  const mergedProps = {
    ...buttonDefaultValues(props),
    id,
  };

  const halfHorizontalMargin = mergedProps.horizontalMargin / 2;
  const halfVerticalMargin = mergedProps.verticalMargin / 2;
  const halfHeight = mergedProps.height / 2;

  const getMarginAlignment = () => {
    switch (mergedProps.align) {
      case "center":
        return "0 auto";
      case "right":
        return "0 0 0 auto";
      default:
        return "0";
    }
  };

  return (
    <Component
      data-el-type="button"
      data-el-id={mergedProps.id}
      href={mergedProps.href}
      style={{
        backgroundColor: mergedProps.backgroundColor,
        color: mergedProps.color,
        fontSize: mergedProps.fontSize,
        width: mergedProps.width === "100%" ? "100%" : mergedProps.width,
        borderRadius: `${mergedProps.borderRadius}px`,
        paddingTop: `${halfHeight}px`,
        paddingBottom: `${halfHeight}px`,
        margin: getMarginAlignment(),
        marginTop: `${halfVerticalMargin}px`,
        marginBottom: `${halfVerticalMargin}px`,
        marginLeft: `${halfHorizontalMargin}px`,
        marginRight: `${halfHorizontalMargin}px`,
        display: "block",
        textDecoration: "none",
        textAlign: "center",
        maxWidth: "100%",
        lineHeight: "120%",
        border: "0",
        fontFamily: mergedProps.fontFamily,
        // @ts-ignore
        "mso-line-height-rule": "exactly",
        WebkitTextSizeAdjust: "none",
        boxSizing: "border-box",
      }}
    >
      {mergedProps.text}
    </Component>
  );
};

interface ButtonEditorProps extends ButtonSchemaType {
  onChange?: (values: Partial<ButtonSchemaType>) => void;
}

export const ButtonEditor = ({ onChange, ...props }: ButtonEditorProps) => {
  const handleChange = useCallback(
    (field: keyof ButtonSchemaType, value: string | number | boolean) => {
      onChange?.({
        [field]: value,
      });
    },
    [onChange],
  );

  return (
    <div className="space-y-5 mb-5">
      <div className="space-y-2">
        <Label htmlFor={`${props.id}-title`} className="text-xs">
          Title
        </Label>
        <Input
          id={`${props.id}-title`}
          placeholder="Button title"
          type="text"
          className="h-7 text-sm"
          value={props.title}
          onChange={(e) => handleChange("title", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor={`${props.id}-text`} className="text-xs">
          Text
        </Label>
        <Input
          id={`${props.id}-text`}
          placeholder="Button text"
          type="text"
          className="h-7 text-sm"
          value={props.text}
          onChange={(e) => handleChange("text", e.target.value)}
        />
      </div>

      <div className="space-y-2 gap-2">
        <Label htmlFor={`${props.id}-font-family`} className="text-xs">
          Font
        </Label>

        <FontPicker
          id={`${props.id}-font-family`}
          value={props.fontFamily || ""}
          onChange={(value) => handleChange("fontFamily", value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor={`${props.id}-href`} className="text-xs">
          Link URL
        </Label>
        <Input
          id={`${props.id}-href`}
          placeholder="https://example.com"
          type="text"
          className="h-7 text-sm"
          value={props.href}
          onChange={(e) => handleChange("href", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor={`${props.id}-background-color`} className="text-xs">
          Background Color
        </Label>
        <ColorPicker
          color={props.backgroundColor}
          onChange={(color) => handleChange("backgroundColor", color.hex)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor={`${props.id}-text-color`} className="text-xs">
          Text Color
        </Label>
        <ColorPicker
          color={props.color}
          onChange={(color) => handleChange("color", color.hex)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor={`${props.id}-align`} className="text-xs">
          Align
        </Label>
        <ToggleButton
          id={`${props.id}-align`}
          selected={props.align}
          onChange={(value) => handleChange("align", value)}
          items={[
            {
              id: "left",
              label: "Left",
              icon: <AlignLeft />,
            },
            {
              id: "center",
              label: "Center",
              icon: <AlignCenter />,
            },
            {
              id: "right",
              label: "Right",
              icon: <AlignRight />,
            },
          ]}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor={`${props.id}-height`} className="text-xs">
          Height
        </Label>
        <Slider
          id={`${props.id}-height`}
          min={0}
          max={100}
          step={1}
          showTooltip={true}
          tooltipContent={(value) => `${value}px`}
          value={[props.height]}
          onValueChange={(value: number[]) => handleChange("height", value[0])}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor={`${props.id}-width`} className="text-xs">
          Width
        </Label>

        <Slider
          id={`${props.id}-width`}
          max={100}
          min={0}
          step={1}
          showTooltip={true}
          tooltipContent={(value) => `${value}%`}
          value={[parseInt(props.width)]}
          onValueChange={(value: number[]) =>
            handleChange("width", `${value[0]}%`)
          }
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor={`${props.id}-font-size`} className="text-xs">
          Font size
        </Label>
        <Slider
          id={`${props.id}-font-size`}
          min={10}
          max={50}
          step={1}
          showTooltip={true}
          tooltipContent={(value) => `${value}px`}
          value={[parseInt(props.fontSize)]}
          onValueChange={(value: number[]) =>
            handleChange("fontSize", `${value[0]}px`)
          }
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor={`${props.id}-border-radius`} className="text-xs">
          Border Radius
        </Label>
        <Slider
          id={`${props.id}-border-radius`}
          min={0}
          max={100}
          step={1}
          showTooltip={true}
          tooltipContent={(value) => `${value}px`}
          value={[props.borderRadius]}
          onValueChange={(value: number[]) =>
            handleChange("borderRadius", value[0])
          }
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor={`${props.id}-horizontal-margin`} className="text-xs">
          Horizontal Margin
        </Label>
        <Slider
          id={`${props.id}-horizontal-margin`}
          min={0}
          max={100}
          step={1}
          showTooltip={true}
          tooltipContent={(value) => `${value}px`}
          value={[props.horizontalMargin]}
          onValueChange={(value: number[]) =>
            handleChange("horizontalMargin", value[0])
          }
        />

        <div className="space-y-2">
          <Label htmlFor={`${props.id}-vertical-margin`} className="text-xs">
            Vertical Margin
          </Label>
          <Slider
            id={`${props.id}-vertical-margin`}
            min={0}
            max={100}
            step={1}
            showTooltip={true}
            tooltipContent={(value) => `${value}px`}
            value={[props.verticalMargin]}
            onValueChange={(value: number[]) =>
              handleChange("verticalMargin", value[0])
            }
          />
        </div>
      </div>
    </div>
  );
};
