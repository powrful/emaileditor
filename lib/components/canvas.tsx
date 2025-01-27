import EditorLayout from "@/components/layout";

export type EmailCanvasProps = {
  onSave: (
    htmlTemplate: string,
    jsonTemplate: { html: string },
    reactComponent: React.ReactNode,
  ) => void;
  onBack: () => void;
};

export const EmailCanvas = ({ onSave, onBack, template }: EmailCanvasProps) => {
  return <EditorLayout onSave={onSave} onBack={onBack} template={template} />;
};
