"use client";

import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function AnimatedHero() {
    return (
        <section className="relative overflow-hidden py-24 md:py-32 bg-background">
            {/* Subtle Gradient Background */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background -z-10" />

            <div className="container mx-auto px-4 text-center max-w-4xl">
                <div className="space-y-8">
                    {/* SEO Optimized H1 */}
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-foreground">
                        Daily <span className="text-gradient-primary">AI World</span>
                    </h1>

                    {/* Descriptive Subheadline with Keywords */}
                    <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                        Explore how <span className="text-foreground font-medium">Artificial Intelligence</span> is transforming industries, optimizing operations, and creating new business models. Stay ahead with the latest strategies, <span className="text-foreground font-medium">Generative AI</span> insights, and future trends.
                    </p>

                    {/* Call to Actions */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                        <Button asChild size="lg" className="rounded-full text-base px-8 h-12">
                            <Link href="#latest-posts">
                                Start Reading <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="rounded-full text-base px-8 h-12 border-border hover:bg-muted/50">
                            <Link href="/category/ai-business">
                                Browse Categories
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
