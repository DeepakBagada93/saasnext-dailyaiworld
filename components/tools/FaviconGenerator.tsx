"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { ToolWrapper } from "./ToolWrapper";
import { Upload, Download, Image as ImageIcon } from "lucide-react";

export function FaviconGenerator() {
    const [image, setImage] = useState<string | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const result = event.target?.result as string;
                setImage(result);
                setPreviewUrl(result);
            };
            reader.readAsDataURL(file);
        }
    };

    const downloadFavicon = (size: number) => {
        if (!image || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.src = image;

        img.onload = () => {
            canvas.width = size;
            canvas.height = size;
            ctx?.drawImage(img, 0, 0, size, size);

            const link = document.createElement("a");
            link.download = `favicon-${size}x${size}.png`;
            link.href = canvas.toDataURL("image/png");
            link.click();
        };
    };

    return (
        <ToolWrapper
            title="Favicon Generator"
            description="Convert any image into a favicon for your website."
        >
            <div className="max-w-4xl mx-auto">
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Upload Area */}
                    <div className="space-y-6">
                        <div className="border-2 border-dashed border-white/20 rounded-2xl p-8 text-center hover:border-orange-500/50 transition-colors bg-white/5">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                                id="image-upload"
                            />
                            <label
                                htmlFor="image-upload"
                                className="cursor-pointer flex flex-col items-center gap-4"
                            >
                                {previewUrl ? (
                                    <img
                                        src={previewUrl}
                                        alt="Preview"
                                        className="w-32 h-32 object-contain rounded-lg"
                                    />
                                ) : (
                                    <div className="w-32 h-32 bg-white/5 rounded-lg flex items-center justify-center">
                                        <ImageIcon className="w-12 h-12 text-muted-foreground" />
                                    </div>
                                )}
                                <div className="space-y-2">
                                    <h3 className="font-semibold text-lg">Upload Image</h3>
                                    <p className="text-sm text-muted-foreground">
                                        PNG, JPG, or SVG (Max 5MB)
                                    </p>
                                </div>
                                <Button variant="outline" className="mt-4 border-white/10 hover:bg-white/10">
                                    <Upload className="mr-2 h-4 w-4" /> Select File
                                </Button>
                            </label>
                        </div>
                    </div>

                    {/* Preview & Download */}
                    <div className="space-y-6">
                        {/* Browser Preview */}
                        <div className="bg-[#1e1e1e] rounded-t-xl border border-white/10 overflow-hidden">
                            <div className="bg-[#2d2d2d] px-4 py-2 flex items-center gap-2 border-b border-white/5">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                                    <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                                </div>
                                <div className="bg-[#1e1e1e] text-xs text-white/70 px-3 py-1 rounded-t-md ml-4 flex items-center gap-2 border-t border-x border-white/5">
                                    {previewUrl && (
                                        <img src={previewUrl} className="w-4 h-4 rounded-sm" alt="" />
                                    )}
                                    <span>New Tab</span>
                                </div>
                            </div>
                            <div className="p-8 flex items-center justify-center bg-[#1e1e1e] h-48">
                                <div className="text-center text-muted-foreground">
                                    Browser Tab Preview
                                </div>
                            </div>
                        </div>

                        {/* Download Options */}
                        <div className="grid grid-cols-2 gap-4">
                            <Button
                                onClick={() => downloadFavicon(16)}
                                disabled={!image}
                                variant="outline"
                                className="border-white/10 hover:bg-white/5 h-auto py-4 flex flex-col gap-2"
                            >
                                <span className="text-xs text-muted-foreground">16x16</span>
                                <span className="font-semibold">Download PNG</span>
                            </Button>
                            <Button
                                onClick={() => downloadFavicon(32)}
                                disabled={!image}
                                variant="outline"
                                className="border-white/10 hover:bg-white/5 h-auto py-4 flex flex-col gap-2"
                            >
                                <span className="text-xs text-muted-foreground">32x32</span>
                                <span className="font-semibold">Download PNG</span>
                            </Button>
                            <Button
                                onClick={() => downloadFavicon(180)}
                                disabled={!image}
                                variant="outline"
                                className="border-white/10 hover:bg-white/5 h-auto py-4 flex flex-col gap-2"
                            >
                                <span className="text-xs text-muted-foreground">180x180</span>
                                <span className="font-semibold">Apple Touch Icon</span>
                            </Button>
                            <Button
                                onClick={() => downloadFavicon(512)}
                                disabled={!image}
                                variant="outline"
                                className="border-white/10 hover:bg-white/5 h-auto py-4 flex flex-col gap-2"
                            >
                                <span className="text-xs text-muted-foreground">512x512</span>
                                <span className="font-semibold">Android Chrome</span>
                            </Button>
                        </div>
                    </div>
                </div>
                <canvas ref={canvasRef} className="hidden" />
            </div>
        </ToolWrapper>
    );
}
