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
                "bg-[#F9F9F9] text-foreground transition-all duration-700",
                className
            )}
            {...props}
        >
            {/* Soft Warm Background Layer */}
            <div 
                className="absolute inset-0 bg-[url('/images/bg-marble.png')] bg-cover bg-center bg-no-repeat opacity-[0.15] scale-105 pointer-events-none" 
                style={{ filter: 'grayscale(0.5) brightness(1.2)' }}
            />
            
            {/* Subtle Warm Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#8B0000]/5 via-transparent to-[#FFCC00]/5 pointer-events-none" />

            <div className="relative w-full max-w-md mx-auto animate-in fade-in zoom-in duration-1000">
                <div className="bg-white p-10 rounded-[40px] border border-black/5 shadow-[0_30px_60px_-15px_rgba(139,0,0,0.1)] ring-1 ring-black/5">
                    {children}
                </div>
            </div>
        </main>
    );
}
