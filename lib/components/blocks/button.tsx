import { Button as ButtonComponent } from "@react-email/components";
import { CSSProperties } from "react";

export type ButtonBlock = {
  type: "button";
  content: string;
  style: CSSProperties;
};

export const Button = ({ content, style }: ButtonBlock) => {
  return <ButtonComponent style={style}>{content}</ButtonComponent>;
};
