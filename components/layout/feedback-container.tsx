import * as React from "react";
import { cn } from "@/lib/utils";

interface FeedbackContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export function FeedbackContainer({ children, className, ...props }: FeedbackContainerProps) {
    return (
        <main
            className={cn(
                "min-h-screen w-full flex flex-col items-center justify-center p-4",
                "bg-[#1e1e20] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#2a2a2e] via-[#1e1e20] to-[#1a1a1c]",
                "text-foreground",
                className
            )}
            {...props}
        >
            <div className="w-full max-w-md mx-auto animate-in fade-in zoom-in duration-500 bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-2xl ring-1 ring-white/5">
                {children}
            </div>
        </main>
    );
}
