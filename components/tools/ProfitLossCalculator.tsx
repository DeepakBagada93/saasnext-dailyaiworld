"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ToolWrapper } from "./ToolWrapper";

export function ProfitLossCalculator() {
    const [costPrice, setCostPrice] = useState("");
    const [sellingPrice, setSellingPrice] = useState("");
    const [quantity, setQuantity] = useState("1");
    const [result, setResult] = useState<any>(null);

    const calculate = () => {
        const cp = parseFloat(costPrice);
        const sp = parseFloat(sellingPrice);
        const qty = parseFloat(quantity);

        if (isNaN(cp) || isNaN(sp) || isNaN(qty) || cp < 0 || sp < 0 || qty <= 0) {
            return;
        }

        const totalCost = cp * qty;
        const totalRevenue = sp * qty;
        const difference = totalRevenue - totalCost;
        const percentage = (difference / totalCost) * 100;

        setResult({
            isProfit: difference >= 0,
            amount: Math.abs(difference).toFixed(2),
            percentage: Math.abs(percentage).toFixed(2),
            totalCost: totalCost.toFixed(2),
            totalRevenue: totalRevenue.toFixed(2),
        });
    };

    return (
        <ToolWrapper
            title="Profit & Loss Calculator"
            description="Calculate profit or loss percentage on your sales."
        >
            <div className="max-w-2xl mx-auto">
                <div className="grid gap-6 mb-6">
                    <div>
                        <label className="text-sm text-muted-foreground mb-2 block">Cost Price (per unit)</label>
                        <input
                            type="number"
                            className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-lg ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="e.g. 100"
                            value={costPrice}
                            onChange={(e) => setCostPrice(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="text-sm text-muted-foreground mb-2 block">Selling Price (per unit)</label>
                        <input
                            type="number"
                            className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-lg ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="e.g. 120"
                            value={sellingPrice}
                            onChange={(e) => setSellingPrice(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="text-sm text-muted-foreground mb-2 block">Quantity</label>
                        <input
                            type="number"
                            className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-lg ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="e.g. 10"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                    </div>
                </div>

                <Button onClick={calculate} className="w-full bg-orange-500 hover:bg-orange-600 h-12 text-lg">
                    Calculate
                </Button>

                {result && (
                    <div className="mt-8 grid gap-4">
                        <div className={`p-6 rounded-xl border ${result.isProfit ? "bg-green-500/20 border-green-500/30" : "bg-red-500/20 border-red-500/30"}`}>
                            <div className="text-center">
                                <div className="text-sm text-muted-foreground mb-1">{result.isProfit ? "Profit" : "Loss"}</div>
                                <div className="text-5xl font-bold text-white mb-2">
                                    ₹{parseFloat(result.amount).toLocaleString()}
                                </div>
                                <div className={`text-2xl font-bold ${result.isProfit ? "text-green-400" : "text-red-400"}`}>
                                    {result.percentage}%
                                </div>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                                <div className="text-sm text-muted-foreground mb-1">Total Cost</div>
                                <div className="text-2xl font-bold text-white">
                                    ₹{parseFloat(result.totalCost).toLocaleString()}
                                </div>
                            </div>
                            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                                <div className="text-sm text-muted-foreground mb-1">Total Revenue</div>
                                <div className="text-2xl font-bold text-white">
                                    ₹{parseFloat(result.totalRevenue).toLocaleString()}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </ToolWrapper>
    );
}
