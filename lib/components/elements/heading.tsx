import { ColorPicker } from "@/components/custom/color-picker";
import { ToggleButton } from "@/components/custom/toggle-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Heading as Component } from "@react-email/heading";
import { useCallback } from "react";
import { z } from "zod";

import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
} from "lucide-react";

export const HeadingSchema = z.object({
  id: z.string(),
  title: z.string().default("Untitled heading"),
  as: z.enum(["h1", "h2", "h3", "h4", "h5", "h6"]).default("h1"),
  text: z.string().default("Heading"),
  horizontalPadding: z.number().min(0).max(300).default(0),
  verticalPadding: z.number().min(0).max(500).default(0),
  color: z.string().optional().default("#000000"),
  lineHeight: z.number().optional().default(1.5),
  fontFamily: z.string().optional(),
  fontWeight: z
    .enum(["100", "200", "300", "400", "500", "600", "700", "800", "900"])
    .optional()
    .default("400"),
  textAlign: z.enum(["left", "center", "right"]).optional().default("left"),
});

export type HeadingSchemaType = z.infer<typeof HeadingSchema>;
type HeadingProps = HeadingSchemaType;

export const Heading = ({
  id,
  as,
  text,
  horizontalPadding,
  verticalPadding,
  color,
  lineHeight,
  fontFamily,
  fontWeight,
  textAlign,
}: HeadingProps) => {
  const vertical = verticalPadding / 2; // half vertical spacing
  const horizondal = horizontalPadding / 2; // half horizontal spacing
  return (
    <Component
      data-element-type="heading"
      data-element-id={id}
      as={as}
      style={{
        margin: "0",
        paddingTop: `${vertical}px`,
        paddingBottom: `${vertical}px`,
        paddingLeft: `${horizondal}px`,
        paddingRight: `${horizondal}px`,
        fontSize: getDefaultFontSize(as),
        fontFamily: fontFamily || "Inter, sans-serif",
        lineHeight: lineHeight || "1.5",
        color: color || "#000000",
        fontWeight: fontWeight || "400",
        textAlign: textAlign || "left",
      }}
    >
      {text}
    </Component>
  );
};

// Helper function for default heading sizes
function getDefaultFontSize(level: HeadingProps["as"]) {
  const sizes = {
    h1: "32px",
    h2: "24px",
    h3: "20px",
    h4: "18px",
    h5: "16px",
    h6: "14px",
  };
  return sizes[level];
}

interface HeadingEditorProps extends HeadingSchemaType {
  onChange?: (values: Partial<HeadingSchemaType>) => void;
}

export const HeadingEditor = ({ onChange, ...props }: HeadingEditorProps) => {
  const handleChange = useCallback(
    (field: keyof HeadingSchemaType, value: string | number) => {
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
        <Label htmlFor={`${props.id}-text`} className="text-xs">
          Text
        </Label>
        <Input
          id={`${props.id}-text`}
          placeholder="Heading text"
          type="text"
          className="h-7 text-sm"
          value={props.text}
          onChange={(e) => handleChange("text", e.target.value)}
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
        <Label htmlFor={`${props.id}-align`} className="text-xs">
          Align
        </Label>
        <ToggleButton
          id={`${props.id}-align`}
          selected={props.textAlign}
          onChange={(value) => handleChange("textAlign", value)}
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

      <div className="space-y-2 gap-2">
        <Label htmlFor={`${props.id}-as`} className="text-xs">
          Size
        </Label>
        <ToggleButton
          id={`${props.id}-as`}
          selected={props.as}
          onChange={(value) => handleChange("as", value)}
          items={[
            {
              id: "h1",
              label: "H1",
              icon: <Heading1 />,
            },
            {
              id: "h2",
              label: "H2",
              icon: <Heading2 />,
            },
            {
              id: "h3",
              label: "H3",
              icon: <Heading3 />,
            },
            {
              id: "h4",
              label: "H4",
              icon: <Heading4 />,
            },
            {
              id: "h5",
              label: "H5",
              icon: <Heading5 />,
            },
            {
              id: "h6",
              label: "H6",
              icon: <Heading6 />,
            },
          ]}
        />
      </div>

      <div className="space-y-2 gap-2">
        <Label htmlFor={`${props.id}-line-height`} className="text-xs">
          Font weight
        </Label>
        <Slider
          id={`${props.id}-font-weight`}
          min={100}
          max={900}
          step={100}
          showTooltip={true}
          value={[parseInt(props.fontWeight)]}
          onValueChange={(value: number[]) =>
            handleChange("fontWeight", value[0].toString())
          }
        />
      </div>

      <div className="space-y-2 gap-2">
        <Label htmlFor={`${props.id}-line-height`} className="text-xs">
          Line height
        </Label>
        <Slider
          id={`${props.id}-line-height`}
          min={0}
          max={5}
          step={0.5}
          showTooltip={true}
          value={[props.lineHeight]}
          onValueChange={(value: number[]) =>
            handleChange("lineHeight", value[0].toString())
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
          value={[props.verticalPadding / 2]}
          onValueChange={(value: number[]) =>
            handleChange("verticalPadding", value[0] * 2)
          }
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
          value={[props.horizontalPadding / 2]}
          onValueChange={(value: number[]) =>
            handleChange("horizontalPadding", value[0] * 2)
          }
        />
      </div>
    </div>
  );
};

Heading.defaultProps = HeadingSchema.parse({
  id: "heading-1",
  title: "Heading 1",
  as: "h1",
  text: "Heading 1",
  horizontalPadding: 0,
  verticalPadding: 0,
  color: "#000000",
  lineHeight: 1.5,
  fontFamily: "Inter, sans-serif",
  fontWeight: "400",
  textAlign: "left",
});
