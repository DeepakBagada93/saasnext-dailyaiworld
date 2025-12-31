"use client";

import { motion } from "framer-motion";

export function AnimatedLogo() {
    return (
        <div className="relative w-10 h-10 flex items-center justify-center">
            <svg
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full drop-shadow-lg"
            >
                <defs>
                    <linearGradient id="globe-gradient" x1="0" y1="0" x2="100" y2="100">
                        <stop offset="0%" stopColor="#f97316" /> {/* Orange-500 */}
                        <stop offset="50%" stopColor="#ea580c" /> {/* Orange-600 */}
                        <stop offset="100%" stopColor="#db2777" /> {/* Pink-600 for "awesome" pop */}
                    </linearGradient>
                    <linearGradient id="glow-gradient" x1="50" y1="0" x2="50" y2="100">
                        <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
                    </linearGradient>
                </defs>

                {/* Outer Rotating Ring */}
                <motion.circle
                    cx="50"
                    cy="50"
                    r="46"
                    stroke="url(#globe-gradient)"
                    strokeWidth="2"
                    strokeDasharray="15 10"
                    strokeLinecap="round"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />

                {/* Inner Rotating Ring (Reverse) */}
                <motion.circle
                    cx="50"
                    cy="50"
                    r="38"
                    stroke="url(#globe-gradient)"
                    strokeWidth="1.5"
                    strokeDasharray="5 5"
                    strokeOpacity="0.5"
                    initial={{ rotate: 360 }}
                    animate={{ rotate: 0 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                />

                {/* Globe Grid Lines */}
                <motion.path
                    d="M50 10 C 75 10, 90 30, 90 50 C 90 70, 75 90, 50 90 C 25 90, 10 70, 10 50 C 10 30, 25 10, 50 10 Z"
                    stroke="url(#globe-gradient)"
                    strokeWidth="1"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.3 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                />
                <motion.path
                    d="M10 50 L90 50 M50 10 L50 90"
                    stroke="url(#globe-gradient)"
                    strokeWidth="1"
                    strokeOpacity="0.3"
                />

                {/* Pulsing Core */}
                <motion.circle
                    cx="50"
                    cy="50"
                    r="18"
                    fill="url(#globe-gradient)"
                    initial={{ scale: 0.8, opacity: 0.8 }}
                    animate={{ scale: [0.8, 1.1, 0.8], opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Central Sparkle */}
                <motion.path
                    d="M50 35 L54 46 L65 50 L54 54 L50 65 L46 54 L35 50 L46 46 Z"
                    fill="white"
                    initial={{ scale: 0, rotate: 0 }}
                    animate={{ scale: [0.8, 1.2, 0.8], rotate: [0, 180, 360] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
            </svg>
        </div>
    );
}
