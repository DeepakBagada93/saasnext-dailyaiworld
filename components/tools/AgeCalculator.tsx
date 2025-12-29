"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ToolWrapper } from "./ToolWrapper";

export function AgeCalculator() {
    const [birthDate, setBirthDate] = useState("");
    const [result, setResult] = useState<any>(null);

    const calculateAge = () => {
        if (!birthDate) return;

        const birth = new Date(birthDate);
        const today = new Date();

        let years = today.getFullYear() - birth.getFullYear();
        let months = today.getMonth() - birth.getMonth();
        let days = today.getDate() - birth.getDate();

        if (days < 0) {
            months--;
            const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
            days += prevMonth.getDate();
        }

        if (months < 0) {
            years--;
            months += 12;
        }

        const totalDays = Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
        const totalWeeks = Math.floor(totalDays / 7);
        const totalMonths = years * 12 + months;

        setResult({
            years,
            months,
            days,
            totalDays,
            totalWeeks,
            totalMonths,
            nextBirthday: getNextBirthday(birth)
        });
    };

    const getNextBirthday = (birth: Date) => {
        const today = new Date();
        const nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());

        if (nextBirthday < today) {
            nextBirthday.setFullYear(today.getFullYear() + 1);
        }

        const daysUntil = Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        return daysUntil;
    };

    return (
        <ToolWrapper
            title="Age Calculator"
            description="Calculate your exact age in years, months, and days."
        >
            <div className="max-w-2xl mx-auto">
                <div className="mb-6">
                    <label className="text-sm text-muted-foreground mb-2 block">Date of Birth</label>
                    <input
                        type="date"
                        className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-lg ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        max={new Date().toISOString().split('T')[0]}
                    />
                </div>

                <Button onClick={calculateAge} className="w-full bg-orange-500 hover:bg-orange-600 h-12 text-lg">
                    Calculate Age
                </Button>

                {result && (
                    <div className="mt-8 grid gap-4">
                        <div className="p-6 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-600/20 border border-orange-500/30">
                            <div className="text-center">
                                <div className="text-5xl font-bold text-white mb-2">
                                    {result.years}
                                </div>
                                <div className="text-lg text-muted-foreground">Years Old</div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                <div className="text-2xl font-bold text-orange-500">{result.months}</div>
                                <div className="text-sm text-muted-foreground">Months</div>
                            </div>
                            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                <div className="text-2xl font-bold text-orange-500">{result.days}</div>
                                <div className="text-sm text-muted-foreground">Days</div>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                                <div className="text-xl font-bold text-white">{result.totalMonths}</div>
                                <div className="text-xs text-muted-foreground">Total Months</div>
                            </div>
                            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                                <div className="text-xl font-bold text-white">{result.totalWeeks}</div>
                                <div className="text-xs text-muted-foreground">Total Weeks</div>
                            </div>
                            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                                <div className="text-xl font-bold text-white">{result.totalDays}</div>
                                <div className="text-xs text-muted-foreground">Total Days</div>
                            </div>
                        </div>

                        <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                            <div className="text-muted-foreground text-sm mb-1">Next Birthday In</div>
                            <div className="text-2xl font-bold text-orange-500">{result.nextBirthday} days</div>
                        </div>
                    </div>
                )}
            </div>
        </ToolWrapper>
    );
}
