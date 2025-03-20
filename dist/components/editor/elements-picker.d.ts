import { TemplateSchemaType } from '../../schemas/template';
type PickerProps = {
    trigger: React.ReactNode;
    template: TemplateSchemaType;
    setTemplate: (template: TemplateSchemaType) => void;
    parentRowId?: string;
    parentColumnId?: string;
    afterElementId?: string | null;
};
export declare const ElementsPicker: ({ trigger, template, setTemplate, parentRowId, parentColumnId, afterElementId, }: PickerProps) => import("react/jsx-runtime").JSX.Element;
export {};
