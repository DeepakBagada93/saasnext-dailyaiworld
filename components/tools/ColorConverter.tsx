"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { ToolWrapper } from "./ToolWrapper";
import { Copy } from "lucide-react";

export function ColorConverter() {
    const [hex, setHex] = useState("#ff7e5f");
    const [rgb, setRgb] = useState({ r: 255, g: 126, b: 95 });
    const [hsl, setHsl] = useState({ h: 12, s: 100, l: 69 });

    // Helper functions
    const hexToRgb = (hex: string) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    };

    const rgbToHex = (r: number, g: number, b: number) => {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    };

    const rgbToHsl = (r: number, g: number, b: number) => {
        r /= 255; g /= 255; b /= 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h = 0, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
    };

    const handleHexChange = (value: string) => {
        setHex(value);
        if (/^#[0-9A-F]{6}$/i.test(value)) {
            const rgbVal = hexToRgb(value);
            if (rgbVal) {
                setRgb(rgbVal);
                setHsl(rgbToHsl(rgbVal.r, rgbVal.g, rgbVal.b));
            }
        }
    };

    const handleRgbChange = (field: 'r' | 'g' | 'b', value: string) => {
        const val = parseInt(value) || 0;
        const newRgb = { ...rgb, [field]: val };
        setRgb(newRgb);
        setHex(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
        setHsl(rgbToHsl(newRgb.r, newRgb.g, newRgb.b));
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <ToolWrapper
            title="Color Converter"
            description="Convert colors between HEX, RGB, and HSL formats instantly."
        >
            <div className="max-w-4xl mx-auto">
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Preview */}
                    <div
                        className="h-64 md:h-auto rounded-2xl shadow-2xl border border-white/10 flex items-center justify-center"
                        style={{ backgroundColor: hex }}
                    >
                        <span className="bg-black/20 backdrop-blur-md text-white px-4 py-2 rounded-lg font-mono text-xl font-bold">
                            {hex}
                        </span>
                    </div>

                    {/* Controls */}
                    <div className="space-y-6">
                        {/* HEX Input */}
                        <div>
                            <label className="text-sm text-muted-foreground mb-2 block">HEX</label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={hex}
                                    onChange={(e) => handleHexChange(e.target.value)}
                                    className="flex-1 h-12 rounded-md border border-input bg-background px-3 text-lg uppercase font-mono"
                                    maxLength={7}
                                />
                                <Button onClick={() => copyToClipboard(hex)} variant="outline" className="h-12 w-12 p-0">
                                    <Copy className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        {/* RGB Input */}
                        <div>
                            <label className="text-sm text-muted-foreground mb-2 block">RGB</label>
                            <div className="flex gap-2 items-center">
                                <div className="grid grid-cols-3 gap-2 flex-1">
                                    <input
                                        type="number"
                                        value={rgb.r}
                                        onChange={(e) => handleRgbChange('r', e.target.value)}
                                        className="h-12 rounded-md border border-input bg-background px-3 text-lg font-mono"
                                        min="0" max="255"
                                    />
                                    <input
                                        type="number"
                                        value={rgb.g}
                                        onChange={(e) => handleRgbChange('g', e.target.value)}
                                        className="h-12 rounded-md border border-input bg-background px-3 text-lg font-mono"
                                        min="0" max="255"
                                    />
                                    <input
                                        type="number"
                                        value={rgb.b}
                                        onChange={(e) => handleRgbChange('b', e.target.value)}
                                        className="h-12 rounded-md border border-input bg-background px-3 text-lg font-mono"
                                        min="0" max="255"
                                    />
                                </div>
                                <Button
                                    onClick={() => copyToClipboard(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`)}
                                    variant="outline"
                                    className="h-12 w-12 p-0"
                                >
                                    <Copy className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        {/* HSL Display (Read-only for now to keep it simple) */}
                        <div>
                            <label className="text-sm text-muted-foreground mb-2 block">HSL</label>
                            <div className="flex gap-2">
                                <div className="flex-1 h-12 rounded-md border border-input bg-white/5 px-3 flex items-center text-lg font-mono text-muted-foreground">
                                    hsl({hsl.h}, {hsl.s}%, {hsl.l}%)
                                </div>
                                <Button
                                    onClick={() => copyToClipboard(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`)}
                                    variant="outline"
                                    className="h-12 w-12 p-0"
                                >
                                    <Copy className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ToolWrapper>
    );
}
