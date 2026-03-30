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
                    ? "bg-primary text-black border-primary shadow-[0_0_20px_rgba(230,184,0,0.5)] font-bold transform scale-105" // Gold Glow + Bold
                    : "bg-white/5 text-white border-white/20 hover:border-primary/50 hover:text-primary hover:bg-white/10 hover:shadow-[0_0_10px_rgba(230,184,0,0.2)]",
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}
