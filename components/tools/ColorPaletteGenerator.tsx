"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ToolWrapper } from "./ToolWrapper";
import { Copy, Lock, Unlock, RefreshCw } from "lucide-react";

export function ColorPaletteGenerator() {
    const generateRandomColor = () => "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');

    const [colors, setColors] = useState([
        { hex: generateRandomColor(), locked: false },
        { hex: generateRandomColor(), locked: false },
        { hex: generateRandomColor(), locked: false },
        { hex: generateRandomColor(), locked: false },
        { hex: generateRandomColor(), locked: false },
    ]);

    const generatePalette = () => {
        setColors(colors.map(c => c.locked ? c : { ...c, hex: generateRandomColor() }));
    };

    const toggleLock = (index: number) => {
        const newColors = [...colors];
        newColors[index].locked = !newColors[index].locked;
        setColors(newColors);
    };

    const copyColor = (hex: string) => {
        navigator.clipboard.writeText(hex);
    };

    return (
        <ToolWrapper
            title="Color Palette Generator"
            description="Generate beautiful color palettes for your next project."
        >
            <div className="max-w-5xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-5 h-[500px] rounded-2xl overflow-hidden shadow-2xl mb-8">
                    {colors.map((color, index) => (
                        <div
                            key={index}
                            className="relative group h-full flex flex-col items-center justify-center transition-all"
                            style={{ backgroundColor: color.hex }}
                        >
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center gap-4 bg-black/20 p-4 rounded-xl backdrop-blur-sm">
                                <button
                                    onClick={() => toggleLock(index)}
                                    className="text-white hover:scale-110 transition-transform"
                                >
                                    {color.locked ? <Lock size={24} /> : <Unlock size={24} />}
                                </button>
                                <span className="text-white font-mono font-bold text-xl uppercase tracking-wider">
                                    {color.hex}
                                </span>
                                <button
                                    onClick={() => copyColor(color.hex)}
                                    className="text-white hover:scale-110 transition-transform"
                                >
                                    <Copy size={24} />
                                </button>
                            </div>
                            {/* Mobile view text */}
                            <div className="md:hidden absolute bottom-4 text-white font-mono font-bold bg-black/20 px-2 py-1 rounded">
                                {color.hex}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center gap-4">
                    <Button
                        onClick={generatePalette}
                        size="lg"
                        className="bg-orange-500 hover:bg-orange-600 text-lg px-8 h-14 rounded-full shadow-lg hover:shadow-orange-500/25 transition-all"
                    >
                        <RefreshCw className="mr-2 h-5 w-5" /> Generate Palette
                    </Button>
                </div>

                <div className="mt-12 text-center text-muted-foreground text-sm">
                    <p>Press Spacebar to generate a new palette (coming soon)</p>
                    <p className="mt-2">Click the lock icon to keep a color you like.</p>
                </div>
            </div>
        </ToolWrapper>
    );
}
