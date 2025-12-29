"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ToolWrapper } from "./ToolWrapper";

export function WaterIntakeCalculator() {
    const [weight, setWeight] = useState("");
    const [activityLevel, setActivityLevel] = useState("moderate");
    const [climate, setClimate] = useState("moderate");
    const [result, setResult] = useState<any>(null);

    const calculate = () => {
        const w = parseFloat(weight);

        if (isNaN(w) || w <= 0) {
            return;
        }

        // Base calculation: 30-35ml per kg of body weight
        let baseWater = w * 33; // ml

        // Activity level multiplier
        const activityMultiplier = {
            sedentary: 1,
            moderate: 1.1,
            active: 1.2,
            veryActive: 1.3,
        }[activityLevel] || 1.1;

        // Climate multiplier
        const climateMultiplier = {
            cold: 0.9,
            moderate: 1,
            hot: 1.2,
        }[climate] || 1;

        const totalWater = baseWater * activityMultiplier * climateMultiplier;
        const liters = totalWater / 1000;
        const glasses = totalWater / 250; // Assuming 250ml per glass

        setResult({
            liters: liters.toFixed(2),
            ml: totalWater.toFixed(0),
            glasses: Math.ceil(glasses),
        });
    };

    return (
        <ToolWrapper
            title="Water Intake Calculator"
            description="Calculate your daily recommended water intake based on your body weight and lifestyle."
        >
            <div className="max-w-2xl mx-auto">
                <div className="grid gap-6 mb-6">
                    <div>
                        <label className="text-sm text-muted-foreground mb-2 block">Body Weight (kg)</label>
                        <input
                            type="number"
                            className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-lg ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="e.g. 70"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="text-sm text-muted-foreground mb-2 block">Activity Level</label>
                        <select
                            className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-lg ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            value={activityLevel}
                            onChange={(e) => setActivityLevel(e.target.value)}
                        >
                            <option value="sedentary">Sedentary</option>
                            <option value="moderate">Moderate</option>
                            <option value="active">Active</option>
                            <option value="veryActive">Very Active</option>
                        </select>
                    </div>

                    <div>
                        <label className="text-sm text-muted-foreground mb-2 block">Climate</label>
                        <div className="grid grid-cols-3 gap-2">
                            {["cold", "moderate", "hot"].map((c) => (
                                <button
                                    key={c}
                                    onClick={() => setClimate(c)}
                                    className={`px-4 py-3 rounded-lg capitalize font-medium transition-all ${climate === c
                                            ? "bg-orange-500 text-white"
                                            : "bg-white/5 text-muted-foreground hover:bg-white/10"
                                        }`}
                                >
                                    {c}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <Button onClick={calculate} className="w-full bg-orange-500 hover:bg-orange-600 h-12 text-lg">
                    Calculate Water Intake
                </Button>

                {result && (
                    <div className="mt-8 grid gap-4">
                        <div className="p-6 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-600/20 border border-blue-500/30 text-center">
                            <div className="text-sm text-muted-foreground mb-1">Daily Water Intake</div>
                            <div className="text-5xl font-bold text-white mb-2">
                                {result.liters}
                            </div>
                            <div className="text-2xl text-muted-foreground">Liters</div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                                <div className="text-sm text-muted-foreground mb-1">Milliliters</div>
                                <div className="text-2xl font-bold text-white">
                                    {result.ml} ml
                                </div>
                            </div>
                            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                                <div className="text-sm text-muted-foreground mb-1">Glasses (250ml)</div>
                                <div className="text-2xl font-bold text-white">
                                    {result.glasses} glasses
                                </div>
                            </div>
                        </div>

                        <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-sm text-muted-foreground">
                            <h4 className="font-semibold text-white mb-2">💡 Tips:</h4>
                            <ul className="list-disc list-inside space-y-1">
                                <li>Drink water throughout the day, not all at once</li>
                                <li>Increase intake during exercise or hot weather</li>
                                <li>Listen to your body's thirst signals</li>
                                <li>Include water-rich foods in your diet</li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </ToolWrapper>
    );
}
