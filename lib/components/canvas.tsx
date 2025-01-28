import EditorLayout from "@/components/layout";
import { TemplateSchemaType } from "@/schemas/template";
import { useState } from "react";

export type EmailCanvasProps = {
  onSave: (
    htmlTemplate: string,
    jsonTemplate: { html: string },
    reactComponent: React.ReactNode,
  ) => void;
  onBack: () => void;
  defaultTemplate: TemplateSchemaType;
};

export const EmailCanvas = ({
  onSave,
  onBack,
  defaultTemplate,
}: EmailCanvasProps) => {
  const [template, setTemplate] = useState<TemplateSchemaType>(defaultTemplate);

  return (
    <EditorLayout
      onSave={onSave}
      onBack={onBack}
      template={template}
      setTemplate={setTemplate}
    />
  );
};
