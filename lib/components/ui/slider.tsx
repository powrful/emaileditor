"use client";

import * as SliderPrimitive from "@radix-ui/react-slider";
import * as React from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
    showTooltip?: boolean;
    tooltipContent?: (value: number) => React.ReactNode;
  }
>(({ className, showTooltip = false, tooltipContent, ...props }, ref) => {
  const [showTooltipState, setShowTooltipState] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState<number[]>(
    (props.defaultValue as number[]) ?? (props.value as number[]) ?? [0],
  );

  React.useEffect(() => {
    if (props.value !== undefined) {
      setInternalValue(props.value as number[]);
    }
  }, [props.value]);

  const handleValueChange = (newValue: number[]) => {
    setInternalValue(newValue);
    props.onValueChange?.(newValue);
  };

  const handlePointerDown = () => {
    if (showTooltip) {
      setShowTooltipState(true);
    }
  };

  const handlePointerUp = React.useCallback(() => {
    if (showTooltip) {
      setShowTooltipState(false);
    }
  }, [showTooltip]);

  React.useEffect(() => {
    if (showTooltip) {
      document.addEventListener("pointerup", handlePointerUp);
      return () => {
        document.removeEventListener("pointerup", handlePointerUp);
      };
    }
  }, [showTooltip, handlePointerUp]);

  const renderThumb = (value: number) => {
    const thumb = (
      <SliderPrimitive.Thumb
        className="block h-4 w-4 rounded-full border-2 border-black bg-primary transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-ring/40 data-[disabled]:cursor-not-allowed cursor-grab hover:scale-105"
        onPointerDown={handlePointerDown}
      />
    );

    if (!showTooltip) return thumb;

    return (
      <TooltipProvider>
        <Tooltip open={showTooltipState}>
          <TooltipTrigger asChild>{thumb}</TooltipTrigger>
          <TooltipContent
            className="px-2 py-1 text-xs"
            sideOffset={8}
            side={props.orientation === "vertical" ? "right" : "top"}
          >
            <p>{tooltipContent ? tooltipContent(value) : value}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex w-full touch-none select-none items-center rounded-lg",
        className,
      )}
      onValueChange={handleValueChange}
      {...props}
    >
      <SliderPrimitive.Track className="relative grow overflow-hidden rounded-full bg-transparent data-[orientation=horizontal]:h-[3px] data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-1 [background-image:linear-gradient(90deg,transparent_50%,#E4E4E7_50%)] bg-[length:6px_3px] bg-repeat-x bg-center">
        <SliderPrimitive.Range className="absolute bg-black data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full" />
      </SliderPrimitive.Track>
      {internalValue?.map((value, index) => (
        <React.Fragment key={index}>{renderThumb(value)}</React.Fragment>
      ))}
    </SliderPrimitive.Root>
  );
});
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
