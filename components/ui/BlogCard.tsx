"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Post } from "@/types/database";
import { cn } from "@/lib/utils";
import { Calendar, Clock, TrendingUp, ArrowRight } from "lucide-react";

interface BlogCardProps {
    post: Post;
    variant?: "default" | "horizontal" | "compact";
    index?: number;
}

function calculateReadTime(content: string): number {
    const wordsPerMinute = 200;
    const wordCount = content?.split(/\s+/).filter(Boolean).length || 0;
    return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

export function BlogCard({ post, variant = "default", index = 0 }: BlogCardProps) {
    const readTime = calculateReadTime(post.content || post.excerpt || "");

    if (variant === "compact") {
        return (
            <motion.article
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group w-full"
            >
                <Link
                    href={`/post/${post.slug}`}
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-zinc-900/30 border border-zinc-800/50 hover:border-orange-500/30 hover:bg-zinc-900/60 transition-all duration-300"
                >
                    <div className="w-16 h-16 relative rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                            src={post.cover_image || "/placeholder.jpg"}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                            sizes="64px"
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-orange-500">
                            {post.category}
                        </span>
                        <h4 className="text-xs font-bold text-white leading-tight line-clamp-2 group-hover:text-orange-400 transition-colors">
                            {post.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-1 text-[10px] text-zinc-500">
                            <Clock className="w-2.5 h-2.5" />
                            <span>{readTime} min</span>
                        </div>
                    </div>
                </Link>
            </motion.article>
        );
    }

    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="group"
        >
            <Link
                href={`/post/${post.slug}`}
                className={cn(
                    "block relative overflow-hidden rounded-xl bg-zinc-900/50 border border-zinc-800/50 transition-all duration-500 hover:border-orange-500/30 hover:shadow-lg hover:shadow-orange-500/5",
                    variant === "horizontal" ? "flex flex-row" : "flex flex-col"
                )}
            >
                <div
                    className={cn(
                        "relative overflow-hidden",
                        variant === "horizontal" ? "w-24 sm:w-32 md:w-48 h-24 sm:h-32 md:h-48 flex-shrink-0" : "h-40 sm:h-48 w-full"
                    )}
                >
                    <Image
                        src={post.cover_image || "/placeholder.jpg"}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes={variant === "horizontal" ? "192px" : "(max-width: 768px) 100vw, 400px"}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                <div className="flex flex-col justify-between p-5 flex-1">
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-orange-500/10 text-orange-400 rounded-full border border-orange-500/20">
                                {post.category}
                            </span>
                            <div className="flex items-center gap-1.5 text-[11px] text-zinc-500">
                                <Clock className="w-3 h-3" />
                                <span>{readTime} min read</span>
                            </div>
                        </div>

                        <h3 className="font-bold text-lg leading-snug text-white mb-2 line-clamp-2 group-hover:text-orange-400 transition-colors duration-300">
                            {post.title}
                        </h3>

                        <p className="text-sm text-zinc-400 line-clamp-2 leading-relaxed">
                            {post.excerpt}
                        </p>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-zinc-800/50">
                        <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                            <Calendar className="w-3 h-3" />
                            <span suppressHydrationWarning>
                                {new Date(post.created_at).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                })}
                            </span>
                        </div>
                        <div className="flex items-center gap-1 text-xs font-medium text-orange-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                            Read More <ArrowRight className="w-3 h-3" />
                        </div>
                    </div>
                </div>
            </Link>
        </motion.article>
    );
}

interface FeaturedPostProps {
    post: Post;
}

export function FeaturedPost({ post }: FeaturedPostProps) {
    const readTime = calculateReadTime(post.content || post.excerpt || "");

    return (
        <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="group relative overflow-hidden rounded-2xl"
        >
            <Link href={`/post/${post.slug}`} className="block relative">
                <div className="relative h-[350px] sm:h-[400px] md:h-[500px] overflow-hidden rounded-2xl">
                    <Image
                        src={post.cover_image || "/placeholder.jpg"}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                        priority
                        sizes="(max-width: 1280px) 100vw, 1280px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 lg:p-12">
                    <div className="flex items-center gap-4 mb-4">
                        <span className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider bg-orange-500 text-white rounded-full">
                            Featured
                        </span>
                        <span className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider bg-white/10 backdrop-blur-md text-white rounded-full border border-white/20">
                            {post.category}
                        </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-2 sm:mb-4 max-w-4xl group-hover:text-orange-400 transition-colors duration-500">
                        {post.title}
                    </h2>

                    <p className="text-sm sm:text-base text-zinc-300 leading-relaxed mb-4 sm:mb-6 max-w-3xl line-clamp-2">
                        {post.excerpt}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 sm:gap-6">
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-zinc-400">
                            <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span suppressHydrationWarning>
                                {new Date(post.created_at).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                })}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-zinc-400">
                            <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span>{readTime} min read</span>
                        </div>
                        <div className="hidden md:flex items-center gap-2 text-sm font-semibold text-orange-400 bg-orange-500/20 px-4 py-2 rounded-full border border-orange-500/30 hover:bg-orange-500/30 transition-colors">
                            <span>Read Full Story</span>
                            <ArrowRight className="w-4 h-4" />
                        </div>
                    </div>
                </div>

                <div className="absolute top-6 right-6 hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/60">
                    <TrendingUp className="w-4 h-4" />
                    <span>Trending</span>
                </div>
            </Link>
        </motion.article>
    );
}

interface TrendingCardProps {
    post: Post;
    index: number;
}

export function TrendingCard({ post, index }: TrendingCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
        >
            <Link
                href={`/post/${post.slug}`}
                className="group flex flex-col gap-2 p-5 rounded-xl bg-zinc-900/30 border border-zinc-800/50 hover:border-orange-500/30 hover:bg-zinc-900/60 transition-all duration-300"
            >
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-red-600 text-white font-black text-xs shrink-0">
                        {index + 1}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-orange-500">
                        {post.category}
                    </span>
                </div>

                <h4 className="text-base font-bold text-white leading-snug group-hover:text-orange-400 transition-colors">
                    {post.title}
                </h4>

                <p className="text-sm text-zinc-400 line-clamp-2 leading-relaxed mt-1">
                    {post.excerpt}
                </p>
            </Link>
        </motion.div>
    );
}
