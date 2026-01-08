"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Copy, RefreshCw, Check } from "lucide-react";

export const PasswordGenerator = () => {
    const [password, setPassword] = useState("");
    const [length, setLength] = useState(16);
    const [includeUppercase, setIncludeUppercase] = useState(true);
    const [includeLowercase, setIncludeLowercase] = useState(true);
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeSymbols, setIncludeSymbols] = useState(true);
    const [copied, setCopied] = useState(false);

    const generatePassword = () => {
        let charset = "";
        if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
        if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (includeNumbers) charset += "0123456789";
        if (includeSymbols) charset += "!@#$%^&*()_+~`|}{[]:;?><,./-=";

        if (charset === "") {
            setPassword("");
            return;
        }

        let newPassword = "";
        for (let i = 0; i < length; i++) {
            newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        setPassword(newPassword);
        setCopied(false);
    };

    useEffect(() => {
        generatePassword();
    }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(password);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const calculateStrength = () => {
        let strength = 0;
        if (length >= 8) strength++;
        if (length >= 12) strength++;
        if (includeUppercase) strength++;
        if (includeNumbers) strength++;
        if (includeSymbols) strength++;
        return strength;
    };

    const getStrengthColor = () => {
        const strength = calculateStrength();
        if (strength <= 2) return "bg-red-500";
        if (strength <= 3) return "bg-yellow-500";
        return "bg-green-500";
    };

    const getStrengthText = () => {
        const strength = calculateStrength();
        if (strength <= 2) return "Weak";
        if (strength <= 3) return "Medium";
        return "Strong";
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <Card className="p-8 space-y-6">
                <div className="relative">
                    <div className="w-full p-4 text-2xl font-mono bg-muted rounded-lg break-all text-center min-h-[4rem] flex items-center justify-center">
                        {password || "Select options to generate"}
                    </div>
                    <Button
                        size="icon"
                        variant="ghost"
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                        onClick={copyToClipboard}
                    >
                        {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                    </Button>
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span>Strength: {getStrengthText()}</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div
                            className={`h-full transition-all duration-300 ${getStrengthColor()}`}
                            style={{ width: `${(calculateStrength() / 5) * 100}%` }}
                        />
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <div className="flex justify-between mb-2">
                            <label className="font-medium">Password Length</label>
                            <span className="font-mono bg-primary/10 px-2 py-0.5 rounded text-primary">{length}</span>
                        </div>
                        <input
                            type="range"
                            min="6"
                            max="50"
                            value={length}
                            onChange={(e) => setLength(Number(e.target.value))}
                            className="w-full accent-primary"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                            <input
                                type="checkbox"
                                checked={includeUppercase}
                                onChange={(e) => setIncludeUppercase(e.target.checked)}
                                className="w-5 h-5 accent-primary rounded"
                            />
                            <span>Uppercase (A-Z)</span>
                        </label>
                        <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                            <input
                                type="checkbox"
                                checked={includeLowercase}
                                onChange={(e) => setIncludeLowercase(e.target.checked)}
                                className="w-5 h-5 accent-primary rounded"
                            />
                            <span>Lowercase (a-z)</span>
                        </label>
                        <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                            <input
                                type="checkbox"
                                checked={includeNumbers}
                                onChange={(e) => setIncludeNumbers(e.target.checked)}
                                className="w-5 h-5 accent-primary rounded"
                            />
                            <span>Numbers (0-9)</span>
                        </label>
                        <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                            <input
                                type="checkbox"
                                checked={includeSymbols}
                                onChange={(e) => setIncludeSymbols(e.target.checked)}
                                className="w-5 h-5 accent-primary rounded"
                            />
                            <span>Symbols (!@#$)</span>
                        </label>
                    </div>

                    <Button onClick={generatePassword} className="w-full" size="lg">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Generate New Password
                    </Button>
                </div>
            </Card>
        </div>
    );
};
