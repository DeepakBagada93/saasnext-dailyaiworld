"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ToolWrapper } from "./ToolWrapper";

export function SIPCalculator() {
    const [monthlyInvestment, setMonthlyInvestment] = useState("");
    const [returnRate, setReturnRate] = useState("");
    const [timePeriod, setTimePeriod] = useState("");
    const [result, setResult] = useState<any>(null);

    const calculateSIP = () => {
        const P = parseFloat(monthlyInvestment);
        const annualRate = parseFloat(returnRate);
        const years = parseFloat(timePeriod);

        if (isNaN(P) || isNaN(annualRate) || isNaN(years) || P <= 0 || annualRate < 0 || years <= 0) {
            return;
        }

        const r = annualRate / 12 / 100; // Monthly interest rate
        const n = years * 12; // Total months

        // Future Value = P × [{(1 + r)^n - 1} / r] × (1 + r)
        const fv = P * (((Math.pow(1 + r, n) - 1) / r) * (1 + r));
        const totalInvested = P * n;
        const estimatedReturns = fv - totalInvested;

        setResult({
            futureValue: fv.toFixed(2),
            totalInvested: totalInvested.toFixed(2),
            estimatedReturns: estimatedReturns.toFixed(2),
        });
    };

    return (
        <ToolWrapper
            title="SIP Calculator"
            description="Calculate returns on your Systematic Investment Plan (SIP)."
        >
            <div className="max-w-2xl mx-auto">
                <div className="grid gap-6 mb-6">
                    <div>
                        <label className="text-sm text-muted-foreground mb-2 block">Monthly Investment (₹)</label>
                        <input
                            type="number"
                            className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-lg ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="e.g. 5000"
                            value={monthlyInvestment}
                            onChange={(e) => setMonthlyInvestment(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="text-sm text-muted-foreground mb-2 block">Expected Return Rate (% per annum)</label>
                        <input
                            type="number"
                            step="0.1"
                            className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-lg ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="e.g. 12"
                            value={returnRate}
                            onChange={(e) => setReturnRate(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="text-sm text-muted-foreground mb-2 block">Time Period (Years)</label>
                        <input
                            type="number"
                            className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-lg ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="e.g. 10"
                            value={timePeriod}
                            onChange={(e) => setTimePeriod(e.target.value)}
                        />
                    </div>
                </div>

                <Button onClick={calculateSIP} className="w-full bg-orange-500 hover:bg-orange-600 h-12 text-lg">
                    Calculate Returns
                </Button>

                {result && (
                    <div className="mt-8 grid gap-4">
                        <div className="p-6 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-600/20 border border-orange-500/30">
                            <div className="text-center">
                                <div className="text-sm text-muted-foreground mb-1">Maturity Value</div>
                                <div className="text-5xl font-bold text-white mb-1">
                                    ₹{parseFloat(result.futureValue).toLocaleString()}
                                </div>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                                <div className="text-sm text-muted-foreground mb-1">Total Invested</div>
                                <div className="text-2xl font-bold text-white">
                                    ₹{parseFloat(result.totalInvested).toLocaleString()}
                                </div>
                            </div>
                            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                                <div className="text-sm text-muted-foreground mb-1">Estimated Returns</div>
                                <div className="text-2xl font-bold text-orange-500">
                                    ₹{parseFloat(result.estimatedReturns).toLocaleString()}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </ToolWrapper>
    );
}
