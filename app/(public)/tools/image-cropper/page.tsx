"use client";

import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { Upload, Download, FileImage, RotateCw, ZoomIn, ZoomOut } from "lucide-react";
import { getCroppedImg } from "@/lib/utils";

export default function ImageCropper() {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [croppedImage, setCroppedImage] = useState<string | null>(null);

    const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                setImageSrc(reader.result as string);
                setCroppedImage(null);
            });
            reader.readAsDataURL(file);
        }
    };

    const handleDownload = async () => {
        if (imageSrc && croppedAreaPixels) {
            try {
                const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels, rotation);
                setCroppedImage(croppedImage);
            } catch (e) {
                console.error(e);
            }
        }
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold tracking-tight mb-4">Image Cropper</h1>
                <p className="text-muted-foreground text-lg">
                    Crop and rotate your images with ease.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Editor Section */}
                <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col h-[600px]">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <Upload size={20} /> Editor
                    </h2>

                    {!imageSrc ? (
                        <div className="flex-1 border-2 border-dashed border-muted-foreground/25 rounded-lg flex items-center justify-center relative hover:bg-accent/50 transition-colors cursor-pointer">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <div className="text-center">
                                <FileImage size={48} className="mx-auto text-muted-foreground mb-2" />
                                <p className="font-medium">Upload Image to Crop</p>
                            </div>
                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col gap-4">
                            <div className="relative flex-1 bg-black/5 rounded-lg overflow-hidden">
                                <Cropper
                                    image={imageSrc}
                                    crop={crop}
                                    zoom={zoom}
                                    rotation={rotation}
                                    aspect={4 / 3}
                                    onCropChange={setCrop}
                                    onCropComplete={onCropComplete}
                                    onZoomChange={setZoom}
                                    onRotationChange={setRotation}
                                />
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <ZoomOut size={16} />
                                    <input
                                        type="range"
                                        value={zoom}
                                        min={1}
                                        max={3}
                                        step={0.1}
                                        aria-labelledby="Zoom"
                                        onChange={(e) => setZoom(Number(e.target.value))}
                                        className="flex-1 h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                                    />
                                    <ZoomIn size={16} />
                                </div>

                                <div className="flex items-center gap-2">
                                    <RotateCw size={16} />
                                    <input
                                        type="range"
                                        value={rotation}
                                        min={0}
                                        max={360}
                                        step={1}
                                        aria-labelledby="Rotation"
                                        onChange={(e) => setRotation(Number(e.target.value))}
                                        className="flex-1 h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                                    />
                                    <span className="text-xs w-8 text-right">{rotation}°</span>
                                </div>

                                <button
                                    onClick={handleDownload}
                                    className="w-full py-2 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors"
                                >
                                    Crop Image
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Result Section */}
                <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col h-[600px]">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <Download size={20} /> Result
                    </h2>

                    <div className="flex-1 flex items-center justify-center bg-accent/20 rounded-lg border border-border p-4">
                        {croppedImage ? (
                            <div className="text-center w-full h-full flex flex-col">
                                <div className="flex-1 flex items-center justify-center overflow-hidden">
                                    <img
                                        src={croppedImage}
                                        alt="Cropped"
                                        className="max-h-full max-w-full rounded-md shadow-sm object-contain"
                                    />
                                </div>

                                <a
                                    href={croppedImage}
                                    download="cropped-image.png"
                                    className="mt-4 inline-flex items-center justify-center gap-2 px-6 py-2 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 transition-colors w-full"
                                >
                                    <Download size={16} /> Download Cropped Image
                                </a>
                            </div>
                        ) : (
                            <div className="text-center text-muted-foreground">
                                <p>Cropped image will appear here</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
