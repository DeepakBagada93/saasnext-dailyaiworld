"use client";

import { useState } from "react";
import { Copy, RefreshCw, Check } from "lucide-react";

export default function LoremIpsumGenerator() {
    const [paragraphs, setParagraphs] = useState(3);
    const [length, setLength] = useState<"short" | "medium" | "long">("medium");
    const [generatedText, setGeneratedText] = useState("");
    const [copied, setCopied] = useState(false);

    const generateLoremIpsum = () => {
        const words = [
            "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
            "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
            "magna", "aliqua", "ut", "enim", "ad", "minim", "veniam", "quis", "nostrud",
            "exercitation", "ullamco", "laboris", "nisi", "ut", "aliquip", "ex", "ea",
            "commodo", "consequat", "duis", "aute", "irure", "dolor", "in", "reprehenderit",
            "in", "voluptate", "velit", "esse", "cillum", "dolore", "eu", "fugiat", "nulla",
            "pariatur", "excepteur", "sint", "occaecat", "cupidatat", "non", "proident",
            "sunt", "in", "culpa", "qui", "officia", "deserunt", "mollit", "anim", "id",
            "est", "laborum"
        ];

        let text = "";
        const sentenceLength = length === "short" ? 5 : length === "medium" ? 10 : 15;

        for (let i = 0; i < paragraphs; i++) {
            let paragraph = "";
            const sentences = Math.floor(Math.random() * 3) + 3; // 3-5 sentences per paragraph

            for (let j = 0; j < sentences; j++) {
                let sentence = "";
                for (let k = 0; k < sentenceLength; k++) {
                    const word = words[Math.floor(Math.random() * words.length)];
                    sentence += (k === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word) + " ";
                }
                paragraph += sentence.trim() + ". ";
            }
            text += paragraph.trim() + "\n\n";
        }

        setGeneratedText(text.trim());
        setCopied(false);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold tracking-tight mb-4">Lorem Ipsum Generator</h1>
                <p className="text-muted-foreground text-lg">
                    Generate placeholder text for your designs.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {/* Controls Section */}
                <div className="bg-card border border-border rounded-xl p-6 shadow-sm h-fit">
                    <h2 className="text-xl font-semibold mb-6">Settings</h2>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Paragraphs: {paragraphs}</label>
                            <input
                                type="range"
                                min="1"
                                max="10"
                                value={paragraphs}
                                onChange={(e) => setParagraphs(parseInt(e.target.value))}
                                className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Length</label>
                            <div className="flex gap-2">
                                {(["short", "medium", "long"] as const).map((l) => (
                                    <button
                                        key={l}
                                        onClick={() => setLength(l)}
                                        className={`flex-1 py-2 text-sm font-medium rounded-md border transition-colors ${length === l
                                                ? "bg-primary text-primary-foreground border-primary"
                                                : "bg-background border-border hover:bg-accent"
                                            }`}
                                    >
                                        {l.charAt(0).toUpperCase() + l.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={generateLoremIpsum}
                            className="w-full py-2 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                        >
                            <RefreshCw size={16} /> Generate
                        </button>
                    </div>
                </div>

                {/* Result Section */}
                <div className="md:col-span-2 bg-card border border-border rounded-xl p-6 shadow-sm min-h-[400px] flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold">Generated Text</h2>
                        {generatedText && (
                            <button
                                onClick={copyToClipboard}
                                className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground bg-accent/50 hover:bg-accent rounded-md transition-colors"
                            >
                                {copied ? <Check size={14} /> : <Copy size={14} />}
                                {copied ? "Copied!" : "Copy"}
                            </button>
                        )}
                    </div>

                    <div className="flex-1 bg-accent/20 rounded-lg border border-border p-4 relative">
                        {generatedText ? (
                            <textarea
                                value={generatedText}
                                readOnly
                                className="w-full h-full bg-transparent resize-none focus:outline-none text-muted-foreground leading-relaxed"
                            />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                                <p>Click generate to create text</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
