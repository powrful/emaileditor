import { TemplateSchemaType } from '../../schemas/template';
export type EmailCanvasProps = {
    onSave: (htmlTemplate: string, jsonTemplate: {
        html: string;
    }, reactComponent: React.ReactNode) => void;
    onBack: () => void;
    defaultTemplate: TemplateSchemaType;
};
export declare const EmailCanvas: ({ onSave, onBack, defaultTemplate, }: EmailCanvasProps) => import("react/jsx-runtime").JSX.Element;
