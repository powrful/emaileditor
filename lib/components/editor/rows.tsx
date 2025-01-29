import { Tooltip } from "@/components/custom/tooltip";
import { Picker } from "@/components/editor/picker";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import type { TemplateSchemaType } from "@/schemas/template";

import { BetweenHorizontalStart, BetweenVerticalEnd, Plus } from "lucide-react";

type CollapsibleRowsProps = {
  template: TemplateSchemaType;
  setTemplate: (template: TemplateSchemaType) => void;
};

export const CollapsibleRows = ({
  template,
  setTemplate,
}: CollapsibleRowsProps) => {
  return (
    <div className="space-y-4">
      <h2 className="font-bold">Template</h2>
      <Accordion type="multiple" className="w-full">
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
                <span>
                  {row.type} - {row.columns}
                </span>
              </span>
            </AccordionTrigger>

            <div className="absolute w-full opacity-0 transition-opacity -bottom-[4px] z-10 group/row">
              <div className="relative h-2">
                <div className="absolute inset-x-0 h-[2px] bg-blue-600 opacity-50 rounded-full origin-center scale-x-0 group-hover/row:scale-x-100 transition-transform duration-300 mx-1" />
                <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <Tooltip text="Add row">
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
                  </Tooltip>
                </div>
              </div>
            </div>

            {/* Column accordian */}
            <AccordionContent className="p-0">
              <Accordion type="multiple" className="w-full">
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
                        <span>{column.type}</span>
                      </span>
                    </AccordionTrigger>

                    <AccordionContent className="p-0 ml-12 mb-4 text-xs">
                      {column.children.map((element) => (
                        <div key={element.id}>{element.type}</div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
