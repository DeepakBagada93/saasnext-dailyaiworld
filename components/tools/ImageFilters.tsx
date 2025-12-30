"use client";

import { useState, useRef, useEffect } from "react";
import { ToolWrapper } from "./ToolWrapper";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { Upload, Download, RefreshCw, Sliders } from "lucide-react";

export function ImageFilters() {
    const [image, setImage] = useState<string | null>(null);
    const [filters, setFilters] = useState({
        brightness: 100,
        contrast: 100,
        saturation: 100,
        grayscale: 0,
        sepia: 0,
        blur: 0,
    });
    const fileInputRef = useRef<HTMLInputElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImage(event.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const applyFilters = () => {
        if (!image || !canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = new Image();

        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;

            if (ctx) {
                const filterString = `
                    brightness(${filters.brightness}%) 
                    contrast(${filters.contrast}%) 
                    saturate(${filters.saturation}%) 
                    grayscale(${filters.grayscale}%) 
                    sepia(${filters.sepia}%) 
                    blur(${filters.blur}px)
                `;
                ctx.filter = filterString;
                ctx.drawImage(img, 0, 0);
            }
        };
        img.src = image;
    };

    useEffect(() => {
        applyFilters();
    }, [filters, image]);

    const handleDownload = () => {
        if (!canvasRef.current) return;
        const link = document.createElement('a');
        link.download = 'filtered-image.jpg';
        link.href = canvasRef.current.toDataURL('image/jpeg', 0.9);
        link.click();
    };

    const reset = () => {
        setImage(null);
        setFilters({
            brightness: 100,
            contrast: 100,
            saturation: 100,
            grayscale: 0,
            sepia: 0,
            blur: 0,
        });
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const filterControls = [
        { label: "Brightness", key: "brightness", min: 0, max: 200, unit: "%" },
        { label: "Contrast", key: "contrast", min: 0, max: 200, unit: "%" },
        { label: "Saturation", key: "saturation", min: 0, max: 200, unit: "%" },
        { label: "Grayscale", key: "grayscale", min: 0, max: 100, unit: "%" },
        { label: "Sepia", key: "sepia", min: 0, max: 100, unit: "%" },
        { label: "Blur", key: "blur", min: 0, max: 10, unit: "px" },
    ];

    return (
        <ToolWrapper
            title="Image Filters"
            description="Apply professional filters and adjustments to your images directly in the browser."
        >
            <div className="grid gap-8">
                {!image ? (
                    <div
                        className="border-2 border-dashed border-white/20 rounded-xl p-12 text-center hover:border-orange-500/50 transition-colors cursor-pointer bg-white/5"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageUpload}
                        />
                        <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Upload className="w-8 h-8 text-orange-500" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">Upload an Image</h3>
                        <p className="text-white/50">Support for JPG, PNG, WEBP</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="md:col-span-2 bg-black/40 rounded-xl p-6 border border-white/10 flex items-center justify-center min-h-[400px]">
                            <canvas ref={canvasRef} className="max-w-full h-auto object-contain" />
                        </div>

                        <div className="space-y-6">
                            <div className="bg-black/40 rounded-xl p-6 border border-white/10">
                                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                    <Sliders className="w-5 h-5 text-orange-500" />
                                    Adjustments
                                </h3>

                                <div className="space-y-4 mb-6">
                                    {filterControls.map((control) => (
                                        <div key={control.key} className="space-y-1">
                                            <div className="flex justify-between text-xs">
                                                <Label>{control.label}</Label>
                                                <span className="text-orange-500">
                                                    {filters[control.key as keyof typeof filters]}{control.unit}
                                                </span>
                                            </div>
                                            <input
                                                type="range"
                                                min={control.min}
                                                max={control.max}
                                                value={filters[control.key as keyof typeof filters]}
                                                onChange={(e) => setFilters(prev => ({ ...prev, [control.key]: parseInt(e.target.value) }))}
                                                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-orange-500"
                                            />
                                        </div>
                                    ))}
                                </div>

                                <div className="flex gap-3 flex-col">
                                    <Button onClick={handleDownload} className="w-full bg-orange-500 hover:bg-orange-600">
                                        <Download className="mr-2" />
                                        Download Image
                                    </Button>
                                    <Button variant="outline" onClick={reset} className="w-full">
                                        Reset
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </ToolWrapper>
    );
}
