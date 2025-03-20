import * as React from "react";
import { TemplateSchemaType } from '../../schemas/template';
import { Sidebar } from '../ui/sidebar';
import { EmailCanvasProps } from './canvas';
type AppSidebarProps = {
    template: TemplateSchemaType;
    setTemplate: (template: TemplateSchemaType) => void;
};
export declare function AppSidebar({ onBack, template, setTemplate, ...props }: React.ComponentProps<typeof Sidebar> & Pick<EmailCanvasProps, "onBack"> & AppSidebarProps): import("react/jsx-runtime").JSX.Element;
export {};
