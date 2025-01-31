import ShikiHighlighter from "react-shiki";

export const CodeBlock = ({ code, lang }: { code: string; lang: string }) => {
  return (
    <div className="relative rounded m-1 max-w-[600px] text-sm z-0">
      <div className="[&_pre]:!whitespace-pre-wrap [&_pre]:break-all [&_code]:!whitespace-pre-wrap [&_code]:break-all">
        <ShikiHighlighter language={lang} theme={"github-light"}>
          {code.trim()}
        </ShikiHighlighter>
      </div>
    </div>
  );
};
