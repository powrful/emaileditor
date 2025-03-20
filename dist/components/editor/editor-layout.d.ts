import { EmailCanvasProps } from './canvas';
import { TemplateSchemaType } from '../../schemas/template';
export default function EditorLayout({ onSave, onBack, template, setTemplate, undo, redo, canUndo, canRedo, }: {
    onSave: EmailCanvasProps["onSave"];
    onBack: EmailCanvasProps["onBack"];
    template: TemplateSchemaType;
    setTemplate: React.Dispatch<React.SetStateAction<TemplateSchemaType>>;
    undo: () => void;
    redo: () => void;
    canUndo: boolean;
    canRedo: boolean;
}): import("react/jsx-runtime").JSX.Element;
