import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
type BlockPickerProps = {
  trigger: React.ReactNode;
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

export const BlockPicker = ({ trigger }: BlockPickerProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-[400px]">
        <div className="grid grid-cols-4 gap-4 p-2">
          <div className="flex flex-col items-center justify-center">
            <Button variant="outline" size="icon" className="w-12 h-12">
              <Rows2 />
            </Button>
            <p className="text-xs mt-1">Row</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <Button variant="outline" size="icon" className="w-12 h-12">
              <Columns2 />
            </Button>
            <p className="text-xs mt-1">Column</p>
          </div>

          <div className="flex flex-col items-center justify-center">
            <Button variant="outline" size="icon" className="w-12 h-12">
              <LetterText />
            </Button>
            <p className="text-xs mt-1">Text</p>
          </div>

          <div className="flex flex-col items-center justify-center">
            <Button variant="outline" size="icon" className="w-12 h-12">
              <Heading />
            </Button>
            <p className="text-xs mt-1">Heading</p>
          </div>

          <div className="flex flex-col items-center justify-center">
            <Button variant="outline" size="icon" className="w-12 h-12">
              <SquareMousePointer />
            </Button>
            <p className="text-xs mt-1">Button</p>
          </div>

          <div className="flex flex-col items-center justify-center">
            <Button variant="outline" size="icon" className="w-12 h-12">
              <Image />
            </Button>
            <p className="text-xs mt-1">Image</p>
          </div>

          <div className="flex flex-col items-center justify-center">
            <Button variant="outline" size="icon" className="w-12 h-12">
              <SquareSplitVertical />
            </Button>
            <p className="text-xs mt-1">Divider</p>
          </div>

          <div className="flex flex-col items-center justify-center">
            <Button variant="outline" size="icon" className="w-12 h-12">
              <BetweenHorizonalStart />
            </Button>
            <p className="text-xs mt-1">Spacer</p>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
