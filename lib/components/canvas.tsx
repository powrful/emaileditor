import EditorLayout from "@/components/layout";
import { TemplateSchemaType } from "@/schemas/template";
import { useHistoryState } from "@uidotdev/usehooks";

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
  const {
    state: template,
    set: setTemplate,
    undo,
    redo,
    canUndo,
    canRedo,
  } = useHistoryState<TemplateSchemaType>(defaultTemplate);

  return (
    <EditorLayout
      onSave={onSave}
      onBack={onBack}
      template={template}
      setTemplate={(newPresent) => {
        if (typeof newPresent === "function") {
          setTemplate(newPresent(template));
        } else {
          setTemplate(newPresent);
        }
      }}
      undo={undo}
      redo={redo}
      canUndo={canUndo}
      canRedo={canRedo}
    />
  );
};
