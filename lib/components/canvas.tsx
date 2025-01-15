import EditorLayout from "@/components/layout";

export type EmailCanvasProps = {
  onSave: (
    htmlTemplate: string,
    jsonTemplate: { html: string },
    reactComponent: React.ReactNode,
  ) => void;
  onBack: () => void;
  defaults: {
    design: {
      backgroundColor?: string;
      fontFamily?: string;
      fontSize?: string;
      button?: {
        backgroundColor?: string;
        color?: string;
      };
    };
  };
};

export const EmailCanvas = ({ onSave, onBack, defaults }: EmailCanvasProps) => {
  return <EditorLayout onSave={onSave} onBack={onBack} defaults={defaults} />;
};
