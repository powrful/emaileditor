import { Button } from "@/components/ui/button";
import type { TemplateSchemaType } from "@/schemas/template";
import { ChevronLeft } from "lucide-react";
import { Fragment, useCallback, useMemo } from "react";

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
  const getElement = useCallback(
    (id: string) => {
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
    },
    [template.container.children],
  );

  const element = useMemo(
    () => (activeElement ? getElement(activeElement.id) : null),
    [activeElement, getElement],
  );

  const handleChange = useCallback(
    (values: Partial<any>) => {
      const updateChildren = (children: any[]): any[] => {
        return children.map((child) => {
          if (child.id === activeElement?.id) {
            return { ...child, ...values };
          }
          if (child.children) {
            return {
              ...child,
              children: updateChildren(child.children),
            };
          }
          return child;
        });
      };

      const newTemplate = {
        ...template,
        container: {
          ...template.container,
          children: updateChildren(template.container.children),
        },
      };

      setTemplate(newTemplate);
    },
    [activeElement?.id, template, setTemplate],
  );

  const ElementEditor = useMemo(() => {
    if (!activeElement || !element) return null;

    switch (activeElement.type) {
      case "button":
        return <ButtonEditor {...element} onChange={handleChange} />;
      case "text":
        return <TextEditor {...element} onChange={handleChange} />;
      case "image":
        return <ImgEditor {...element} onChange={handleChange} />;
      case "link":
        return <LinkEditor {...element} />;
      case "heading":
        return <HeadingEditor {...element} onChange={handleChange} />;
      case "hr":
        return <HrEditor {...element} />;
      default:
        return <div>Element not found</div>;
    }
  }, [activeElement, element, handleChange]);

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

      <div className="flex flex-col gap-2 px-5">{ElementEditor}</div>
    </Fragment>
  );
};
