import { Tooltip } from "@/components/custom/tooltip";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

import {
  AtSign,
  BetweenHorizontalStart,
  BetweenVerticalEnd,
  CircleDashed,
  Command,
  Eclipse,
  Gauge,
  Plus,
  Zap,
} from "lucide-react";

const rows = [
  {
    id: "1",
    title: "Header",
    icon: Command,
    columns: [
      {
        id: "1-1",
        title: "Logo",
        content:
          "We optimize every component for maximum performance and minimal bundle size.",
        icon: Gauge,
        elements: [
          {
            id: "1-1-1",
            title: "Text",
            content:
              "We optimize every component for maximum performance and minimal bundle size.",
          },
          {
            id: "1-1-2",
            title: "Text",
            content:
              "We optimize every component for maximum performance and minimal bundle size.",
          },
        ],
      },
    ],
  },
  {
    id: "2",
    title: "Hero",
    icon: Eclipse,
    columns: [
      {
        id: "2-1",
        title: "Image",
        content:
          "Yes, our theming system is fully customizable and supports both light and dark modes.",
        icon: Gauge,
        elements: [
          {
            id: "2-1-1",
            title: "Text",
            content:
              "We optimize every component for maximum performance and minimal bundle size.",
          },
        ],
      },
    ],
  },
  {
    id: "3",
    title: "Features",
    icon: Zap,
    columns: [
      {
        id: "3-1",
        title: "What's the bundle size impact?",
        content:
          "Our components are tree-shakeable and typically add minimal overhead to your bundle.",
        open: true,
        icon: Gauge,
        elements: [
          {
            id: "3-1-1",
            title: "Text",
            content:
              "We optimize every component for maximum performance and minimal bundle size.",
          },
        ],
      },
      {
        id: "3-2",
        title: "How is code splitting handled?",
        content:
          "We support automatic code splitting for optimal loading performance.",
        icon: CircleDashed,
        elements: [
          {
            id: "3-2-1",
            title: "Text",
            content:
              "We optimize every component for maximum performance and minimal bundle size.",
          },
        ],
      },
    ],
  },
  {
    id: "4",
    title: "Footer",
    icon: AtSign,
    columns: [
      {
        id: "4-1",
        title: "Which screen readers are supported?",
        content:
          "We test with NVDA, VoiceOver, and JAWS to ensure broad compatibility.",
        icon: Gauge,
        elements: [
          {
            id: "4-1-1",
            title: "Text",
            content:
              "We optimize every component for maximum performance and minimal bundle size.",
          },
        ],
      },
      {
        id: "4-2",
        title: "What about keyboard navigation?",
        content:
          "Full keyboard navigation support is implemented following WAI-ARIA best practices.",
        icon: CircleDashed,
        elements: [
          {
            id: "4-2-1",
            title: "Text",
            content:
              "We optimize every component for maximum performance and minimal bundle size.",
          },
        ],
      },
    ],
  },
];

export const CollapsibleRows = () => {
  return (
    <div className="space-y-4">
      <h2 className="font-bold">Template</h2>
      <Accordion type="multiple" className="w-full">
        {rows.map((row) => (
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
                <div className="absolute inset-x-0 h-[2px] bg-emerald-800 opacity-30 rounded-full origin-center scale-x-0 group-hover/row:scale-x-100 transition-transform duration-300 mx-1" />
                <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <Tooltip text="Add row">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-6 w-6 rounded-full bg-emerald-500 hover:bg-emerald-700"
                    >
                      <Plus className="h-2 w-2 text-white" />
                    </Button>
                  </Tooltip>
                </div>
              </div>
            </div>

            {/* Column accordian */}
            <AccordionContent className="p-0">
              <Accordion type="multiple" className="w-full">
                {row.columns.map((column) => (
                  // Column accordian
                  <AccordionItem
                    value={column.id}
                    key={column.id}
                    className="border-none"
                  >
                    <AccordionTrigger className=" ml-6 justify-start gap-2 text-xs py-1 leading-6 hover:no-underline [&>svg]:-order-1">
                      <span className="flex items-center gap-2">
                        <BetweenHorizontalStart
                          size={16}
                          className="shrink-0 opacity-80"
                        />
                        <span>{column.title}</span>
                      </span>
                    </AccordionTrigger>

                    <AccordionContent className="p-0 ml-12 mb-4 text-xs">
                      {column.elements.map((element) => (
                        <div key={element.id}>{element.title}</div>
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
