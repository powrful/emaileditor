import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { TemplateSchemaType } from "@/schemas/template";

import rows1 from "@/images/rows/1.webp";
import rows2 from "@/images/rows/2.webp";
import rows3 from "@/images/rows/3.webp";
import rows4 from "@/images/rows/4.webp";
import rows5 from "@/images/rows/5.webp";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
type BlockPickerProps = {
  trigger: React.ReactNode;
  template: TemplateSchemaType;
  setTemplate: (template: TemplateSchemaType) => void;
};

import {
  BetweenHorizonalStart,
  Columns2,
  Heading,
  Image,
  LetterText,
  Rows2,
  SquareMousePointer,
  SquareSplitVertical,
} from "lucide-react";

type AddBlockType = {
  type: string;
  position?: "after" | "within"; // default "after"
  positionId?: string;
};

export const BlockPicker = ({
  trigger,
  template,
  setTemplate,
}: BlockPickerProps) => {
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
            <div className="flex flex-col gap-4 p-2">
              <img
                className="hover:cursor-pointer hover:shadow-md"
                src={rows1}
                alt="100 % row"
                onClick={() => {
                  addRow({ type: "100" });
                }}
              />
              <img
                className="hover:cursor-pointer hover:shadow-md"
                src={rows2}
                alt="50/50 % row"
                onClick={() => {
                  addRow({ type: "50/50" });
                }}
              />
              <img
                className="hover:cursor-pointer hover:shadow-md"
                src={rows3}
                alt="33/33/33 % row"
                onClick={() => {
                  addRow({ type: "33/33/33" });
                }}
              />
              <img
                className="hover:cursor-pointer hover:shadow-md"
                src={rows4}
                alt="70/30 % row"
                onClick={() => {
                  addRow({ type: "70/30" });
                }}
              />
              <img
                className="hover:cursor-pointer hover:shadow-md"
                src={rows5}
                alt="30/70 % row"
                onClick={() => {
                  addRow({ type: "30/70" });
                }}
              />
            </div>
          </TabsContent>

          <TabsContent value="elements">
            <div className="grid grid-cols-4 gap-4 p-2">
              {/* <div className="flex flex-col items-center justify-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="w-12 h-12"
                  onClick={() => {
                    addBlock({ type: "row" });
                  }}
                >
                  <Rows2 />
                </Button>
                <p className="text-xs mt-1">Row</p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="w-12 h-12"
                  onClick={() => {
                    addBlock({ type: "column" });
                  }}
                >
                  <Columns2 />
                </Button>
                <p className="text-xs mt-1">Column</p>
              </div> */}

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

              <div className="flex flex-col items-center justify-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="w-12 h-12"
                  onClick={() => {
                    addBlock({ type: "spacer" });
                  }}
                >
                  <BetweenHorizonalStart />
                </Button>
                <p className="text-xs mt-1">Spacer</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
