"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { ToolWrapper } from "./ToolWrapper";
import { Copy } from "lucide-react";

export function BoxShadowGenerator() {
    const [horizontal, setHorizontal] = useState(10);
    const [vertical, setVertical] = useState(10);
    const [blur, setBlur] = useState(20);
    const [spread, setSpread] = useState(0);
    const [color, setColor] = useState("#000000");
    const [opacity, setOpacity] = useState(0.25);
    const [inset, setInset] = useState(false);
    const [cssCode, setCssCode] = useState("");

    useEffect(() => {
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);
        const rgba = `rgba(${r}, ${g}, ${b}, ${opacity})`;

        const shadow = `${inset ? "inset " : ""}${horizontal}px ${vertical}px ${blur}px ${spread}px ${rgba}`;
        setCssCode(`box-shadow: ${shadow};`);
    }, [horizontal, vertical, blur, spread, color, opacity, inset]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(cssCode);
    };

    return (
        <ToolWrapper
            title="CSS Box Shadow Generator"
            description="Create beautiful CSS box shadows with this visual generator."
        >
            <div className="max-w-4xl mx-auto">
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Preview Area */}
                    <div className="bg-white/5 rounded-2xl p-12 flex items-center justify-center border border-white/10 min-h-[400px]">
                        <div
                            className="w-48 h-48 bg-orange-500 rounded-2xl transition-all duration-200"
                            style={{ boxShadow: cssCode.replace("box-shadow: ", "").replace(";", "") }}
                        ></div>
                    </div>

                    {/* Controls */}
                    <div className="space-y-6">
                        <div>
                            <label className="text-sm text-muted-foreground mb-2 flex justify-between">
                                Horizontal Offset <span>{horizontal}px</span>
                            </label>
                            <input
                                type="range"
                                min="-100" max="100"
                                value={horizontal}
                                onChange={(e) => setHorizontal(parseInt(e.target.value))}
                                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-muted-foreground mb-2 flex justify-between">
                                Vertical Offset <span>{vertical}px</span>
                            </label>
                            <input
                                type="range"
                                min="-100" max="100"
                                value={vertical}
                                onChange={(e) => setVertical(parseInt(e.target.value))}
                                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-muted-foreground mb-2 flex justify-between">
                                Blur Radius <span>{blur}px</span>
                            </label>
                            <input
                                type="range"
                                min="0" max="100"
                                value={blur}
                                onChange={(e) => setBlur(parseInt(e.target.value))}
                                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-muted-foreground mb-2 flex justify-between">
                                Spread Radius <span>{spread}px</span>
                            </label>
                            <input
                                type="range"
                                min="-50" max="50"
                                value={spread}
                                onChange={(e) => setSpread(parseInt(e.target.value))}
                                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-muted-foreground mb-2 flex justify-between">
                                Opacity <span>{opacity}</span>
                            </label>
                            <input
                                type="range"
                                min="0" max="1" step="0.01"
                                value={opacity}
                                onChange={(e) => setOpacity(parseFloat(e.target.value))}
                                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm text-muted-foreground mb-2 block">Shadow Color</label>
                                <div className="flex gap-2">
                                    <input
                                        type="color"
                                        value={color}
                                        onChange={(e) => setColor(e.target.value)}
                                        className="h-10 w-10 rounded cursor-pointer bg-transparent border-0"
                                    />
                                    <input
                                        type="text"
                                        value={color}
                                        onChange={(e) => setColor(e.target.value)}
                                        className="flex-1 h-10 rounded-md border border-input bg-background px-3 text-sm uppercase"
                                    />
                                </div>
                            </div>
                            <div className="flex items-end">
                                <label className="flex items-center gap-2 cursor-pointer bg-white/5 px-4 py-2 rounded-md w-full h-10 border border-white/10 hover:bg-white/10 transition-colors">
                                    <input
                                        type="checkbox"
                                        checked={inset}
                                        onChange={(e) => setInset(e.target.checked)}
                                        className="rounded border-white/20 bg-black/20"
                                    />
                                    <span className="text-sm font-medium">Inset Shadow</span>
                                </label>
                            </div>
                        </div>

                        <div className="relative mt-4">
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
