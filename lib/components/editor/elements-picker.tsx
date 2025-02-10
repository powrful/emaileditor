import { Button } from "@/components/ui/button";
import type { TemplateSchemaType } from "@/schemas/template";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
type PickerProps = {
  trigger: React.ReactNode;
  template: TemplateSchemaType;
  setTemplate: (template: TemplateSchemaType) => void;
  parentRowId?: string;
  parentColumnId?: string;
  parentElementId?: string;
};

import {
  Heading,
  Image,
  LetterText,
  SquareMousePointer,
  SquareSplitVertical,
} from "lucide-react";

export const ElementsPicker = ({
  trigger,
  template,
  setTemplate,
  parentRowId,
  parentColumnId,
  parentElementId,
}: PickerProps) => {
  const addElement = ({ type }: { type: string }) => {
    console.log(
      "Adding block",
      { type, parentRowId, parentColumnId, parentElementId },
      { template },
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-[300px] bg-background dark:bg-sidebar border dark:border-sidebar-border">
        <div className="grid grid-cols-4 gap-4 p-2">
          {[
            { icon: <LetterText />, label: "Text", type: "text" },
            { icon: <Heading />, label: "Heading", type: "heading" },
            {
              icon: <SquareMousePointer />,
              label: "Button",
              type: "button",
            },
            { icon: <Image />, label: "Image", type: "image" },
            {
              icon: <SquareSplitVertical />,
              label: "Divider",
              type: "divider",
            },
          ].map((item) => (
            <div
              key={item.type}
              className="flex flex-col items-center justify-center"
            >
              <Button
                variant="outline"
                size="icon"
                className="w-12 h-12 dark:bg-sidebar dark:hover:bg-sidebar-accent dark:border-sidebar-border"
                onClick={() => {
                  addElement({ type: item.type });
                }}
              >
                {item.icon}
              </Button>
              <p className="text-xs mt-1 dark:text-sidebar-foreground">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
