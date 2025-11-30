"use client";

import { useState } from "react";
import { Activity, RefreshCw } from "lucide-react";

export default function BMICalculator() {
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [bmi, setBmi] = useState<number | null>(null);
    const [category, setCategory] = useState("");

    const calculateBMI = () => {
        const h = parseFloat(height);
        const w = parseFloat(weight);

        if (h && w) {
            const heightInMeters = h / 100;
            const bmiValue = w / (heightInMeters * heightInMeters);
            setBmi(parseFloat(bmiValue.toFixed(1)));

            if (bmiValue < 18.5) setCategory("Underweight");
            else if (bmiValue < 25) setCategory("Normal weight");
            else if (bmiValue < 30) setCategory("Overweight");
            else setCategory("Obese");
        }
    };

    const reset = () => {
        setHeight("");
        setWeight("");
        setBmi(null);
        setCategory("");
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold tracking-tight mb-4">BMI Calculator</h1>
                <p className="text-muted-foreground text-lg">
                    Calculate your Body Mass Index (BMI) to check if you're at a healthy weight.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Input Section */}
                <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                    <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                        <Activity size={20} /> Your Details
                    </h2>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Height (cm)</label>
                            <input
                                type="number"
                                value={height}
                                onChange={(e) => setHeight(e.target.value)}
                                placeholder="e.g. 175"
                                className="w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Weight (kg)</label>
                            <input
                                type="number"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                                placeholder="e.g. 70"
                                className="w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>

                        <div className="flex gap-4 pt-4">
                            <button
                                onClick={calculateBMI}
                                className="flex-1 py-2 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors"
                            >
                                Calculate BMI
                            </button>
                            <button
                                onClick={reset}
                                className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md font-medium hover:bg-secondary/80 transition-colors"
                                aria-label="Reset"
                            >
                                <RefreshCw size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Result Section */}
                <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col justify-center items-center text-center min-h-[300px]">
                    {bmi ? (
                        <div className="space-y-4 animate-in fade-in zoom-in duration-300">
                            <p className="text-muted-foreground font-medium">Your BMI is</p>
                            <div className="text-6xl font-bold tracking-tighter text-primary">
                                {bmi}
                            </div>
                            <div className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold ${category === "Normal weight"
                                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                    : category === "Overweight"
                                        ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                                        : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                                }`}>
                                {category}
                            </div>
                            <p className="text-sm text-muted-foreground max-w-xs mx-auto mt-4">
                                A healthy BMI range is between 18.5 and 24.9.
                            </p>
                        </div>
                    ) : (
                        <div className="text-muted-foreground">
                            <Activity size={48} className="mx-auto mb-4 opacity-20" />
                            <p>Enter your height and weight to see your result</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
