"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, Square, Volume2, Loader2 } from "lucide-react";
import { Button } from "./Button";

interface BlogAudioPlayerProps {
    content: string;
}

export function BlogAudioPlayer({ content }: BlogAudioPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);
    const [progress, setProgress] = useState(0); // 0 to 100 (approximate)
    const [voicesLoaded, setVoicesLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [mounted, setMounted] = useState(false);
    const [lastCharIndex, setLastCharIndex] = useState(0);
    const cleanTextRef = useRef("");

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

    // Load voices and set up voice change listener
    useEffect(() => {
        setMounted(true);
        const loadVoices = () => {
            const voices = window.speechSynthesis.getVoices();
            if (voices.length > 0) {
                setVoicesLoaded(true);
                setIsLoading(false);
            }
        };

        // Load voices initially
        loadVoices();

        // Listen for voices to load (important for mobile)
        window.speechSynthesis.addEventListener('voiceschanged', loadVoices);

        // Safety timeout to ensure we don't show loading forever on devices with issues
        const timeoutId = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => {
            window.speechSynthesis.removeEventListener('voiceschanged', loadVoices);
            clearTimeout(timeoutId);
        };
    }, []);

    // Create utterance when content changes or voices load
    useEffect(() => {
        // Remove early return to ensure default voice works
        // if (!voicesLoaded) return;

        const cleanText = getCleanText(content);
        cleanTextRef.current = cleanText;

        const newUtterance = new SpeechSynthesisUtterance(cleanText);

        // Select a better voice if available
        try {
            const voices = window.speechSynthesis.getVoices();
            // Prefer English voices
            const preferredVoice = voices.find(
                voice =>
                    voice.lang.startsWith('en') &&
                    (voice.name.includes('Google') ||
                        voice.name.includes('Microsoft') ||
                        voice.name.includes('Natural'))
            ) || voices.find(voice => voice.lang.startsWith('en'));

            if (preferredVoice) {
                newUtterance.voice = preferredVoice;
            }
        } catch (error) {
            console.warn('Error selecting voice:', error);
        }

        newUtterance.onend = () => {
            setIsPlaying(false);
            setIsPaused(false);
            setProgress(0);
            setLastCharIndex(0);
        };

        newUtterance.onerror = (event) => {
            // Ignore benign errors caused by stopping/canceling
            if (event.error === 'canceled' || event.error === 'interrupted') {
                setIsPlaying(false);
                setIsPaused(false);
                return;
            }
            console.error('Speech synthesis error:', event);
            setIsPlaying(false);
            setIsPaused(false);
        };

        newUtterance.onboundary = (event) => {
            // Track character position for pause/resume workaround
            setLastCharIndex(event.charIndex);

            // Approximate progress based on char index
            const len = cleanText.length;
            const current = event.charIndex;
            setProgress(Math.min((current / len) * 100, 100));
        };

        setUtterance(newUtterance);

        return () => {
            try {
                window.speechSynthesis.cancel();
            } catch (error) {
                console.warn('Error canceling speech:', error);
            }
        };
    }, [content, voicesLoaded]);

    const handlePlay = () => {
        // Fallback: Create utterance if it doesn't exist yet (e.g. race condition)
        if (!utterance) {
            const cleanText = getCleanText(content);
            const newUtterance = new SpeechSynthesisUtterance(cleanText);

            // Try to set voice if available, otherwise use default
            const voices = window.speechSynthesis.getVoices();
            if (voices.length > 0) {
                const preferredVoice = voices.find(v => v.lang.startsWith('en'));
                if (preferredVoice) newUtterance.voice = preferredVoice;
            }

            // Bind events (copied from useEffect)
            newUtterance.onend = () => {
                setIsPlaying(false);
                setIsPaused(false);
                setProgress(0);
                setLastCharIndex(0);
            };
            newUtterance.onerror = (event) => {
                // Ignore benign errors caused by stopping/canceling
                if (event.error === 'canceled' || event.error === 'interrupted') {
                    setIsPlaying(false);
                    setIsPaused(false);
                    return;
                }
                console.error('Speech synthesis error:', event);
                setIsPlaying(false);
                setIsPaused(false);
            };
            newUtterance.onboundary = (event) => {
                setLastCharIndex(event.charIndex);
                const len = cleanText.length;
                setProgress(Math.min((event.charIndex / len) * 100, 100));
            };

            setUtterance(newUtterance);
            window.speechSynthesis.speak(newUtterance);
            setIsPlaying(true);
            return;
        }

        try {
            if (isPaused) {
                // iOS Safari workaround: recreate utterance from last position
                // because resume() is unreliable on iOS
                const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

                if (isIOS && lastCharIndex > 0) {
                    // Create new utterance from last position
                    const remainingText = cleanTextRef.current.substring(lastCharIndex);
                    const newUtterance = new SpeechSynthesisUtterance(remainingText);

                    // Copy settings from original utterance
                    if (utterance.voice) {
                        newUtterance.voice = utterance.voice;
                    }
                    newUtterance.rate = utterance.rate;
                    newUtterance.pitch = utterance.pitch;
                    newUtterance.volume = utterance.volume;

                    // Set up event handlers
                    newUtterance.onend = utterance.onend;
                    newUtterance.onerror = (event) => {
                        // Ignore benign errors caused by stopping/canceling
                        if (event.error === 'canceled' || event.error === 'interrupted') {
                            setIsPlaying(false);
                            setIsPaused(false);
                            return;
                        }
                        console.error('Speech synthesis error:', event);
                        setIsPlaying(false);
                        setIsPaused(false);
                    };
                    newUtterance.onboundary = (event) => {
                        // Adjust char index to account for offset
                        const adjustedIndex = lastCharIndex + event.charIndex;
                        setLastCharIndex(adjustedIndex);

                        const len = cleanTextRef.current.length;
                        setProgress(Math.min((adjustedIndex / len) * 100, 100));
                    };

                    window.speechSynthesis.cancel();
                    window.speechSynthesis.speak(newUtterance);
                    setUtterance(newUtterance);
                } else {
                    // Standard resume for other browsers
                    window.speechSynthesis.resume();
                }

                setIsPaused(false);
                setIsPlaying(true);
            } else {
                // Start from beginning
                window.speechSynthesis.cancel();
                setLastCharIndex(0);
                setProgress(0);
                window.speechSynthesis.speak(utterance);
                setIsPlaying(true);
                setIsPaused(false);
            }
        } catch (error) {
            console.error('Error playing audio:', error);
            setIsPlaying(false);
            setIsPaused(false);
        }
    };

    const handlePause = () => {
        if (isPlaying) {
            try {
                window.speechSynthesis.pause();
                setIsPaused(true);
                setIsPlaying(false);
            } catch (error) {
                console.error('Error pausing audio:', error);
            }
        }
    };

    const handleStop = () => {
        try {
            window.speechSynthesis.cancel();
            setIsPlaying(false);
            setIsPaused(false);
            setProgress(0);
            setLastCharIndex(0);
        } catch (error) {
            console.error('Error stopping audio:', error);
        }
    };

    // Don't render until mounted on client
    if (!mounted || typeof window === 'undefined' || !window.speechSynthesis) {
        return null;
    }

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
                {isLoading ? (
                    <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full w-10 h-10"
                        disabled
                    >
                        <Loader2 className="w-4 h-4 animate-spin" />
                    </Button>
                ) : !isPlaying ? (
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
                    disabled={!isPlaying && !isPaused}
                >
                    <Square className="w-4 h-4 fill-current" />
                </Button>
            </div>
        </div>
    );
}
