import * as React from "react";
import { cn } from "@/lib/utils";

interface FeedbackContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export function FeedbackContainer({ children, className, ...props }: FeedbackContainerProps) {
    return (
        <main
            className={cn(
                "min-h-screen w-full flex flex-col items-center justify-center p-4 relative overflow-hidden",
                "bg-[#0a0a0a] text-foreground transition-all duration-700",
                className
            )}
            {...props}
        >
            {/* Premium Background Layer */}
            <div 
                className="absolute inset-0 bg-[url('/images/bg-marble.png')] bg-cover bg-center bg-no-repeat opacity-60 scale-105" 
                style={{ filter: 'brightness(0.7) contrast(1.2)' }}
            />
            
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/40 to-[#0a0a0a]/80" />

            <div className="relative w-full max-w-md mx-auto animate-in fade-in zoom-in duration-1000">
                <div className="bg-[#1a1a1c]/40 backdrop-blur-[24px] p-10 rounded-[32px] border border-white/10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)] ring-1 ring-white/5">
                    {children}
                </div>
            </div>
        </main>
    );
}
