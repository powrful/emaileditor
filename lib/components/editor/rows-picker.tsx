import { rowDefaultValues } from "@/components/elements/row";
import type { TemplateSchemaType } from "@/schemas/template";
import { createId } from "@/utils";

import {
  Row1,
  Row2,
  Row3,
  Row4,
  Row5,
} from "@/components/editor/placeholders/rows";

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
};

export const RowsPicker = ({
  trigger,
  setTemplate,
  parentRowId,
}: PickerProps) => {
  const addRow = ({
    id,
    type,
  }: {
    id: string;
    type: "100" | "50/50" | "33/33/33" | "70/30" | "30/70";
  }) => {
    setTemplate((prev) => {
      const row = rowDefaultValues({ id, columns: type });

      if (!parentRowId) {
        return {
          ...prev,
          container: {
            ...prev.container,
            children: [...prev.container.children, row],
          },
        };
      }

      // Insert after parentRowId
      const newChildren = [...prev.container.children];
      const parentIndex = newChildren.findIndex(
        (child) => child.id === parentRowId,
      );

      if (parentIndex !== -1) {
        newChildren.splice(parentIndex + 1, 0, row);
      }

      return {
        ...prev,
        container: {
          ...prev.container,
          children: newChildren,
        },
      };
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-[300px] bg-background dark:bg-sidebar border dark:border-sidebar-border">
        <div className="flex flex-col gap-2 p-2">
          <Row1
            className="hover:cursor-pointer hover:border-2 hover:border-gray-300 dark:hover:border-sidebar-border rounded-md w-full"
            onClick={() => {
              addRow({ id: createId(), type: "100" });
            }}
          />
          <Row2
            className="hover:cursor-pointer hover:border-2 hover:border-gray-300 dark:hover:border-sidebar-border rounded-md w-full"
            onClick={() => {
              addRow({ id: createId(), type: "50/50" });
            }}
          />
          <Row3
            className="hover:cursor-pointer hover:border-2 hover:border-gray-300 dark:hover:border-sidebar-border rounded-md w-full"
            onClick={() => {
              addRow({ id: createId(), type: "33/33/33" });
            }}
          />
          <Row4
            className="hover:cursor-pointer hover:border-2 hover:border-gray-300 dark:hover:border-sidebar-border rounded-md w-full"
            onClick={() => {
              addRow({ id: createId(), type: "70/30" });
            }}
          />
          <Row5
            className="hover:cursor-pointer hover:border-2 hover:border-gray-300 dark:hover:border-sidebar-border rounded-md w-full"
            onClick={() => {
              addRow({ id: createId(), type: "30/70" });
            }}
          />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
