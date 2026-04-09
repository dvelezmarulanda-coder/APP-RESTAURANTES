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
                "bg-[#4a0202] text-white transition-all duration-700",
                className
            )}
            {...props}
        >
            {/* Soft Red Background with Silhouettes (Blurred) */}
            <div 
                className="absolute inset-0 bg-[url('/images/bg-fastfood.png')] bg-repeat opacity-[0.2] scale-100 pointer-events-none blur-[0.8px]" 
                style={{ backgroundSize: '250px' }}
            />
            
            {/* Darker Vignette Overlay for Depth */}
            <div className="absolute inset-0 bg-radial-[circle_at_center,_transparent_0%,_rgba(0,0,0,0.6)_100%] pointer-events-none" />

            <div className="relative w-full max-w-md mx-auto animate-in fade-in zoom-in duration-1000">
                <div className="bg-[#1a0101]/80 backdrop-blur-xl p-10 rounded-[40px] border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] ring-1 ring-white/5">
                    {children}
                </div>
            </div>
        </main>
    );
}
