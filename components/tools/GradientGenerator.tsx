"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { ToolWrapper } from "./ToolWrapper";
import { Copy, RefreshCw } from "lucide-react";

export function GradientGenerator() {
    const [color1, setColor1] = useState("#ff7e5f");
    const [color2, setColor2] = useState("#feb47b");
    const [direction, setDirection] = useState("to right");
    const [type, setType] = useState("linear");
    const [cssCode, setCssCode] = useState("");

    useEffect(() => {
        const gradient = type === "linear"
            ? `linear-gradient(${direction}, ${color1}, ${color2})`
            : `radial-gradient(circle, ${color1}, ${color2})`;
        setCssCode(`background: ${gradient};`);
    }, [color1, color2, direction, type]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(cssCode);
    };

    const generateRandom = () => {
        const randomColor = () => "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
        setColor1(randomColor());
        setColor2(randomColor());
    };

    return (
        <ToolWrapper
            title="CSS Gradient Generator"
            description="Create beautiful CSS gradients and copy the code instantly."
        >
            <div className="max-w-4xl mx-auto">
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Preview Area */}
                    <div
                        className="h-64 md:h-auto rounded-2xl shadow-2xl transition-all duration-500 border border-white/10"
                        style={{ background: type === "linear" ? `linear-gradient(${direction}, ${color1}, ${color2})` : `radial-gradient(circle, ${color1}, ${color2})` }}
                    ></div>

                    {/* Controls */}
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm text-muted-foreground mb-2 block">Color 1</label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="color"
                                        value={color1}
                                        onChange={(e) => setColor1(e.target.value)}
                                        className="h-10 w-10 rounded cursor-pointer bg-transparent border-0"
                                    />
                                    <input
                                        type="text"
                                        value={color1}
                                        onChange={(e) => setColor1(e.target.value)}
                                        className="flex-1 h-10 rounded-md border border-input bg-background px-3 text-sm uppercase"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-sm text-muted-foreground mb-2 block">Color 2</label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="color"
                                        value={color2}
                                        onChange={(e) => setColor2(e.target.value)}
                                        className="h-10 w-10 rounded cursor-pointer bg-transparent border-0"
                                    />
                                    <input
                                        type="text"
                                        value={color2}
                                        onChange={(e) => setColor2(e.target.value)}
                                        className="flex-1 h-10 rounded-md border border-input bg-background px-3 text-sm uppercase"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="text-sm text-muted-foreground mb-2 block">Type</label>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setType("linear")}
                                    className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${type === "linear" ? "bg-orange-500 text-white" : "bg-white/5 text-muted-foreground hover:bg-white/10"}`}
                                >
                                    Linear
                                </button>
                                <button
                                    onClick={() => setType("radial")}
                                    className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${type === "radial" ? "bg-orange-500 text-white" : "bg-white/5 text-muted-foreground hover:bg-white/10"}`}
                                >
                                    Radial
                                </button>
                            </div>
                        </div>

                        {type === "linear" && (
                            <div>
                                <label className="text-sm text-muted-foreground mb-2 block">Direction</label>
                                <select
                                    value={direction}
                                    onChange={(e) => setDirection(e.target.value)}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                >
                                    <option value="to right">To Right →</option>
                                    <option value="to left">To Left ←</option>
                                    <option value="to bottom">To Bottom ↓</option>
                                    <option value="to top">To Top ↑</option>
                                    <option value="to bottom right">To Bottom Right ↘</option>
                                    <option value="to bottom left">To Bottom Left ↙</option>
                                    <option value="to top right">To Top Right ↗</option>
                                    <option value="to top left">To Top Left ↖</option>
                                </select>
                            </div>
                        )}

                        <div className="flex gap-3">
                            <Button onClick={generateRandom} variant="outline" className="flex-1 border-white/10 hover:bg-white/5">
                                <RefreshCw className="mr-2 h-4 w-4" /> Random
                            </Button>
                        </div>

                        <div className="relative">
                            <pre className="p-4 rounded-lg bg-black/50 border border-white/10 text-sm font-mono text-white/80 overflow-x-auto">
                                {cssCode}
                            </pre>
                            <Button
                                size="sm"
                                onClick={copyToClipboard}
                                className="absolute top-2 right-2 bg-white/10 hover:bg-white/20 text-white"
                            >
                                <Copy className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </ToolWrapper>
    );
}
