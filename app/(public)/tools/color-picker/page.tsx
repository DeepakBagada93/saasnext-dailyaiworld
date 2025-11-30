"use client";

import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { Copy, Check, Palette } from "lucide-react";

export default function ColorPicker() {
    const [color, setColor] = useState("#3b82f6");
    const [copied, setCopied] = useState(false);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const hexToRgb = (hex: string) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result
            ? `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})`
            : null;
    };

    const hexToHsl = (hex: string) => {
        let r = 0, g = 0, b = 0;
        if (hex.length === 4) {
            r = parseInt("0x" + hex[1] + hex[1]);
            g = parseInt("0x" + hex[2] + hex[2]);
            b = parseInt("0x" + hex[3] + hex[3]);
        } else if (hex.length === 7) {
            r = parseInt("0x" + hex[1] + hex[2]);
            g = parseInt("0x" + hex[3] + hex[4]);
            b = parseInt("0x" + hex[5] + hex[6]);
        }
        r /= 255;
        g /= 255;
        b /= 255;
        const cmin = Math.min(r, g, b),
            cmax = Math.max(r, g, b),
            delta = cmax - cmin;
        let h = 0, s = 0, l = 0;

        if (delta === 0) h = 0;
        else if (cmax === r) h = ((g - b) / delta) % 6;
        else if (cmax === g) h = (b - r) / delta + 2;
        else h = (r - g) / delta + 4;

        h = Math.round(h * 60);
        if (h < 0) h += 360;

        l = (cmax + cmin) / 2;
        s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
        s = +(s * 100).toFixed(1);
        l = +(l * 100).toFixed(1);

        return `hsl(${h}, ${s}%, ${l}%)`;
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold tracking-tight mb-4">Color Picker</h1>
                <p className="text-muted-foreground text-lg">
                    Pick colors and get HEX, RGB, and HSL codes instantly.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-start">
                {/* Picker Section */}
                <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col items-center">
                    <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 self-start">
                        <Palette size={20} /> Pick a Color
                    </h2>

                    <div className="w-full max-w-[300px] aspect-square mb-6">
                        <HexColorPicker color={color} onChange={setColor} style={{ width: "100%", height: "100%" }} />
                    </div>

                    <div className="w-full flex items-center gap-4">
                        <div
                            className="w-16 h-16 rounded-lg shadow-sm border border-border"
                            style={{ backgroundColor: color }}
                        />
                        <div className="flex-1">
                            <label className="text-xs font-medium text-muted-foreground mb-1 block">Selected Color</label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={color.toUpperCase()}
                                    onChange={(e) => setColor(e.target.value)}
                                    className="w-full px-3 py-2 bg-background border border-border rounded-md font-mono text-sm uppercase"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Codes Section */}
                <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                    <h2 className="text-xl font-semibold mb-6">Color Codes</h2>

                    <div className="space-y-4">
                        {/* HEX */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-muted-foreground">HEX</label>
                            <div className="flex gap-2">
                                <code className="flex-1 px-4 py-3 bg-accent/30 rounded-lg font-mono text-lg border border-border">
                                    {color.toUpperCase()}
                                </code>
                                <button
                                    onClick={() => copyToClipboard(color.toUpperCase())}
                                    className="px-4 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-lg transition-colors"
                                >
                                    {copied ? <Check size={20} /> : <Copy size={20} />}
                                </button>
                            </div>
                        </div>

                        {/* RGB */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-muted-foreground">RGB</label>
                            <div className="flex gap-2">
                                <code className="flex-1 px-4 py-3 bg-accent/30 rounded-lg font-mono text-lg border border-border">
                                    {hexToRgb(color)}
                                </code>
                                <button
                                    onClick={() => copyToClipboard(hexToRgb(color) || "")}
                                    className="px-4 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-lg transition-colors"
                                >
                                    {copied ? <Check size={20} /> : <Copy size={20} />}
                                </button>
                            </div>
                        </div>

                        {/* HSL */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-muted-foreground">HSL</label>
                            <div className="flex gap-2">
                                <code className="flex-1 px-4 py-3 bg-accent/30 rounded-lg font-mono text-lg border border-border">
                                    {hexToHsl(color)}
                                </code>
                                <button
                                    onClick={() => copyToClipboard(hexToHsl(color))}
                                    className="px-4 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-lg transition-colors"
                                >
                                    {copied ? <Check size={20} /> : <Copy size={20} />}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
