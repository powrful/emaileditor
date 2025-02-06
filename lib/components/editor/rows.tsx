import { Tooltip } from "@/components/custom/tooltip";
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
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Fragment, useState } from "react";

import {
  SquareMousePointer as ButtonIcon,
  CirclePlus,
  GalleryHorizontalEnd as ColumnIcon,
  Grip,
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

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setTemplate((prev) => {
        const oldIndex = prev.container.children.findIndex(
          (row: any) => row.id === active.id,
        );
        const newIndex = prev.container.children.findIndex(
          (row) => row.id === over.id,
        );

        const newChildren = [...prev.container.children];
        const [removed] = newChildren.splice(oldIndex, 1);
        newChildren.splice(newIndex, 0, removed);

        return {
          ...prev,
          container: {
            ...prev.container,
            children: newChildren,
          },
        };
      });
    }
  }

  function SortableRow({
    row,
    children,
  }: { row: any; children: React.ReactNode }) {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id: row.id });

    const style = {
      transform: transform
        ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
        : undefined,
      transition,
      zIndex: isDragging ? 1 : 0,
    };

    return (
      <div ref={setNodeRef} style={style} {...attributes}>
        <AccordionItem
          value={row.id}
          key={row.id}
          className="border-none relative hover:[&>div]:opacity-100 group"
          data-row-id={row.id}
        >
          <AccordionTrigger className="justify-start gap-2 text-xs py-1 leading-6 hover:no-underline [&>svg]:-order-1 group/row-trigger">
            <span className="flex items-center gap-2 flex-1">
              <span className="group/icon" {...listeners}>
                <RowIcon
                  size={16}
                  className="shrink-0 opacity-80 group-hover/icon:hidden"
                />
                <Grip
                  size={16}
                  className="shrink-0 opacity-80 hidden group-hover/icon:block cursor-grab"
                />
              </span>
              <span>{row.title}</span>
            </span>
            <Tooltip text="Delete row">
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
            </Tooltip>
          </AccordionTrigger>
          {children}

          {/* Add a new row */}
          <div className="absolute w-full opacity-0 transition-opacity -bottom-[4px] z-10 group/add-row">
            <div className="relative h-2">
              <div className="absolute inset-x-0 h-[2px] bg-blue-600 opacity-50 rounded-full origin-center scale-x-0 group-hover/add-row:scale-x-100 transition-transform duration-300 mx-1" />
              <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Picker
                  template={template}
                  setTemplate={setTemplate}
                  trigger={
                    <div>
                      <Tooltip text="Add row">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6 rounded-full bg-blue-500 hover:bg-blue-600"
                        >
                          <Plus className="h-2 w-2 text-white" />
                        </Button>
                      </Tooltip>
                    </div>
                  }
                />
              </div>
            </div>
          </div>
        </AccordionItem>
      </div>
    );
  }

  // Create a sortable column component (add after SortableRow)
  function SortableColumn({
    column,
    children,
  }: {
    column: any;
    children: React.ReactNode;
  }) {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id: column.id });

    const style = {
      transform: transform
        ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
        : undefined,
      transition,
      zIndex: isDragging ? 1 : 0,
    };

    return (
      <div ref={setNodeRef} style={style} {...attributes}>
        <AccordionItem
          value={column.id}
          key={column.id}
          className="border-none relative hover:[&>div]:opacity-100 group/column"
        >
          <AccordionTrigger className="ml-6 justify-start gap-2 text-xs py-1 leading-6 hover:no-underline [&>svg]:-order-1 group/column-trigger">
            <span className="flex items-center gap-2 flex-1">
              <span className="group/column-icon" {...listeners}>
                <ColumnIcon
                  size={16}
                  className="shrink-0 opacity-80 group-hover/column-icon:hidden"
                />
                <Grip
                  size={16}
                  className="shrink-0 opacity-80 hidden group-hover/column-icon:block cursor-grab"
                />
              </span>
              <span>{column.title}</span>
            </span>
            <Tooltip text="Delete column">
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
            </Tooltip>
          </AccordionTrigger>
          {children}
        </AccordionItem>
      </div>
    );
  }

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
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={template.container.children.map((row) => row.id)}
              strategy={verticalListSortingStrategy}
            >
              <Accordion
                defaultValue={[activeRow || template.container.children[0]?.id]}
                type="multiple"
                className="w-full px-3"
              >
                {template.container.children.map((row) => (
                  <SortableRow key={row.id} row={row}>
                    <AccordionContent className="p-0">
                      <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={(event) => {
                          const { active, over } = event;
                          if (active.id !== over?.id) {
                            setTemplate((prev) => {
                              const rowIndex =
                                prev.container.children.findIndex(
                                  (r) => r.id === row.id,
                                );
                              const oldIndex = prev.container.children[
                                rowIndex
                              ].children.findIndex(
                                (col) => col.id === active.id,
                              );
                              const newIndex = prev.container.children[
                                rowIndex
                              ].children.findIndex((col) => col.id === over.id);

                              const newChildren = [...prev.container.children];
                              const newColumns = [
                                ...newChildren[rowIndex].children,
                              ];
                              const [removed] = newColumns.splice(oldIndex, 1);
                              newColumns.splice(newIndex, 0, removed);
                              newChildren[rowIndex] = {
                                ...newChildren[rowIndex],
                                children: newColumns,
                              };

                              return {
                                ...prev,
                                container: {
                                  ...prev.container,
                                  children: newChildren,
                                },
                              };
                            });
                          }
                        }}
                      >
                        <SortableContext
                          items={row.children.map((column) => column.id)}
                          strategy={verticalListSortingStrategy}
                        >
                          <Accordion
                            defaultValue={[activeColumn || row.children[0]?.id]}
                            type="multiple"
                            className="w-full"
                          >
                            {row.children.map((column) => (
                              <SortableColumn key={column.id} column={column}>
                                <AccordionContent className="p-0 ml-10 mb-1 text-xs">
                                  {column.children.map((element) => (
                                    <div
                                      key={element.id}
                                      className="w-full text-xs justify-start"
                                    >
                                      <div
                                        className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-md group/element"
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
                                          <ColumnChildIcon
                                            type={element.type}
                                          />
                                          <span className="flex-1 dark:text-gray-200">
                                            {element.title}
                                          </span>
                                        </div>

                                        <Tooltip text="Delete element">
                                          <button>
                                            <Trash
                                              size={14}
                                              className="text-gray-400 opacity-0 group-hover/element:opacity-100 hover:text-red-500 dark:hover:text-red-400 transition-opacity cursor-pointer"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                deleteElement(element.id);
                                              }}
                                            />
                                          </button>
                                        </Tooltip>
                                      </div>
                                    </div>
                                  ))}

                                  {/* Add an element */}
                                  <div className="-ml-1 flex items-center gap-2 text-xs hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                                    >
                                      <CirclePlus className="h-4 w-4" />
                                      Add an element
                                    </Button>
                                  </div>
                                </AccordionContent>
                              </SortableColumn>
                            ))}
                          </Accordion>
                        </SortableContext>
                      </DndContext>

                      {/* Add a new column */}
                      <div className="ml-3 flex items-center gap-2 text-xs hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          <CirclePlus className="h-4 w-4" />
                          Add a column
                        </Button>
                      </div>
                    </AccordionContent>
                  </SortableRow>
                ))}
              </Accordion>
            </SortableContext>
          </DndContext>
        </Fragment>
      )}
    </div>
  );
};
