import { ToggleButton } from "@/components/custom/toggle-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Img as Component } from "@react-email/img";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Circle,
  RotateCwSquare,
  Square,
} from "lucide-react";
import { memo, useCallback } from "react";
import { z } from "zod";

export const ImgSchema = z.object({
  id: z.string(),
  src: z.string(),
  title: z.string().default("Untitled image"),
  align: z.enum(["left", "center", "right"]).default("left"),
  width: z.string().default("20%"),
  height: z.string().default("20%"),
  shape: z.enum(["square", "rounded", "circle"]).default("square"),
  spacing: z.number().min(0).max(100).default(0),
});

export type ImgSchemaType = z.infer<typeof ImgSchema>;

export const Img = ({
  id,
  src,
  title,
  width,
  align,
  height,
  shape,
  spacing,
}: ImgSchemaType) => {
  const halfSpacing = spacing / 2;

  return (
    <table
      border={0}
      cellPadding={0}
      cellSpacing={0}
      role="presentation"
      width="100%"
      style={{ maxWidth: "100%" }}
    >
      <tr>
        <td align={align}>
          <div style={{ width: width, height: height }}>
            <Component
              data-el-type="image"
              data-el-id={id}
              src={src}
              alt={title}
              width={width}
              height={height}
              style={{
                display: "block",
                width: "100%",
                height: "100%",
                marginTop: `${halfSpacing}px`,
                marginBottom: `${halfSpacing}px`,

                ...(shape === "circle" && {
                  aspectRatio: "1 / 1",
                  objectFit: "cover",
                  borderRadius: "50%",
                }),

                ...(shape === "rounded" && {
                  borderRadius: "10px",
                }),

                ...(shape === "square" && {
                  borderRadius: "0px",
                }),
              }}
            />
          </div>
        </td>
      </tr>
    </table>
  );
};

interface ImgEditorProps extends ImgSchemaType {
  onChange?: (values: Partial<ImgSchemaType>) => void;
}

export const ImgEditor = memo(({ onChange, ...props }: ImgEditorProps) => {
  const handleChange = useCallback(
    (field: keyof ImgSchemaType, value: string | number) => {
      onChange?.({
        [field]: value,
      });
    },
    [onChange],
  );

  return (
    <div className="space-y-5">
      <div className="space-y-2 gap-2">
        <Label htmlFor={`${props.id}-alt`} className="text-xs">
          Title
        </Label>
        <Input
          id={`${props.id}-alt`}
          placeholder="Image alt"
          type="text"
          className="h-7 text-sm"
          value={props.title}
          onChange={(e) => handleChange("title", e.target.value)}
        />
        <p
          className="mt-2 text-[11px] text-muted-foreground"
          role="region"
          aria-live="polite"
        >
          Title is used for the image's alt text, for accessibility and screen
          readers.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor={`${props.id}-src`} className="text-xs">
          Image URL
        </Label>
        <Input
          id={`${props.id}-src`}
          placeholder="Image URL"
          type="text"
          className="h-7 text-sm"
          value={props.src}
          onChange={(e) => handleChange("src", e.target.value)}
        />
      </div>

      <div className="space-y-2 gap-2">
        <Label htmlFor={`${props.id}-shape`} className="text-xs">
          Shape
        </Label>
        <ToggleButton
          id={`${props.id}-shape`}
          selected={props.shape}
          onChange={(value) => handleChange("shape", value)}
          items={[
            {
              id: "square",
              label: "Square",
              icon: <Square />,
            },
            {
              id: "rounded",
              label: "Rounded",
              icon: <RotateCwSquare />,
            },
            {
              id: "circle",
              label: "Circle",
              icon: <Circle />,
            },
          ]}
        />
      </div>

      <div className="space-y-2 gap-2">
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

      <div className="space-y-2 gap-2">
        <Label htmlFor={`${props.id}-width`} className="text-xs">
          Size
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

      <div className="space-y-2 gap-2">
        <Label htmlFor={`${props.id}-spacing`} className="text-xs">
          Spacing
        </Label>
        <Slider
          id={`${props.id}-spacing`}
          min={0}
          max={100}
          step={1}
          showTooltip={true}
          tooltipContent={(value) => `${value}px`}
          value={[props.spacing / 2]}
          onValueChange={(value: number[]) =>
            handleChange("spacing", value[0] * 2)
          }
        />
      </div>
    </div>
  );
});

ImgEditor.displayName = "ImgEditor";

Img.defaultProps = ImgSchema.parse({
  id: "image-1",
  src: "https://picsum.photos/600/300",
  title: "Placeholder image",
  width: "100%",
  align: "center",
  shape: "square",
  spacing: 0,
});
