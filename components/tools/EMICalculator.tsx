"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ToolWrapper } from "./ToolWrapper";

export function EMICalculator() {
    const [loanAmount, setLoanAmount] = useState("");
    const [interestRate, setInterestRate] = useState("");
    const [loanTenure, setLoanTenure] = useState("");
    const [tenureType, setTenureType] = useState<"months" | "years">("months");
    const [result, setResult] = useState<any>(null);

    const calculateEMI = () => {
        const P = parseFloat(loanAmount);
        const annualR = parseFloat(interestRate);
        let tenure = parseFloat(loanTenure);

        if (isNaN(P) || isNaN(annualR) || isNaN(tenure) || P <= 0 || annualR < 0 || tenure <= 0) {
            return;
        }

        // Convert to months if needed
        const N = tenureType === "years" ? tenure * 12 : tenure;
        const R = annualR / 12 / 100; // Monthly interest rate

        // EMI = [P x R x (1+R)^N] / [(1+R)^N-1]
        const emi = R === 0 ? P / N : (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
        const totalPayment = emi * N;
        const totalInterest = totalPayment - P;

        setResult({
            emi: emi.toFixed(2),
            totalPayment: totalPayment.toFixed(2),
            totalInterest: totalInterest.toFixed(2),
            principal: P.toFixed(2),
        });
    };

    return (
        <ToolWrapper
            title="EMI / Loan Calculator"
            description="Calculate your Equated Monthly Installment (EMI) for loans."
        >
            <div className="max-w-2xl mx-auto">
                <div className="grid gap-6 mb-6">
                    <div>
                        <label className="text-sm text-muted-foreground mb-2 block">Loan Amount (₹)</label>
                        <input
                            type="number"
                            className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-lg ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="e.g. 1000000"
                            value={loanAmount}
                            onChange={(e) => setLoanAmount(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="text-sm text-muted-foreground mb-2 block">Interest Rate (% per annum)</label>
                        <input
                            type="number"
                            step="0.1"
                            className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-lg ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="e.g. 10.5"
                            value={interestRate}
                            onChange={(e) => setInterestRate(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="text-sm text-muted-foreground mb-2 block">Loan Tenure</label>
                        <div className="flex gap-2">
                            <input
                                type="number"
                                className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-lg ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="e.g. 24"
                                value={loanTenure}
                                onChange={(e) => setLoanTenure(e.target.value)}
                            />
                            <select
                                className="flex h-12 rounded-md border border-input bg-background px-3 py-2 text-lg ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                value={tenureType}
                                onChange={(e) => setTenureType(e.target.value as "months" | "years")}
                            >
                                <option value="months">Months</option>
                                <option value="years">Years</option>
                            </select>
                        </div>
                    </div>
                </div>

                <Button onClick={calculateEMI} className="w-full bg-orange-500 hover:bg-orange-600 h-12 text-lg">
                    Calculate EMI
                </Button>

                {result && (
                    <div className="mt-8 grid gap-4">
                        <div className="p-6 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-600/20 border border-orange-500/30">
                            <div className="text-center">
                                <div className="text-sm text-muted-foreground mb-1">Monthly EMI</div>
                                <div className="text-5xl font-bold text-white mb-1">
                                    ₹{parseFloat(result.emi).toLocaleString()}
                                </div>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                                <div className="text-sm text-muted-foreground mb-1">Principal</div>
                                <div className="text-2xl font-bold text-white">
                                    ₹{parseFloat(result.principal).toLocaleString()}
                                </div>
                            </div>
                            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                                <div className="text-sm text-muted-foreground mb-1">Total Interest</div>
                                <div className="text-2xl font-bold text-orange-500">
                                    ₹{parseFloat(result.totalInterest).toLocaleString()}
                                </div>
                            </div>
                            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                                <div className="text-sm text-muted-foreground mb-1">Total Payment</div>
                                <div className="text-2xl font-bold text-white">
                                    ₹{parseFloat(result.totalPayment).toLocaleString()}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </ToolWrapper>
    );
}
