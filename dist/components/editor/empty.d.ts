import { LucideIcon } from 'lucide-react';
import * as React from "react";
interface EmptyStateProps {
    title: string;
    description: string;
    icons?: LucideIcon[];
    cta?: React.ReactNode;
    className?: string;
}
export declare const EmptyState: ({ title, description, icons, cta, className, }: EmptyStateProps) => import("react/jsx-runtime").JSX.Element;
export {};
