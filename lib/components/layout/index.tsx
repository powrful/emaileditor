import { Tooltip } from "@/components/custom/tooltip";
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
          <div
            id="preview"
            className={cn(
              "border bg-transparent h-full rounded",
              "transition-[width] duration-300 ease-in-out",
              selected === "mobile" && "w-[480px] scale-[0.90] origin-top",
              selected === "desktop" && "w-full scale-100",
            )}
          >
            <div className="bg-white py-16 sm:py-24 lg:py-32 max-w-full">
              <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
                <h2 className="max-w-xl text-balance text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl lg:col-span-7">
                  Want product news and updates? Sign up for our newsletter.
                </h2>
                <form className="w-full max-w-md lg:col-span-5 lg:pt-2">
                  <div className="flex gap-x-4">
                    <label htmlFor="email-address" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="email-address"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="min-w-0 flex-auto rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      placeholder="Enter your email"
                    />
                    <button
                      type="submit"
                      className="flex-none rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Subscribe
                    </button>
                  </div>
                  <p className="mt-4 text-sm/6 text-gray-900">
                    We care about your data. Read our{" "}
                    <a
                      href="#"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      privacy&nbsp;policy
                    </a>
                    .
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
