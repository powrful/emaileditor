import { Property } from "csstype";

export type Border = {
  "border-width": Property.BorderWidth;
  "border-color": Property.BorderColor;
  "border-radius": Property.BorderRadius;
};

export type Margin = {
  "margin-top": Property.MarginTop;
  "margin-bottom": Property.MarginBottom;
  "margin-left": Property.MarginLeft;
  "margin-right": Property.MarginRight;
};

export type Padding = {
  "padding-top": Property.PaddingTop;
  "padding-bottom": Property.PaddingBottom;
  "padding-left": Property.PaddingLeft;
  "padding-right": Property.PaddingRight;
};
