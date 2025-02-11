import { ColorPicker } from "@/components/custom/color-picker";
import { FontPicker } from "@/components/custom/font-picker";
import { ToggleButton } from "@/components/custom/toggle-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import type { TemplateSchemaType } from "@/schemas/template";
import { AlignCenter, AlignLeft, AlignRight } from "lucide-react";
import { ContainerSchemaType } from "../elements";

export const GlobalEditor = ({
  template,
  setTemplate,
}: {
  template: TemplateSchemaType;
  setTemplate: (template: TemplateSchemaType) => void;
}) => {
  const handleChange = (
    field: keyof ContainerSchemaType,
    value: string | number | boolean,
  ) => {
    setTemplate({
      ...template,
      container: {
        ...template.container,
        [field]: value,
      },
    });
  };

  return (
    <div className="space-y-5 mb-5">
      <div className="space-y-2 gap-2">
        <pre>{JSON.stringify(template.container, null, 2)}</pre>
      </div>

      {/* <div className="space-y-2 gap-2">
        <Label htmlFor={`${props.id}-font-family`} className="text-xs">
          Font
        </Label>

        <FontPicker
          id={`${props.id}-font-family`}
          value={props.fontFamily || ""}
          onChange={(value) => handleChange("fontFamily", value)}
        />
      </div> */}

      <div className="space-y-2">
        <Label htmlFor={`background-color`} className="text-xs">
          Background Color
        </Label>
        <ColorPicker
          color={template.container.style.backgroundColor}
          onChange={(color) => handleChange("style.backgroundColor", color.hex)}
        />
      </div>

      {/* <div className="space-y-2">
        <Label htmlFor={`${props.id}-text-color`} className="text-xs">
          Text Color
        </Label>
        <ColorPicker
          color={props.color}
          onChange={(color) => handleChange("color", color.hex)}
        />
      </div> */}

      {/* <div className="space-y-2">
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
      </div> */}

      {/* <div className="space-y-2">
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
      </div> */}

      {/* <div className="space-y-2">
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
      </div> */}

      {/* <div className="space-y-2">
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
      </div> */}

      {/* <div className="space-y-2">
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
      </div> */}

      {/* <div className="space-y-2">
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
      </div> */}
    </div>
  );
};
