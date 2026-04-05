"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { List, ChevronDown, ChevronUp } from "lucide-react";

interface Heading {
    id: string;
    text: string;
    level: number;
}

interface TableOfContentsProps {
    content: string;
}

function extractHeadings(content: string): Heading[] {
    const headings: Heading[] = [];
    const lines = content.split("\n");

    lines.forEach((line) => {
        const h2Match = line.match(/^## (.+)$/);
        const h3Match = line.match(/^### (.+)$/);

        if (h2Match) {
            const text = h2Match[1].trim();
            const id = text
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, "")
                .replace(/\s+/g, "-");
            headings.push({ id, text, level: 2 });
        } else if (h3Match) {
            const text = h3Match[1].trim();
            const id = text
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, "")
                .replace(/\s+/g, "-");
            headings.push({ id, text, level: 3 });
        }
    });

    return headings;
}

export function TableOfContents({ content }: TableOfContentsProps) {
    const [headings, setHeadings] = useState<Heading[]>([]);
    const [activeId, setActiveId] = useState<string>("");
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    useEffect(() => {
        const extractedHeadings = extractHeadings(content);
        setHeadings(extractedHeadings);

        if (extractedHeadings.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            {
                rootMargin: "-80px 0px -80% 0px",
                threshold: 0,
            }
        );

        extractedHeadings.forEach((heading) => {
            const element = document.getElementById(heading.id);
            if (element) {
                observer.observe(element);
            }
        });

        return () => observer.disconnect();
    }, [content]);

    if (headings.length === 0) return null;

    const scrollToHeading = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });
        }
        setIsMobileOpen(false);
    };

    return (
        <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl overflow-hidden">
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="w-full flex items-center justify-between p-4 hover:bg-zinc-800/30 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-orange-500/20">
                        <List className="w-4 h-4 text-orange-500" />
                    </div>
                    <span className="font-semibold text-white">Table of Contents</span>
                </div>
                <div className="hidden lg:block">
                    {isCollapsed ? (
                        <ChevronDown className="w-4 h-4 text-zinc-400" />
                    ) : (
                        <ChevronUp className="w-4 h-4 text-zinc-400" />
                    )}
                </div>
            </button>

            <div
                className={cn(
                    "lg:block transition-all duration-300 ease-in-out",
                    isCollapsed ? "hidden" : "block"
                )}
            >
                <div className="lg:hidden p-4 pt-0">
                    <button
                        onClick={() => setIsMobileOpen(!isMobileOpen)}
                        className="w-full flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg text-sm text-zinc-300"
                    >
                        <span>Jump to section...</span>
                        {isMobileOpen ? (
                            <ChevronUp className="w-4 h-4" />
                        ) : (
                            <ChevronDown className="w-4 h-4" />
                        )}
                    </button>
                </div>

                <nav
                    className={cn(
                        "p-4 pt-0 lg:pt-4 space-y-1",
                        isMobileOpen ? "block" : "hidden lg:block"
                    )}
                >
                    {headings.map((heading) => (
                        <button
                            key={heading.id}
                            onClick={() => scrollToHeading(heading.id)}
                            className={cn(
                                "w-full text-left px-3 py-2 text-sm rounded-lg transition-all duration-200",
                                heading.level === 3 && "ml-4",
                                activeId === heading.id
                                    ? "bg-orange-500/20 text-orange-400 font-medium"
                                    : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                            )}
                        >
                            {heading.text}
                        </button>
                    ))}
                </nav>
            </div>
        </div>
    );
}
