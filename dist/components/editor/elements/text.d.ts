import { z } from 'zod';
export declare const TextSchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodLiteral<"text">;
    title: z.ZodDefault<z.ZodString>;
    html: z.ZodDefault<z.ZodString>;
    horizontalPadding: z.ZodDefault<z.ZodNumber>;
    verticalPadding: z.ZodDefault<z.ZodNumber>;
    lineHeight: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    fontFamily: z.ZodOptional<z.ZodString>;
    fontSize: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    fontWeight: z.ZodDefault<z.ZodOptional<z.ZodEnum<["100", "200", "300", "400", "500", "600", "700", "800", "900"]>>>;
    textAlign: z.ZodDefault<z.ZodOptional<z.ZodEnum<["left", "center", "right"]>>>;
}, "strip", z.ZodTypeAny, {
    html: string;
    title: string;
    id: string;
    type: "text";
    fontSize: string;
    fontWeight: "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900";
    textAlign: "center" | "right" | "left";
    lineHeight: number;
    horizontalPadding: number;
    verticalPadding: number;
    fontFamily?: string | undefined;
}, {
    id: string;
    type: "text";
    html?: string | undefined;
    title?: string | undefined;
    fontFamily?: string | undefined;
    fontSize?: string | undefined;
    fontWeight?: "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" | undefined;
    textAlign?: "center" | "right" | "left" | undefined;
    lineHeight?: number | undefined;
    horizontalPadding?: number | undefined;
    verticalPadding?: number | undefined;
}>;
export type TextSchemaType = z.infer<typeof TextSchema>;
export declare function textDefaultValues(props?: Partial<TextSchemaType>): TextSchemaType;
export declare const Text: ({ id, ...props }: TextSchemaType) => import("react/jsx-runtime").JSX.Element;
interface TextEditorProps extends TextSchemaType {
    onChange?: (values: Partial<TextSchemaType>) => void;
}
export declare const TextEditor: ({ onChange, ...props }: TextEditorProps) => import("react/jsx-runtime").JSX.Element;
export {};
