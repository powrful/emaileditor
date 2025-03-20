type NumberInputProps = {
    label: string;
    defaultValue: number;
    minValue: number;
    maxValue: number;
    onChange: (value: number) => void;
};
export declare const NumberInput: ({ ...props }: NumberInputProps) => import("react/jsx-runtime").JSX.Element;
export {};
