"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ToolWrapper } from "./ToolWrapper";
import { Input } from "@/components/ui/Input"; // Assuming Input component exists, if not I'll use standard input
import { Label } from "@/components/ui/Label"; // Assuming Label component exists

export function PercentageCalculator() {
    const [values, setValues] = useState({
        whatIs: { percent: "", of: "", result: "" },
        isWhat: { num1: "", num2: "", result: "" },
        increase: { from: "", to: "", result: "" },
    });

    const calculateWhatIs = () => {
        const p = parseFloat(values.whatIs.percent);
        const o = parseFloat(values.whatIs.of);
        if (!isNaN(p) && !isNaN(o)) {
            setValues(prev => ({
                ...prev,
                whatIs: { ...prev.whatIs, result: ((p / 100) * o).toFixed(2) }
            }));
        }
    };

    const calculateIsWhat = () => {
        const n1 = parseFloat(values.isWhat.num1);
        const n2 = parseFloat(values.isWhat.num2);
        if (!isNaN(n1) && !isNaN(n2) && n2 !== 0) {
            setValues(prev => ({
                ...prev,
                isWhat: { ...prev.isWhat, result: ((n1 / n2) * 100).toFixed(2) + "%" }
            }));
        }
    };

    const calculateIncrease = () => {
        const f = parseFloat(values.increase.from);
        const t = parseFloat(values.increase.to);
        if (!isNaN(f) && !isNaN(t) && f !== 0) {
            const diff = t - f;
            const percent = (diff / f) * 100;
            setValues(prev => ({
                ...prev,
                increase: { ...prev.increase, result: percent.toFixed(2) + "%" }
            }));
        }
    };

    return (
        <ToolWrapper
            title="Percentage Calculator"
            description="Calculate percentages, percentage increase/decrease, and more."
        >
            <div className="grid gap-8">
                {/* What is X% of Y? */}
                <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                    <h3 className="text-xl font-semibold mb-4 text-white">Percentage of a Number</h3>
                    <div className="flex flex-col md:flex-row items-end gap-4">
                        <div className="w-full">
                            <label className="text-sm text-muted-foreground mb-2 block">What is</label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="number"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="%"
                                    value={values.whatIs.percent}
                                    onChange={(e) => setValues({ ...values, whatIs: { ...values.whatIs, percent: e.target.value } })}
                                />
                                <span className="text-muted-foreground">% of</span>
                                <input
                                    type="number"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="Value"
                                    value={values.whatIs.of}
                                    onChange={(e) => setValues({ ...values, whatIs: { ...values.whatIs, of: e.target.value } })}
                                />
                            </div>
                        </div>
                        <Button onClick={calculateWhatIs} className="bg-orange-500 hover:bg-orange-600">Calculate</Button>
                    </div>
                    {values.whatIs.result && (
                        <div className="mt-4 text-lg">
                            Result: <span className="font-bold text-orange-500">{values.whatIs.result}</span>
                        </div>
                    )}
                </div>

                {/* X is what % of Y? */}
                <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                    <h3 className="text-xl font-semibold mb-4 text-white">What Percentage is X of Y?</h3>
                    <div className="flex flex-col md:flex-row items-end gap-4">
                        <div className="w-full">
                            <div className="flex items-center gap-2">
                                <input
                                    type="number"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="Value 1"
                                    value={values.isWhat.num1}
                                    onChange={(e) => setValues({ ...values, isWhat: { ...values.isWhat, num1: e.target.value } })}
                                />
                                <span className="text-muted-foreground">is what % of</span>
                                <input
                                    type="number"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="Value 2"
                                    value={values.isWhat.num2}
                                    onChange={(e) => setValues({ ...values, isWhat: { ...values.isWhat, num2: e.target.value } })}
                                />
                            </div>
                        </div>
                        <Button onClick={calculateIsWhat} className="bg-orange-500 hover:bg-orange-600">Calculate</Button>
                    </div>
                    {values.isWhat.result && (
                        <div className="mt-4 text-lg">
                            Result: <span className="font-bold text-orange-500">{values.isWhat.result}</span>
                        </div>
                    )}
                </div>

                {/* Percentage Increase/Decrease */}
                <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                    <h3 className="text-xl font-semibold mb-4 text-white">Percentage Change</h3>
                    <div className="flex flex-col md:flex-row items-end gap-4">
                        <div className="w-full">
                            <div className="flex items-center gap-2">
                                <span className="text-muted-foreground">From</span>
                                <input
                                    type="number"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="Initial Value"
                                    value={values.increase.from}
                                    onChange={(e) => setValues({ ...values, increase: { ...values.increase, from: e.target.value } })}
                                />
                                <span className="text-muted-foreground">to</span>
                                <input
                                    type="number"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="Final Value"
                                    value={values.increase.to}
                                    onChange={(e) => setValues({ ...values, increase: { ...values.increase, to: e.target.value } })}
                                />
                            </div>
                        </div>
                        <Button onClick={calculateIncrease} className="bg-orange-500 hover:bg-orange-600">Calculate</Button>
                    </div>
                    {values.increase.result && (
                        <div className="mt-4 text-lg">
                            Result: <span className="font-bold text-orange-500">{values.increase.result}</span>
                        </div>
                    )}
                </div>
            </div>
        </ToolWrapper>
    );
}
