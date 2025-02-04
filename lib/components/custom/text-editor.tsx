import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/utils";
import {
  Bold,
  Italic,
  Link as LinkIcon,
  Palette,
  Underline,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { SketchPicker } from "react-color";
import sanitizeHtml from "sanitize-html";

interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

interface FormatState {
  isBold: boolean;
  isItalic: boolean;
  isUnderline: boolean;
  isLink: boolean;
}

function sanitize(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: ["b", "i", "u", "a", "span", "p", "br"],
    allowedAttributes: {
      a: ["href", "target", "style"],
      span: ["style"],
      b: ["style"],
      i: ["style"],
      u: ["style"],
      p: ["style"],
    },
    allowedStyles: {
      "*": {
        color: [
          /^#(0x)?[0-9a-f]+$/i,
          /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/,
        ],
        "font-weight": [/.*/],
        "font-style": [/.*/],
        "text-decoration": [/.*/],
      },
    },
  });
}

export const TextEditor = ({ value, onChange, className }: TextEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);
  const [linkUrl, setLinkUrl] = useState("");
  const [selectedRange, setSelectedRange] = useState<Range | null>(null);
  const [formatState, setFormatState] = useState<FormatState>({
    isBold: false,
    isItalic: false,
    isUnderline: false,
    isLink: false,
  });
  const [color, setColor] = useState<{ hex: string }>({ hex: "#000000" });
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);

  const updateFormatState = useCallback(() => {
    setFormatState({
      isBold: document.queryCommandState("bold"),
      isItalic: document.queryCommandState("italic"),
      isUnderline: document.queryCommandState("underline"),
      isLink: document.queryCommandState("createLink"),
    });
  }, []);

  const handleInput = useCallback(() => {
    if (editorRef.current) {
      const sanitized = sanitize(editorRef.current.innerHTML);
      if (sanitized !== value) {
        onChange(sanitized);
        updateFormatState();
      }
    }
  }, [onChange, updateFormatState, value]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (editorRef.current && value !== editorRef.current.innerHTML) {
      const selection = window.getSelection();
      const currentRange = selection?.getRangeAt(0);

      // Store the relative cursor position
      let relativePosition = 0;
      if (currentRange) {
        const tempRange = document.createRange();
        tempRange.selectNodeContents(editorRef.current);
        tempRange.setEnd(currentRange.endContainer, currentRange.endOffset);
        relativePosition = tempRange.toString().length;
      }

      // Update content
      editorRef.current.innerHTML = value;

      // Restore cursor position
      if (selection && relativePosition > 0) {
        let charIndex = 0;
        let range = document.createRange();
        range.selectNodeContents(editorRef.current);
        range.collapse(true);

        const nodeStack: Node[] = [editorRef.current];
        let node: Node | undefined;
        let foundStart = false;

        while (!foundStart && (node = nodeStack.pop())) {
          if (node.nodeType === 3) {
            const textNode = node as unknown as Text;
            const nextCharIndex = charIndex + textNode.length;
            if (
              relativePosition >= charIndex &&
              relativePosition <= nextCharIndex
            ) {
              range.setStart(node, relativePosition - charIndex);
              range.setEnd(node, relativePosition - charIndex);
              foundStart = true;
            }
            charIndex = nextCharIndex;
          } else {
            let i = node.childNodes.length;
            while (i--) {
              nodeStack.push(node.childNodes[i]);
            }
          }
        }

        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  }, [value]);

  const toggleFormat = useCallback(
    (command: string, value?: string) => {
      document.execCommand("styleWithCSS", false, "true");
      document.execCommand(command, false, value);
      updateFormatState();
      editorRef.current?.focus();
    },
    [updateFormatState],
  );

  const getLinkUrl = useCallback(() => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const ancestor = range.commonAncestorContainer;
      const linkElement =
        ancestor.nodeType === 3
          ? ancestor.parentElement?.closest("a")
          : (ancestor as Element).closest("a");

      return linkElement?.getAttribute("href") || "";
    }
    return "";
  }, []);

  const saveSelection = useCallback(() => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      if (editorRef.current?.contains(range.commonAncestorContainer)) {
        setSelectedRange(range.cloneRange());
        setLinkUrl(getLinkUrl());
      }
    }
  }, [getLinkUrl]);

  const restoreSelection = useCallback(() => {
    if (selectedRange && editorRef.current) {
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(selectedRange);
    }
  }, [selectedRange]);

  const addLink = useCallback(() => {
    if (editorRef.current) {
      editorRef.current.focus();
      restoreSelection();

      if (linkUrl) {
        document.execCommand("createLink", false, linkUrl);
      } else {
        document.execCommand("unlink", false);
      }
      setLinkUrl("");
      setSelectedRange(null);
      updateFormatState();
    }
  }, [linkUrl, restoreSelection, updateFormatState]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey) {
        document.execCommand("styleWithCSS", false, "true");
        switch (e.key.toLowerCase()) {
          case "b":
            e.preventDefault();
            toggleFormat("bold");
            break;
          case "i":
            e.preventDefault();
            toggleFormat("italic");
            break;
          case "u":
            e.preventDefault();
            toggleFormat("underline");
            break;
        }
      }
    },
    [toggleFormat],
  );

  const applyColor = useCallback(() => {
    if (editorRef.current) {
      editorRef.current.focus();
      restoreSelection();

      document.execCommand("styleWithCSS", false, "true");
      document.execCommand("foreColor", false, color.hex);

      setIsColorPickerOpen(false);
      updateFormatState();
      handleInput(); // Trigger update to parent
    }
  }, [color.hex, restoreSelection, updateFormatState, handleInput]);

  return (
    <div className={cn("flex flex-col gap-0", className)}>
      <div className="flex items-center gap-1 border rounded-t">
        <Toggle
          size="xs"
          pressed={formatState.isBold}
          onPressedChange={() => toggleFormat("bold")}
        >
          <Bold className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="xs"
          pressed={formatState.isItalic}
          onPressedChange={() => toggleFormat("italic")}
        >
          <Italic className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="xs"
          pressed={formatState.isUnderline}
          onPressedChange={() => toggleFormat("underline")}
        >
          <Underline className="h-4 w-4" />
        </Toggle>

        <Popover>
          <PopoverTrigger asChild>
            <Toggle
              size="sm"
              pressed={formatState.isLink}
              onMouseDown={(e) => {
                e.preventDefault(); // Prevent losing selection
                saveSelection();
              }}
            >
              <LinkIcon className="h-4 w-4" />
            </Toggle>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-3 max-w-[260px]">
            <form
              className="flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                addLink();
              }}
            >
              <Input
                type="url"
                className="h-7"
                placeholder={formatState.isLink ? "Remove link" : "Enter URL"}
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addLink();
                  }
                }}
              />
              <Button size="sm" className="h-7" type="submit">
                {linkUrl ? (formatState.isLink ? "Update" : "Add") : "Close"}
              </Button>
            </form>
          </PopoverContent>
        </Popover>

        <Popover open={isColorPickerOpen} onOpenChange={setIsColorPickerOpen}>
          <PopoverTrigger asChild>
            <Toggle
              size="sm"
              pressed={isColorPickerOpen}
              onMouseDown={(e) => {
                e.preventDefault();
                saveSelection();
              }}
            >
              <div className="relative">
                <Palette className="h-4 w-4" />
                <div
                  className="absolute bottom-0 right-0 h-2 w-2 rounded-full border border-white"
                  style={{ backgroundColor: color.hex }}
                />
              </div>
            </Toggle>
          </PopoverTrigger>
          <PopoverContent className="w-fit p-0 border-none">
            <div className="flex flex-col gap-2 p-2">
              <SketchPicker
                color={color.hex}
                onChange={(newColor) => {
                  setColor(newColor);
                }}
                disableAlpha
                className="!shadow-none"
              />
              <Button size="sm" onClick={applyColor}>
                Apply Color
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onMouseUp={updateFormatState}
        onKeyUp={updateFormatState}
        className={cn(
          "min-h-[100px] w-full rounded-b-md border-x border-b border-input bg-background px-3 py-2 text-[14px] ring-offset-background",
          "placeholder:text-muted-foreground ",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "[&_a]:text-primary [&_a]:underline",
        )}
      />
    </div>
  );
};
