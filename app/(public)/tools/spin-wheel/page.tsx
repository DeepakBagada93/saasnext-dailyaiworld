"use client";

import { useState, useRef, useEffect } from "react";
import { Plus, Trash2, RotateCw } from "lucide-react";

export default function SpinWheel() {
    const [items, setItems] = useState<string[]>([
        "Pizza", "Burger", "Sushi", "Salad", "Tacos", "Pasta"
    ]);
    const [newItem, setNewItem] = useState("");
    const [isSpinning, setIsSpinning] = useState(false);
    const [winner, setWinner] = useState<string | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [rotation, setRotation] = useState(0);

    const colors = [
        "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEEAD", "#D4A5A5",
        "#9B59B6", "#3498DB", "#E67E22", "#2ECC71", "#F1C40F", "#E74C3C"
    ];

    const drawWheel = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = Math.min(centerX, centerY) - 10;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const sliceAngle = (2 * Math.PI) / items.length;

        items.forEach((item, index) => {
            const startAngle = index * sliceAngle + rotation;
            const endAngle = (index + 1) * sliceAngle + rotation;

            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, startAngle, endAngle);
            ctx.fillStyle = colors[index % colors.length];
            ctx.fill();
            ctx.stroke();

            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(startAngle + sliceAngle / 2);
            ctx.textAlign = "right";
            ctx.fillStyle = "#fff";
            ctx.font = "bold 14px Arial";
            ctx.fillText(item, radius - 20, 5);
            ctx.restore();
        });

        // Draw pointer
        ctx.beginPath();
        ctx.moveTo(centerX + radius + 10, centerY);
        ctx.lineTo(centerX + radius - 10, centerY - 10);
        ctx.lineTo(centerX + radius - 10, centerY + 10);
        ctx.fillStyle = "#333";
        ctx.fill();
    };

    useEffect(() => {
        drawWheel();
    }, [items, rotation]);

    const spin = () => {
        if (isSpinning || items.length < 2) return;

        setIsSpinning(true);
        setWinner(null);

        const spinDuration = 3000; // 3 seconds
        const startRotation = rotation;
        const totalRotation = startRotation + Math.random() * 10 + 20; // Random spins

        let startTime: number | null = null;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;

            if (progress < spinDuration) {
                const easeOut = 1 - Math.pow(1 - progress / spinDuration, 3);
                setRotation(startRotation + totalRotation * easeOut);
                requestAnimationFrame(animate);
            } else {
                setIsSpinning(false);
                const finalRotation = (startRotation + totalRotation) % (2 * Math.PI);
                setRotation(finalRotation);

                // Calculate winner
                const sliceAngle = (2 * Math.PI) / items.length;
                // The pointer is at 0 degrees (right side), but canvas draws clockwise.
                // We need to normalize the rotation to find which slice is at 0.
                const normalizedRotation = (2 * Math.PI - (finalRotation % (2 * Math.PI))) % (2 * Math.PI);
                const winningIndex = Math.floor(normalizedRotation / sliceAngle);
                setWinner(items[winningIndex]);
            }
        };

        requestAnimationFrame(animate);
    };

    const addItem = () => {
        if (newItem.trim()) {
            setItems([...items, newItem.trim()]);
            setNewItem("");
        }
    };

    const removeItem = (index: number) => {
        setItems(items.filter((_, i) => i !== index));
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold tracking-tight mb-4">Spin Wheel</h1>
                <p className="text-muted-foreground text-lg">
                    Make decisions fun with a random spin wheel.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Wheel Section */}
                <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col items-center justify-center min-h-[400px]">
                    <div className="relative">
                        <canvas
                            ref={canvasRef}
                            width={300}
                            height={300}
                            className="max-w-full h-auto"
                        />
                        {/* Pointer Indicator (CSS Triangle) */}
                        <div className="absolute top-1/2 right-[-20px] transform -translate-y-1/2 w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-r-[20px] border-r-primary rotate-180" />
                    </div>

                    <button
                        onClick={spin}
                        disabled={isSpinning || items.length < 2}
                        className="mt-8 px-8 py-3 bg-primary text-primary-foreground rounded-full font-bold text-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        <RotateCw size={20} className={isSpinning ? "animate-spin" : ""} />
                        {isSpinning ? "Spinning..." : "SPIN!"}
                    </button>

                    {winner && (
                        <div className="mt-6 text-center animate-in fade-in zoom-in">
                            <p className="text-sm text-muted-foreground">Winner:</p>
                            <p className="text-3xl font-bold text-green-600">{winner}</p>
                        </div>
                    )}
                </div>

                {/* Controls Section */}
                <div className="bg-card border border-border rounded-xl p-6 shadow-sm h-fit">
                    <h2 className="text-xl font-semibold mb-6">Edit Items</h2>

                    <div className="flex gap-2 mb-6">
                        <input
                            type="text"
                            value={newItem}
                            onChange={(e) => setNewItem(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && addItem()}
                            placeholder="Add item..."
                            className="flex-1 px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <button
                            onClick={addItem}
                            className="px-3 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors"
                        >
                            <Plus size={20} />
                        </button>
                    </div>

                    <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                        {items.map((item, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-3 bg-accent/30 rounded-lg border border-border group"
                            >
                                <span className="font-medium truncate">{item}</span>
                                <button
                                    onClick={() => removeItem(index)}
                                    className="text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))}
                        {items.length === 0 && (
                            <p className="text-center text-muted-foreground py-4">
                                Add items to spin the wheel!
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
