"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function ReadingProgressBar() {
    const [progress, setProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const calculateProgress = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollProgress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            setProgress(Math.min(100, Math.max(0, scrollProgress)));
            setIsVisible(scrollTop > 200);
        };

        window.addEventListener("scroll", calculateProgress, { passive: true });
        calculateProgress();

        return () => window.removeEventListener("scroll", calculateProgress);
    }, []);

    return (
        <div
            className={cn(
                "fixed top-0 left-0 right-0 z-50 h-1 transition-opacity duration-300",
                isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
        >
            <div
                className="h-full bg-gradient-to-r from-orange-500 to-orange-400 transition-all duration-150 ease-out relative"
                style={{ width: `${progress}%` }}
            >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-orange-400 rounded-full shadow-lg shadow-orange-500/50" />
            </div>
            <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-r from-orange-500/20 to-transparent" />
        </div>
    );
}
