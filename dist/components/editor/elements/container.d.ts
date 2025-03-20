import { ReactNode } from 'react';
import { z } from 'zod';
export declare const ContainerSchema: z.ZodObject<{
    id: z.ZodString;
    horizontalPadding: z.ZodDefault<z.ZodNumber>;
    verticalPadding: z.ZodDefault<z.ZodNumber>;
    backgroundColor: z.ZodDefault<z.ZodString>;
    width: z.ZodDefault<z.ZodString>;
    height: z.ZodDefault<z.ZodString>;
    borderRadius: z.ZodDefault<z.ZodNumber>;
    borderColor: z.ZodDefault<z.ZodString>;
    borderWidth: z.ZodDefault<z.ZodNumber>;
    borderStyle: z.ZodDefault<z.ZodEnum<["solid", "dashed", "dotted", "double", "none"]>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    height: string;
    width: string;
    backgroundColor: string;
    borderRadius: number;
    borderColor: string;
    borderStyle: "none" | "dashed" | "dotted" | "double" | "solid";
    borderWidth: number;
    horizontalPadding: number;
    verticalPadding: number;
}, {
    id: string;
    height?: string | undefined;
    width?: string | undefined;
    backgroundColor?: string | undefined;
    borderRadius?: number | undefined;
    borderColor?: string | undefined;
    borderStyle?: "none" | "dashed" | "dotted" | "double" | "solid" | undefined;
    borderWidth?: number | undefined;
    horizontalPadding?: number | undefined;
    verticalPadding?: number | undefined;
}>;
export type ContainerSchemaType = z.infer<typeof ContainerSchema>;
export declare const Container: {
    ({ id, style, children, }: ContainerSchemaType & {
        children: ReactNode;
    }): import("react/jsx-runtime").JSX.Element;
    defaultProps: {
        id: string;
        height: string;
        width: string;
        backgroundColor: string;
        borderRadius: number;
        borderColor: string;
        borderStyle: "none" | "dashed" | "dotted" | "double" | "solid";
        borderWidth: number;
        horizontalPadding: number;
        verticalPadding: number;
    };
};
export declare const ContainerEditor: ({ ...props }: ContainerSchemaType) => import("react/jsx-runtime").JSX.Element;
