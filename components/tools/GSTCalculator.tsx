"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ToolWrapper } from "./ToolWrapper";

export function GSTCalculator() {
    const [amount, setAmount] = useState("");
    const [gstRate, setGstRate] = useState("18");
    const [type, setType] = useState<"exclusive" | "inclusive">("exclusive");
    const [result, setResult] = useState<any>(null);

    const calculateGST = () => {
        const baseAmount = parseFloat(amount);
        const rate = parseFloat(gstRate);

        if (isNaN(baseAmount) || isNaN(rate) || baseAmount <= 0 || rate < 0) {
            return;
        }

        let netAmount, gstAmount, totalAmount;

        if (type === "exclusive") {
            // Amount is without GST
            netAmount = baseAmount;
            gstAmount = (baseAmount * rate) / 100;
            totalAmount = baseAmount + gstAmount;
        } else {
            // Amount is with GST
            totalAmount = baseAmount;
            netAmount = baseAmount / (1 + rate / 100);
            gstAmount = baseAmount - netAmount;
        }

        const cgst = gstAmount / 2;
        const sgst = gstAmount / 2;

        setResult({
            netAmount: netAmount.toFixed(2),
            cgst: cgst.toFixed(2),
            sgst: sgst.toFixed(2),
            totalGST: gstAmount.toFixed(2),
            totalAmount: totalAmount.toFixed(2),
        });
    };

    return (
        <ToolWrapper
            title="GST Calculator"
            description="Calculate GST (CGST + SGST) for your products and services. 🇮🇳"
        >
            <div className="max-w-2xl mx-auto">
                <div className="grid gap-6 mb-6">
                    <div>
                        <label className="text-sm text-muted-foreground mb-2 block">Amount Type</label>
                        <div className="grid grid-cols-2 gap-2">
                            <button
                                onClick={() => setType("exclusive")}
                                className={`px-4 py-3 rounded-lg font-medium transition-all ${type === "exclusive"
                                        ? "bg-orange-500 text-white"
                                        : "bg-white/5 text-muted-foreground hover:bg-white/10"
                                    }`}
                            >
                                Exclusive (+ GST)
                            </button>
                            <button
                                onClick={() => setType("inclusive")}
                                className={`px-4 py-3 rounded-lg font-medium transition-all ${type === "inclusive"
                                        ? "bg-orange-500 text-white"
                                        : "bg-white/5 text-muted-foreground hover:bg-white/10"
                                    }`}
                            >
                                Inclusive (with GST)
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="text-sm text-muted-foreground mb-2 block">
                            {type === "exclusive" ? "Amount (₹) [Without GST]" : "Amount (₹) [With GST]"}
                        </label>
                        <input
                            type="number"
                            className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-lg ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="e.g. 10000"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="text-sm text-muted-foreground mb-2 block">GST Rate (%)</label>
                        <div className="grid grid-cols-5 gap-2 mb-2">
                            {["5", "12", "18", "28"].map((rate) => (
                                <button
                                    key={rate}
                                    onClick={() => setGstRate(rate)}
                                    className={`px-3 py-2 rounded-lg font-medium transition-all ${gstRate === rate
                                            ? "bg-orange-500 text-white"
                                            : "bg-white/5 text-muted-foreground hover:bg-white/10"
                                        }`}
                                >
                                    {rate}%
                                </button>
                            ))}
                            <input
                                type="number"
                                className="flex h-full rounded-md border border-input bg-background px-2 text-center text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                placeholder="Custom"
                                value={gstRate}
                                onChange={(e) => setGstRate(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <Button onClick={calculateGST} className="w-full bg-orange-500 hover:bg-orange-600 h-12 text-lg">
                    Calculate GST
                </Button>

                {result && (
                    <div className="mt-8 grid gap-4">
                        <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                            <div className="grid grid-cols-2 gap-4 text-center">
                                <div>
                                    <div className="text-sm text-muted-foreground mb-1">Net Amount</div>
                                    <div className="text-2xl font-bold text-white">
                                        ₹{parseFloat(result.netAmount).toLocaleString()}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm text-muted-foreground mb-1">Total Amount</div>
                                    <div className="text-2xl font-bold text-orange-500">
                                        ₹{parseFloat(result.totalAmount).toLocaleString()}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                                <div className="text-sm text-muted-foreground mb-1">CGST</div>
                                <div className="text-xl font-bold text-white">
                                    ₹{parseFloat(result.cgst).toLocaleString()}
                                </div>
                            </div>
                            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                                <div className="text-sm text-muted-foreground mb-1">SGST</div>
                                <div className="text-xl font-bold text-white">
                                    ₹{parseFloat(result.sgst).toLocaleString()}
                                </div>
                            </div>
                            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                                <div className="text-sm text-muted-foreground mb-1">Total GST</div>
                                <div className="text-xl font-bold text-orange-500">
                                    ₹{parseFloat(result.totalGST).toLocaleString()}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </ToolWrapper>
    );
}
