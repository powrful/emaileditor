import { RowProps } from '@react-email/row';
import { z } from 'zod';
export declare const RowSchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodLiteral<"row">;
    title: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    columns: z.ZodDefault<z.ZodEnum<["100", "50/50", "33/33/33", "70/30", "30/70"]>>;
    gap: z.ZodDefault<z.ZodNumber>;
    backgroundColor: z.ZodDefault<z.ZodString>;
    horizontalPadding: z.ZodDefault<z.ZodNumber>;
    verticalPadding: z.ZodDefault<z.ZodNumber>;
    children: z.ZodDefault<z.ZodArray<z.ZodObject<{
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
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    title: string;
    id: string;
    children: {
        title: string;
        id: string;
        children: any[];
        type: "column";
        backgroundColor: string;
        horizontalPadding: number;
        verticalPadding: number;
        width?: string | undefined;
        borderRadius?: string | undefined;
    }[];
    type: "row";
    backgroundColor: string;
    columns: "100" | "50/50" | "33/33/33" | "70/30" | "30/70";
    gap: number;
    horizontalPadding: number;
    verticalPadding: number;
}, {
    id: string;
    type: "row";
    title?: string | undefined;
    children?: {
        id: string;
        type: "column";
        title?: string | undefined;
        children?: any[] | undefined;
        width?: string | undefined;
        backgroundColor?: string | undefined;
        borderRadius?: string | undefined;
        horizontalPadding?: number | undefined;
        verticalPadding?: number | undefined;
    }[] | undefined;
    backgroundColor?: string | undefined;
    columns?: "100" | "50/50" | "33/33/33" | "70/30" | "30/70" | undefined;
    gap?: number | undefined;
    horizontalPadding?: number | undefined;
    verticalPadding?: number | undefined;
}>;
export type { RowProps };
export type RowType = z.infer<typeof RowSchema>;
export declare const rowDefaultValues: ({ id, columns, }: {
    id: string;
    columns?: string;
}) => {
    title: string;
    id: string;
    children: {
        title: string;
        id: string;
        children: any[];
        type: "column";
        backgroundColor: string;
        horizontalPadding: number;
        verticalPadding: number;
        width?: string | undefined;
        borderRadius?: string | undefined;
    }[];
    type: "row";
    backgroundColor: string;
    columns: "100" | "50/50" | "33/33/33" | "70/30" | "30/70";
    gap: number;
    horizontalPadding: number;
    verticalPadding: number;
};
export declare const Row: ({ id, children, columns, ...props }: RowType & RowProps) => import("react/jsx-runtime").JSX.Element;
export declare const RowEditor: ({ onChange, ...props }: RowType & {
    onChange?: (values: Partial<RowType>) => void;
}) => import("react/jsx-runtime").JSX.Element;
