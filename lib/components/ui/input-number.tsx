import { Minus, Plus } from "lucide-react";
import {
  Button,
  Group,
  Input,
  Label,
  NumberField,
} from "react-aria-components";

type NumberInputProps = {
  label: string;
  defaultValue: number;
  minValue: number;
  maxValue: number;
  onChange: (value: number) => void;
};

export const NumberInput = ({ ...props }: NumberInputProps) => {
  return (
    <NumberField
      defaultValue={props.defaultValue}
      minValue={props.minValue}
      maxValue={props.maxValue}
      onChange={props.onChange}
    >
      <div className="space-y-2">
        <Label className="text-xs text-foreground">{props.label}</Label>
        <Group className="relative inline-flex h-7 w-full items-center overflow-hidden whitespace-nowrap rounded-md border border-input bg-background text-sm focus-within:ring-1 focus-within:ring-blue-600 focus-within:border-blue-600">
          <Button
            slot="decrement"
            className="-ms-px flex aspect-square h-[inherit] items-center justify-center border-r border-input bg-background text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Minus size={16} strokeWidth={2} aria-hidden="true" />
          </Button>
          <Input className="w-full grow border-0 bg-transparent px-3 py-2 text-center text-xs tabular-nums text-foreground focus:outline-none disabled:cursor-not-allowed" />
          <Button
            slot="increment"
            className="-me-px flex aspect-square h-[inherit] items-center justify-center border-l border-input bg-background text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Plus size={16} strokeWidth={2} aria-hidden="true" />
          </Button>
        </Group>
      </div>
    </NumberField>
  );
};
