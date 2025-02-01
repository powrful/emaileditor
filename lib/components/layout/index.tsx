import { CodeBlock } from "@/components/custom/code";
import { Tooltip } from "@/components/custom/tooltip";
import { Frame } from "@/components/email/frame";
import { EmailTemplate } from "@/components/email/template";
import { FullscreenButton } from "@/components/layout/fullscreen-button";
import { AppSidebar } from "@/components/layout/sidebar";
import { Button } from "@/components/ui/button";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { cn } from "@/utils";
import { render } from "@react-email/components";
import localforage from "localforage";
import { useHotkeys } from "react-hotkeys-hook";

import {
  Braces,
  Code,
  Monitor,
  Redo2,
  ScanEye,
  Smartphone,
  Undo2,
} from "lucide-react";

import { EmailCanvasProps } from "@/components/canvas";
import { TemplateSchemaType } from "@/schemas/template";
import { useEffect, useState } from "react";

type TemplateType = "html" | "json" | "preview";
type ScreenSize = "mobile" | "desktop" | "full";

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

const TemplateTypeToggle = ({
  selectedTemplateType,
  onChange,
}: {
  selectedTemplateType: TemplateType;
  onChange: (value: TemplateType) => void;
}) => {
  return (
    <div className="flex gap-2 bg-gray-100 rounded-lg p-[2px] max-w-fit">
      <Tooltip text="HTML">
        <Button
          size="iconSm"
          variant={selectedTemplateType === "html" ? "outline" : "ghost"}
          onClick={() => onChange("html")}
        >
          <Code className="w-[10px] h-[10px]" />
        </Button>
      </Tooltip>

      <Tooltip text="Json">
        <Button
          size="iconSm"
          variant={selectedTemplateType === "json" ? "outline" : "ghost"}
          onClick={() => onChange("json")}
        >
          <Braces className="w-[10px] h-[10px]" />
        </Button>
      </Tooltip>

      <Tooltip text="Preview">
        <Button
          size="iconSm"
          variant={selectedTemplateType === "preview" ? "outline" : "ghost"}
          onClick={() => onChange("preview")}
        >
          <ScanEye className="w-[10px] h-[10px]" />
        </Button>
      </Tooltip>
    </div>
  );
};

const UndoRedo = ({
  undo,
  redo,
  canUndo,
  canRedo,
}: {
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}) => {
  // Support both Windows (Ctrl) and macOS (Command) shortcuts
  useHotkeys(["meta+z", "ctrl+z"], (e) => {
    e.preventDefault();
    undo();
  });

  // Support Windows Ctrl+Y and macOS Command+Y for redo
  useHotkeys(["meta+y", "ctrl+y"], (e) => {
    e.preventDefault();
    redo();
  });

  return (
    <>
      <Tooltip text="Undo">
        <Button
          size="iconSm"
          variant="ghost"
          onClick={undo}
          disabled={!canUndo}
        >
          <Undo2 className="w-[10px] h-[10px]" />
        </Button>
      </Tooltip>

      <Tooltip text="Redo">
        <Button
          size="iconSm"
          variant="ghost"
          onClick={redo}
          disabled={!canRedo}
        >
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
  undo,
  redo,
  canUndo,
  canRedo,
}: {
  onSave: EmailCanvasProps["onSave"];
  onBack: EmailCanvasProps["onBack"];
  template: TemplateSchemaType;
  setTemplate: React.Dispatch<React.SetStateAction<TemplateSchemaType>>;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}) {
  const [html, setHtml] = useState<string>("");
  const [selected, setSelected] = useState<ScreenSize>("desktop");
  const [selectedTemplateType, setSelectedTemplateType] =
    useState<TemplateType>("preview");
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

  useEffect(() => {
    async function renderEmail() {
      try {
        const html = await render(<EmailTemplate template={template} />, {
          pretty: true,
        });
        setHtml(html);
      } catch (error) {
        console.error("Error rendering email template:", error);
        // Optionally set an error state or fallback HTML
        setHtml(`<!-- Error rendering template -->`);
      }
    }

    renderEmail();
  }, [template]);

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
        <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b shadow bg-background p-4 z-50">
          <div className="flex-1">
            <TemplateTypeToggle
              selectedTemplateType={selectedTemplateType}
              onChange={setSelectedTemplateType}
            />
          </div>
          <div className="flex items-center gap-2">
            <ScreenSizeToggle
              selected={selected}
              onChange={handleScreenSizeChange}
            />
            <UndoRedo
              undo={undo}
              redo={redo}
              canUndo={canUndo}
              canRedo={canRedo}
            />
            <Button size="sm" onClick={handleSave}>
              Save
            </Button>
          </div>
        </header>
        <div className="flex flex-1 flex-col items-center gap-4 p-4 bg-[#F1F1F1]">
          {selectedTemplateType === "json" ? (
            <CodeBlock code={JSON.stringify(template, null, 2)} lang="json" />
          ) : selectedTemplateType === "html" ? (
            <CodeBlock code={html} lang="html" />
          ) : (
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
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
