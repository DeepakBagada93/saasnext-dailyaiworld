"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CategoryHeroProps {
    title: string;
    description: string;
    gradient: string;
}

export function CategoryHero({ title, description, gradient }: CategoryHeroProps) {
    return (
        <div className="relative w-full py-20 md:py-32 overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 opacity-10">
                <div className={cn("absolute inset-0 bg-gradient-to-br", gradient)} />
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-3xl mx-auto text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70"
                    >
                        {title}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-lg md:text-xl text-muted-foreground leading-relaxed"
                    >
                        {description}
                    </motion.p>
                </div>
            </div>
        </div>
    );
}
