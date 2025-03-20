import { TemplateSchemaType } from '../../schemas/template';
type PickerProps = {
    trigger: React.ReactNode;
    template: TemplateSchemaType;
    setTemplate: (template: TemplateSchemaType) => void;
    parentRowId?: string;
};
export declare const RowsPicker: ({ trigger, setTemplate, parentRowId, }: PickerProps) => import("react/jsx-runtime").JSX.Element;
export {};
