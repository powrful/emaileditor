import * as css from "csstype";

export type SectionBlock = {
  type: "section";
  content: "column" | "row";
  style: {
    backgroundColor: css.Property.BackgroundColor;
    borderRadius: css.Property.BorderRadius;
    borderWidth: css.Property.BorderWidth;
    borderColor: css.Property.BorderColor;
  };
};
