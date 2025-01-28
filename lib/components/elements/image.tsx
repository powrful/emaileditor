import { Img as Component } from "@react-email/img";
import { z } from "zod";

export const ImgSchema = z.object({
  id: z.string(),
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
  width: 600,
  height: 300,
});
