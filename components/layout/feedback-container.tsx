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
                "bg-[#6b0303] text-foreground transition-all duration-700",
                className
            )}
            {...props}
        >
            {/* Soft Red Background with Silhouettes */}
            <div 
                className="absolute inset-0 bg-[url('/images/bg-fastfood.png')] bg-repeat opacity-[0.25] scale-100 pointer-events-none" 
                style={{ backgroundSize: '300px' }}
            />
            
            {/* Vignette Overlay for Depth */}
            <div className="absolute inset-0 bg-radial-[circle_at_center,_transparent_0%,_rgba(0,0,0,0.4)_100%] pointer-events-none" />

            <div className="relative w-full max-w-md mx-auto animate-in fade-in zoom-in duration-1000">
                <div className="bg-white/95 backdrop-blur-md p-10 rounded-[40px] border border-white/20 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)] ring-1 ring-black/5">
                    {children}
                </div>
            </div>
        </main>
    );
}
