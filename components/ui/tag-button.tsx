"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TagButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    selected?: boolean;
    onToggle?: () => void;
}

export function TagButton({
    className,
    selected,
    onToggle,
    children,
    ...props
}: TagButtonProps) {
    return (
        <button
            type="button"
            onClick={onToggle}
            className={cn(
                "px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border",
                "active:scale-95 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary",
                selected
                    ? "bg-primary text-white border-primary shadow-md font-bold transform scale-105" 
                    : "bg-background text-foreground border-border hover:border-primary/40 hover:text-primary hover:bg-white hover:shadow-sm",
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}
