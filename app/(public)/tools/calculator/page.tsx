"use client";

import { useState } from "react";
import { Delete, Equal } from "lucide-react";

export default function Calculator() {
    const [display, setDisplay] = useState("0");
    const [equation, setEquation] = useState("");
    const [isNewNumber, setIsNewNumber] = useState(true);

    const handleNumber = (num: string) => {
        if (isNewNumber) {
            setDisplay(num);
            setIsNewNumber(false);
        } else {
            setDisplay(display === "0" ? num : display + num);
        }
    };

    const handleOperator = (op: string) => {
        setEquation(display + " " + op + " ");
        setIsNewNumber(true);
    };

    const handleEqual = () => {
        const fullEquation = equation + display;
        try {
            // eslint-disable-next-line no-eval
            const result = eval(fullEquation.replace(/×/g, "*").replace(/÷/g, "/"));
            setDisplay(String(result));
            setEquation("");
            setIsNewNumber(true);
        } catch (error) {
            setDisplay("Error");
            setEquation("");
            setIsNewNumber(true);
        }
    };

    const handleClear = () => {
        setDisplay("0");
        setEquation("");
        setIsNewNumber(true);
    };

    const handleDelete = () => {
        if (display.length > 1) {
            setDisplay(display.slice(0, -1));
        } else {
            setDisplay("0");
            setIsNewNumber(true);
        }
    };

    const buttons = [
        { label: "C", onClick: handleClear, className: "bg-destructive text-destructive-foreground hover:bg-destructive/90" },
        { label: "÷", onClick: () => handleOperator("/"), className: "bg-secondary text-secondary-foreground hover:bg-secondary/80" },
        { label: "×", onClick: () => handleOperator("*"), className: "bg-secondary text-secondary-foreground hover:bg-secondary/80" },
        { label: <Delete size={20} />, onClick: handleDelete, className: "bg-secondary text-secondary-foreground hover:bg-secondary/80" },
        { label: "7", onClick: () => handleNumber("7"), className: "bg-card hover:bg-accent" },
        { label: "8", onClick: () => handleNumber("8"), className: "bg-card hover:bg-accent" },
        { label: "9", onClick: () => handleNumber("9"), className: "bg-card hover:bg-accent" },
        { label: "-", onClick: () => handleOperator("-"), className: "bg-secondary text-secondary-foreground hover:bg-secondary/80" },
        { label: "4", onClick: () => handleNumber("4"), className: "bg-card hover:bg-accent" },
        { label: "5", onClick: () => handleNumber("5"), className: "bg-card hover:bg-accent" },
        { label: "6", onClick: () => handleNumber("6"), className: "bg-card hover:bg-accent" },
        { label: "+", onClick: () => handleOperator("+"), className: "bg-secondary text-secondary-foreground hover:bg-secondary/80" },
        { label: "1", onClick: () => handleNumber("1"), className: "bg-card hover:bg-accent" },
        { label: "2", onClick: () => handleNumber("2"), className: "bg-card hover:bg-accent" },
        { label: "3", onClick: () => handleNumber("3"), className: "bg-card hover:bg-accent" },
        { label: "=", onClick: handleEqual, className: "row-span-2 bg-primary text-primary-foreground hover:bg-primary/90" },
        { label: "0", onClick: () => handleNumber("0"), className: "col-span-2 bg-card hover:bg-accent" },
        { label: ".", onClick: () => handleNumber("."), className: "bg-card hover:bg-accent" },
    ];

    return (
        <div className="container mx-auto px-4 py-12 max-w-md">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold tracking-tight mb-2">Calculator</h1>
                <p className="text-muted-foreground">Simple and efficient.</p>
            </div>

            <div className="bg-background border border-border rounded-2xl shadow-lg overflow-hidden">
                {/* Display */}
                <div className="bg-muted/30 p-6 text-right space-y-2">
                    <div className="text-sm text-muted-foreground h-6">{equation}</div>
                    <div className="text-4xl font-bold tracking-tight truncate">{display}</div>
                </div>

                {/* Keypad */}
                <div className="p-4 grid grid-cols-4 gap-3">
                    {buttons.map((btn, i) => (
                        <button
                            key={i}
                            onClick={btn.onClick}
                            className={`h-16 rounded-xl text-xl font-medium transition-colors flex items-center justify-center ${btn.className} ${btn.label === "=" ? "h-[8.5rem]" : ""
                                }`}
                        >
                            {btn.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
