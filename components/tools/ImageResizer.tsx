"use client";

import { useState, useRef, useEffect } from "react";
import { ToolWrapper } from "./ToolWrapper";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Upload, Download, RefreshCw, Image as ImageIcon, Lock, Unlock } from "lucide-react";
import { cn } from "@/lib/utils";

export function ImageResizer() {
    const [image, setImage] = useState<string | null>(null);
    const [originalDimensions, setOriginalDimensions] = useState({ width: 0, height: 0 });
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [lockAspectRatio, setLockAspectRatio] = useState(true);
    const [quality, setQuality] = useState(90);
    const [isProcessing, setIsProcessing] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    setOriginalDimensions({ width: img.width, height: img.height });
                    setDimensions({ width: img.width, height: img.height });
                    setImage(event.target?.result as string);
                };
                img.src = event.target?.result as string;
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDimensionChange = (type: 'width' | 'height', value: string) => {
        const val = parseInt(value) || 0;
        if (lockAspectRatio && originalDimensions.width > 0) {
            const ratio = originalDimensions.width / originalDimensions.height;
            if (type === 'width') {
                setDimensions({ width: val, height: Math.round(val / ratio) });
            } else {
                setDimensions({ width: Math.round(val * ratio), height: val });
            }
        } else {
            setDimensions(prev => ({ ...prev, [type]: val }));
        }
    };

    const handleDownload = () => {
        if (!image || !canvasRef.current) return;
        setIsProcessing(true);

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = new Image();

        img.onload = () => {
            canvas.width = dimensions.width;
            canvas.height = dimensions.height;

            // Better quality resizing
            if (ctx) {
                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = 'high';
                ctx.drawImage(img, 0, 0, dimensions.width, dimensions.height);

                const link = document.createElement('a');
                link.download = `resized-${dimensions.width}x${dimensions.height}.jpg`;
                link.href = canvas.toDataURL('image/jpeg', quality / 100);
                link.click();
                setIsProcessing(false);
            }
        };
        img.src = image;
    };

    const reset = () => {
        setImage(null);
        setDimensions({ width: 0, height: 0 });
        setOriginalDimensions({ width: 0, height: 0 });
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <ToolWrapper
            title="Image Resizer"
            description="Resize your images to exact dimensions or percentage while maintaining quality."
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
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div className="bg-black/40 rounded-xl p-6 border border-white/10">
                                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                    <ImageIcon className="w-5 h-5 text-orange-500" />
                                    Resize Settings
                                </h3>

                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="space-y-2">
                                        <Label>Width (px)</Label>
                                        <Input
                                            type="number"
                                            value={dimensions.width}
                                            onChange={(e) => handleDimensionChange('width', e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Height (px)</Label>
                                        <Input
                                            type="number"
                                            value={dimensions.height}
                                            onChange={(e) => handleDimensionChange('height', e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setLockAspectRatio(!lockAspectRatio)}
                                            className={cn(lockAspectRatio ? "text-orange-500" : "text-white/50")}
                                        >
                                            {lockAspectRatio ? <Lock size={16} /> : <Unlock size={16} />}
                                            <span className="ml-2 text-xs">Lock Aspect Ratio</span>
                                        </Button>
                                    </div>
                                    <div className="text-xs text-white/50">
                                        Original: {originalDimensions.width} x {originalDimensions.height}
                                    </div>
                                </div>

                                <div className="space-y-2 mb-6">
                                    <div className="flex justify-between text-sm">
                                        <Label>Quality</Label>
                                        <span className="text-orange-500">{quality}%</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="10"
                                        max="100"
                                        value={quality}
                                        onChange={(e) => setQuality(parseInt(e.target.value))}
                                        className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-orange-500"
                                    />
                                </div>

                                <div className="flex gap-3">
                                    <Button onClick={handleDownload} className="flex-1 bg-orange-500 hover:bg-orange-600" disabled={isProcessing}>
                                        {isProcessing ? <RefreshCw className="animate-spin mr-2" /> : <Download className="mr-2" />}
                                        Download Resized
                                    </Button>
                                    <Button variant="outline" onClick={reset}>
                                        Reset
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="bg-black/40 rounded-xl p-6 border border-white/10 flex items-center justify-center min-h-[300px]">
                            <div className="relative max-w-full max-h-[400px] overflow-hidden rounded-lg">
                                <img
                                    src={image}
                                    alt="Preview"
                                    className="max-w-full h-auto object-contain"
                                    style={{
                                        aspectRatio: `${dimensions.width}/${dimensions.height}`
                                    }}
                                />
                                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded backdrop-blur-md">
                                    Preview
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <canvas ref={canvasRef} className="hidden" />
            </div>
        </ToolWrapper>
    );
}
