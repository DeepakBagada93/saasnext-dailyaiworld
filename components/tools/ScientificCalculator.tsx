"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ToolWrapper } from "./ToolWrapper";
import { Delete, Divide, Equal, Minus, Plus, RotateCcw, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function ScientificCalculator() {
    const [display, setDisplay] = useState("0");
    const [memory, setMemory] = useState<number | null>(null);
    const [isNewCalculation, setIsNewCalculation] = useState(false);

    const handleNumber = (num: string) => {
        if (display === "0" || isNewCalculation) {
            setDisplay(num);
            setIsNewCalculation(false);
        } else {
            setDisplay(display + num);
        }
    };

    const handleOperator = (op: string) => {
        setDisplay(display + op);
        setIsNewCalculation(false);
    };

    const calculate = () => {
        try {
            // Replace visual operators with JS operators
            const expression = display
                .replace(/×/g, "*")
                .replace(/÷/g, "/")
                .replace(/π/g, "Math.PI")
                .replace(/e/g, "Math.E")
                .replace(/sin\(/g, "Math.sin(")
                .replace(/cos\(/g, "Math.cos(")
                .replace(/tan\(/g, "Math.tan(")
                .replace(/log\(/g, "Math.log10(")
                .replace(/ln\(/g, "Math.log(")
                .replace(/sqrt\(/g, "Math.sqrt(")
                .replace(/\^/g, "**");

            // eslint-disable-next-line no-eval
            const result = eval(expression);
            setDisplay(Number(result).toLocaleString("en-US", { maximumFractionDigits: 8 }));
            setIsNewCalculation(true);
        } catch (error) {
            setDisplay("Error");
            setIsNewCalculation(true);
        }
    };

    const clear = () => {
        setDisplay("0");
        setIsNewCalculation(false);
    };

    const backspace = () => {
        if (display.length > 1) {
            setDisplay(display.slice(0, -1));
        } else {
            setDisplay("0");
        }
    };

    const buttons = [
        { label: "sin", func: () => handleOperator("sin(") },
        { label: "cos", func: () => handleOperator("cos(") },
        { label: "tan", func: () => handleOperator("tan(") },
        { label: "deg", func: () => { } }, // Placeholder for mode switch
        { label: "log", func: () => handleOperator("log(") },
        { label: "ln", func: () => handleOperator("ln(") },
        { label: "(", func: () => handleOperator("(") },
        { label: ")", func: () => handleOperator(")") },
        { label: "AC", func: clear, variant: "destructive" },
        { label: <Delete size={18} />, func: backspace, variant: "secondary" },
        { label: "7", func: () => handleNumber("7") },
        { label: "8", func: () => handleNumber("8") },
        { label: "9", func: () => handleNumber("9") },
        { label: <Divide size={18} />, func: () => handleOperator("÷"), variant: "secondary" },
        { label: "sqrt", func: () => handleOperator("sqrt(") },
        { label: "4", func: () => handleNumber("4") },
        { label: "5", func: () => handleNumber("5") },
        { label: "6", func: () => handleNumber("6") },
        { label: <X size={18} />, func: () => handleOperator("×"), variant: "secondary" },
        { label: "^", func: () => handleOperator("^") },
        { label: "1", func: () => handleNumber("1") },
        { label: "2", func: () => handleNumber("2") },
        { label: "3", func: () => handleNumber("3") },
        { label: <Minus size={18} />, func: () => handleOperator("-"), variant: "secondary" },
        { label: "π", func: () => handleOperator("π") },
        { label: "0", func: () => handleNumber("0") },
        { label: ".", func: () => handleOperator(".") },
        { label: "e", func: () => handleOperator("e") },
        { label: <Plus size={18} />, func: () => handleOperator("+"), variant: "secondary" },
        { label: <Equal size={18} />, func: calculate, variant: "default", className: "bg-orange-500 hover:bg-orange-600" },
    ];

    return (
        <ToolWrapper
            title="Scientific Calculator"
            description="Perform complex mathematical calculations with ease."
        >
            <div className="max-w-md mx-auto">
                <div className="bg-black/50 rounded-xl p-4 mb-4 text-right h-20 flex items-center justify-end overflow-x-auto overflow-y-hidden">
                    <span className="text-3xl font-mono text-white tracking-wider whitespace-nowrap">
                        {display}
                    </span>
                </div>

                <div className="grid grid-cols-5 gap-2">
                    {buttons.map((btn, i) => (
                        <Button
                            key={i}
                            variant={(btn.variant as any) || "outline"}
                            className={cn(
                                "h-12 text-lg font-medium border-white/5 hover:bg-white/10",
                                btn.className
                            )}
                            onClick={btn.func}
                        >
                            {btn.label}
                        </Button>
                    ))}
                </div>
            </div>
        </ToolWrapper>
    );
}
