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
                    ? "bg-[#FFCC00] text-black border-[#FFCC00] shadow-[0_0_20px_rgba(255,204,0,0.3)] font-bold transform scale-105" 
                    : "bg-white/5 text-white/50 border-white/10 hover:border-[#FFCC00]/40 hover:text-white hover:bg-white/10",
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}
