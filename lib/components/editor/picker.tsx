import { newRow } from "@/components/elements/row";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { TemplateSchemaType } from "@/schemas/template";

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

import {
  Heading,
  Image,
  LetterText,
  SquareMousePointer,
  SquareSplitVertical,
} from "lucide-react";

type AddBlockType = {
  type: string;
  position?: "after" | "within"; // default "after"
  positionId?: string;
};

export const Picker = ({
  trigger,
  template,
  setTemplate,
  parentRowId,
}: PickerProps) => {
  const addBlock = ({ type, position = "after", positionId }: AddBlockType) => {
    console.log(
      "Adding block",
      { type },
      { position },
      { positionId },
      { template },
    );
  };

  const addRow = ({
    type,
  }: {
    type: "100" | "50/50" | "33/33/33" | "70/30" | "30/70";
  }) => {
    setTemplate((prev) => {
      const row = newRow({ columns: type });

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
        <Tabs defaultValue="rows" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-muted/40 dark:bg-sidebar-accent">
            <TabsTrigger
              value="rows"
              className="text-xs data-[state=active]:bg-background dark:data-[state=active]:bg-sidebar dark:text-sidebar-foreground"
            >
              Rows
            </TabsTrigger>
            <TabsTrigger
              value="elements"
              className="text-xs data-[state=active]:bg-background dark:data-[state=active]:bg-sidebar dark:text-sidebar-foreground"
            >
              Elements
            </TabsTrigger>
          </TabsList>

          <TabsContent value="rows">
            <div className="flex flex-col gap-2 p-2">
              <Row1
                className="hover:cursor-pointer hover:border-2 hover:border-gray-300 dark:hover:border-sidebar-border rounded-md w-full"
                onClick={() => {
                  addRow({ type: "100" });
                }}
              />
              <Row2
                className="hover:cursor-pointer hover:border-2 hover:border-gray-300 dark:hover:border-sidebar-border rounded-md w-full"
                onClick={() => {
                  addRow({ type: "50/50" });
                }}
              />
              <Row3
                className="hover:cursor-pointer hover:border-2 hover:border-gray-300 dark:hover:border-sidebar-border rounded-md w-full"
                onClick={() => {
                  addRow({ type: "33/33/33" });
                }}
              />
              <Row4
                className="hover:cursor-pointer hover:border-2 hover:border-gray-300 dark:hover:border-sidebar-border rounded-md w-full"
                onClick={() => {
                  addRow({ type: "70/30" });
                }}
              />
              <Row5
                className="hover:cursor-pointer hover:border-2 hover:border-gray-300 dark:hover:border-sidebar-border rounded-md w-full"
                onClick={() => {
                  addRow({ type: "30/70" });
                }}
              />
            </div>
          </TabsContent>

          <TabsContent value="elements">
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
                      addBlock({ type: item.type });
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
          </TabsContent>
        </Tabs>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
