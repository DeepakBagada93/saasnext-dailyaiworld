"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ToolWrapperProps {
    title: string;
    description: string;
    children: React.ReactNode;
    className?: string;
}

export function ToolWrapper({ title, description, children, className }: ToolWrapperProps) {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
            >
                <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                    {title}
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    {description}
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className={cn(
                    "glass-card p-6 md:p-8 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl",
                    className
                )}
            >
                {children}
            </motion.div>
        </div>
    );
}
