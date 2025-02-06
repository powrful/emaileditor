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

export const Picker = ({ trigger, template, setTemplate }: PickerProps) => {
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
    console.log("Adding row", { type });
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
              <Row1 className="hover:cursor-pointer hover:border-2 hover:border-gray-300 dark:hover:border-sidebar-border rounded-md w-full" />
              <Row2 className="hover:cursor-pointer hover:border-2 hover:border-gray-300 dark:hover:border-sidebar-border rounded-md w-full" />
              <Row3 className="hover:cursor-pointer hover:border-2 hover:border-gray-300 dark:hover:border-sidebar-border rounded-md w-full" />
              <Row4 className="hover:cursor-pointer hover:border-2 hover:border-gray-300 dark:hover:border-sidebar-border rounded-md w-full" />
              <Row5 className="hover:cursor-pointer hover:border-2 hover:border-gray-300 dark:hover:border-sidebar-border rounded-md w-full" />
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
