import { Tooltip } from "@/components/custom/tooltip";
import { Button } from "@/components/ui/button";
import { useIframeElementPosition } from "@/hooks/use-iframe-element-position";
import { cn } from "@/utils";
import { ArrowDown, ArrowUp, Plus, Trash } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface SectionOverlayProps {
  sectionId: string;
  onDelete: (id: string) => void;
  onAddSection: (id: string) => void;
  onMoveUp: (id: string) => void;
  onMoveDown: (id: string) => void;
  isFirst: boolean;
  isLast: boolean;
}

const SectionOverlay = ({
  sectionId,
  onDelete,
  onAddSection,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
}: SectionOverlayProps) => {
  const position = useIframeElementPosition(
    `[data-section-id="${sectionId}"]`,
    15,
  );
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handlePositionUpdate = () => {
      window.dispatchEvent(new Event("resize"));
    };

    const timeoutId = setTimeout(handlePositionUpdate, 100);
    return () => clearTimeout(timeoutId);
  }, [sectionId]);

  return (
    <div
      className={cn(
        "group absolute border-2 border-dashed transition-all duration-200",
        isHovered ? "border-zinc-900/50" : "border-transparent",
      )}
      style={{
        top: position.top,
        left: position.left,
        width: position.width,
        height: position.height,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="opacity-0 group-hover:opacity-100 absolute top-0 flex flex-col items-center gap-1 -translate-x-full px-1 bg-white shadow-lg rounded-2xl py-2 -left-1.5">
        <Tooltip text="Move up" side="right">
          <Button
            size="iconSm"
            variant="ghost"
            disabled={isFirst}
            onClick={() => onMoveUp(sectionId)}
            className="rounded-full"
          >
            <ArrowUp className="h-4 w-4" />
          </Button>
        </Tooltip>

        <Tooltip text="Move down" side="right">
          <Button
            size="iconSm"
            variant="ghost"
            disabled={isLast}
            onClick={() => onMoveDown(sectionId)}
            className="rounded-full"
          >
            <ArrowDown className="h-4 w-4" />
          </Button>
        </Tooltip>

        <Tooltip text="Add section" side="right">
          <Popover>
            <PopoverTrigger>
              <Button
                size="iconSm"
                variant="ghost"
                onClick={() => onAddSection(sectionId)}
                className="rounded-full"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent side="right" className="w-[360px]">
              <div className="grid grid-cols-4 gap-4">
                <div className="flex flex-col items-center justify-center">
                  <Button variant="outline" size="icon">
                    <ChevronRight />
                  </Button>
                  H
                </div>
                <Button variant="ghost" size="sm" className="justify-center">
                  02
                </Button>
                <Button variant="ghost" size="sm" className="justify-center">
                  03
                </Button>
                <Button variant="ghost" size="sm" className="justify-center">
                  03
                </Button>
                <Button variant="ghost" size="sm" className="justify-center">
                  03
                </Button>
                <Button variant="ghost" size="sm" className="justify-center">
                  03
                </Button>
                <Button variant="ghost" size="sm" className="justify-center">
                  03
                </Button>
                <Button variant="ghost" size="sm" className="justify-center">
                  03
                </Button>
                <Button variant="ghost" size="sm" className="justify-center">
                  03
                </Button>
                <Button variant="ghost" size="sm" className="justify-center">
                  03
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </Tooltip>

        <Tooltip text="Delete section" side="right">
          <Button
            size="iconSm"
            variant="ghost"
            onClick={() => {
              onDelete(sectionId);
            }}
            className="rounded-full"
          >
            <Trash className="h-4 w-4" />
          </Button>
        </Tooltip>
      </div>
    </div>
  );
};

interface SectionManagerProps {
  sections: Array<{ id: string }>;
  onAddSection: (id: string) => void;
  onDeleteSection: (id: string) => void;
  onMoveSection: (fromIndex: number, toIndex: number) => void;
}

export const SectionManager = ({
  sections,
  onAddSection,
  onDeleteSection,
  onMoveSection,
}: SectionManagerProps) => {
  return (
    <>
      {sections.map((section, index) => (
        <SectionOverlay
          key={section.id}
          sectionId={section.id}
          onDelete={onDeleteSection}
          onAddSection={onAddSection}
          onMoveUp={(_id) => onMoveSection(index, index - 1)}
          onMoveDown={(_id) => onMoveSection(index, index + 1)}
          isFirst={index === 0}
          isLast={index === sections.length - 1}
        />
      ))}
    </>
  );
};
