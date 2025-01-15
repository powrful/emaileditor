import { z } from "zod";

export const ContainerSchema = z.object({
  style: z.object({
    backgroundColor: z.string(),
    borderRadius: z.string(),
    borderWidth: z.string(),
    borderColor: z.string(),
  }),
});

export type ContainerType = z.infer<typeof ContainerSchema>;
