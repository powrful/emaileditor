import { z } from 'zod';
export declare const HtmlSchema: z.ZodObject<{
    lang: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    dir: z.ZodDefault<z.ZodOptional<z.ZodEnum<["ltr", "rtl"]>>>;
}, "strip", z.ZodTypeAny, {
    dir: "ltr" | "rtl";
    lang: string;
}, {
    dir?: "ltr" | "rtl" | undefined;
    lang?: string | undefined;
}>;
export type HtmlSchemaType = z.infer<typeof HtmlSchema>;
type HtmlProps = HtmlSchemaType & {
    children: React.ReactNode;
};
export declare const Html: {
    ({ lang, dir, children }: HtmlProps): import("react/jsx-runtime").JSX.Element;
    defaultProps: {
        dir: "ltr" | "rtl";
        lang: string;
    };
};
export declare const HtmlEditor: ({ ...props }: HtmlSchemaType) => import("react/jsx-runtime").JSX.Element;
export {};
