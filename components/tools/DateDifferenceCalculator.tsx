"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ToolWrapper } from "./ToolWrapper";

export function DateDifferenceCalculator() {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [result, setResult] = useState<any>(null);

    const calculateDifference = () => {
        if (!startDate || !endDate) return;

        const start = new Date(startDate);
        const end = new Date(endDate);

        if (end < start) {
            setResult({ error: "End date must be after start date" });
            return;
        }

        let years = end.getFullYear() - start.getFullYear();
        let months = end.getMonth() - start.getMonth();
        let days = end.getDate() - start.getDate();

        if (days < 0) {
            months--;
            const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
            days += prevMonth.getDate();
        }

        if (months < 0) {
            years--;
            months += 12;
        }

        const totalDays = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
        const totalWeeks = Math.floor(totalDays / 7);
        const totalMonths = years * 12 + months;
        const totalHours = totalDays * 24;
        const totalMinutes = totalHours * 60;

        setResult({
            years,
            months,
            days,
            totalDays,
            totalWeeks,
            totalMonths,
            totalHours,
            totalMinutes
        });
    };

    return (
        <ToolWrapper
            title="Date Difference Calculator"
            description="Calculate the difference between two dates in various units."
        >
            <div className="max-w-2xl mx-auto">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="text-sm text-muted-foreground mb-2 block">Start Date</label>
                        <input
                            type="date"
                            className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-lg ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="text-sm text-muted-foreground mb-2 block">End Date</label>
                        <input
                            type="date"
                            className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-lg ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                </div>

                <Button onClick={calculateDifference} className="w-full bg-orange-500 hover:bg-orange-600 h-12 text-lg">
                    Calculate Difference
                </Button>

                {result && !result.error && (
                    <div className="mt-8 grid gap-4">
                        <div className="p-6 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-600/20 border border-orange-500/30">
                            <div className="text-center">
                                <div className="text-4xl font-bold text-white mb-2">
                                    {result.years} Years, {result.months} Months, {result.days} Days
                                </div>
                                <div className="text-lg text-muted-foreground">Time Difference</div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                                <div className="text-2xl font-bold text-orange-500">{result.totalDays.toLocaleString()}</div>
                                <div className="text-sm text-muted-foreground">Total Days</div>
                            </div>
                            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                                <div className="text-2xl font-bold text-orange-500">{result.totalWeeks.toLocaleString()}</div>
                                <div className="text-sm text-muted-foreground">Total Weeks</div>
                            </div>
                            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                                <div className="text-2xl font-bold text-orange-500">{result.totalMonths.toLocaleString()}</div>
                                <div className="text-sm text-muted-foreground">Total Months</div>
                            </div>
                            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                                <div className="text-2xl font-bold text-orange-500">{result.totalHours.toLocaleString()}</div>
                                <div className="text-sm text-muted-foreground">Total Hours</div>
                            </div>
                            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                                <div className="text-2xl font-bold text-orange-500">{result.totalMinutes.toLocaleString()}</div>
                                <div className="text-sm text-muted-foreground">Total Minutes</div>
                            </div>
                        </div>
                    </div>
                )}

                {result && result.error && (
                    <div className="mt-6 p-4 rounded-xl bg-red-500/20 border border-red-500/30 text-center text-red-400">
                        {result.error}
                    </div>
                )}
            </div>
        </ToolWrapper>
    );
}
