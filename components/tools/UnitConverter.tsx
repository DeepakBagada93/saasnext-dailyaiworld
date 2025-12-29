"use client";

import { useState } from "react";
import { ToolWrapper } from "./ToolWrapper";

type ConversionCategory = "length" | "weight" | "temperature" | "speed";

const conversions = {
    length: {
        meter: 1,
        kilometer: 0.001,
        centimeter: 100,
        millimeter: 1000,
        mile: 0.000621371,
        yard: 1.09361,
        foot: 3.28084,
        inch: 39.3701,
    },
    weight: {
        kilogram: 1,
        gram: 1000,
        milligram: 1000000,
        ton: 0.001,
        pound: 2.20462,
        ounce: 35.274,
    },
    temperature: {}, // Temperature requires special handling
    speed: {
        "m/s": 1,
        "km/h": 3.6,
        "mph": 2.23694,
        "knot": 1.94384,
    },
};

export function UnitConverter() {
    const [category, setCategory] = useState<ConversionCategory>("length");
    const [fromUnit, setFromUnit] = useState("");
    const [toUnit, setToUnit] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [result, setResult] = useState("");

    const convert = () => {
        const value = parseFloat(inputValue);
        if (isNaN(value)) return;

        if (category === "temperature") {
            const converted = convertTemperature(value, fromUnit, toUnit);
            setResult(converted.toFixed(2));
        } else {
            const categoryConversions = conversions[category];
            const fromFactor = categoryConversions[fromUnit as keyof typeof categoryConversions] || 1;
            const toFactor = categoryConversions[toUnit as keyof typeof categoryConversions] || 1;
            const converted = (value / fromFactor) * toFactor;
            setResult(converted.toFixed(6));
        }
    };

    const convertTemperature = (value: number, from: string, to: string) => {
        // Convert to Celsius first
        let celsius = value;
        if (from === "fahrenheit") celsius = (value - 32) * 5 / 9;
        if (from === "kelvin") celsius = value - 273.15;

        // Convert from Celsius to target
        if (to === "celsius") return celsius;
        if (to === "fahrenheit") return celsius * 9 / 5 + 32;
        if (to === "kelvin") return celsius + 273.15;
        return celsius;
    };

    const units = {
        length: ["meter", "kilometer", "centimeter", "millimeter", "mile", "yard", "foot", "inch"],
        weight: ["kilogram", "gram", "milligram", "ton", "pound", "ounce"],
        temperature: ["celsius", "fahrenheit", "kelvin"],
        speed: ["m/s", "km/h", "mph", "knot"],
    };

    return (
        <ToolWrapper
            title="Unit Converter"
            description="Convert between different units of length, weight, temperature, and speed."
        >
            <div className="max-w-2xl mx-auto">
                <div className="grid grid-cols-4 gap-2 mb-6">
                    {(["length", "weight", "temperature", "speed"] as ConversionCategory[]).map((cat) => (
                        <button
                            key={cat}
                            onClick={() => {
                                setCategory(cat);
                                setFromUnit("");
                                setToUnit("");
                                setResult("");
                            }}
                            className={`px-4 py-3 rounded-lg capitalize font-medium transition-all ${category === cat
                                    ? "bg-orange-500 text-white"
                                    : "bg-white/5 text-muted-foreground hover:bg-white/10"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="text-sm text-muted-foreground mb-2 block">From</label>
                        <select
                            className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-lg ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mb-3"
                            value={fromUnit}
                            onChange={(e) => setFromUnit(e.target.value)}
                        >
                            <option value="">Select unit</option>
                            {units[category].map((unit) => (
                                <option key={unit} value={unit}>
                                    {unit}
                                </option>
                            ))}
                        </select>
                        <input
                            type="number"
                            className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-lg ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Enter value"
                            value={inputValue}
                            onChange={(e) => {
                                setInputValue(e.target.value);
                                setResult("");
                            }}
                        />
                    </div>

                    <div>
                        <label className="text-sm text-muted-foreground mb-2 block">To</label>
                        <select
                            className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-lg ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mb-3"
                            value={toUnit}
                            onChange={(e) => setToUnit(e.target.value)}
                        >
                            <option value="">Select unit</option>
                            {units[category].map((unit) => (
                                <option key={unit} value={unit}>
                                    {unit}
                                </option>
                            ))}
                        </select>
                        <div className="flex h-12 w-full rounded-md border border-input bg-black/30 px-3 py-2 text-lg items-center">
                            <span className="text-white font-mono">{result || "0"}</span>
                        </div>
                    </div>
                </div>

                <button
                    onClick={convert}
                    disabled={!fromUnit || !toUnit || !inputValue}
                    className="w-full mt-6 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed h-12 text-lg rounded-md font-medium text-white transition-colors"
                >
                    Convert
                </button>
            </div>
        </ToolWrapper>
    );
}
