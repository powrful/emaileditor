import EditorLayout from "@/components/layout";
import { TemplateSchemaType } from "@/schemas/template";

export type EmailCanvasProps = {
  onSave: (
    htmlTemplate: string,
    jsonTemplate: { html: string },
    reactComponent: React.ReactNode,
  ) => void;
  onBack: () => void;
  template: TemplateSchemaType;
  setTemplate: (template: TemplateSchemaType) => void;
};

export const EmailCanvas = ({
  onSave,
  onBack,
  template,
  setTemplate,
}: EmailCanvasProps) => {
  return (
    <EditorLayout
      onSave={onSave}
      onBack={onBack}
      template={template}
      setTemplate={setTemplate}
    />
  );
};
