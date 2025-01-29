import { Button } from "@/components/ui/button";
import type { TemplateSchemaType } from "@/schemas/template";
import type {
  ColumnWithChildrenType,
  RowWithChildrenType,
} from "@/schemas/template";
import { ImagePlus, LetterText, SquareMousePointer } from "lucide-react";
import { useState } from "react";
import { EmptyState } from "./empty";
import { Picker } from "./picker";
import { CollapsibleRows } from "./rows";
type DesignEditorProps = {
  template: TemplateSchemaType;
  setTemplate: (template: TemplateSchemaType) => void;
};

const RowDropDown = ({ row }: { row: RowWithChildrenType }) => {
  const [isOpen, setIsOpen] = useState(false);
  console.log({ row });
  return <div>{row.type}</div>;
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
            <Picker
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
          {/* <h2 className="font-bold mb-4">Template</h2> */}
          {/* {template.container.children.map((child) => {
            return <CollapsibleRows key={child.id} />;
          })} */}
          <CollapsibleRows template={template} setTemplate={setTemplate} />
        </div>
      )}
    </>
  );
};
