import { z } from 'zod';
export declare const ImgSchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodLiteral<"image">;
    src: z.ZodString;
    title: z.ZodDefault<z.ZodString>;
    align: z.ZodDefault<z.ZodEnum<["left", "center", "right"]>>;
    width: z.ZodDefault<z.ZodString>;
    height: z.ZodDefault<z.ZodString>;
    shape: z.ZodDefault<z.ZodEnum<["square", "rounded", "circle"]>>;
    spacing: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    title: string;
    id: string;
    align: "center" | "right" | "left";
    type: "image";
    height: string;
    width: string;
    spacing: number;
    src: string;
    shape: "circle" | "square" | "rounded";
}, {
    id: string;
    type: "image";
    src: string;
    title?: string | undefined;
    align?: "center" | "right" | "left" | undefined;
    height?: string | undefined;
    width?: string | undefined;
    spacing?: number | undefined;
    shape?: "circle" | "square" | "rounded" | undefined;
}>;
export type ImgSchemaType = z.infer<typeof ImgSchema>;
export declare const imageDefaultValues: (props?: Partial<ImgSchemaType>) => ImgSchemaType;
export declare const Img: ({ id, ...props }: ImgSchemaType) => import("react/jsx-runtime").JSX.Element;
interface ImgEditorProps extends ImgSchemaType {
    onChange?: (values: Partial<ImgSchemaType>) => void;
}
export declare const ImgEditor: import('react').MemoExoticComponent<({ onChange, ...props }: ImgEditorProps) => import("react/jsx-runtime").JSX.Element>;
export {};
