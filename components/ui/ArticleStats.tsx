"use client";

import { Calendar, Clock, Eye, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ArticleStatsProps {
    createdAt: string;
    content: string;
    views?: number;
    shares?: number;
}

function calculateReadTime(content: string): number {
    const wordsPerMinute = 200;
    const wordCount = content?.split(/\s+/).filter(Boolean).length || 0;
    return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

export function ArticleStats({
    createdAt,
    content,
    views = 0,
    shares = 0,
}: ArticleStatsProps) {
    const readTime = calculateReadTime(content);

    return (
        <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-2 text-zinc-400">
                <div className="p-1.5 rounded-md bg-orange-500/10">
                    <Calendar className="w-3.5 h-3.5 text-orange-500" />
                </div>
                <span suppressHydrationWarning>
                    {new Date(createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </span>
            </div>

            <div className="w-px h-4 bg-zinc-700/50 hidden sm:block" />

            <div className="flex items-center gap-2 text-zinc-400">
                <div className="p-1.5 rounded-md bg-orange-500/10">
                    <Clock className="w-3.5 h-3.5 text-orange-500" />
                </div>
                <span>{readTime} min read</span>
            </div>

            {views > 0 && (
                <>
                    <div className="w-px h-4 bg-zinc-700/50 hidden sm:block" />
                    <div className="flex items-center gap-2 text-zinc-400">
                        <div className="p-1.5 rounded-md bg-orange-500/10">
                            <Eye className="w-3.5 h-3.5 text-orange-500" />
                        </div>
                        <span>{views.toLocaleString()} views</span>
                    </div>
                </>
            )}

            {shares > 0 && (
                <>
                    <div className="w-px h-4 bg-zinc-700/50 hidden sm:block" />
                    <div className="flex items-center gap-2 text-zinc-400">
                        <div className="p-1.5 rounded-md bg-orange-500/10">
                            <Share2 className="w-3.5 h-3.5 text-orange-500" />
                        </div>
                        <span>{shares.toLocaleString()} shares</span>
                    </div>
                </>
            )}
        </div>
    );
}

interface ReadTimeBadgeProps {
    content: string;
}

export function ReadTimeBadge({ content }: ReadTimeBadgeProps) {
    const readTime = calculateReadTime(content);

    return (
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium">
            <Clock className="w-4 h-4" />
            <span>{readTime} min read</span>
        </div>
    );
}
