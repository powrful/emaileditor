import { z } from 'zod';
export declare const HeadingSchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodLiteral<"heading">;
    title: z.ZodDefault<z.ZodString>;
    as: z.ZodDefault<z.ZodEnum<["h1", "h2", "h3", "h4", "h5", "h6"]>>;
    text: z.ZodDefault<z.ZodString>;
    horizontalPadding: z.ZodDefault<z.ZodNumber>;
    verticalPadding: z.ZodDefault<z.ZodNumber>;
    horizontalMargin: z.ZodDefault<z.ZodNumber>;
    verticalMargin: z.ZodDefault<z.ZodNumber>;
    color: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    lineHeight: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    fontFamily: z.ZodOptional<z.ZodString>;
    fontWeight: z.ZodDefault<z.ZodOptional<z.ZodEnum<["100", "200", "300", "400", "500", "600", "700", "800", "900"]>>>;
    textAlign: z.ZodDefault<z.ZodOptional<z.ZodEnum<["left", "center", "right"]>>>;
}, "strip", z.ZodTypeAny, {
    title: string;
    text: string;
    id: string;
    color: string;
    type: "heading";
    fontWeight: "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900";
    horizontalMargin: number;
    verticalMargin: number;
    textAlign: "center" | "right" | "left";
    lineHeight: number;
    horizontalPadding: number;
    verticalPadding: number;
    as: "h2" | "h3" | "h1" | "h4" | "h5" | "h6";
    fontFamily?: string | undefined;
}, {
    id: string;
    type: "heading";
    title?: string | undefined;
    text?: string | undefined;
    color?: string | undefined;
    fontFamily?: string | undefined;
    fontWeight?: "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" | undefined;
    horizontalMargin?: number | undefined;
    verticalMargin?: number | undefined;
    textAlign?: "center" | "right" | "left" | undefined;
    lineHeight?: number | undefined;
    horizontalPadding?: number | undefined;
    verticalPadding?: number | undefined;
    as?: "h2" | "h3" | "h1" | "h4" | "h5" | "h6" | undefined;
}>;
export type HeadingSchemaType = z.infer<typeof HeadingSchema>;
export declare function headingDefaultValues(props?: Partial<HeadingSchemaType>): HeadingSchemaType;
export declare const Heading: ({ id, ...props }: HeadingSchemaType) => import("react/jsx-runtime").JSX.Element;
interface HeadingEditorProps extends HeadingSchemaType {
    onChange?: (values: Partial<HeadingSchemaType>) => void;
}
export declare const HeadingEditor: ({ onChange, ...props }: HeadingEditorProps) => import("react/jsx-runtime").JSX.Element;
export {};
