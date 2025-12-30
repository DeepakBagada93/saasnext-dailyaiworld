"use client";

import { useState, useRef } from "react";
import { ToolWrapper } from "./ToolWrapper";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { Upload, Download, RefreshCw, FileType } from "lucide-react";

export function ImageConverter() {
    const [image, setImage] = useState<string | null>(null);
    const [originalFormat, setOriginalFormat] = useState<string>("");
    const [targetFormat, setTargetFormat] = useState<string>("image/png");
    const [isProcessing, setIsProcessing] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setOriginalFormat(file.type);
            const reader = new FileReader();
            reader.onload = (event) => {
                setImage(event.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleConvert = () => {
        if (!image || !canvasRef.current) return;
        setIsProcessing(true);

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = new Image();

        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;

            if (ctx) {
                // Fill white background for JPG conversion to handle transparency
                if (targetFormat === 'image/jpeg') {
                    ctx.fillStyle = '#FFFFFF';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                }

                ctx.drawImage(img, 0, 0);

                const link = document.createElement('a');
                const ext = targetFormat.split('/')[1];
                link.download = `converted-image.${ext}`;
                link.href = canvas.toDataURL(targetFormat, 0.9);
                link.click();
                setIsProcessing(false);
            }
        };
        img.src = image;
    };

    const reset = () => {
        setImage(null);
        setOriginalFormat("");
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const formats = [
        { label: "PNG", value: "image/png" },
        { label: "JPG", value: "image/jpeg" },
        { label: "WEBP", value: "image/webp" },
    ];

    return (
        <ToolWrapper
            title="Image Converter"
            description="Convert images between different formats (PNG, JPG, WEBP) instantly."
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
                        <p className="text-white/50">Support for JPG, PNG, WEBP, GIF, BMP</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div className="bg-black/40 rounded-xl p-6 border border-white/10">
                                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                    <FileType className="w-5 h-5 text-orange-500" />
                                    Conversion Settings
                                </h3>

                                <div className="space-y-4 mb-6">
                                    <div className="space-y-2">
                                        <Label>Target Format</Label>
                                        <div className="grid grid-cols-3 gap-2">
                                            {formats.map((fmt) => (
                                                <button
                                                    key={fmt.value}
                                                    onClick={() => setTargetFormat(fmt.value)}
                                                    className={`p-2 rounded-lg text-sm font-medium transition-colors ${targetFormat === fmt.value
                                                            ? "bg-orange-500 text-white"
                                                            : "bg-white/5 text-white/70 hover:bg-white/10"
                                                        }`}
                                                >
                                                    {fmt.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="bg-white/5 rounded-lg p-4 text-sm text-white/70">
                                        <p>Original Format: <span className="text-white font-mono">{originalFormat}</span></p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <Button onClick={handleConvert} className="flex-1 bg-orange-500 hover:bg-orange-600" disabled={isProcessing}>
                                        {isProcessing ? <RefreshCw className="animate-spin mr-2" /> : <Download className="mr-2" />}
                                        Convert & Download
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
