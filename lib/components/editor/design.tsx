import { Button } from "@/components/ui/button";
import type { TemplateSchemaType } from "@/schemas/template";
import { ImagePlus, LetterText, SquareMousePointer } from "lucide-react";
import { BlockPicker } from "./block-picker";
import { EmptyState } from "./empty-state";

type DesignEditorProps = {
  template: TemplateSchemaType;
  setTemplate: (template: TemplateSchemaType) => void;
};

export const DesignEditor = ({ template, setTemplate }: DesignEditorProps) => {
  return (
    <EmptyState
      title="Template is empty"
      description="You can start by adding a block to your template."
      icons={[SquareMousePointer, ImagePlus, LetterText]}
      cta={
        <BlockPicker
          template={template}
          setTemplate={setTemplate}
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
