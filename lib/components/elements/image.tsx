import { Img as Component } from "@react-email/img";
import { z } from "zod";

export const ImgSchema = z.object({
  id: z.string(),
  src: z.string(),
  alt: z.string(),
  height: z.number(),
  width: z.number().default(100),
});

export type ImgSchemaType = z.infer<typeof ImgSchema>;

export const Img = ({ id, src, alt, height, width }: ImgSchemaType) => {
  return (
    <Component
      data-element-type="image"
      data-element-id={id}
      src={src}
      alt={alt}
      height={height}
      width="100%"
    />
  );
};

export const ImgEditor = ({ ...props }: ImgSchemaType) => {
  return (
    <div>
      <p>Image Editor</p>
      <p>
        <pre>{JSON.stringify(props, null, 2)}</pre>
      </p>
    </div>
  );
};

Img.defaultProps = ImgSchema.parse({
  id: "image-1",
  src: "https://picsum.photos/600/300",
  alt: "Placeholder image",
  height: 300,
  width: 600,
});
