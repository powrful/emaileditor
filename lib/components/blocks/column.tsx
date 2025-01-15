import * as css from "csstype";

// import type { }

export type ColumnBlock = {
  type: "column";
  content: ColumnBlock;
  style: {
    backgroundColor: css.Property.BackgroundColor;
    padding: css.Property.Padding;
    margin: css.Property.Margin;
  };
};
