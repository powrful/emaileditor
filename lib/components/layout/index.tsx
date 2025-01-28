import { Tooltip } from "@/components/custom/tooltip";
import { Frame } from "@/components/email/frame";
import { EmailTemplate } from "@/components/email/template";
import { FullscreenButton } from "@/components/layout/fullscreen-button";
import { AppSidebar } from "@/components/layout/sidebar";
import { Button } from "@/components/ui/button";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { cn } from "@/utils";
import localforage from "localforage";
import { Monitor, Redo2, Smartphone, Undo2 } from "lucide-react";
import { useEffect, useState } from "react";

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

// Add constant for storage key
const SCREEN_SIZE_KEY = "email-editor-screen-size";

export default function EditorLayout({
  onSave,
  onBack,
  template,
  setTemplate,
}: EmailCanvasProps) {
  const [selected, setSelected] = useState<ScreenSize>("desktop");

  // Load saved screen size preference on mount
  useEffect(() => {
    async function loadScreenSize() {
      try {
        const savedSize =
          await localforage.getItem<ScreenSize>(SCREEN_SIZE_KEY);
        if (savedSize) {
          setSelected(savedSize);
        }
      } catch (error) {
        console.error("Error loading screen size preference:", error);
      }
    }

    loadScreenSize();
  }, []);

  // Save screen size preference when it changes
  const handleScreenSizeChange = async (size: ScreenSize) => {
    try {
      await localforage.setItem(SCREEN_SIZE_KEY, size);
      setSelected(size);
    } catch (error) {
      console.error("Error saving screen size preference:", error);
      // Still update the UI even if save fails
      setSelected(size);
    }
  };

  const handleSave = () => {
    // Using the templates defined in the file
    onSave(htmlTemplate, jsonTemplate, reactComponent);
  };

  useEffect(() => {
    window.dispatchEvent(new Event("resize"));
  }, [template]);

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "350px",
        } as React.CSSProperties
      }
    >
      <AppSidebar
        onBack={onBack}
        template={template}
        setTemplate={setTemplate}
      />
      <SidebarInset>
        <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b shadow bg-background p-4">
          <div className="flex-1" />
          <div className="flex items-center gap-2">
            <ScreenSizeToggle
              selected={selected}
              onChange={handleScreenSizeChange}
            />
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
              "transition-[width] duration-500 ease-in-out m-0 p-0 overflow-hidden",
              selected === "mobile" && "w-[400px]",
              selected === "desktop" && "w-full",
            )}
          >
            <EmailTemplate template={template} />
          </Frame>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
