"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CategoryHeroProps {
    title: string;
    description: string;
    gradient: string;
}

export function CategoryHero({ title, description, gradient }: CategoryHeroProps) {
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
        <section className="relative overflow-hidden py-20 md:py-32">
            {/* Background Elements */}
            <div className={cn("absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] rounded-full blur-[120px] -z-10 opacity-30 bg-gradient-to-r", gradient)} />

            <div className="container mx-auto px-4 text-center max-w-4xl">
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="space-y-8"
                >
                    <motion.h1
                        variants={item}
                        className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter"
                    >
                        <span className={cn("bg-clip-text text-transparent bg-gradient-to-r", gradient)}>
                            {title}
                        </span>
                    </motion.h1>

                    <motion.p
                        variants={item}
                        className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto"
                    >
                        {description}
                    </motion.p>
                </motion.div>
            </div>
        </section>
    );
}
