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
    <div className="flex gap-2 bg-gray-100 rounded-lg p-[2px] w-full">
      {items.map((item) => (
        <Tooltip text={item.label} key={item.id}>
          <Button
            id={`${id}-${item.id}`}
            size="iconSm"
            variant={selected === item.id ? "outline" : "ghost"}
            onClick={() => onChange(item.id)}
            className="w-full"
          >
            {item.icon}
          </Button>
        </Tooltip>
      ))}
    </div>
  );
};
