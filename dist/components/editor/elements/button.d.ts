import { z } from 'zod';
export declare const ButtonSchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodLiteral<"button">;
    title: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    text: z.ZodDefault<z.ZodString>;
    fontFamily: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    href: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    align: z.ZodDefault<z.ZodEnum<["left", "center", "right"]>>;
    width: z.ZodDefault<z.ZodString>;
    height: z.ZodDefault<z.ZodNumber>;
    horizontalMargin: z.ZodDefault<z.ZodNumber>;
    verticalMargin: z.ZodDefault<z.ZodNumber>;
    backgroundColor: z.ZodDefault<z.ZodString>;
    color: z.ZodDefault<z.ZodString>;
    fontSize: z.ZodDefault<z.ZodString>;
    borderRadius: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    title: string;
    text: string;
    id: string;
    color: string;
    align: "center" | "right" | "left";
    type: "button";
    height: number;
    width: string;
    fontFamily: string;
    fontSize: string;
    href: string;
    backgroundColor: string;
    horizontalMargin: number;
    verticalMargin: number;
    borderRadius: number;
}, {
    id: string;
    type: "button";
    title?: string | undefined;
    text?: string | undefined;
    color?: string | undefined;
    align?: "center" | "right" | "left" | undefined;
    height?: number | undefined;
    width?: string | undefined;
    fontFamily?: string | undefined;
    fontSize?: string | undefined;
    href?: string | undefined;
    backgroundColor?: string | undefined;
    horizontalMargin?: number | undefined;
    verticalMargin?: number | undefined;
    borderRadius?: number | undefined;
}>;
export type ButtonSchemaType = z.infer<typeof ButtonSchema>;
export declare function buttonDefaultValues(props?: Partial<ButtonSchemaType>): ButtonSchemaType;
export declare const Button: ({ id, ...props }: ButtonSchemaType) => import("react/jsx-runtime").JSX.Element;
interface ButtonEditorProps extends ButtonSchemaType {
    onChange?: (values: Partial<ButtonSchemaType>) => void;
}
export declare const ButtonEditor: ({ onChange, ...props }: ButtonEditorProps) => import("react/jsx-runtime").JSX.Element;
export {};
