"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { ToolWrapper } from "./ToolWrapper";
import { Copy } from "lucide-react";

export function BorderRadiusGenerator() {
    const [topLeft, setTopLeft] = useState(20);
    const [topRight, setTopRight] = useState(20);
    const [bottomRight, setBottomRight] = useState(20);
    const [bottomLeft, setBottomLeft] = useState(20);
    const [linked, setLinked] = useState(true);
    const [cssCode, setCssCode] = useState("");

    useEffect(() => {
        setCssCode(`border-radius: ${topLeft}px ${topRight}px ${bottomRight}px ${bottomLeft}px;`);
    }, [topLeft, topRight, bottomRight, bottomLeft]);

    const handleChange = (corner: string, value: number) => {
        if (linked) {
            setTopLeft(value);
            setTopRight(value);
            setBottomRight(value);
            setBottomLeft(value);
        } else {
            switch (corner) {
                case "tl": setTopLeft(value); break;
                case "tr": setTopRight(value); break;
                case "br": setBottomRight(value); break;
                case "bl": setBottomLeft(value); break;
            }
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(cssCode);
    };

    return (
        <ToolWrapper
            title="CSS Border Radius Generator"
            description="Visually generate CSS border-radius code for your elements."
        >
            <div className="max-w-4xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Preview Area */}
                    <div className="flex justify-center">
                        <div
                            className="w-64 h-64 bg-gradient-to-br from-orange-500 to-red-600 shadow-2xl transition-all duration-200 border-4 border-white/20"
                            style={{
                                borderTopLeftRadius: `${topLeft}px`,
                                borderTopRightRadius: `${topRight}px`,
                                borderBottomRightRadius: `${bottomRight}px`,
                                borderBottomLeftRadius: `${bottomLeft}px`
                            }}
                        ></div>
                    </div>

                    {/* Controls */}
                    <div className="space-y-6">
                        <div className="flex justify-end mb-4">
                            <button
                                onClick={() => setLinked(!linked)}
                                className={`text-sm px-3 py-1 rounded-full border ${linked ? "bg-orange-500 border-orange-500 text-white" : "bg-transparent border-white/20 text-muted-foreground"}`}
                            >
                                {linked ? "Unlink Corners" : "Link Corners"}
                            </button>
                        </div>

                        <div>
                            <label className="text-sm text-muted-foreground mb-2 flex justify-between">
                                Top Left <span>{topLeft}px</span>
                            </label>
                            <input
                                type="range"
                                min="0" max="200"
                                value={topLeft}
                                onChange={(e) => handleChange("tl", parseInt(e.target.value))}
                                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-muted-foreground mb-2 flex justify-between">
                                Top Right <span>{topRight}px</span>
                            </label>
                            <input
                                type="range"
                                min="0" max="200"
                                value={topRight}
                                onChange={(e) => handleChange("tr", parseInt(e.target.value))}
                                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                                disabled={linked}
                            />
                        </div>

                        <div>
                            <label className="text-sm text-muted-foreground mb-2 flex justify-between">
                                Bottom Right <span>{bottomRight}px</span>
                            </label>
                            <input
                                type="range"
                                min="0" max="200"
                                value={bottomRight}
                                onChange={(e) => handleChange("br", parseInt(e.target.value))}
                                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                                disabled={linked}
                            />
                        </div>

                        <div>
                            <label className="text-sm text-muted-foreground mb-2 flex justify-between">
                                Bottom Left <span>{bottomLeft}px</span>
                            </label>
                            <input
                                type="range"
                                min="0" max="200"
                                value={bottomLeft}
                                onChange={(e) => handleChange("bl", parseInt(e.target.value))}
                                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                                disabled={linked}
                            />
                        </div>

                        <div className="relative mt-8">
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
