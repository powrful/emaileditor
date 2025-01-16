import {
  TooltipContent,
  Tooltip as TooltipPrimitive,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TooltipProps {
  text: string;
  children: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
}

export const Tooltip = ({ text, children, side = "top" }: TooltipProps) => {
  return (
    <TooltipProvider>
      <TooltipPrimitive delayDuration={100}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side}>
          <p>{text}</p>
        </TooltipContent>
      </TooltipPrimitive>
    </TooltipProvider>
  );
};
