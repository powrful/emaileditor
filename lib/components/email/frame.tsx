import { cn } from "@/utils";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export const Frame = ({
  children,
  ...props
}: {
  children: React.ReactNode;
} & React.IframeHTMLAttributes<HTMLIFrameElement>) => {
  const [contentRef, setContentRef] = useState<HTMLIFrameElement | null>(null);

  const mountNode = contentRef?.contentWindow?.document?.body;

  useEffect(() => {
    if (contentRef?.contentWindow?.document) {
      const doc = contentRef.contentWindow.document;
      (doc.body.style as any).scrollbarWidth = "none";
      (doc.body.style as any).msOverflowStyle = "none";
      // Add webkit scrollbar style to head
      const style = doc.createElement("style");
      style.textContent = `::-webkit-scrollbar { display: none; }`;
      doc.head.appendChild(style);
    }
  }, [contentRef]);

  return (
    <iframe
      {...props}
      ref={setContentRef}
      style={{
        ...props.style,
        border: "none",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
      className={cn(props.className, "[&::-webkit-scrollbar]:hidden")}
    >
      {mountNode && createPortal(children, mountNode)}
    </iframe>
  );
};
