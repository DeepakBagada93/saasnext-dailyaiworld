"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ToolWrapper } from "./ToolWrapper";

export function BMRCalculator() {
    const [gender, setGender] = useState<"male" | "female">("male");
    const [age, setAge] = useState("");
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [activityLevel, setActivityLevel] = useState("1.2");
    const [result, setResult] = useState<any>(null);

    const calculate = () => {
        const w = parseFloat(weight);
        const h = parseFloat(height);
        const a = parseFloat(age);
        const activity = parseFloat(activityLevel);

        if (isNaN(w) || isNaN(h) || isNaN(a) || w <= 0 || h <= 0 || a <= 0) {
            return;
        }

        // Mifflin-St Jeor Equation
        let bmr;
        if (gender === "male") {
            bmr = 10 * w + 6.25 * h - 5 * a + 5;
        } else {
            bmr = 10 * w + 6.25 * h - 5 * a - 161;
        }

        const tdee = bmr * activity;

        setResult({
            bmr: bmr.toFixed(0),
            tdee: tdee.toFixed(0),
            mildWeightLoss: (tdee - 250).toFixed(0),
            weightLoss: (tdee - 500).toFixed(0),
            extremeWeightLoss: (tdee - 1000).toFixed(0),
            mildWeightGain: (tdee + 250).toFixed(0),
            weightGain: (tdee + 500).toFixed(0),
        });
    };

    return (
        <ToolWrapper
            title="BMR Calculator"
            description="Calculate your Basal Metabolic Rate and daily calorie needs."
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
                        <label className="text-sm text-muted-foreground mb-2 block">Age (years)</label>
                        <input
                            type="number"
                            className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-lg ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="e.g. 30"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="text-sm text-muted-foreground mb-2 block">Weight (kg)</label>
                        <input
                            type="number"
                            className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-lg ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="e.g. 70"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                        />
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

                    <div>
                        <label className="text-sm text-muted-foreground mb-2 block">Activity Level</label>
                        <select
                            className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-lg ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            value={activityLevel}
                            onChange={(e) => setActivityLevel(e.target.value)}
                        >
                            <option value="1.2">Sedentary (little or no exercise)</option>
                            <option value="1.375">Lightly active (1-3 days/week)</option>
                            <option value="1.55">Moderately active (3-5 days/week)</option>
                            <option value="1.725">Very active (6-7 days/week)</option>
                            <option value="1.9">Super active (twice per day)</option>
                        </select>
                    </div>
                </div>

                <Button onClick={calculate} className="w-full bg-orange-500 hover:bg-orange-600 h-12 text-lg">
                    Calculate BMR
                </Button>

                {result && (
                    <div className="mt-8 grid gap-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="p-6 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-600/20 border border-orange-500/30 text-center">
                                <div className="text-sm text-muted-foreground mb-1">BMR</div>
                                <div className="text-4xl font-bold text-white">
                                    {result.bmr}
                                </div>
                                <div className="text-xs text-muted-foreground mt-1">cal/day</div>
                            </div>
                            <div className="p-6 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-600/20 border border-orange-500/30 text-center">
                                <div className="text-sm text-muted-foreground mb-1">TDEE (Maintain)</div>
                                <div className="text-4xl font-bold text-white">
                                    {result.tdee}
                                </div>
                                <div className="text-xs text-muted-foreground mt-1">cal/day</div>
                            </div>
                        </div>

                        <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                            <h3 className="text-lg font-semibold mb-4">Weight Goals</h3>
                            <div className="grid md:grid-cols-2 gap-3 text-sm">
                                <div className="flex justify-between p-2 rounded bg-white/5">
                                    <span className="text-muted-foreground">Mild Weight Loss (0.25kg/week):</span>
                                    <span className="font-bold text-white">{result.mildWeightLoss} cal</span>
                                </div>
                                <div className="flex justify-between p-2 rounded bg-white/5">
                                    <span className="text-muted-foreground">Weight Loss (0.5kg/week):</span>
                                    <span className="font-bold text-white">{result.weightLoss} cal</span>
                                </div>
                                <div className="flex justify-between p-2 rounded bg-white/5">
                                    <span className="text-muted-foreground">Extreme Weight Loss (1kg/week):</span>
                                    <span className="font-bold text-white">{result.extremeWeightLoss} cal</span>
                                </div>
                                <div className="flex justify-between p-2 rounded bg-white/5">
                                    <span className="text-muted-foreground">Mild Weight Gain (0.25kg/week):</span>
                                    <span className="font-bold text-white">{result.mildWeightGain} cal</span>
                                </div>
                                <div className="flex justify-between p-2 rounded bg-white/5">
                                    <span className="text-muted-foreground">Weight Gain (0.5kg/week):</span>
                                    <span className="font-bold text-white">{result.weightGain} cal</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </ToolWrapper>
    );
}
