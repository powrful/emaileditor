import { Hr as Component } from "@react-email/hr";
import { z } from "zod";

export const HrSchema = z.object({
  style: z.object({
    border: z.string().optional().default("1px solid #000000"),
    align: z.enum(["left", "center", "right"]).optional().default("center"),
    width: z.string().optional().default("100%"),
  }),
});

export type HrSchemaType = z.infer<typeof HrSchema>;

export const Hr = ({ style }: HrSchemaType) => {
  return <Component style={style} />;
};

export const HrEditor = ({ ...props }: HrSchemaType) => {
  return (
    <div>
      <p>Hr Editor</p>
      <p>
        <pre>{JSON.stringify(props, null, 2)}</pre>
      </p>
    </div>
  );
};

Hr.defaultProps = HrSchema.parse({
  style: {
    border: "1px solid #000000",
    align: "center",
    width: "100%",
  },
});
