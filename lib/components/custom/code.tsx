import { Tooltip } from "@/components/custom/tooltip";
import { useTheme } from "@/components/theme/provider";
import { Button } from "@/components/ui/button";
import { CheckIcon, CopyIcon } from "lucide-react";
import { useState } from "react";
import ShikiHighlighter from "react-shiki";

export const CodeBlock = ({ code, lang }: { code: string; lang: string }) => {
  const { theme } = useTheme();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative rounded m-1 max-w-[600px] text-sm z-0 group border border-border">
      <Tooltip text={copied ? "Copied" : "Copy"}>
        <Button
          onClick={handleCopy}
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 z-10"
          aria-label="Copy code"
        >
          {copied ? (
            <CheckIcon className="h-4 w-4" />
          ) : (
            <CopyIcon className="h-4 w-4" />
          )}
        </Button>
      </Tooltip>
      <div className="[&_pre]:!whitespace-pre-wrap [&_pre]:break-all [&_code]:!whitespace-pre-wrap [&_code]:break-all">
        <ShikiHighlighter
          language={lang}
          showLanguage={false}
          theme={theme === "dark" ? "min-dark" : "min-light"}
        >
          {code.trim()}
        </ShikiHighlighter>
      </div>
    </div>
  );
};
