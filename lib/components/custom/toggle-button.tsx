import { Tooltip } from "@/components/custom/tooltip";
import { Button } from "@/components/ui/button";

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
    <div className="flex gap-0 bg-secondary rounded-md p-0.5 w-full">
      <div className="flex w-full justify-between">
        {items.map((item) => (
          <Tooltip text={item.label} key={item.id}>
            <Button
              id={`${id}-${item.id}`}
              size="icon"
              variant="ghost"
              className={`h-8 w-8 ${
                selected === item.id
                  ? "bg-background shadow-sm hover:bg-background"
                  : "hover:bg-secondary-hover"
              }`}
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
