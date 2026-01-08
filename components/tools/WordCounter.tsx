"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Copy, Trash2 } from "lucide-react";

export const WordCounter = () => {
    const [text, setText] = useState("");

    const getStats = () => {
        const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
        const chars = text.length;
        const charsNoSpace = text.replace(/\s/g, "").length;
        const sentences = text.trim() === "" ? 0 : text.split(/[.!?]+/).filter(Boolean).length;
        const paragraphs = text.trim() === "" ? 0 : text.split(/\n+/).filter(Boolean).length;

        // Reading time (avg 200 words per minute)
        const readingTime = Math.ceil(words / 200);

        return { words, chars, charsNoSpace, sentences, paragraphs, readingTime };
    };

    const stats = getStats();

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
    };

    const handleClear = () => {
        setText("");
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <Card className="p-4 text-center bg-primary/5 border-primary/20">
                    <div className="text-3xl font-bold text-primary">{stats.words}</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Words</div>
                </Card>
                <Card className="p-4 text-center">
                    <div className="text-3xl font-bold">{stats.chars}</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Characters</div>
                </Card>
                <Card className="p-4 text-center">
                    <div className="text-3xl font-bold">{stats.sentences}</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Sentences</div>
                </Card>
                <Card className="p-4 text-center">
                    <div className="text-3xl font-bold">{stats.paragraphs}</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Paragraphs</div>
                </Card>
                <Card className="p-4 text-center">
                    <div className="text-3xl font-bold">{stats.charsNoSpace}</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">No Spaces</div>
                </Card>
                <Card className="p-4 text-center">
                    <div className="text-3xl font-bold">~{stats.readingTime}</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Min Read</div>
                </Card>
            </div>

            <Card className="p-1 relative">
                <div className="absolute top-4 right-4 flex gap-2 z-10">
                    <Button size="sm" variant="ghost" onClick={handleCopy} disabled={!text}>
                        <Copy className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={handleClear} disabled={!text} className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30">
                        <Trash2 className="w-4 h-4" />
                    </Button>
                </div>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type or paste your text here..."
                    className="w-full h-[400px] p-6 bg-transparent border-none outline-none resize-none text-lg leading-relaxed"
                />
            </Card>
        </div>
    );
};
