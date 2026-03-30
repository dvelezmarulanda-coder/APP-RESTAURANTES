"use client";

import * as React from "react";
import { supabase } from "@/lib/supabase";
import { QRCodeCanvas } from "qrcode.react";
import { Star, LogOut, QrCode, X, Download } from "lucide-react";
import Link from "next/link";

type FeedbackEntry = {
    id: string;
    restaurant_id: string;
    table_number: string | null;
    rating: number;
    sentiment: "POSITIVE" | "NEGATIVE";
    tags_selected: string[];
    customer_comment: string | null;
    redirected_to_google: boolean;
    created_at: string;
};

export default function AdminDashboard() {
    const [feedbacks, setFeedbacks] = React.useState<FeedbackEntry[]>([]);
    const [filter, setFilter] = React.useState<"ALL" | "POSITIVE" | "NEGATIVE">("ALL");
    const [loading, setLoading] = React.useState(true);
    const [showQR, setShowQR] = React.useState(false);
    const [origin, setOrigin] = React.useState("");

    React.useEffect(() => {
        fetchFeedback();
        setOrigin(window.location.origin);
    }, []);

    const fetchFeedback = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("feedback_entries")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Error fetching feedback:", error);
        } else {
            setFeedbacks(data || []);
        }
        setLoading(false);
    };

    const downloadQR = () => {
        const canvas = document.getElementById("qr-canvas") as HTMLCanvasElement;
        if (canvas) {
            const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
            let downloadLink = document.createElement("a");
            downloadLink.href = pngUrl;
            downloadLink.download = "flash-feedback-qr.png";
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        }
    };

    const filteredFeedbacks = feedbacks.filter((fb) => {
        if (filter === "ALL") return true;
        return fb.sentiment === filter;
    });

    const totalCount = feedbacks.length;
    const positiveCount = feedbacks.filter((fb) => fb.sentiment === "POSITIVE").length;
    const negativeCount = feedbacks.filter((fb) => fb.sentiment === "NEGATIVE").length;
    const avgRating = feedbacks.length > 0
        ? (feedbacks.reduce((sum, fb) => sum + fb.rating, 0) / feedbacks.length).toFixed(1)
        : "0.0";
    const redirectedCount = feedbacks.filter((fb) => fb.redirected_to_google).length;
    const redirectedPercent = totalCount > 0 ? ((redirectedCount / totalCount) * 100).toFixed(0) : "0";

    return (
        <div className="min-h-screen bg-[#171719] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#2a2a2e] via-[#1e1e20] to-[#1a1a1c] p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
                        <p className="text-white/70">Vista general de todos los feedbacks recibidos</p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => setShowQR(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-all shadow-[0_0_15px_rgba(230,184,0,0.3)]"
                        >
                            <QrCode className="w-4 h-4" />
                            Ver QR
                        </button>
                        <Link
                            href="/"
                            className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 transition-all"
                        >
                            <LogOut className="w-4 h-4" />
                            Salir
                        </Link>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <StatCard title="Total Feedbacks" value={totalCount.toString()} />
                    <StatCard title="Positivos" value={positiveCount.toString()} variant="positive" />
                    <StatCard title="Negativos" value={negativeCount.toString()} variant="negative" />
                    <StatCard title="Rating Promedio" value={`${avgRating} ⭐`} />
                </div>

                {/* Additional Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                        <p className="text-sm text-white/70 mb-1">Redirigidos a Google Maps</p>
                        <p className="text-3xl font-bold text-primary">{redirectedCount}</p>
                        <p className="text-xs text-white/60 mt-1">{redirectedPercent}% del total</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                        <p className="text-sm text-white/70 mb-1">Tasa de Satisfacción</p>
                        <p className="text-3xl font-bold text-white">
                            {totalCount > 0 ? ((positiveCount / totalCount) * 100).toFixed(0) : "0"}%
                        </p>
                        <p className="text-xs text-white/60 mt-1">Basado en sentiment</p>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex gap-3 mb-6">
                    <FilterButton active={filter === "ALL"} onClick={() => setFilter("ALL")}>
                        Todos ({totalCount})
                    </FilterButton>
                    <FilterButton active={filter === "POSITIVE"} onClick={() => setFilter("POSITIVE")}>
                        Positivos ({positiveCount})
                    </FilterButton>
                    <FilterButton active={filter === "NEGATIVE"} onClick={() => setFilter("NEGATIVE")}>
                        Negativos ({negativeCount})
                    </FilterButton>
                </div>

                {/* Feedback List */}
                {loading ? (
                    <div className="text-center py-12">
                        <p className="text-white/70">Cargando feedbacks...</p>
                    </div>
                ) : filteredFeedbacks.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-white/70">No hay feedbacks que mostrar</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {filteredFeedbacks.map((feedback) => (
                            <FeedbackCard key={feedback.id} feedback={feedback} />
                        ))}
                    </div>
                )}

                {/* QR Modal */}
                {showQR && (
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="bg-[#232326] border border-white/10 rounded-2xl p-8 max-w-sm w-full relative shadow-2xl">
                            <button
                                onClick={() => setShowQR(false)}
                                className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <div className="text-center">
                                <h2 className="text-2xl font-bold text-white mb-2">Código QR</h2>
                                <p className="text-white/90 mb-6 text-sm">Escanea para ir a la encuesta</p>

                                <div className="bg-white p-4 rounded-xl mx-auto w-fit mb-6">
                                    <QRCodeCanvas
                                        id="qr-canvas"
                                        value={origin}
                                        size={200}
                                        level={"H"}
                                        includeMargin={true}
                                    />
                                </div>

                                <button
                                    onClick={downloadQR}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-black font-bold rounded-xl hover:bg-primary/90 transition-all"
                                >
                                    <Download className="w-5 h-5" />
                                    Descargar PNG
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

// Stat Card Component
function StatCard({
    title,
    value,
    variant = "default",
}: {
    title: string;
    value: string;
    variant?: "default" | "positive" | "negative";
}) {
    const colorClass =
        variant === "positive"
            ? "text-green-400"
            : variant === "negative"
                ? "text-red-400"
                : "text-white";

    return (
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <p className="text-sm text-white/80 mb-1">{title}</p>
            <p className={`text-3xl font-bold ${colorClass}`}>{value}</p>
        </div>
    );
}

// Filter Button Component
function FilterButton({
    active,
    onClick,
    children,
}: {
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
}) {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${active
                ? "bg-primary text-black"
                : "bg-white/5 text-white hover:bg-white/10"
                }`}
        >
            {children}
        </button>
    );
}

// Feedback Card Component
function FeedbackCard({ feedback }: { feedback: FeedbackEntry }) {
    const isPositive = feedback.sentiment === "POSITIVE";
    const date = new Date(feedback.created_at).toLocaleString("es-ES", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                {/* Left: Main Content */}
                <div className="flex-1">
                    {/* Rating & Sentiment */}
                    <div className="flex items-center gap-3 mb-3">
                        <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    className={`w-5 h-5 ${star <= feedback.rating
                                        ? "fill-[#E6B800] text-[#E6B800]"
                                        : "fill-none text-[#E6B800]"
                                        }`}
                                />
                            ))}
                        </div>
                        <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${isPositive
                                ? "bg-green-500/20 text-green-400"
                                : "bg-red-500/20 text-red-400"
                                }`}
                        >
                            {isPositive ? "Positivo" : "Negativo"}
                        </span>
                        {feedback.redirected_to_google && (
                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/20 text-primary">
                                📍 Maps
                            </span>
                        )}
                    </div>

                    {/* Tags */}
                    {feedback.tags_selected && feedback.tags_selected.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                            {feedback.tags_selected.map((tag, idx) => (
                                <span
                                    key={idx}
                                    className="px-2 py-1 bg-white/10 text-white/80 text-xs rounded-md"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Comment */}
                    {feedback.customer_comment && (
                        <p className="text-white/90 mb-3">{feedback.customer_comment}</p>
                    )}

                    {/* Metadata */}
                    <div className="flex gap-4 text-xs text-white/70">
                        <span>📅 {date}</span>
                        {feedback.table_number && <span>🪑 Mesa: {feedback.table_number}</span>}
                    </div>
                </div>
            </div>
        </div>
    );
}
