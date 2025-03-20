interface TooltipProps {
    text: string;
    children: React.ReactNode;
    side?: "top" | "right" | "bottom" | "left";
}
export declare const Tooltip: ({ text, children, side }: TooltipProps) => import("react/jsx-runtime").JSX.Element;
export {};
