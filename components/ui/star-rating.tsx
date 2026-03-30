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
        <div className="flex gap-3 justify-center py-6">
            {Array.from({ length: maxStars }).map((_, i) => {
                const starValue = i + 1;
                const isActive = starValue <= (hoverRating || rating);

                return (
                    <button
                        key={i}
                        type="button"
                        className={cn(
                            "transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full",
                            "hover:scale-110 active:scale-95"
                        )}
                        onClick={() => onRatingChange(starValue)}
                        onMouseEnter={() => setHoverRating(starValue)}
                        onMouseLeave={() => setHoverRating(0)}
                        aria-label={`Rate ${starValue} stars`}
                    >
                        <Star
                            size={48} // Larger touch target
                            className={cn(
                                "transition-all duration-300",
                                isActive
                                    ? "fill-primary text-primary drop-shadow-[0_0_15px_rgba(230,184,0,0.6)]" // Gold Glow
                                    : "fill-transparent text-[#666666] hover:text-primary/50 stroke-[1.5]", // Thicker grey border
                            )}
                        />
                    </button>
                );
            })}
        </div>
    );
}
