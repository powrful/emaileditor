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
      <DropdownMenuContent className="w-[300px]">
        {/* Elements */}
        <Tabs defaultValue="rows" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="rows" className="text-xs">
              Rows
            </TabsTrigger>
            <TabsTrigger value="elements" className="text-xs">
              Elements
            </TabsTrigger>
          </TabsList>
          <TabsContent value="rows">
            <div className="flex flex-col gap-2 p-2">
              <Row1 className="hover:cursor-pointer hover:border-2 hover:border-gray-300 dark:hover:border-gray-600 rounded-md w-full" />
              <Row2 className="hover:cursor-pointer hover:border-2 hover:border-gray-300 dark:hover:border-gray-600 rounded-md w-full" />
              <Row3 className="hover:cursor-pointer hover:border-2 hover:border-gray-300 dark:hover:border-gray-600 rounded-md w-full" />
              <Row4 className="hover:cursor-pointer hover:border-2 hover:border-gray-300 dark:hover:border-gray-600 rounded-md w-full" />
              <Row5 className="hover:cursor-pointer hover:border-2 hover:border-gray-300 dark:hover:border-gray-600 rounded-md w-full" />
            </div>
          </TabsContent>

          <TabsContent value="elements">
            <div className="grid grid-cols-4 gap-4 p-2">
              <div className="flex flex-col items-center justify-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="w-12 h-12"
                  onClick={() => {
                    addBlock({ type: "text" });
                  }}
                >
                  <LetterText />
                </Button>
                <p className="text-xs mt-1">Text</p>
              </div>

              <div className="flex flex-col items-center justify-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="w-12 h-12"
                  onClick={() => {
                    addBlock({ type: "heading" });
                  }}
                >
                  <Heading />
                </Button>
                <p className="text-xs mt-1">Heading</p>
              </div>

              <div className="flex flex-col items-center justify-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="w-12 h-12"
                  onClick={() => {
                    addBlock({ type: "button" });
                  }}
                >
                  <SquareMousePointer />
                </Button>
                <p className="text-xs mt-1">Button</p>
              </div>

              <div className="flex flex-col items-center justify-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="w-12 h-12"
                  onClick={() => {
                    addBlock({ type: "image" });
                  }}
                >
                  <Image />
                </Button>
                <p className="text-xs mt-1">Image</p>
              </div>

              <div className="flex flex-col items-center justify-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="w-12 h-12"
                  onClick={() => {
                    addBlock({ type: "divider" });
                  }}
                >
                  <SquareSplitVertical />
                </Button>
                <p className="text-xs mt-1">Divider</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
