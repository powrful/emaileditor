import { Tooltip } from "@/components/custom/tooltip";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils";
import { ArrowDown, ArrowUp, Plus, Trash } from "lucide-react";
import { useEffect, useState } from "react";

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
  const [position, setPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const updatePosition = () => {
      const iframe = document.querySelector("iframe");
      const iframeDocument = iframe?.contentDocument;

      if (iframeDocument) {
        const section = iframeDocument.querySelector(
          `[data-section-id="${sectionId}"]`,
        );
        if (section) {
          const rect = section.getBoundingClientRect();
          const iframeRect = iframe.getBoundingClientRect();

          setPosition({
            top: rect.top + iframeRect.top,
            left: rect.left + 15,
            width: rect.width,
            height: rect.height,
          });
        }
      }
    };

    // Create resize observer for iframe
    const iframe = document.querySelector("iframe");
    const resizeObserver = new ResizeObserver(updatePosition);
    if (iframe) {
      resizeObserver.observe(iframe);
    }

    // Add window resize listener
    window.addEventListener("resize", updatePosition);

    // Cleanup
    return () => {
      window.removeEventListener("resize", updatePosition);
      resizeObserver.disconnect();
    };
  }, [sectionId]);

  return (
    <div
      className={cn(
        "group absolute border-2 border-dashed transition-all duration-200",
        isHovered ? "border-zinc-700" : "border-transparent",
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
      <div className="opacity-0 group-hover:opacity-100 absolute -left-[1px] top-0 flex flex-col items-center gap-1 -translate-x-full px-1 bg-white shadow-lg rounded-2xl py-2 -ml-8">
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
          <Button
            size="iconSm"
            variant="ghost"
            onClick={() => onAddSection(sectionId)}
            className="rounded-full"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </Tooltip>

        <Tooltip text="Delete section" side="right">
          <Button
            size="iconSm"
            variant="ghost"
            onClick={() => onDelete(sectionId)}
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
