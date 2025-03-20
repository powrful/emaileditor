import { ColorResult } from 'react-color';
type ColorPickerProps = {
    color: string;
    onChange: (color: ColorResult) => void;
};
export type { ColorResult };
export declare const ColorPicker: ({ color, onChange }: ColorPickerProps) => import("react/jsx-runtime").JSX.Element;
