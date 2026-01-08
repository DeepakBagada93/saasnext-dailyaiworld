"use client";

import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Download, Copy, RefreshCw } from "lucide-react";

export const QRCodeGenerator = () => {
    const [text, setText] = useState("https://dailyaiworld.com");
    const [size, setSize] = useState(256);
    const [fgColor, setFgColor] = useState("#000000");
    const [bgColor, setBgColor] = useState("#ffffff");

    const handleDownload = () => {
        const canvas = document.getElementById("qr-code") as HTMLCanvasElement;
        if (canvas) {
            const pngUrl = canvas
                .toDataURL("image/png")
                .replace("image/png", "image/octet-stream");
            const downloadLink = document.createElement("a");
            downloadLink.href = pngUrl;
            downloadLink.download = "qrcode.png";
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
                <Card className="p-6 space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">Content (URL or Text)</label>
                        <input
                            type="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className="w-full p-3 rounded-lg bg-background border border-border focus:ring-2 focus:ring-primary outline-none"
                            placeholder="Enter text or URL"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Size (px): {size}</label>
                        <input
                            type="range"
                            min="128"
                            max="512"
                            value={size}
                            onChange={(e) => setSize(Number(e.target.value))}
                            className="w-full accent-primary"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Foreground Color</label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="color"
                                    value={fgColor}
                                    onChange={(e) => setFgColor(e.target.value)}
                                    className="h-10 w-10 rounded cursor-pointer bg-transparent border-none"
                                />
                                <span className="text-sm font-mono">{fgColor}</span>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Background Color</label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="color"
                                    value={bgColor}
                                    onChange={(e) => setBgColor(e.target.value)}
                                    className="h-10 w-10 rounded cursor-pointer bg-transparent border-none"
                                />
                                <span className="text-sm font-mono">{bgColor}</span>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card className="p-6 flex flex-col items-center justify-center space-y-6 bg-muted/30">
                    <div className="p-4 bg-white rounded-lg shadow-sm">
                        <QRCodeCanvas
                            id="qr-code"
                            value={text}
                            size={size}
                            fgColor={fgColor}
                            bgColor={bgColor}
                            level={"H"}
                            includeMargin={true}
                        />
                    </div>
                    <Button onClick={handleDownload} className="w-full max-w-xs">
                        <Download className="w-4 h-4 mr-2" />
                        Download PNG
                    </Button>
                </Card>
            </div>
        </div>
    );
};
