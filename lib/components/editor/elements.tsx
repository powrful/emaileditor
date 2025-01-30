import { Button } from "@/components/ui/button";
import type { TemplateSchemaType } from "@/schemas/template";
import { ChevronLeft } from "lucide-react";
import { Fragment } from "react";

export type ActiveElementType = {
  id: string;
  type: string;
} | null;

export const ElementsEditor = ({
  template,
  setTemplate,
  activeElement,
  setActiveElement,
}: {
  template: TemplateSchemaType;
  setTemplate: (template: TemplateSchemaType) => void;
  activeElement: ActiveElementType;
  setActiveElement: (activeElement: ActiveElementType) => void;
}) => {
  const getElement = (id: string) => {
    const findInChildren = (children: any[]): any => {
      for (const child of children) {
        if (child.id === id) return child;
        if (child.children) {
          const found = findInChildren(child.children);
          if (found) return found;
        }
      }
      return null;
    };

    return findInChildren(template.container.children);
  };

  return (
    <Fragment>
      <div className="flex items-center gap-1 border-b pt-0 pb-2 px-2">
        <Button
          variant="ghost"
          size="iconSm"
          onClick={() => setActiveElement(null)}
        >
          <ChevronLeft size={16} />
        </Button>

        <h2 className="font-semibold text-[14px]">
          {activeElement ? getElement(activeElement.id)?.title : "Element"}
        </h2>
      </div>

      <div className="flex flex-col gap-2 px-5">
        <p className="text-[14px]">Editor</p>
        <p className="text-[14px]">Content</p>
      </div>
    </Fragment>
  );
};
