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
        <div className="flex flex-col items-center gap-4 py-8 relative">
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
                                strokeWidth={1}
                                className={cn(
                                    "transition-all duration-500 ease-out",
                                    isActive
                                        ? "fill-primary text-primary drop-shadow-[0_0_20px_rgba(230,184,0,0.5)] scale-105"
                                        : "fill-white/5 text-white/20 group-hover:text-primary/40"
                                )}
                            />
                        </button>
                    );
                })}
            </div>

            {/* Tooltip matching the screenshot */}
            <div className="animate-in fade-in slide-in-from-top-2 duration-700 delay-300">
                <div className="bg-white/95 text-[#1a1a1c] text-[10px] font-bold px-3 py-1 rounded-sm shadow-xl flex items-center justify-center">
                    Has clic para seleccionar.
                </div>
            </div>
        </div>
    );
}

