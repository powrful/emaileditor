import { z } from 'zod';
export declare const HeadSchema: z.ZodObject<{
    title: z.ZodDefault<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    title: string;
}, {
    title?: string | undefined;
}>;
export type HeadSchemaType = z.infer<typeof HeadSchema>;
export declare const Head: {
    ({ title }: HeadSchemaType): import("react/jsx-runtime").JSX.Element;
    defaultProps: {
        title: string;
    };
};
export declare const HeadEditor: ({ ...props }: HeadSchemaType) => import("react/jsx-runtime").JSX.Element;
