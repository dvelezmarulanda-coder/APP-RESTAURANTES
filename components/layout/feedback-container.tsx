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
                "bg-background text-foreground transition-all duration-700",
                className
            )}
            {...props}
        >
            {/* Soft Warm Background Layer */}
            <div 
                className="absolute inset-0 bg-[url('/images/bg-marble.png')] bg-cover bg-center bg-no-repeat opacity-20 scale-105 pointer-events-none" 
                style={{ filter: 'sepia(0.2) brightness(1.1)' }}
            />
            
            {/* Subtle Warm Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 via-transparent to-primary/5 pointer-events-none" />

            <div className="relative w-full max-w-md mx-auto animate-in fade-in zoom-in duration-1000">
                <div className="bg-card p-10 rounded-[32px] border border-border shadow-[0_20px_50px_rgba(0,0,0,0.08)] ring-1 ring-black/5">
                    {children}
                </div>
            </div>
        </main>
    );
}
