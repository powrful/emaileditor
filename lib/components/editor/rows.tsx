import {
  type ActiveElementType,
  ElementsEditor,
} from "@/components/editor/elements";
import { Picker } from "@/components/editor/picker";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import type { TemplateSchemaType } from "@/schemas/template";
import { Fragment, useState } from "react";

import {
  SquareMousePointer as ButtonIcon,
  GalleryHorizontalEnd as ColumnIcon,
  GripVertical,
  Heading,
  SquareSplitVertical as HrIcon,
  Image,
  Plus,
  LayoutList as RowIcon,
  LetterText as TextIcon,
  Trash,
} from "lucide-react";

type CollapsibleRowsProps = {
  template: TemplateSchemaType;
  setTemplate: (template: TemplateSchemaType) => void;
};

const ColumnChildIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "text":
      return <TextIcon size={16} className="shrink-0 opacity-80" />;
    case "heading":
      return <Heading size={16} className="shrink-0 opacity-80" />;
    case "button":
      return <ButtonIcon size={16} className="shrink-0 opacity-80" />;
    case "image":
      return <Image size={16} className="shrink-0 opacity-80" />;
    case "hr":
      return <HrIcon size={16} className="shrink-0 opacity-80" />;
  }
};

export const CollapsibleRows = ({
  template,
  setTemplate,
}: CollapsibleRowsProps) => {
  const [activeElement, setActiveElement] = useState<ActiveElementType | null>(
    null,
  );

  const [activeRow, setActiveRow] = useState<string | null>(null);
  const [activeColumn, setActiveColumn] = useState<string | null>(null);

  const deleteElement = (id: string) => {
    setTemplate((prev) => {
      // Helper function to remove element by ID from children array
      function removeElementById<T extends { id: string; children?: any[] }>(
        items: T[],
        parentType?: "container" | "row" | "column",
      ): T[] {
        return items
          .map((item) => {
            // Check if this is the item to delete
            if (item.id === id) return null;

            // If item has children, recursively check them
            if ("children" in item && item.children) {
              const newChildren = removeElementById(
                item.children,
                parentType === "container"
                  ? "row"
                  : parentType === "row"
                    ? "column"
                    : undefined,
              );

              // Return item with filtered children
              return {
                ...item,
                children: newChildren,
              };
            }

            return item;
          })
          .filter(Boolean) as T[];
      }

      // Start from container children
      return {
        ...prev,
        container: {
          ...prev.container,
          children: removeElementById(prev.container.children, "container"),
        },
      };
    });

    // Reset active states if deleted element was selected
    if (activeElement?.id === id) setActiveElement(null);
    if (activeRow === id) setActiveRow(null);
    if (activeColumn === id) setActiveColumn(null);
  };

  return (
    <div className="space-y-4">
      {activeElement ? (
        <ElementsEditor
          template={template}
          setTemplate={setTemplate}
          activeElement={activeElement}
          setActiveElement={setActiveElement}
        />
      ) : (
        <Fragment>
          <h2 className="font-semibold text-[16px] border-b pt-1 pb-3 px-3">
            Template
          </h2>
          <Accordion
            defaultValue={[activeRow || template.container.children[0]?.id]}
            type="multiple"
            className="w-full px-3"
          >
            {template.container.children.map((row) => (
              // Row accordian
              <AccordionItem
                value={row.id}
                key={row.id}
                className="border-none relative hover:[&>div]:opacity-100 group"
                data-row-id={row.id}
              >
                <AccordionTrigger className="justify-start gap-2 text-xs py-1 leading-6 hover:no-underline [&>svg]:-order-1 group/row-trigger">
                  <span className="flex items-center gap-2 flex-1">
                    <span className="group/icon">
                      <RowIcon
                        size={16}
                        className="shrink-0 opacity-80 group-hover/icon:hidden"
                      />
                      <GripVertical
                        size={16}
                        className="shrink-0 opacity-80 hidden group-hover/icon:block cursor-grab"
                      />
                    </span>
                    <span>{row.title}</span>
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteElement(row.id);
                    }}
                  >
                    <Trash
                      size={14}
                      className="text-gray-400 opacity-0 group-hover/row-trigger:opacity-100 hover:text-red-500 transition-opacity cursor-pointer"
                    />
                  </button>
                </AccordionTrigger>

                <div className="absolute w-full opacity-0 transition-opacity -bottom-[4px] z-10 group/row">
                  <div className="relative h-2">
                    <div className="absolute inset-x-0 h-[2px] bg-blue-600 opacity-50 rounded-full origin-center scale-x-0 group-hover/row:scale-x-100 transition-transform duration-300 mx-1" />
                    <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <Picker
                        template={template}
                        setTemplate={setTemplate}
                        trigger={
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6 rounded-full bg-blue-500 hover:bg-blue-600"
                          >
                            <Plus className="h-2 w-2 text-white" />
                          </Button>
                        }
                      />
                    </div>
                  </div>
                </div>

                {/* Column accordian */}
                <AccordionContent className="p-0">
                  <Accordion
                    defaultValue={[activeColumn || row.children[0]?.id]}
                    type="multiple"
                    className="w-full"
                  >
                    {row.children.map((column) => (
                      // Column accordian
                      <AccordionItem
                        value={column.id}
                        key={column.id}
                        className="border-none"
                      >
                        <AccordionTrigger className="ml-6 justify-start gap-2 text-xs py-1 leading-6 hover:no-underline [&>svg]:-order-1 group/column-trigger">
                          <span className="flex items-center gap-2 flex-1">
                            <ColumnIcon
                              size={16}
                              className="shrink-0 opacity-80"
                            />
                            <span>{column.title}</span>
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteElement(column.id);
                            }}
                          >
                            <Trash
                              size={14}
                              className="text-gray-400 opacity-0 group-hover/column-trigger:opacity-100 hover:text-red-500 transition-opacity cursor-pointer"
                            />
                          </button>
                        </AccordionTrigger>

                        <AccordionContent className="p-0 ml-10 mb-1 text-xs">
                          {column.children.map((element) => (
                            <div
                              key={element.id}
                              className="w-full text-xs justify-start"
                            >
                              <div
                                className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-md group/element"
                                key={element.id}
                              >
                                <div
                                  className="flex items-start gap-2 w-full cursor-pointer"
                                  onClick={() => {
                                    setActiveElement({
                                      id: element.id,
                                      type: element.type,
                                    });
                                    setActiveRow(row.id);
                                    setActiveColumn(column.id);
                                  }}
                                >
                                  <ColumnChildIcon type={element.type} />
                                  <span className="flex-1">
                                    {element.title}
                                  </span>
                                </div>
                                <button>
                                  <Trash
                                    size={14}
                                    className="text-gray-400 opacity-0 group-hover/element:opacity-100 hover:text-red-500 transition-opacity cursor-pointer"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      deleteElement(element.id);
                                    }}
                                  />
                                </button>
                              </div>
                            </div>
                          ))}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Fragment>
      )}
    </div>
  );
};
