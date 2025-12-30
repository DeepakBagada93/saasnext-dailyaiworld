"use client";

import { useState, useRef } from "react";
import { ToolWrapper } from "./ToolWrapper";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { Upload, Download, RefreshCw, FileArchive, ArrowRight } from "lucide-react";
import imageCompression from 'browser-image-compression';

export function ImageCompressor() {
    const [originalImage, setOriginalImage] = useState<File | null>(null);
    const [compressedImage, setCompressedImage] = useState<Blob | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isCompressing, setIsCompressing] = useState(false);
    const [compressionLevel, setCompressionLevel] = useState(0.8);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setOriginalImage(file);
            setPreviewUrl(URL.createObjectURL(file));
            setCompressedImage(null);
            await compressImage(file, compressionLevel);
        }
    };

    const compressImage = async (file: File, level: number) => {
        setIsCompressing(true);
        try {
            const options = {
                maxSizeMB: 1,
                maxWidthOrHeight: 1920,
                useWebWorker: true,
                initialQuality: level,
            };
            const compressedFile = await imageCompression(file, options);
            setCompressedImage(compressedFile);
        } catch (error) {
            console.error(error);
        } finally {
            setIsCompressing(false);
        }
    };

    const handleLevelChange = async (value: string) => {
        const level = parseFloat(value);
        setCompressionLevel(level);
        if (originalImage) {
            await compressImage(originalImage, level);
        }
    };

    const formatSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const handleDownload = () => {
        if (!compressedImage) return;
        const link = document.createElement('a');
        link.href = URL.createObjectURL(compressedImage);
        link.download = `compressed-${originalImage?.name}`;
        link.click();
    };

    const reset = () => {
        setOriginalImage(null);
        setCompressedImage(null);
        setPreviewUrl(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <ToolWrapper
            title="Image Compressor"
            description="Compress your images to reduce file size without losing significant quality."
        >
            <div className="grid gap-8">
                {!originalImage ? (
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
                                    <FileArchive className="w-5 h-5 text-orange-500" />
                                    Compression Settings
                                </h3>

                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between text-sm">
                                        <Label>Compression Level</Label>
                                        <span className="text-orange-500">{Math.round(compressionLevel * 100)}%</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0.1"
                                        max="1"
                                        step="0.1"
                                        value={compressionLevel}
                                        onChange={(e) => handleLevelChange(e.target.value)}
                                        className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-orange-500"
                                    />
                                    <p className="text-xs text-white/50">Lower value means smaller size but lower quality.</p>
                                </div>

                                <div className="bg-white/5 rounded-lg p-4 mb-6 space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-white/70">Original Size:</span>
                                        <span className="font-mono text-white">{originalImage && formatSize(originalImage.size)}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-white/70">Compressed Size:</span>
                                        <span className="font-mono text-orange-500">
                                            {isCompressing ? "Calculating..." : (compressedImage && formatSize(compressedImage.size))}
                                        </span>
                                    </div>
                                    {originalImage && compressedImage && (
                                        <div className="flex justify-between items-center pt-2 border-t border-white/10">
                                            <span className="text-sm text-white/70">Savings:</span>
                                            <span className="font-bold text-green-500">
                                                {Math.round((1 - compressedImage.size / originalImage.size) * 100)}%
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex gap-3">
                                    <Button onClick={handleDownload} className="flex-1 bg-orange-500 hover:bg-orange-600" disabled={isCompressing || !compressedImage}>
                                        {isCompressing ? <RefreshCw className="animate-spin mr-2" /> : <Download className="mr-2" />}
                                        Download Compressed
                                    </Button>
                                    <Button variant="outline" onClick={reset}>
                                        Reset
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="bg-black/40 rounded-xl p-6 border border-white/10 flex items-center justify-center min-h-[300px]">
                            <div className="relative max-w-full max-h-[400px] overflow-hidden rounded-lg">
                                {previewUrl && (
                                    <img
                                        src={previewUrl}
                                        alt="Preview"
                                        className="max-w-full h-auto object-contain"
                                    />
                                )}
                                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded backdrop-blur-md">
                                    Preview
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </ToolWrapper>
    );
}
