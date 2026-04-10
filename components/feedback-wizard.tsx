"use client";

import * as React from "react";
import { StarRating } from "@/components/ui/star-rating";
import { TagButton } from "@/components/ui/tag-button";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { Send, MapPin, Zap, MessageSquare } from "lucide-react";

type FeedbackStep = "RATING" | "DETAILS" | "SUBMITTED";
type Sentiment = "POSITIVE" | "NEGATIVE";

// Mock Data - In a real app these might come from config
const POSITIVE_TAGS = ["Buena Comida", "Excelente Servicio", "Ambiente", "Rapidez", "Bebidas"];
const NEGATIVE_TAGS = ["Tiempo de Espera", "Comida Fría", "Atención", "Ruido", "Precio"];

export function FeedbackWizard() {
    const [step, setStep] = React.useState<FeedbackStep>("RATING");
    const [rating, setRating] = React.useState<number>(0);
    const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
    const [comment, setComment] = React.useState("");

    // Phase 4: State Updated (Removed Contact, Added Loading)
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    // Configuration (Mock)
    const GOOGLE_MAPS_URL = "https://goo.gl/maps/example";
    const hasGoogleMaps = Boolean(GOOGLE_MAPS_URL);

    // Derived State
    const sentiment: Sentiment = rating >= 4 ? "POSITIVE" : "NEGATIVE";
    const isPositive = sentiment === "POSITIVE";

    // Handlers
    const handleRatingSelect = (score: number) => {
        setRating(score);
        setStep("DETAILS");
    };

    const toggleTag = (tag: string) => {
        setSelectedTags(prev =>
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        );
    };

    const submitSurvey = async (shouldRedirectToMaps: boolean = false) => {
        setIsSubmitting(true);

        const payload = {
            restaurant_id: "demo-restaurant-id",
            table_number: "demo-table",
            rating,
            sentiment,
            tags_selected: selectedTags,
            customer_comment: comment,
            // Removed customer_contact per user request
            redirected_to_google: isPositive && shouldRedirectToMaps,
            created_at: new Date().toISOString(),
        };

        console.log("Submitting Payload to DB:", payload);

        try {
            const { data, error } = await supabase
                .from('feedback_entries')
                .insert([payload])
                .select();

            if (error) {
                console.error("Supabase Error:", error);
                alert("Hubo un error al enviar tu feedback. Por favor intenta de nuevo.");
                setIsSubmitting(false);
                return;
            }

            console.log("Successfully saved:", data);
        } catch (err) {
            console.error("Unexpected error:", err);
            alert("Hubo un error inesperado. Por favor intenta de nuevo.");
            setIsSubmitting(false);
            return;
        }

        setIsSubmitting(false);
        setStep("SUBMITTED");

        if (isPositive && shouldRedirectToMaps && hasGoogleMaps) {
            window.open(GOOGLE_MAPS_URL, "_blank");
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Default action for form submit (Enter key) depends on context, 
        // but explicit buttons handle the specific logic. 
        // We'll default to internal submit if triggered by enter key in textarea (unlikely)
        submitSurvey(false);
    };

    if (step === "SUBMITTED") {
        return (
            <div className="text-center space-y-6 animate-in fade-in zoom-in duration-500 py-8">
                <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto ring-1 ring-white/10">
                    <span className="text-6xl drop-shadow-[0_0_20px_rgba(255,204,0,0.5)]">
                        {isPositive ? "⭐" : "🎁"}
                    </span>
                </div>

                <div className="space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight text-white leading-tight">
                        {isPositive ? "¡Gracias por tu apoyo!" : "¡Gracias por ayudarnos!"}
                    </h2>
                    <p className="text-white/60 max-w-[80%] mx-auto font-medium">
                        {isPositive
                            ? "Tus comentarios nos ayudan muchísimo a seguir mejorando."
                            : "Lamentamos que no haya sido perfecto. Aquí tienes un detalle para la próxima:"}
                    </p>
                </div>

                {!isPositive && (
                    <div className="bg-primary/5 border border-primary/20 p-8 rounded-3xl mt-6 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:rotate-12 transition-transform">
                            <Zap className="w-12 h-12 text-primary" />
                        </div>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-primary/80 font-bold mb-3">Tu Regalo de Cortesía</p>
                        <p className="text-4xl font-mono font-black text-primary tracking-[0.15em] selection:bg-primary/20">FLASH15</p>
                        <p className="text-sm text-primary/60 mt-3 font-medium">Muestra este código en tu próxima visita.</p>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="w-full mx-auto">
            <div className="text-center mb-10 space-y-4">
                <div className="flex justify-center mb-6 transition-all duration-700 hover:rotate-6">
                    <div className="p-5 bg-[#FFCC00]/10 rounded-3xl shadow-lg border border-[#FFCC00]/20 ring-1 ring-[#FFCC00]/10">
                        <Zap className="w-10 h-10 text-[#FFCC00] fill-[#FFCC00]/20 drop-shadow-[0_0_10px_rgba(255,204,0,0.4)]" />
                    </div>
                </div>

                <div className="space-y-3">
                    <h1 className="text-3xl font-bold tracking-tight text-white leading-tight">
                        {step === "RATING" 
                            ? "Califica Tu Experiencia" 
                            : isPositive 
                                ? "¿Qué fue lo que más te gustó?" 
                                : "¿Cómo podemos mejorar?"}
                    </h1>
                    <p className="text-white/60 text-base font-medium tracking-wide max-w-[90%] mx-auto">
                        {step === "RATING" && "Ayúdanos a brindarte un mejor servicio cada día."}
                        {step === "DETAILS" && !isPositive && "Valoramos mucho tu honestidad."}
                    </p>
                </div>
            </div>

            {step === "RATING" && (
                <div className="animate-in fade-in slide-in-from-bottom-5 duration-500 py-4">
                    <StarRating rating={rating} onRatingChange={handleRatingSelect} />
                </div>
            )}

            {step === "DETAILS" && (
                <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-500">

                    {/* Tags Selection */}
                    <div className="flex flex-wrap gap-3 justify-center">
                        {(isPositive ? POSITIVE_TAGS : NEGATIVE_TAGS).map((tag) => (
                            <TagButton
                                key={tag}
                                selected={selectedTags.includes(tag)}
                                onToggle={() => toggleTag(tag)}
                            >
                                {tag}
                            </TagButton>
                        ))}
                    </div>

                    {/* Comment Section */}
                    <div className="space-y-3">
                        <label className="text-sm font-bold ml-1 text-white/50 lowercase first-letter:uppercase">
                            {isPositive ? "Déjanos un comentario (Opcional)" : "¿Quieres detallar algo más? (Opcional)"}
                        </label>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder={isPositive ? "Todo estuvo excelente..." : "La comida demoró un poco..."}
                            required={false}
                            className="w-full bg-white/5 border border-white/10 rounded-[24px] p-5 min-h-[130px] text-white placeholder:text-white/20 focus:ring-2 focus:ring-[#FFCC00]/20 focus:border-[#FFCC00]/50 focus:outline-none resize-none transition-all shadow-inner"
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-4 space-y-4">
                        {isPositive ? (
                            <>
                                {/* Option 1: Send Internal Comments (New Button) */}
                                <button
                                    type="button"
                                    disabled={isSubmitting}
                                    onClick={() => submitSurvey(false)}
                                    className="w-full py-4 rounded-[24px] font-bold text-lg text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all flex items-center justify-center gap-3 active:scale-95"
                                >
                                    <MessageSquare className="w-5 h-5" /> Enviar Comentarios
                                </button>

                                {/* Option 2: Publish to Maps (Highlight Button) */}
                                {hasGoogleMaps && (
                                    <button
                                        type="button"
                                        disabled={isSubmitting}
                                        onClick={() => submitSurvey(true)}
                                        className={cn(
                                            "w-full py-4 rounded-[24px] font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3",
                                            "bg-[#FFCC00] text-black hover:brightness-110 active:scale-95",
                                            "shadow-xl shadow-[#FFCC00]/20 hover:shadow-2xl hover:shadow-[#FFCC00]/30",
                                            isSubmitting && "opacity-50 cursor-not-allowed"
                                        )}
                                    >
                                        {isSubmitting ? "Enviando..." : (
                                            <>
                                                <MapPin className="w-5 h-5" /> Publicar en Google Maps
                                            </>
                                        )}
                                    </button>
                                )}
                            </>
                        ) : (
                            /* Negative Sentiment - Single Action */
                            <button
                                type="submit"
                                disabled={isSubmitting || selectedTags.length === 0}
                                className={cn(
                                    "w-full py-4 rounded-[24px] font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3",
                                    "bg-[#8B0000] text-white hover:brightness-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed",
                                    "shadow-xl shadow-[#8B0000]/20 hover:shadow-2xl hover:shadow-[#8B0000]/30",
                                    (isSubmitting || selectedTags.length === 0) && "shadow-none"
                                )}
                            >
                                {isSubmitting ? "Enviando..." : (
                                    <>
                                        <Send className="w-5 h-5" /> Enviar Reporte Interno
                                    </>
                                )}
                            </button>
                        )}

                        <button
                            type="button"
                            onClick={() => setStep("RATING")}
                            className="w-full text-sm font-semibold text-muted-foreground hover:text-primary transition-colors pt-2"
                          >
                            Volver
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}
