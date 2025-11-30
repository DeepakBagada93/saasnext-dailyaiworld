"use client";

import { useState } from "react";
import imageCompression from "browser-image-compression";
import { Upload, Download, FileImage, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ImageCompressor() {
    const [originalImage, setOriginalImage] = useState<File | null>(null);
    const [compressedImage, setCompressedImage] = useState<File | null>(null);
    const [isCompressing, setIsCompressing] = useState(false);
    const [compressionQuality, setCompressionQuality] = useState(0.8);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setOriginalImage(file);
            setCompressedImage(null);
        }
    };

    const handleCompression = async () => {
        if (!originalImage) return;

        setIsCompressing(true);
        try {
            const options = {
                maxSizeMB: 1,
                maxWidthOrHeight: 1920,
                useWebWorker: true,
                initialQuality: compressionQuality,
            };
            const compressedFile = await imageCompression(originalImage, options);
            setCompressedImage(compressedFile);
        } catch (error) {
            console.error("Error compressing image:", error);
        } finally {
            setIsCompressing(false);
        }
    };

    const formatSize = (size: number) => {
        return (size / 1024 / 1024).toFixed(2) + " MB";
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold tracking-tight mb-4">Image Compressor</h1>
                <p className="text-muted-foreground text-lg">
                    Compress your images efficiently without losing quality.
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
                            <p className="text-xs text-muted-foreground">Supports JPG, PNG, WEBP</p>
                        </div>
                    </div>

                    {originalImage && (
                        <div className="mt-6 space-y-4">
                            <div className="p-4 bg-accent/50 rounded-lg">
                                <p className="text-sm font-medium">Original File:</p>
                                <p className="text-xs text-muted-foreground truncate">{originalImage.name}</p>
                                <p className="text-sm font-bold mt-1">{formatSize(originalImage.size)}</p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium flex justify-between">
                                    Compression Quality
                                    <span>{Math.round(compressionQuality * 100)}%</span>
                                </label>
                                <input
                                    type="range"
                                    min="0.1"
                                    max="1"
                                    step="0.1"
                                    value={compressionQuality}
                                    onChange={(e) => setCompressionQuality(parseFloat(e.target.value))}
                                    className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                                />
                            </div>

                            <button
                                onClick={handleCompression}
                                disabled={isCompressing}
                                className="w-full py-2 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                            >
                                {isCompressing ? (
                                    <>
                                        <RefreshCw size={16} className="animate-spin" /> Compressing...
                                    </>
                                ) : (
                                    "Compress Image"
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
                        {compressedImage ? (
                            <div className="text-center w-full">
                                <img
                                    src={URL.createObjectURL(compressedImage)}
                                    alt="Compressed"
                                    className="max-h-[300px] mx-auto rounded-md shadow-sm mb-4 object-contain"
                                />
                                <div className="flex items-center justify-between p-4 bg-background border border-border rounded-lg mb-4">
                                    <div className="text-left">
                                        <p className="text-sm font-medium">New Size</p>
                                        <p className="text-lg font-bold text-green-500">
                                            {formatSize(compressedImage.size)}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-medium">Saved</p>
                                        <p className="text-sm text-muted-foreground">
                                            {originalImage &&
                                                ((1 - compressedImage.size / originalImage.size) * 100).toFixed(0)}
                                            %
                                        </p>
                                    </div>
                                </div>
                                <a
                                    href={URL.createObjectURL(compressedImage)}
                                    download={`compressed-${originalImage?.name}`}
                                    className="inline-flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 transition-colors"
                                >
                                    <Download size={16} /> Download
                                </a>
                            </div>
                        ) : (
                            <div className="text-center text-muted-foreground">
                                <p>Compressed image will appear here</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
