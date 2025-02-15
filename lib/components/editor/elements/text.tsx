import { TextEditor as TextEditorInput } from "@/components/custom/text-editor";
import { ToggleButton } from "@/components/custom/toggle-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { createId } from "@/utils";
import { Text as Component } from "@react-email/text";
import { useCallback } from "react";
import { z } from "zod";

import { FontPicker } from "@/components/custom/font-picker";
import { AlignCenter, AlignLeft, AlignRight } from "lucide-react";

export const TextSchema = z.object({
  id: z.string(),
  type: z.literal("text"),
  title: z.string().default("Untitled text"),
  html: z
    .string()
    .default(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien.",
    ),
  horizontalPadding: z.number().min(0).max(300).default(0),
  verticalPadding: z.number().min(0).max(500).default(0),
  lineHeight: z.number().optional().default(1.5),
  fontFamily: z.string().optional(),
  fontSize: z.string().optional().default("16px"),
  fontWeight: z
    .enum(["100", "200", "300", "400", "500", "600", "700", "800", "900"])
    .optional()
    .default("400"),
  textAlign: z.enum(["left", "center", "right"]).optional().default("left"),
});

export type TextSchemaType = z.infer<typeof TextSchema>;

export function textDefaultValues(
  props: Partial<TextSchemaType> = {},
): TextSchemaType {
  return {
    id: createId(),
    type: "text",
    title: "Untitled text",
    html: "Text",
    horizontalPadding: 16,
    verticalPadding: 0,
    lineHeight: 1.5,
    fontFamily: "Arial, Helvetica, sans-serif",
    fontWeight: "400",
    textAlign: "left",
    fontSize: "15px",
    ...props,
  };
}

export const Text = ({
  id = textDefaultValues().id,
  ...props
}: TextSchemaType) => {
  // Merge props with default values
  const mergedProps = {
    ...textDefaultValues(props),
    id,
  };

  const vertical = mergedProps.verticalPadding / 2; // half vertical spacing
  const horizontal = mergedProps.horizontalPadding / 2; // half horizontal spacing

  return (
    <Component
      data-el-type="text"
      data-el-id={id}
      style={{
        margin: "0",
        paddingTop: `${vertical}px`,
        paddingBottom: `${vertical}px`,
        paddingLeft: `${horizontal}px`,
        paddingRight: `${horizontal}px`,
        fontSize: mergedProps.fontSize || "16px",
        fontFamily: mergedProps.fontFamily || "Inter, sans-serif",
        lineHeight: mergedProps.lineHeight || "1.5",
        fontWeight: mergedProps.fontWeight || "400",
        textAlign: mergedProps.textAlign || "left",
      }}
      dangerouslySetInnerHTML={{ __html: mergedProps.html }}
    />
  );
};

interface TextEditorProps extends TextSchemaType {
  onChange?: (values: Partial<TextSchemaType>) => void;
}

export const TextEditor = ({ onChange, ...props }: TextEditorProps) => {
  const handleChange = useCallback(
    (field: keyof TextSchemaType, value: string | number) => {
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
          placeholder="Text title"
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

        <TextEditorInput
          value={props.html}
          onChange={(value) => handleChange("html", value)}
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
        <Label htmlFor={`${props.id}-font-size`} className="text-xs">
          Font size
        </Label>
        <Slider
          id={`${props.id}-font-size`}
          min={10}
          max={50}
          step={1}
          showTooltip={true}
          value={[parseInt(props.fontSize)]}
          onValueChange={(value: number[]) =>
            handleChange("fontSize", value[0].toString())
          }
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
