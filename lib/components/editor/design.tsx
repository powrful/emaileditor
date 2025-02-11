import { Button } from "@/components/ui/button";
import type { TemplateSchemaType } from "@/schemas/template";
import { ImagePlus, LetterText, SquareMousePointer } from "lucide-react";
import { EmptyState } from "./empty";
import { CollapsibleRows } from "./rows";
import { RowsPicker } from "./rows-picker";
type DesignEditorProps = {
  template: TemplateSchemaType;
  setTemplate: (template: TemplateSchemaType) => void;
};

export const DesignEditor = ({ template, setTemplate }: DesignEditorProps) => {
  return (
    <>
      {template.container?.children?.length === 0 ? (
        <EmptyState
          title="Template is empty"
          description="You can start by adding a block to your template."
          icons={[SquareMousePointer, ImagePlus, LetterText]}
          cta={
            <RowsPicker
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
      ) : (
        <div>
          <CollapsibleRows template={template} setTemplate={setTemplate} />
        </div>
      )}
    </>
  );
};
