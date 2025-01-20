import type { TemplateType } from "@/components/blocks/elements";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
type BlockPickerProps = {
  trigger: React.ReactNode;
  template: TemplateType;
  setTemplate: (template: TemplateType) => void;
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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-[400px]">
        <div className="grid grid-cols-4 gap-4 p-2">
          <div className="flex flex-col items-center justify-center">
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
          </div>

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
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
