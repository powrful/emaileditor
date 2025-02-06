import { Tooltip } from "@/components/custom/tooltip";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils";

export const ToggleButton = ({
  id,
  selected,
  onChange,
  items,
}: {
  id: string;
  selected: string;
  onChange: (id: string) => void;
  items: { id: string; label: string; icon: React.ReactNode }[];
}) => {
  return (
    <div className="flex gap-0 bg-accent/20 dark:bg-muted/40 rounded-md p-0.5 w-full">
      <div className="flex w-full justify-between">
        {items.map((item) => (
          <Tooltip text={item.label} key={item.id}>
            <Button
              id={`${id}-${item.id}`}
              size="icon"
              variant="ghost"
              className={cn(
                "h-8 w-8",
                selected === item.id
                  ? "bg-background dark:bg-muted-foreground/10 text-foreground shadow-sm hover:bg-background/90 dark:hover:bg-muted-foreground/20"
                  : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground dark:hover:bg-muted-foreground/10 dark:text-muted-foreground/70",
              )}
              onClick={() => onChange(item.id)}
            >
              {item.icon}
            </Button>
          </Tooltip>
        ))}
      </div>
    </div>
  );
};
