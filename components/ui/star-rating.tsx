"use client";

import * as React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
    rating: number;
    onRatingChange: (rating: number) => void;
    maxStars?: number;
}

export function StarRating({ rating, onRatingChange, maxStars = 5 }: StarRatingProps) {
    const [hoverRating, setHoverRating] = React.useState<number>(0);

    return (
        <div className="flex flex-col items-center gap-2 py-4 relative">
            <div className="flex gap-4 justify-center">
                {Array.from({ length: maxStars }).map((_, i) => {
                    const starValue = i + 1;
                    const isActive = starValue <= (hoverRating || rating);

                    return (
                        <button
                            key={i}
                            type="button"
                            className={cn(
                                "transition-all duration-300 focus:outline-none rounded-full group",
                                "hover:scale-110 active:scale-90"
                            )}
                            onClick={() => onRatingChange(starValue)}
                            onMouseEnter={() => setHoverRating(starValue)}
                            onMouseLeave={() => setHoverRating(0)}
                            aria-label={`Calificar con ${starValue} estrellas`}
                        >
                             <Star
                                 size={44}
                                 strokeWidth={1.5}
                                 className={cn(
                                     "transition-all duration-500 ease-out",
                                     isActive
                                         ? "fill-[#FFCC00] text-[#FFCC00] drop-shadow-[0_0_20px_rgba(255,204,0,0.5)] scale-110"
                                         : "fill-white/10 text-white/20 group-hover:text-[#FFCC00]/50"
                                 )}
                             />
                         </button>
                     );
                 })}
             </div>

             {/* Tooltip matching the screenshot */}
             <div className="animate-in fade-in slide-in-from-top-2 duration-700 delay-300">
                 <div className="bg-white/5 text-white/40 text-[11px] font-bold px-4 py-1.5 rounded-full border border-white/10 shadow-sm flex items-center justify-center">
                     Haz clic para seleccionar.
                 </div>
             </div>
         </div>
     );
}

