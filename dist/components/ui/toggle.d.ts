import * as TogglePrimitive from "@radix-ui/react-toggle";
import { VariantProps } from 'class-variance-authority';
import * as React from "react";
declare const toggleVariants: (props?: ({
    variant?: "default" | "outline" | null | undefined;
    size?: "default" | "xs" | "sm" | "lg" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
declare const Toggle: React.ForwardRefExoticComponent<Omit<TogglePrimitive.ToggleProps & React.RefAttributes<HTMLButtonElement>, "ref"> & VariantProps<(props?: ({
    variant?: "default" | "outline" | null | undefined;
    size?: "default" | "xs" | "sm" | "lg" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string> & React.RefAttributes<HTMLButtonElement>>;
export { Toggle, toggleVariants };
