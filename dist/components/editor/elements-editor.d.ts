import { TemplateSchemaType } from '../../schemas/template';
export type ActiveElementType = {
    id: string;
    type: string;
} | null;
export declare const ElementsEditor: ({ template, setTemplate, activeElement, setActiveElement, }: {
    template: TemplateSchemaType;
    setTemplate: (template: TemplateSchemaType) => void;
    activeElement: ActiveElementType;
    setActiveElement: (activeElement: ActiveElementType) => void;
}) => import("react/jsx-runtime").JSX.Element;
