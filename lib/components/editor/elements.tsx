import { Button } from "@/components/ui/button";
import type { TemplateSchemaType } from "@/schemas/template";
import { ChevronLeft } from "lucide-react";
import { Fragment } from "react";

import {
  ButtonEditor,
  HeadingEditor,
  HrEditor,
  ImgEditor,
  LinkEditor,
  TextEditor,
} from "@/components/elements";

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

  const element = getElement(activeElement?.id || "");

  const ElementEditor = () => {
    switch (activeElement?.type) {
      case "button":
        return <ButtonEditor {...element} />;
      case "text":
        return <TextEditor {...element} />;
      case "image":
        return <ImgEditor {...element} />;
      case "link":
        return <LinkEditor {...element} />;
      case "heading":
        return <HeadingEditor {...element} />;
      case "hr":
        return <HrEditor {...element} />;
      default:
        return <div>Element not found</div>;
    }
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
          {activeElement ? element?.title : "Element"}
        </h2>
      </div>

      <div className="flex flex-col gap-2 px-5">
        <ElementEditor />
      </div>
    </Fragment>
  );
};
