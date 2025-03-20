import { Button } from '../ui/button';
interface FullscreenButtonProps extends React.ComponentProps<typeof Button> {
    onClick?: () => void;
    variant?: "outline" | "ghost";
}
export declare const FullscreenButton: import('react').ForwardRefExoticComponent<Omit<FullscreenButtonProps, "ref"> & import('react').RefAttributes<HTMLButtonElement>>;
export {};
