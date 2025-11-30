"use client";

import { Target, TrendingUp, Calendar } from "lucide-react";

interface MotivationalCardProps {
    title: string;
    currentValue: number;
    targetValue: number;
    period: string;
    message?: string;
}

export function MotivationalCard({
    title,
    currentValue,
    targetValue,
    period,
    message,
}: MotivationalCardProps) {
    const progress = (currentValue / targetValue) * 100;
    const remaining = targetValue - currentValue;

    const getMotivationalMessage = () => {
        if (message) return message;

        if (progress >= 100) {
            return "🎉 Target achieved! You're crushing it!";
        } else if (progress >= 75) {
            return "🔥 Almost there! Keep pushing!";
        } else if (progress >= 50) {
            return "💪 Halfway there! You're doing great!";
        } else if (progress >= 25) {
            return "🚀 Good start! Keep the momentum!";
        } else {
            return "✨ Let's make it happen! Start strong!";
        }
    };

    return (
        <div className="bg-gradient-to-br from-orange-500/10 to-red-600/10 border border-orange-500/20 rounded-xl p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-orange-500" />
                    <h3 className="font-semibold text-lg">{title}</h3>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{period}</span>
                </div>
            </div>

            <div className="space-y-3">
                <div className="flex items-end gap-3">
                    <div className="text-4xl font-bold text-orange-500">{currentValue}</div>
                    <div className="text-2xl text-muted-foreground pb-1">/ {targetValue}</div>
                </div>

                <div className="w-full bg-secondary rounded-full h-3 overflow-hidden">
                    <div
                        className="bg-gradient-to-r from-orange-500 to-red-600 h-full rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(progress, 100)}%` }}
                    />
                </div>

                <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                        {remaining > 0 ? `${remaining} more to go` : "Target exceeded!"}
                    </span>
                    <span className="font-medium text-orange-500">{Math.round(progress)}%</span>
                </div>

                <div className="mt-4 p-3 bg-card/50 rounded-lg border border-border/50">
                    <p className="text-sm font-medium text-foreground">{getMotivationalMessage()}</p>
                </div>
            </div>
        </div>
    );
}
