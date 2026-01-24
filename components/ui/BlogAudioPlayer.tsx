"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, Square, Volume2 } from "lucide-react";
import { Button } from "./Button";

interface BlogAudioPlayerProps {
    content: string;
}

export function BlogAudioPlayer({ content }: BlogAudioPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);
    const [progress, setProgress] = useState(0); // 0 to 100 (approximate)

    // Simple markdown stripper (can be improved)
    const getCleanText = (markdown: string) => {
        return markdown
            .replace(/!\[.*?\]\(.*?\)/g, "") // Remove images
            .replace(/\[.*?\]\(.*?\)/g, "$1") // Remove links but keep text
            .replace(/#{1,6}\s?/g, "") // Remove headers
            .replace(/(\*\*|__)(.*?)\1/g, "$2") // Remove bold
            .replace(/(\*|_)(.*?)\1/g, "$2") // Remove italic
            .replace(/`{3}[\s\S]*?`{3}/g, "") // Remove code blocks
            .replace(/`(.+?)`/g, "$1") // Remove inline code
            .replace(/\n/g, " "); // Replace newlines with spaces
    };

    useEffect(() => {
        const cleanText = getCleanText(content);
        const newUtterance = new SpeechSynthesisUtterance(cleanText);

        // Optional: Select a better voice if available
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(voice => voice.name.includes("Google US English") || voice.name.includes("Microsoft Zira"));
        if (preferredVoice) {
            newUtterance.voice = preferredVoice;
        }

        newUtterance.onend = () => {
            setIsPlaying(false);
            setIsPaused(false);
            setProgress(0);
        };

        newUtterance.onboundary = (event) => {
            // Approximate progress based on char index
            const len = cleanText.length;
            const current = event.charIndex;
            setProgress(Math.min((current / len) * 100, 100));
        };

        setUtterance(newUtterance);

        return () => {
            window.speechSynthesis.cancel();
        };
    }, [content]);

    const handlePlay = () => {
        if (!utterance) return;

        if (isPaused) {
            window.speechSynthesis.resume();
            setIsPaused(false);
            setIsPlaying(true);
        } else {
            window.speechSynthesis.cancel(); // Stop any previous
            window.speechSynthesis.speak(utterance);
            setIsPlaying(true);
            setIsPaused(false);
        }
    };

    const handlePause = () => {
        if (isPlaying) {
            window.speechSynthesis.pause();
            setIsPaused(true);
            setIsPlaying(false);
        }
    };

    const handleStop = () => {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
        setIsPaused(false);
        setProgress(0);
    };

    return (
        <div className="bg-muted/30 border border-border rounded-xl p-4 mb-8 flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-full">
                <Volume2 className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
                <h3 className="font-semibold text-sm mb-1">Listen to this article</h3>
                <div className="w-full bg-secondary h-1.5 rounded-full overflow-hidden">
                    <div
                        className="bg-primary h-full transition-all duration-300 ease-linear"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
            <div className="flex items-center gap-2">
                {!isPlaying ? (
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={handlePlay}
                        className="rounded-full w-10 h-10"
                        title={isPaused ? "Resume" : "Play"}
                    >
                        <Play className="w-4 h-4 fill-current" />
                    </Button>
                ) : (
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={handlePause}
                        className="rounded-full w-10 h-10"
                        title="Pause"
                    >
                        <Pause className="w-4 h-4 fill-current" />
                    </Button>
                )}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleStop}
                    className="rounded-full w-10 h-10 text-muted-foreground hover:text-destructive"
                    title="Stop"
                >
                    <Square className="w-4 h-4 fill-current" />
                </Button>
            </div>
        </div>
    );
}
