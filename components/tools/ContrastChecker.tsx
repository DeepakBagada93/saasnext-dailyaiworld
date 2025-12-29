"use client";

import { useState, useEffect } from "react";
import { ToolWrapper } from "./ToolWrapper";

export function ContrastChecker() {
    const [foreground, setForeground] = useState("#ffffff");
    const [background, setBackground] = useState("#ff7e5f");
    const [ratio, setRatio] = useState(0);
    const [compliance, setCompliance] = useState({ aa: false, aaa: false, aaLarge: false, aaaLarge: false });

    // Helper to calculate luminance
    const getLuminance = (hex: string) => {
        const rgb = parseInt(hex.slice(1), 16);
        const r = (rgb >> 16) & 0xff;
        const g = (rgb >> 8) & 0xff;
        const b = (rgb >> 0) & 0xff;

        const [lr, lg, lb] = [r, g, b].map(c => {
            c /= 255;
            return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
        });

        return 0.2126 * lr + 0.7152 * lg + 0.0722 * lb;
    };

    useEffect(() => {
        if (/^#[0-9A-F]{6}$/i.test(foreground) && /^#[0-9A-F]{6}$/i.test(background)) {
            const l1 = getLuminance(foreground);
            const l2 = getLuminance(background);
            const lighter = Math.max(l1, l2);
            const darker = Math.min(l1, l2);
            const currentRatio = (lighter + 0.05) / (darker + 0.05);

            setRatio(currentRatio);
            setCompliance({
                aa: currentRatio >= 4.5,
                aaa: currentRatio >= 7,
                aaLarge: currentRatio >= 3,
                aaaLarge: currentRatio >= 4.5
            });
        }
    }, [foreground, background]);

    return (
        <ToolWrapper
            title="Contrast Checker"
            description="Check color contrast ratio for WCAG accessibility compliance."
        >
            <div className="max-w-4xl mx-auto">
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                    {/* Preview Card */}
                    <div
                        className="rounded-2xl p-8 shadow-2xl border border-white/10 flex flex-col justify-center gap-4 min-h-[300px]"
                        style={{ backgroundColor: background }}
                    >
                        <h2 style={{ color: foreground }} className="text-4xl font-bold">
                            Hello World
                        </h2>
                        <p style={{ color: foreground }} className="text-lg">
                            This is how your text looks on the background. Ensure it is readable for everyone.
                        </p>
                        <button
                            className="px-6 py-3 rounded-lg font-medium w-fit mt-4"
                            style={{ backgroundColor: foreground, color: background }}
                        >
                            Button Text
                        </button>
                    </div>

                    {/* Controls & Results */}
                    <div className="space-y-8">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="text-sm text-muted-foreground mb-2 block">Text Color</label>
                                <div className="flex gap-2">
                                    <input
                                        type="color"
                                        value={foreground}
                                        onChange={(e) => setForeground(e.target.value)}
                                        className="h-12 w-12 rounded cursor-pointer bg-transparent border-0"
                                    />
                                    <input
                                        type="text"
                                        value={foreground}
                                        onChange={(e) => setForeground(e.target.value)}
                                        className="flex-1 h-12 rounded-md border border-input bg-background px-3 uppercase"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-sm text-muted-foreground mb-2 block">Background</label>
                                <div className="flex gap-2">
                                    <input
                                        type="color"
                                        value={background}
                                        onChange={(e) => setBackground(e.target.value)}
                                        className="h-12 w-12 rounded cursor-pointer bg-transparent border-0"
                                    />
                                    <input
                                        type="text"
                                        value={background}
                                        onChange={(e) => setBackground(e.target.value)}
                                        className="flex-1 h-12 rounded-md border border-input bg-background px-3 uppercase"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                            <div className="text-center mb-6">
                                <div className="text-sm text-muted-foreground mb-1">Contrast Ratio</div>
                                <div className={`text-5xl font-bold ${ratio >= 4.5 ? 'text-green-500' : ratio >= 3 ? 'text-yellow-500' : 'text-red-500'}`}>
                                    {ratio.toFixed(2)}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className={`p-4 rounded-lg border ${compliance.aa ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
                                    <div className="font-bold mb-1">WCAG AA</div>
                                    <div className="text-xs opacity-80">Normal Text</div>
                                    <div className={`mt-2 font-bold ${compliance.aa ? 'text-green-500' : 'text-red-500'}`}>
                                        {compliance.aa ? 'PASS' : 'FAIL'}
                                    </div>
                                </div>
                                <div className={`p-4 rounded-lg border ${compliance.aaa ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
                                    <div className="font-bold mb-1">WCAG AAA</div>
                                    <div className="text-xs opacity-80">Normal Text</div>
                                    <div className={`mt-2 font-bold ${compliance.aaa ? 'text-green-500' : 'text-red-500'}`}>
                                        {compliance.aaa ? 'PASS' : 'FAIL'}
                                    </div>
                                </div>
                                <div className={`p-4 rounded-lg border ${compliance.aaLarge ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
                                    <div className="font-bold mb-1">WCAG AA</div>
                                    <div className="text-xs opacity-80">Large Text</div>
                                    <div className={`mt-2 font-bold ${compliance.aaLarge ? 'text-green-500' : 'text-red-500'}`}>
                                        {compliance.aaLarge ? 'PASS' : 'FAIL'}
                                    </div>
                                </div>
                                <div className={`p-4 rounded-lg border ${compliance.aaaLarge ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
                                    <div className="font-bold mb-1">WCAG AAA</div>
                                    <div className="text-xs opacity-80">Large Text</div>
                                    <div className={`mt-2 font-bold ${compliance.aaaLarge ? 'text-green-500' : 'text-red-500'}`}>
                                        {compliance.aaaLarge ? 'PASS' : 'FAIL'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ToolWrapper>
    );
}
