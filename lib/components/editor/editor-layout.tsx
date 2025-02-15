import { CodeBlock } from "@/components/custom/code";
import { Tooltip } from "@/components/custom/tooltip";
import { Frame } from "@/components/editor/frame";
import { FullscreenButton } from "@/components/editor/fullscreen-button";
import { AppSidebar } from "@/components/editor/sidebar";
import { EmailTemplate } from "@/components/editor/template";
import { Button } from "@/components/ui/button";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { cn } from "@/utils";
import localforage from "localforage";
import pretty from "pretty";
import { renderToString } from "react-dom/server";
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

import { EmailCanvasProps } from "@/components/editor/canvas";
import { ThemeToggle } from "@/components/theme/toggle";
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
    <div className="flex gap-0 bg-accent/20 dark:bg-muted/40 rounded-md p-0.5">
      <div className="flex gap-0">
        <Tooltip text="Mobile">
          <Button
            size="iconSm"
            variant="ghost"
            className={cn(
              "h-8 w-8",
              selected === "mobile"
                ? "bg-background dark:bg-muted-foreground/10 text-foreground shadow-sm hover:bg-background/90 dark:hover:bg-muted-foreground/20"
                : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground dark:hover:bg-muted-foreground/10 dark:text-muted-foreground/70",
            )}
            onClick={() => onChange("mobile")}
          >
            <Smartphone className="w-4 h-4" />
          </Button>
        </Tooltip>

        <Tooltip text="Desktop">
          <Button
            size="iconSm"
            variant="ghost"
            className={cn(
              "h-8 w-8",
              selected === "desktop"
                ? "bg-background dark:bg-muted-foreground/10 text-foreground shadow-sm hover:bg-background/90 dark:hover:bg-muted-foreground/20"
                : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground dark:hover:bg-muted-foreground/10 dark:text-muted-foreground/70",
            )}
            onClick={() => onChange("desktop")}
          >
            <Monitor className="w-4 h-4" />
          </Button>
        </Tooltip>

        <Tooltip text="Fullscreen">
          <FullscreenButton
            variant="ghost"
            className={cn(
              "h-8 w-8",
              selected === "full"
                ? "bg-background dark:bg-muted-foreground/10 text-foreground shadow-sm hover:bg-background/90 dark:hover:bg-muted-foreground/20"
                : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground dark:hover:bg-muted-foreground/10 dark:text-muted-foreground/70",
            )}
            onClick={() => onChange("full")}
          />
        </Tooltip>
      </div>
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
    <div className="flex gap-0 bg-accent/20 dark:bg-muted/40 rounded-md p-0.5 max-w-fit">
      <div className="flex gap-0">
        <Tooltip text="HTML">
          <Button
            size="iconSm"
            variant="ghost"
            className={cn(
              "h-8 w-8",
              selectedTemplateType === "html"
                ? "bg-background dark:bg-muted-foreground/10 text-foreground shadow-sm hover:bg-background/90 dark:hover:bg-muted-foreground/20"
                : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground dark:hover:bg-muted-foreground/10 dark:text-muted-foreground/70",
            )}
            onClick={() => onChange("html")}
          >
            <Code className="w-4 h-4" />
          </Button>
        </Tooltip>

        <Tooltip text="Json">
          <Button
            size="iconSm"
            variant="ghost"
            className={cn(
              "h-8 w-8",
              selectedTemplateType === "json"
                ? "bg-background dark:bg-muted-foreground/10 text-foreground shadow-sm hover:bg-background/90 dark:hover:bg-muted-foreground/20"
                : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground dark:hover:bg-muted-foreground/10 dark:text-muted-foreground/70",
            )}
            onClick={() => onChange("json")}
          >
            <Braces className="w-4 h-4" />
          </Button>
        </Tooltip>

        <Tooltip text="Preview">
          <Button
            size="iconSm"
            variant="ghost"
            className={cn(
              "h-8 w-8",
              selectedTemplateType === "preview"
                ? "bg-background dark:bg-muted-foreground/10 text-foreground shadow-sm hover:bg-background/90 dark:hover:bg-muted-foreground/20"
                : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground dark:hover:bg-muted-foreground/10 dark:text-muted-foreground/70",
            )}
            onClick={() => onChange("preview")}
          >
            <ScanEye className="w-4 h-4" />
          </Button>
        </Tooltip>
      </div>
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
        const emailHtml = renderToString(<EmailTemplate template={template} />);
        const prettifiedHtml = pretty(emailHtml);

        setHtml(prettifiedHtml);
      } catch (error) {
        console.error("Error rendering email template:", error);
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
        <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b shadow bg-sidebar p-4 z-50">
          <div className="flex-1">
            <TemplateTypeToggle
              selectedTemplateType={selectedTemplateType}
              onChange={setSelectedTemplateType}
            />
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
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
        <div className="flex flex-1 flex-col items-center gap-4 p-4 bg-[#f1f1f1] dark:bg-[#1f1f1f]">
          {selectedTemplateType === "json" ? (
            <CodeBlock code={JSON.stringify(template, null, 2)} lang="json" />
          ) : selectedTemplateType === "html" ? (
            <CodeBlock code={html} lang="html" />
          ) : null}

          <Frame
            className={cn(
              "bg-transparent h-full rounded",
              "transition-[width] duration-500 ease-in-out m-0 p-0 overflow-hidden",
              selected === "mobile" && "w-[400px]",
              selected === "desktop" && "w-full",
              selectedTemplateType !== "preview" && "hidden",
            )}
          >
            <EmailTemplate template={template} />
          </Frame>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
