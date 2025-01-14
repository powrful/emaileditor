import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/utils";
import { Fullscreen } from "lucide-react";
import { forwardRef } from "react";

interface FullscreenButtonProps extends React.ComponentProps<typeof Button> {
  onClick?: () => void;
  variant?: "outline" | "ghost";
}

export const FullscreenButton = forwardRef<
  React.ElementRef<typeof Button>,
  FullscreenButtonProps
>(({ variant, onClick, ...props }, ref) => {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      ref={ref}
      data-sidebar="trigger"
      variant={variant}
      size="iconSm"
      className={cn("h-7 w-7")}
      onClick={(_event) => {
        onClick;
        toggleSidebar();
      }}
      {...props}
    >
      <Fullscreen className="w-[10px] h-[10px]" />
      <span className="sr-only">Toggle Fullscreen</span>
    </Button>
  );
});

FullscreenButton.displayName = "FullscreenButton";
