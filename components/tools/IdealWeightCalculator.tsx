"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ToolWrapper } from "./ToolWrapper";

export function IdealWeightCalculator() {
    const [gender, setGender] = useState<"male" | "female">("male");
    const [height, setHeight] = useState("");
    const [result, setResult] = useState<any>(null);

    const calculate = () => {
        const h = parseFloat(height);

        if (isNaN(h) || h <= 0) {
            return;
        }

        // Different formulas
        const hamwi = gender === "male"
            ? 48 + 2.7 * ((h - 152.4) / 2.54)
            : 45.5 + 2.2 * ((h - 152.4) / 2.54);

        const devine = gender === "male"
            ? 50 + 2.3 * ((h - 152.4) / 2.54)
            : 45.5 + 2.3 * ((h - 152.4) / 2.54);

        const miller = gender === "male"
            ? 56.2 + 1.41 * ((h - 152.4) / 2.54)
            : 53.1 + 1.36 * ((h - 152.4) / 2.54);

        const robinson = gender === "male"
            ? 52 + 1.9 * ((h - 152.4) / 2.54)
            : 49 + 1.7 * ((h - 152.4) / 2.54);

        // BMI-based range (18.5 to 24.9)
        const heightM = h / 100;
        const minWeight = 18.5 * heightM * heightM;
        const maxWeight = 24.9 * heightM * heightM;

        setResult({
            hamwi: hamwi.toFixed(1),
            devine: devine.toFixed(1),
            miller: miller.toFixed(1),
            robinson: robinson.toFixed(1),
            minWeight: minWeight.toFixed(1),
            maxWeight: maxWeight.toFixed(1),
        });
    };

    return (
        <ToolWrapper
            title="Ideal Weight Calculator"
            description="Calculate your ideal body weight using multiple formulas."
        >
            <div className="max-w-2xl mx-auto">
                <div className="grid gap-6 mb-6">
                    <div>
                        <label className="text-sm text-muted-foreground mb-2 block">Gender</label>
                        <div className="grid grid-cols-2 gap-2">
                            <button
                                onClick={() => setGender("male")}
                                className={`px-4 py-3 rounded-lg font-medium transition-all ${gender === "male"
                                        ? "bg-orange-500 text-white"
                                        : "bg-white/5 text-muted-foreground hover:bg-white/10"
                                    }`}
                            >
                                Male
                            </button>
                            <button
                                onClick={() => setGender("female")}
                                className={`px-4 py-3 rounded-lg font-medium transition-all ${gender === "female"
                                        ? "bg-orange-500 text-white"
                                        : "bg-white/5 text-muted-foreground hover:bg-white/10"
                                    }`}
                            >
                                Female
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="text-sm text-muted-foreground mb-2 block">Height (cm)</label>
                        <input
                            type="number"
                            className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-lg ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="e.g. 175"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                        />
                    </div>
                </div>

                <Button onClick={calculate} className="w-full bg-orange-500 hover:bg-orange-600 h-12 text-lg">
                    Calculate Ideal Weight
                </Button>

                {result && (
                    <div className="mt-8 grid gap-4">
                        <div className="p-6 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-600/20 border border-orange-500/30 text-center">
                            <div className="text-sm text-muted-foreground mb-1">Healthy Weight Range (BMI 18.5-24.9)</div>
                            <div className="text-4xl font-bold text-white">
                                {result.minWeight} - {result.maxWeight} kg
                            </div>
                        </div>

                        <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                            <h3 className="text-lg font-semibold mb-4">Various Formulas</h3>
                            <div className="grid gap-3">
                                <div className="flex justify-between p-3 rounded bg-white/5">
                                    <span className="text-muted-foreground">Hamwi Formula:</span>
                                    <span className="font-bold text-white">{result.hamwi} kg</span>
                                </div>
                                <div className="flex justify-between p-3 rounded bg-white/5">
                                    <span className="text-muted-foreground">Devine Formula:</span>
                                    <span className="font-bold text-white">{result.devine} kg</span>
                                </div>
                                <div className="flex justify-between p-3 rounded bg-white/5">
                                    <span className="text-muted-foreground">Miller Formula:</span>
                                    <span className="font-bold text-white">{result.miller} kg</span>
                                </div>
                                <div className="flex justify-between p-3 rounded bg-white/5">
                                    <span className="text-muted-foreground">Robinson Formula:</span>
                                    <span className="font-bold text-white">{result.robinson} kg</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-sm text-muted-foreground text-center">
                            Note: These are estimates. Consult a healthcare professional for personalized advice.
                        </div>
                    </div>
                )}
            </div>
        </ToolWrapper>
    );
}
