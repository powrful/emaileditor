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

import { BetweenHorizontalStart, BetweenVerticalEnd, Plus } from "lucide-react";

import {
  Heading,
  Image,
  LetterText,
  Link2,
  SquareMousePointer,
  SquareSplitVertical,
} from "lucide-react";

type CollapsibleRowsProps = {
  template: TemplateSchemaType;
  setTemplate: (template: TemplateSchemaType) => void;
};

const ColumnChildIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "text":
      return <LetterText size={16} className="shrink-0 opacity-80" />;
    case "heading":
      return <Heading size={16} className="shrink-0 opacity-80" />;
    case "button":
      return <SquareMousePointer size={16} className="shrink-0 opacity-80" />;
    case "image":
      return <Image size={16} className="shrink-0 opacity-80" />;
    case "hr":
      return <SquareSplitVertical size={16} className="shrink-0 opacity-80" />;
    case "link":
      return <Link2 size={16} className="shrink-0 opacity-80" />;
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
            defaultValue={[activeRow || template.container.children[0].id]}
            type="multiple"
            className="w-full px-3"
          >
            {template.container.children.map((row) => (
              <AccordionItem
                value={row.id}
                key={row.id}
                className="border-none relative hover:[&>div]:opacity-100 group"
                data-row-id={row.id}
              >
                <AccordionTrigger className="justify-start gap-2 text-xs py-1 leading-6 hover:no-underline [&>svg]:-order-1">
                  <span className="flex items-center gap-2">
                    <BetweenHorizontalStart
                      size={16}
                      className="shrink-0 opacity-80"
                    />
                    <span>{row.title}</span>
                  </span>
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
                    defaultValue={[activeColumn || row.children[0].id]}
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
                        <AccordionTrigger className=" ml-6 justify-start gap-2 text-xs py-1 leading-6 hover:no-underline [&>svg]:-order-1">
                          <span className="flex items-center gap-2">
                            <BetweenVerticalEnd
                              size={16}
                              className="shrink-0 opacity-80"
                            />
                            <span>{column.title}</span>
                          </span>
                        </AccordionTrigger>

                        <AccordionContent className="p-0 ml-10 mb-1 text-xs">
                          {column.children.map((element) => (
                            <Button
                              key={element.id}
                              asChild
                              variant="ghost"
                              className="w-full text-xs justify-start cursor-pointer"
                              onClick={() => {
                                setActiveElement({
                                  id: element.id,
                                  type: element.type,
                                });
                                setActiveRow(row.id);
                                setActiveColumn(column.id);
                              }}
                            >
                              <div
                                className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-md"
                                key={element.id}
                              >
                                <ColumnChildIcon type={element.type} />
                                <span>{element.title}</span>
                              </div>
                            </Button>
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
