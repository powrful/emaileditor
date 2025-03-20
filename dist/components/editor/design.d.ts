import { TemplateSchemaType } from '../../schemas/template';
type DesignEditorProps = {
    template: TemplateSchemaType;
    setTemplate: (template: TemplateSchemaType) => void;
};
export declare const DesignEditor: ({ template, setTemplate }: DesignEditorProps) => import("react/jsx-runtime").JSX.Element;
export {};
