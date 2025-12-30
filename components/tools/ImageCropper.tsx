"use client";

import { useState, useRef, useCallback } from "react";
import { ToolWrapper } from "./ToolWrapper";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { Upload, Download, Crop as CropIcon, RotateCw } from "lucide-react";
import Cropper from "react-easy-crop";
import { Point, Area } from "react-easy-crop";

export function ImageCropper() {
    const [image, setImage] = useState<string | null>(null);
    const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [aspect, setAspect] = useState<number | undefined>(16 / 9);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

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

    const createImage = (url: string): Promise<HTMLImageElement> =>
        new Promise((resolve, reject) => {
            const image = new Image();
            image.addEventListener("load", () => resolve(image));
            image.addEventListener("error", (error) => reject(error));
            image.setAttribute("crossOrigin", "anonymous");
            image.src = url;
        });

    const getCroppedImg = async (
        imageSrc: string,
        pixelCrop: Area,
        rotation = 0
    ): Promise<string | null> => {
        const image = await createImage(imageSrc);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) {
            return null;
        }

        const maxSize = Math.max(image.width, image.height);
        const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

        canvas.width = safeArea;
        canvas.height = safeArea;

        ctx.translate(safeArea / 2, safeArea / 2);
        ctx.rotate((rotation * Math.PI) / 180);
        ctx.translate(-safeArea / 2, -safeArea / 2);

        ctx.drawImage(
            image,
            safeArea / 2 - image.width * 0.5,
            safeArea / 2 - image.height * 0.5
        );

        const data = ctx.getImageData(0, 0, safeArea, safeArea);

        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;

        ctx.putImageData(
            data,
            0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x,
            0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y
        );

        return canvas.toDataURL("image/jpeg");
    };

    const handleDownload = async () => {
        if (image && croppedAreaPixels) {
            const croppedImage = await getCroppedImg(image, croppedAreaPixels, rotation);
            if (croppedImage) {
                const link = document.createElement("a");
                link.download = "cropped-image.jpg";
                link.href = croppedImage;
                link.click();
            }
        }
    };

    const reset = () => {
        setImage(null);
        setZoom(1);
        setRotation(0);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const aspectRatios = [
        { label: "16:9", value: 16 / 9 },
        { label: "4:3", value: 4 / 3 },
        { label: "1:1", value: 1 },
        { label: "Free", value: undefined },
    ];

    return (
        <ToolWrapper
            title="Image Cropper"
            description="Crop and rotate your images with ease. Preset aspect ratios available."
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
                        <div className="md:col-span-2 bg-black/40 rounded-xl border border-white/10 overflow-hidden relative h-[500px]">
                            <Cropper
                                image={image}
                                crop={crop}
                                zoom={zoom}
                                rotation={rotation}
                                aspect={aspect}
                                onCropChange={setCrop}
                                onCropComplete={onCropComplete}
                                onZoomChange={setZoom}
                                onRotationChange={setRotation}
                            />
                        </div>

                        <div className="space-y-6">
                            <div className="bg-black/40 rounded-xl p-6 border border-white/10">
                                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                    <CropIcon className="w-5 h-5 text-orange-500" />
                                    Crop Settings
                                </h3>

                                <div className="space-y-6 mb-6">
                                    <div className="space-y-2">
                                        <Label>Aspect Ratio</Label>
                                        <div className="grid grid-cols-2 gap-2">
                                            {aspectRatios.map((ratio) => (
                                                <button
                                                    key={ratio.label}
                                                    onClick={() => setAspect(ratio.value)}
                                                    className={`p-2 rounded-lg text-sm font-medium transition-colors ${aspect === ratio.value
                                                        ? "bg-orange-500 text-white"
                                                        : "bg-white/5 text-white/70 hover:bg-white/10"
                                                        }`}
                                                >
                                                    {ratio.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Zoom</Label>
                                        <input
                                            type="range"
                                            value={zoom}
                                            min={1}
                                            max={3}
                                            step={0.1}
                                            aria-labelledby="Zoom"
                                            onChange={(e) => setZoom(Number(e.target.value))}
                                            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-orange-500"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Rotation</Label>
                                        <input
                                            type="range"
                                            value={rotation}
                                            min={0}
                                            max={360}
                                            step={1}
                                            aria-labelledby="Rotation"
                                            onChange={(e) => setRotation(Number(e.target.value))}
                                            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-orange-500"
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-3 flex-col">
                                    <Button onClick={handleDownload} className="w-full bg-orange-500 hover:bg-orange-600">
                                        <Download className="mr-2" />
                                        Download Crop
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
