import * as css from "csstype";

export type DividerBlock = {
  type: "divider";
  content: "divider";
  style: {
    border: {
      width: css.Property.BorderWidth;
      color: css.Property.BorderColor;
    };

    margin: {
      top: css.Property.MarginTop;
      bottom: css.Property.MarginBottom;
      left: css.Property.MarginLeft;
      right: css.Property.MarginRight;
    };

    padding: {
      top: css.Property.PaddingTop;
      bottom: css.Property.PaddingBottom;
      left: css.Property.PaddingLeft;
      right: css.Property.PaddingRight;
    };
  };
};
