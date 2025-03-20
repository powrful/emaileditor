import { z } from 'zod';
export declare const GlobalSchema: z.ZodObject<{
    fontFamily: z.ZodDefault<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    fontFamily: string;
}, {
    fontFamily?: string | undefined;
}>;
export type GlobalSchemaType = z.infer<typeof GlobalSchema>;
