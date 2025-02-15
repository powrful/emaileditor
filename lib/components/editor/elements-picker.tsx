import { buttonDefaultValues } from "@/components/editor/elements/button";
import { headingDefaultValues } from "@/components/editor/elements/heading";
import { hrDefaultValues } from "@/components/editor/elements/hr";
import { imageDefaultValues } from "@/components/editor/elements/image";
import { textDefaultValues } from "@/components/editor/elements/text";
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
  afterElementId?: string | null;
};

import { createId } from "@/utils";
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
  afterElementId,
}: PickerProps) => {
  const addElement = ({ type }: { type: string }) => {
    const newTemplate = { ...template };

    let el;

    switch (type) {
      case "text":
        el = textDefaultValues({
          id: createId(),
          type: "text",
          html: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        });
        break;
      case "heading":
        el = headingDefaultValues({
          id: createId(),
          type: "heading",
        });
        break;
      case "button":
        el = buttonDefaultValues({
          id: createId(),
          type: "button",
        });
        break;
      case "image":
        el = imageDefaultValues({
          id: createId(),
          type: "image",
        });
        break;
      case "divider":
        el = hrDefaultValues({
          id: createId(),
          type: "hr",
        });
        break;
      default:
        return;
    }

    if (parentRowId && parentColumnId) {
      // Find the parent row
      const row = newTemplate.container.children.find(
        (r) => r.id === parentRowId,
      );
      if (!row) return;

      // Find the parent column
      const column = row.children.find((c) => c.id === parentColumnId);
      if (!column) return;

      // If afterElementId is provided, insert after that element
      if (afterElementId) {
        const elementIndex = column.children.findIndex(
          (e) => e.id === afterElementId,
        );
        if (elementIndex !== -1) {
          column.children.splice(elementIndex + 1, 0, el);
        }
      } else {
        // If no afterElementId, append to end of column
        column.children.push(el);
      }

      setTemplate(newTemplate);
    }
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
