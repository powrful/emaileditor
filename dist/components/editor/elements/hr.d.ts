import { z } from 'zod';
export declare const HrSchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodLiteral<"hr">;
    title: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    width: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    thickness: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    color: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    horizontalMargin: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    verticalMargin: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    title: string;
    id: string;
    color: string;
    type: "hr";
    width: string;
    horizontalMargin: number;
    verticalMargin: number;
    thickness: string;
}, {
    id: string;
    type: "hr";
    title?: string | undefined;
    color?: string | undefined;
    width?: string | undefined;
    horizontalMargin?: number | undefined;
    verticalMargin?: number | undefined;
    thickness?: string | undefined;
}>;
export type HrSchemaType = z.infer<typeof HrSchema>;
export declare const hrDefaultValues: (props?: Partial<HrSchemaType>) => HrSchemaType;
export declare const Hr: ({ id, ...props }: HrSchemaType) => import("react/jsx-runtime").JSX.Element;
interface HrEditorProps extends HrSchemaType {
    onChange?: (values: Partial<HrSchemaType>) => void;
}
export declare const HrEditor: ({ onChange, ...props }: HrEditorProps) => import("react/jsx-runtime").JSX.Element;
export {};
