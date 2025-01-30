import { Input } from "@/components/ui/input";
import { NumberInput } from "@/components/ui/input-number";
import { Label } from "@/components/ui/label";
import { Img as Component } from "@react-email/img";
import { z } from "zod";

export const ImgSchema = z.object({
  id: z.string(),
  title: z.string().optional().default("Untitled image"),
  src: z.string(),
  alt: z.string(),
  width: z.number().default(600),
  height: z.number().default(300),
});

export type ImgSchemaType = z.infer<typeof ImgSchema>;

export const Img = ({ id, src, alt, width, height }: ImgSchemaType) => {
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
        <td align="center">
          <Component
            data-element-type="image"
            data-element-id={id}
            src={src}
            alt={alt}
            width={width}
            height={height}
            style={{
              display: "block",
              width: "100%",
              maxWidth: `100%`,
              height: "auto",
              margin: "0 auto",
            }}
          />
        </td>
      </tr>
    </table>
  );
};

export const ImgEditor = ({ ...props }: ImgSchemaType) => {
  return (
    <div className="space-y-5">
      <div className="space-y-1 gap-2">
        <Label htmlFor={`${props.id}-title`} className="text-xs">
          Title
        </Label>
        <Input
          id={`${props.id}-title`}
          placeholder="Image title"
          type="text"
          className="h-7 text-sm"
          defaultValue={props.title}
          onChange={(e) => {
            console.log("title changed", e.target.value);
          }}
        />
        <p
          className="mt-2 text-[11px] text-muted-foreground"
          role="region"
          aria-live="polite"
        >
          This is for reference, will not show up on emails.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor={`${props.id}-src`} className="text-xs">
          Image URL
        </Label>
        <Input
          id={`${props.id}-src`}
          placeholder="Email"
          type="email"
          className="h-7 text-sm"
          defaultValue={props.src}
        />
      </div>

      <NumberInput
        label="Width"
        defaultValue={props.width}
        minValue={0}
        maxValue={600}
        onChange={(value) => {
          console.log("width changed", value);
        }}
      />

      <NumberInput
        label="Height"
        defaultValue={props.height}
        minValue={0}
        maxValue={600}
        onChange={(value) => {
          console.log("height changed", value);
        }}
      />
    </div>
  );
};

Img.defaultProps = ImgSchema.parse({
  id: "image-1",
  src: "https://picsum.photos/600/300",
  alt: "Placeholder image",
  width: 600,
  height: 300,
});
