"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Twitter, Linkedin, Facebook, Link2, Check, Share2 } from "lucide-react";

interface SocialShareButtonsProps {
    title: string;
    url: string;
    variant?: "floating" | "inline";
}

export function SocialShareButtons({
    title,
    url,
    variant = "inline",
}: SocialShareButtonsProps) {
    const [copied, setCopied] = useState(false);

    const shareUrls = {
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    const shareOnMobile = async () => {
        if (navigator.share) {
            try {
                await navigator.share({ title, url });
            } catch (err) {
                console.error("Share failed:", err);
            }
        } else {
            copyToClipboard();
        }
    };

    if (variant === "floating") {
        return (
            <div className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-2">
                <button
                    onClick={() => window.open(shareUrls.twitter, "_blank")}
                    className="p-3 rounded-full bg-zinc-800/80 backdrop-blur-sm border border-zinc-700/50 text-zinc-400 hover:text-white hover:bg-zinc-700/80 hover:border-zinc-600 transition-all duration-200 group"
                    aria-label="Share on Twitter"
                >
                    <Twitter className="w-5 h-5" />
                    <span className="absolute left-full ml-2 px-2 py-1 bg-zinc-800 text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        Twitter
                    </span>
                </button>

                <button
                    onClick={() => window.open(shareUrls.linkedin, "_blank")}
                    className="p-3 rounded-full bg-zinc-800/80 backdrop-blur-sm border border-zinc-700/50 text-zinc-400 hover:text-white hover:bg-zinc-700/80 hover:border-zinc-600 transition-all duration-200 group"
                    aria-label="Share on LinkedIn"
                >
                    <Linkedin className="w-5 h-5" />
                    <span className="absolute left-full ml-2 px-2 py-1 bg-zinc-800 text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        LinkedIn
                    </span>
                </button>

                <button
                    onClick={() => window.open(shareUrls.facebook, "_blank")}
                    className="p-3 rounded-full bg-zinc-800/80 backdrop-blur-sm border border-zinc-700/50 text-zinc-400 hover:text-white hover:bg-zinc-700/80 hover:border-zinc-600 transition-all duration-200 group"
                    aria-label="Share on Facebook"
                >
                    <Facebook className="w-5 h-5" />
                    <span className="absolute left-full ml-2 px-2 py-1 bg-zinc-800 text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        Facebook
                    </span>
                </button>

                <div className="w-px h-4 bg-zinc-700/50 mx-auto" />

                <button
                    onClick={copyToClipboard}
                    className={cn(
                        "p-3 rounded-full backdrop-blur-sm border transition-all duration-200 group",
                        copied
                            ? "bg-green-500/20 border-green-500/50 text-green-400"
                            : "bg-zinc-800/80 border-zinc-700/50 text-zinc-400 hover:text-white hover:bg-zinc-700/80 hover:border-zinc-600"
                    )}
                    aria-label="Copy link"
                >
                    {copied ? (
                        <Check className="w-5 h-5" />
                    ) : (
                        <Link2 className="w-5 h-5" />
                    )}
                    <span className="absolute left-full ml-2 px-2 py-1 bg-zinc-800 text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        {copied ? "Copied!" : "Copy link"}
                    </span>
                </button>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-3 flex-wrap">
            <span className="text-sm text-zinc-500 mr-2">Share:</span>

            <button
                onClick={() => window.open(shareUrls.twitter, "_blank")}
                className="p-2 rounded-lg bg-zinc-800/50 text-zinc-400 hover:text-white hover:bg-zinc-700/50 transition-colors"
                aria-label="Share on Twitter"
            >
                <Twitter className="w-4 h-4" />
            </button>

            <button
                onClick={() => window.open(shareUrls.linkedin, "_blank")}
                className="p-2 rounded-lg bg-zinc-800/50 text-zinc-400 hover:text-white hover:bg-zinc-700/50 transition-colors"
                aria-label="Share on LinkedIn"
            >
                <Linkedin className="w-4 h-4" />
            </button>

            <button
                onClick={() => window.open(shareUrls.facebook, "_blank")}
                className="p-2 rounded-lg bg-zinc-800/50 text-zinc-400 hover:text-white hover:bg-zinc-700/50 transition-colors"
                aria-label="Share on Facebook"
            >
                <Facebook className="w-4 h-4" />
            </button>

            <div className="w-px h-6 bg-zinc-700/50 mx-1" />

            <button
                onClick={shareOnMobile}
                className="p-2 rounded-lg bg-zinc-800/50 text-zinc-400 hover:text-white hover:bg-zinc-700/50 transition-colors lg:hidden"
                aria-label="Share"
            >
                <Share2 className="w-4 h-4" />
            </button>

            <button
                onClick={copyToClipboard}
                className={cn(
                    "px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2",
                    copied
                        ? "bg-green-500/20 text-green-400"
                        : "bg-zinc-800/50 text-zinc-400 hover:text-white hover:bg-zinc-700/50"
                )}
                aria-label="Copy link"
            >
                {copied ? (
                    <>
                        <Check className="w-4 h-4" />
                        Copied!
                    </>
                ) : (
                    <>
                        <Link2 className="w-4 h-4" />
                        Copy Link
                    </>
                )}
            </button>
        </div>
    );
}
