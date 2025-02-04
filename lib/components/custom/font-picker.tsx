import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const fonts = [
  { value: "Arial, Helvetica, sans-serif", label: "Arial" },
  { value: "'Arial Black', Gadget, sans-serif", label: "Arial Black" },
  { value: "'Bookman Old Style', serif", label: "Bookman Old Style" },
  { value: "'Comic Sans MS', cursive", label: "Comic Sans MS" },
  { value: "Courier, monospace", label: "Courier" },
  { value: "'Courier New', Courier, monospace", label: "Courier New" },
  { value: "Garamond, serif", label: "Garamond" },
  { value: "Georgia, serif", label: "Georgia" },
  { value: "Impact, Charcoal, sans-serif", label: "Impact" },
  { value: "'Lucida Console', Monaco, monospace", label: "Lucida Console" },
  {
    value: "'Lucida Sans Unicode', 'Lucida Grande', sans-serif",
    label: "Lucida Sans",
  },
  { value: "'MS Sans Serif', Geneva, sans-serif", label: "MS Sans Serif" },
  { value: "'MS Serif', 'New York', sans-serif", label: "MS Serif" },
  {
    value: "'Palatino Linotype', 'Book Antiqua', Palatino, serif",
    label: "Palatino",
  },
  { value: "Symbol, sans-serif", label: "Symbol" },
  { value: "Tahoma, Geneva, sans-serif", label: "Tahoma" },
  { value: "'Times New Roman', Times, serif", label: "Times New Roman" },
  { value: "'Trebuchet MS', Helvetica, sans-serif", label: "Trebuchet MS" },
  { value: "Verdana, Geneva, sans-serif", label: "Verdana" },
];

interface FontPickerProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
}

export function FontPicker({ id, value, onChange }: FontPickerProps) {
  const [open, setOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Prevent closing when hovering over items
  const handleOpenChange = (newOpen: boolean) => {
    if (isHovering) {
      setOpen(true);
    } else {
      setOpen(newOpen);
    }
  };

  return (
    <Select
      value={value}
      onValueChange={onChange}
      open={open}
      onOpenChange={handleOpenChange}
    >
      <SelectTrigger className="h-7 text-xs" id={id}>
        <SelectValue placeholder="Select font" />
      </SelectTrigger>
      <SelectContent
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => {
          setIsHovering(false);
          // setOpen(false);
        }}
      >
        {fonts.map((font) => (
          <SelectItem
            key={font.value}
            value={font.value}
            className="text-sm"
            style={{ fontFamily: font.value }}
            onMouseEnter={() => onChange(font.value)}
            onClick={() => {
              setOpen(false);
              onChange(font.value);
            }}
          >
            <span className="text-sm" style={{ fontFamily: font.value }}>
              {font.label}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
