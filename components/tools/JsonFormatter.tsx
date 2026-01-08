"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Copy, Trash2, Check, AlertCircle, FileJson, Minimize2 } from "lucide-react";

export const JsonFormatter = () => {
    const [input, setInput] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    const formatJson = () => {
        try {
            if (!input.trim()) return;
            const parsed = JSON.parse(input);
            setInput(JSON.stringify(parsed, null, 4));
            setError(null);
        } catch (err) {
            setError((err as Error).message);
        }
    };

    const minifyJson = () => {
        try {
            if (!input.trim()) return;
            const parsed = JSON.parse(input);
            setInput(JSON.stringify(parsed));
            setError(null);
        } catch (err) {
            setError((err as Error).message);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(input);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleClear = () => {
        setInput("");
        setError(null);
    };

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <div className="flex flex-wrap gap-4 justify-between items-center bg-muted/30 p-4 rounded-lg border">
                <div className="flex gap-2">
                    <Button onClick={formatJson} className="gap-2">
                        <FileJson className="w-4 h-4" />
                        Format / Beautify
                    </Button>
                    <Button variant="outline" onClick={minifyJson} className="gap-2">
                        <Minimize2 className="w-4 h-4" />
                        Minify
                    </Button>
                </div>
                <div className="flex gap-2">
                    <Button variant="ghost" onClick={handleCopy} disabled={!input}>
                        {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    </Button>
                    <Button variant="ghost" onClick={handleClear} disabled={!input} className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30">
                        <Trash2 className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            <div className="relative">
                <Card className={`h-[600px] overflow-hidden border-2 transition-colors ${error ? "border-red-500/50" : "border-transparent"}`}>
                    <textarea
                        value={input}
                        onChange={(e) => {
                            setInput(e.target.value);
                            setError(null);
                        }}
                        placeholder="Paste your JSON here..."
                        className="w-full h-full p-6 bg-transparent border-none outline-none resize-none font-mono text-sm leading-relaxed"
                        spellCheck={false}
                    />
                </Card>

                {error && (
                    <div className="absolute bottom-4 left-4 right-4 bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-lg flex items-center gap-2 backdrop-blur-sm">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span className="text-sm font-medium truncate">{error}</span>
                    </div>
                )}
            </div>
        </div>
    );
};
