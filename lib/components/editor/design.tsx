import { Button } from "@/components/ui/button";
import { ImagePlus, LetterText, SquareMousePointer } from "lucide-react";
import { BlockPicker } from "./block-picker";
import { EmptyState } from "./empty-state";

export const DesignEditor = () => {
  return (
    <EmptyState
      title="Template is empty"
      description="You can start by adding a block to your template."
      icons={[SquareMousePointer, ImagePlus, LetterText]}
      cta={
        <BlockPicker
          trigger={
            <Button
              size="sm"
              variant="outline"
              className="mt-4 shadow-sm active:shadow-none"
            >
              Get started
            </Button>
          }
        />
      }
    />
  );
};
