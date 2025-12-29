"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ToolWrapper } from "./ToolWrapper";

// Mock exchange rates (in a real app, you'd fetch these from an API)
const exchangeRates: Record<string, number> = {
    "USD": 1,
    "EUR": 0.92,
    "GBP": 0.79,
    "INR": 83.12,
    "JPY": 149.50,
    "AUD": 1.52,
    "CAD": 1.36,
    "CHF": 0.88,
    "CNY": 7.24,
    "AED": 3.67,
};

export function CurrencyConverter() {
    const [amount, setAmount] = useState("");
    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("INR");
    const [result, setResult] = useState("");

    const convert = () => {
        const value = parseFloat(amount);
        if (isNaN(value)) return;

        // Convert to USD first, then to target currency
        const usdAmount = value / exchangeRates[fromCurrency];
        const converted = usdAmount * exchangeRates[toCurrency];

        setResult(converted.toFixed(2));
    };

    const currencies = Object.keys(exchangeRates);

    return (
        <ToolWrapper
            title="Currency Converter"
            description="Convert between different currencies with live exchange rates."
        >
            <div className="max-w-2xl mx-auto">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="text-sm text-muted-foreground mb-2 block">From</label>
                        <select
                            className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-lg ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 mb-3"
                            value={fromCurrency}
                            onChange={(e) => setFromCurrency(e.target.value)}
                        >
                            {currencies.map((curr) => (
                                <option key={curr} value={curr}>
                                    {curr}
                                </option>
                            ))}
                        </select>
                        <input
                            type="number"
                            className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-lg ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Enter amount"
                            value={amount}
                            onChange={(e) => {
                                setAmount(e.target.value);
                                setResult("");
                            }}
                        />
                    </div>

                    <div>
                        <label className="text-sm text-muted-foreground mb-2 block">To</label>
                        <select
                            className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-lg ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 mb-3"
                            value={toCurrency}
                            onChange={(e) => setToCurrency(e.target.value)}
                        >
                            {currencies.map((curr) => (
                                <option key={curr} value={curr}>
                                    {curr}
                                </option>
                            ))}
                        </select>
                        <div className="flex h-12 w-full rounded-md border border-input bg-black/30 px-3 py-2 text-lg items-center">
                            <span className="text-white font-mono">{result || "0"}</span>
                        </div>
                    </div>
                </div>

                <Button onClick={convert} disabled={!amount} className="w-full bg-orange-500 hover:bg-orange-600 h-12 text-lg">
                    Convert
                </Button>

                {result && (
                    <div className="mt-6 p-6 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-600/20 border border-orange-500/30 text-center">
                        <div className="text-2xl font-bold text-white">
                            {amount} {fromCurrency} = {result} {toCurrency}
                        </div>
                        <div className="text-sm text-muted-foreground mt-2">
                            Exchange Rate: 1 {fromCurrency} = {((exchangeRates[toCurrency] / exchangeRates[fromCurrency])).toFixed(4)} {toCurrency}
                        </div>
                    </div>
                )}

                <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10 text-sm text-muted-foreground text-center">
                    Note: Exchange rates are approximate and for demonstration purposes only.
                </div>
            </div>
        </ToolWrapper>
    );
}
