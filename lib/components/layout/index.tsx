import { Tooltip } from "@/components/custom/tooltip";
import { Email, template } from "@/components/email";
import { Frame } from "@/components/email/frame";
import { SectionManager } from "@/components/email/section-manager";
import { FullscreenButton } from "@/components/layout/fullscreen-button";
import { AppSidebar } from "@/components/layout/sidebar";
import { Button } from "@/components/ui/button";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { cn } from "@/utils";
import { Monitor, Redo2, Smartphone, Undo2 } from "lucide-react";
import { useState } from "react";

type ScreenSize = "mobile" | "desktop" | "full";

import { EmailCanvasProps } from "@/components/canvas";

interface ScreenSizeToggleProps {
  selected: ScreenSize;
  onChange: (value: ScreenSize) => void;
}

const ScreenSizeToggle = ({ selected, onChange }: ScreenSizeToggleProps) => {
  return (
    <div className="flex gap-2 bg-gray-100 rounded-lg p-[2px]">
      <Tooltip text="Mobile">
        <Button
          size="iconSm"
          variant={selected === "mobile" ? "outline" : "ghost"}
          onClick={() => onChange("mobile")}
        >
          <Smartphone className="w-[10px] h-[10px]" />
        </Button>
      </Tooltip>

      <Tooltip text="Desktop">
        <Button
          size="iconSm"
          variant={selected === "desktop" ? "outline" : "ghost"}
          onClick={() => onChange("desktop")}
        >
          <Monitor className="w-[10px] h-[10px]" />
        </Button>
      </Tooltip>

      <Tooltip text="Fullscreen">
        <FullscreenButton
          variant={selected === "full" ? "outline" : "ghost"}
          onClick={() => onChange("full")}
        />
      </Tooltip>
    </div>
  );
};

const UndoRedo = () => {
  return (
    <>
      <Tooltip text="Undo">
        <Button size="iconSm" variant="ghost">
          <Undo2 className="w-[10px] h-[10px]" />
        </Button>
      </Tooltip>

      <Tooltip text="Redo">
        <Button size="iconSm" variant="ghost">
          <Redo2 className="w-[10px] h-[10px]" />
        </Button>
      </Tooltip>
    </>
  );
};

const htmlTemplate = `
<div>
  <h1>Hello World</h1>
</div>
`;

const jsonTemplate = {
  html: htmlTemplate,
};

const reactComponent = <div>Hello World</div>;

export default function EditorLayout({ onSave, onBack }: EmailCanvasProps) {
  const [selected, setSelected] = useState<ScreenSize>("desktop");
  const handleSave = () => {
    // Using the templates defined in the file
    onSave(htmlTemplate, jsonTemplate, reactComponent);
  };

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "350px",
        } as React.CSSProperties
      }
    >
      <AppSidebar onBack={onBack} />
      <SidebarInset>
        <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b shadow bg-background p-4">
          <div className="flex-1" />
          <div className="flex items-center gap-2">
            <ScreenSizeToggle selected={selected} onChange={setSelected} />
            <UndoRedo />
            <Button size="sm" onClick={handleSave}>
              Save
            </Button>
          </div>
        </header>
        <div className="flex flex-1 flex-col items-center gap-4 p-4 bg-[#F1F1F1]">
          <Frame
            className={cn(
              "bg-transparent h-full rounded",
              "transition-[width] duration-300 ease-in-out",
              selected === "mobile" && "w-[375px]",
              selected === "desktop" && "w-full",
            )}
          >
            <Email title="Hello World" template={template} />
          </Frame>

          <SectionManager
            sections={template.container.sections || []}
            onAddSection={() => {}}
            onDeleteSection={() => {}}
            onMoveSection={() => {}}
          />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
