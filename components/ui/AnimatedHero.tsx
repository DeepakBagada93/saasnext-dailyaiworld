"use client";

import { motion } from "framer-motion";

export function AnimatedHero() {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            },
        },
    };

    const item = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" as const } },
    };

    return (
        <header className="mb-16 text-center max-w-3xl mx-auto px-4">
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="space-y-6"
            >
                <motion.h1
                    variants={item}
                    className="text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70"
                >
                    Daily AI World
                </motion.h1>

                <motion.p
                    variants={item}
                    className="text-xl md:text-2xl text-muted-foreground leading-relaxed"
                >
                    Exploring the intersection of <span className="text-foreground font-medium">Artificial Intelligence</span>, <span className="text-foreground font-medium">Business</span>, <span className="text-foreground font-medium">Design</span>, and <span className="text-foreground font-medium">Future Trends</span>.
                </motion.p>

                <motion.div variants={item} className="pt-4">
                    <div className="h-1 w-24 bg-primary mx-auto rounded-full" />
                </motion.div>
            </motion.div>
        </header>
    );
}
