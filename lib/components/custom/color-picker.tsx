import { Input } from "@/components/ui/input";
import { Fragment, useEffect, useRef, useState } from "react";
import { type ColorResult, SketchPicker } from "react-color";
import { useHotkeys } from "react-hotkeys-hook";

type ColorPickerProps = {
  color: string;
  onChange: (color: ColorResult) => void;
};

export type { ColorResult };

export const ColorPicker = ({ color, onChange }: ColorPickerProps) => {
  const [open, setOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen(!open);
  };

  useHotkeys(
    "esc",
    (e) => {
      e.preventDefault();
      if (open) setOpen(false);
    },
    { enabled: true, enableOnFormTags: true },
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // Ignore clicks on the input and color preview
      const target = event.target as HTMLElement;
      if (
        target.closest("input") ||
        target.classList.contains("color-preview")
      ) {
        return;
      }

      if (
        open &&
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <Fragment>
      <div className="relative h-[29px]">
        <Input
          type="string"
          value={color}
          onClick={handleToggle}
          readOnly
          className="pl-10 h-full"
        />
        <div
          className="absolute left-2 top-1/2 -translate-y-1/2 h-5 w-5 rounded-full border border-input cursor-pointer color-preview"
          style={{ backgroundColor: color }}
          onClick={handleToggle}
        />
      </div>
      {open && (
        <div ref={pickerRef}>
          <SketchPicker
            color={color}
            onChange={(color) => onChange(color)}
            disableAlpha={true}
            styles={{
              default: {
                picker: {
                  position: "absolute",
                  zIndex: 10,
                },
              },
            }}
          />
        </div>
      )}
    </Fragment>
  );
};
