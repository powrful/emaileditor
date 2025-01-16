import { useEffect, useState } from "react";

interface Position {
  top: number;
  left: number;
  width: number;
  height: number;
}

export function useIframeElementPosition(
  selector: string,
  leftOffset: number = 0,
): Position {
  const [position, setPosition] = useState<Position>({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const updatePosition = () => {
      const iframe = document.querySelector("iframe");
      const iframeDocument = iframe?.contentDocument;

      if (iframeDocument) {
        const element = iframeDocument.querySelector(selector);
        if (element) {
          const rect = element.getBoundingClientRect();
          const iframeRect = iframe.getBoundingClientRect();

          setPosition({
            top: rect.top + iframeRect.top,
            left: rect.left + leftOffset,
            width: rect.width,
            height: rect.height,
          });
        }
      }
    };

    const iframe = document.querySelector("iframe");
    const resizeObserver = new ResizeObserver(updatePosition);
    if (iframe) {
      resizeObserver.observe(iframe);
    }

    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("resize", updatePosition);
      resizeObserver.disconnect();
    };
  }, [selector, leftOffset]);

  return position;
}
