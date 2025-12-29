"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

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
        <section className="relative overflow-hidden py-20 md:py-32">
            {/* Background Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/20 rounded-full blur-[120px] -z-10 opacity-50" />

            <div className="container mx-auto px-4 text-center max-w-4xl">
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="space-y-8"
                >
                    <motion.div variants={item} className="flex justify-center">
                        <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white backdrop-blur-sm">
                            <Sparkles className="mr-2 h-4 w-4 text-primary" />
                            <span className="text-muted-foreground">Welcome to the future</span>
                        </div>
                    </motion.div>

                    <motion.h1
                        variants={item}
                        className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter"
                    >
                        Daily <span className="text-gradient-primary">AI World</span>
                    </motion.h1>

                    <motion.p
                        variants={item}
                        className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto"
                    >
                        Your daily source for <span className="text-white font-medium">Artificial Intelligence</span>, <span className="text-white font-medium">Business</span>, and <span className="text-white font-medium">Future Trends</span>.
                    </motion.p>

                    <motion.div variants={item} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                        <Button asChild size="lg" className="rounded-full text-base px-8 h-12">
                            <Link href="#latest-posts">
                                Start Reading <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="rounded-full text-base px-8 h-12 border-white/10 hover:bg-white/5">
                            <Link href="/category/ai-business">
                                Browse Categories
                            </Link>
                        </Button>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
