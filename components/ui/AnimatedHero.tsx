"use client";

import { Button } from "@/components/ui/Button";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function AnimatedHero() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { y: 40, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as any }
        }
    };

    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-transparent">
            {/* Dynamic Background Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent -z-10" />
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-500/5 blur-[120px] rounded-full -z-10" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/5 blur-[120px] rounded-full -z-10" />

            <motion.div 
                className="container mx-auto px-4 text-center z-10"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <div className="max-w-5xl mx-auto space-y-12">
                    {/* Date Badge */}
                    <motion.div 
                        variants={itemVariants} 
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold tracking-[0.2em] uppercase text-orange-500 mb-4 shadow-2xl backdrop-blur-md"
                    >
                        <Sparkles className="w-3 h-3 animate-pulse" />
                        AI Era 2026 • March 29
                    </motion.div>

                    {/* Massive Text Animation */}
                    <div className="space-y-4">
                        <motion.h1 
                            variants={itemVariants}
                            className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white leading-[0.9]"
                        >
                            THE FUTURE <br />
                            <span className="text-gradient-primary">IS AGENTIC.</span>
                        </motion.h1>
                        
                        <motion.p 
                            variants={itemVariants}
                            className="text-xl md:text-3xl text-white/60 font-medium tracking-tight max-w-3xl mx-auto leading-relaxed"
                        >
                            Explore the frontier of <span className="text-white">AI Business</span>, <span className="text-white">Design</span>, and <span className="text-white">Agentic Workflows</span>. Stay ahead in the world's fastest-evolving industry.
                        </motion.p>
                    </div>

                    {/* Large CTA Buttons */}
                    <motion.div 
                        variants={itemVariants} 
                        className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8"
                    >
                        <Button asChild size="lg" className="rounded-full text-lg px-10 h-16 bg-white text-black hover:bg-white/90 shadow-[0_0_40px_rgba(255,255,255,0.2)] transition-all duration-500 group">
                            <Link href="#latest-posts" className="flex items-center">
                                Start Exploring 
                                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="rounded-full text-lg px-10 h-16 border-white/10 hover:bg-white/5 bg-white/5 backdrop-blur-sm transition-all duration-500">
                            <Link href="/category/future-of-ai">
                                Future Trends
                            </Link>
                        </Button>
                    </motion.div>

                    {/* Decorative Background Text (Floating) */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.03 }}
                        transition={{ duration: 2 }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black pointer-events-none select-none -z-20 whitespace-nowrap"
                    >
                        DAILY AI WORLD
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
