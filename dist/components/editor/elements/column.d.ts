import { ReactNode } from 'react';
import { z } from 'zod';
export declare const ColumnSchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodLiteral<"column">;
    title: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    width: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    backgroundColor: z.ZodDefault<z.ZodString>;
    horizontalPadding: z.ZodDefault<z.ZodNumber>;
    verticalPadding: z.ZodDefault<z.ZodNumber>;
    borderRadius: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    children: z.ZodDefault<z.ZodArray<z.ZodAny, "many">>;
}, "strip", z.ZodTypeAny, {
    title: string;
    id: string;
    children: any[];
    type: "column";
    backgroundColor: string;
    horizontalPadding: number;
    verticalPadding: number;
    width?: string | undefined;
    borderRadius?: string | undefined;
}, {
    id: string;
    type: "column";
    title?: string | undefined;
    children?: any[] | undefined;
    width?: string | undefined;
    backgroundColor?: string | undefined;
    borderRadius?: string | undefined;
    horizontalPadding?: number | undefined;
    verticalPadding?: number | undefined;
}>;
export type ColumnSchemaType = z.infer<typeof ColumnSchema>;
export declare const columnDefaultValues: (props?: Partial<ColumnSchemaType>) => ColumnSchemaType;
export declare const Column: ({ id, children, ...props }: ColumnSchemaType & {
    children: ReactNode;
}) => import("react/jsx-runtime").JSX.Element;
interface ColumnEditorProps extends ColumnSchemaType {
    onChange?: (values: Partial<ColumnSchemaType>) => void;
}
export declare const ColumnEditor: ({ onChange, ...props }: ColumnEditorProps) => import("react/jsx-runtime").JSX.Element;
export {};
