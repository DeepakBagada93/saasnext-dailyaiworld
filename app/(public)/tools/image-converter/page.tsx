"use client";

import { useState, useRef } from "react";
import { Upload, Download, FileImage, RefreshCw, ArrowRight } from "lucide-react";

export default function ImageConverter() {
    const [originalImage, setOriginalImage] = useState<File | null>(null);
    const [convertedImage, setConvertedImage] = useState<string | null>(null);
    const [isConverting, setIsConverting] = useState(false);
    const [targetFormat, setTargetFormat] = useState<"png" | "jpeg" | "webp">("png");
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setOriginalImage(file);
            setConvertedImage(null);
        }
    };

    const handleConversion = async () => {
        if (!originalImage || !canvasRef.current) return;

        setIsConverting(true);

        const img = new Image();
        img.src = URL.createObjectURL(originalImage);

        img.onload = () => {
            const canvas = canvasRef.current!;
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");

            if (ctx) {
                ctx.drawImage(img, 0, 0);
                const dataUrl = canvas.toDataURL(`image/${targetFormat}`);
                setConvertedImage(dataUrl);
                setIsConverting(false);
            }
        };
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold tracking-tight mb-4">Image Converter</h1>
                <p className="text-muted-foreground text-lg">
                    Convert your images to PNG, JPG, or WEBP formats easily.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Upload Section */}
                <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <Upload size={20} /> Upload Image
                    </h2>

                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:bg-accent/50 transition-colors cursor-pointer relative">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div className="flex flex-col items-center gap-2">
                            <FileImage size={48} className="text-muted-foreground" />
                            <p className="font-medium">Click or drag image here</p>
                            <p className="text-xs text-muted-foreground">Supports any image format</p>
                        </div>
                    </div>

                    {originalImage && (
                        <div className="mt-6 space-y-4">
                            <div className="p-4 bg-accent/50 rounded-lg">
                                <p className="text-sm font-medium">Original File:</p>
                                <p className="text-xs text-muted-foreground truncate">{originalImage.name}</p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Convert to:</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {(["png", "jpeg", "webp"] as const).map((format) => (
                                        <button
                                            key={format}
                                            onClick={() => setTargetFormat(format)}
                                            className={`py-2 px-4 rounded-md text-sm font-medium border transition-colors ${targetFormat === format
                                                    ? "bg-primary text-primary-foreground border-primary"
                                                    : "bg-background border-border hover:bg-accent"
                                                }`}
                                        >
                                            {format.toUpperCase()}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={handleConversion}
                                disabled={isConverting}
                                className="w-full py-2 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                            >
                                {isConverting ? (
                                    <>
                                        <RefreshCw size={16} className="animate-spin" /> Converting...
                                    </>
                                ) : (
                                    <>
                                        Convert to {targetFormat.toUpperCase()} <ArrowRight size={16} />
                                    </>
                                )}
                            </button>
                        </div>
                    )}
                </div>

                {/* Result Section */}
                <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <Download size={20} /> Result
                    </h2>

                    <div className="flex-1 flex items-center justify-center bg-accent/20 rounded-lg border border-border p-4 min-h-[300px]">
                        {convertedImage ? (
                            <div className="text-center w-full">
                                <img
                                    src={convertedImage}
                                    alt="Converted"
                                    className="max-h-[300px] mx-auto rounded-md shadow-sm mb-4 object-contain"
                                />

                                <a
                                    href={convertedImage}
                                    download={`converted-image.${targetFormat}`}
                                    className="inline-flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 transition-colors"
                                >
                                    <Download size={16} /> Download {targetFormat.toUpperCase()}
                                </a>
                            </div>
                        ) : (
                            <div className="text-center text-muted-foreground">
                                <p>Converted image will appear here</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Hidden Canvas for Processing */}
            <canvas ref={canvasRef} className="hidden" />
        </div>
    );
}
