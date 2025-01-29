import { Tooltip } from "@/components/custom/tooltip";
import { DesignEditor } from "@/components/editor/design";
import { Button } from "@/components/ui/button";
import type { TemplateSchemaType } from "@/schemas/template";
import {
  ArrowLeft,
  Globe,
  LayoutPanelTop,
  MailPlus,
  SwatchBook,
  Trash,
} from "lucide-react";
import * as React from "react";
import { Templates } from "./templates";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import { cn } from "@/utils";
import localforage from "localforage";

const data = {
  navs: [
    {
      title: "Templates",
      slug: "templates",
      icon: MailPlus,
      isActive: true,
    },
    {
      title: "Design",
      slug: "design",
      icon: SwatchBook,
      isActive: false,
    },
    {
      title: "Components",
      slug: "components",
      icon: LayoutPanelTop,
      isActive: false,
    },
    {
      title: "Global settings",
      slug: "global-settings",
      icon: Globe,
      isActive: false,
    },
  ],
};

import { EmailCanvasProps } from "@/components/canvas";

const Placeholder = ({ text }: { text: string }) => {
  return <div>{text}</div>;
};

type AppSidebarProps = {
  template: TemplateSchemaType;
  setTemplate: (template: TemplateSchemaType) => void;
};

const ACTIVE_SIDEBAR_KEY = "email-editor-active-sidebar";

export function AppSidebar({
  onBack,
  template,
  setTemplate,
  ...props
}: React.ComponentProps<typeof Sidebar> &
  Pick<EmailCanvasProps, "onBack"> &
  AppSidebarProps) {
  const [activeItem, setActiveItem] = React.useState(data.navs[0]);
  const { setOpen } = useSidebar();

  // Load saved active item on mount
  React.useEffect(() => {
    async function loadActiveItem() {
      const savedSlug = await localforage.getItem<string>(ACTIVE_SIDEBAR_KEY);
      if (savedSlug) {
        const savedItem = data.navs.find((item) => item.slug === savedSlug);
        if (savedItem) setActiveItem(savedItem);
      }
    }
    loadActiveItem();
  }, []);

  // Save active item when changed
  const handleItemClick = React.useCallback(
    async (item: (typeof data.navs)[0]) => {
      setActiveItem(item);
      setOpen(true);
      await localforage.setItem(ACTIVE_SIDEBAR_KEY, item.slug);
    },
    [setOpen],
  );

  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden [&>[data-sidebar=sidebar]]:flex-row"
      {...props}
    >
      <Sidebar
        collapsible="none"
        className="!w-[calc(var(--sidebar-width-icon)_+_1px)] border-r"
      >
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
                <div className="mt-2">
                  <Tooltip text="Back">
                    <Button variant="ghost" size="icon" onClick={onBack}>
                      <ArrowLeft className="size-4" />
                    </Button>
                  </Tooltip>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent className="px-1.5 md:px-0 py-3">
              <SidebarMenu>
                {data.navs.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={{
                        children: item.title,
                        hidden: false,
                      }}
                      onClick={() => handleItemClick(item)}
                      isActive={activeItem.title === item.title}
                      className={cn("px-2.5 md:px-2")}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      {/* This is the second sidebar */}
      {/* We disable collapsible and let it fill remaining space */}
      <Sidebar collapsible="none" className="hidden flex-1 md:flex">
        <SidebarHeader className="gap-3.5 border-b p-4 py-[18px] shadow">
          <div className="flex w-full items-center justify-between">
            <div className="text-base font-medium text-foreground">
              {activeItem.title}
            </div>

            <Button
              variant="ghost"
              size="iconSm"
              className="flex items-center gap-2 text-sm"
            >
              <Trash className="size-4 text-red-500" />
            </Button>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup className="px-0">
            <SidebarGroupContent className="p-4">
              {activeItem.slug === "templates" && <Templates />}
              {activeItem.slug === "components" && (
                <Placeholder text="Components" />
              )}
              {activeItem.slug === "global-settings" && (
                <Placeholder text="Global settings" />
              )}
              {activeItem.slug === "design" && (
                <DesignEditor template={template} setTemplate={setTemplate} />
              )}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </Sidebar>
  );
}
