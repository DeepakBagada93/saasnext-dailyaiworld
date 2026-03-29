"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Copy, Trash2, Check, FileJson, Sparkles, MessageSquare, Info, Target, Layout } from "lucide-react";
import { cn } from "@/lib/utils";

export const JsonPromptGenerator = () => {
    const [fields, setFields] = useState({
        role: "",
        context: "",
        task: "",
        constraints: "",
        outputFormat: "",
        examples: ""
    });
    const [jsonOutput, setJsonOutput] = useState("");
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const promptObj = {
            prompt: {
                system: fields.role || undefined,
                context: fields.context || undefined,
                task: fields.task || undefined,
                constraints: fields.constraints ? fields.constraints.split("\n").filter(c => c.trim()) : undefined,
                output_format: fields.outputFormat || undefined,
                examples: fields.examples ? fields.examples.split("\n---\n").filter(e => e.trim()) : undefined
            }
        };
        
        // Remove undefined keys
        const cleanObj = JSON.parse(JSON.stringify(promptObj));
        setJsonOutput(JSON.stringify(cleanObj, null, 4));
    }, [fields]);

    const handleCopy = () => {
        navigator.clipboard.writeText(jsonOutput);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleClear = () => {
        setFields({
            role: "",
            context: "",
            task: "",
            constraints: "",
            outputFormat: "",
            examples: ""
        });
    };

    const handleFieldChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        setFields(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8 p-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Inputs Section */}
                <div className="space-y-6">
                    <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-5 h-5 text-primary" />
                        <h2 className="text-xl font-bold">Prompt Designer</h2>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium flex items-center gap-2">
                                <Target className="w-4 h-4 text-muted-foreground" />
                                System Role
                            </label>
                            <input
                                name="role"
                                value={fields.role}
                                onChange={handleFieldChange}
                                placeholder="e.g., You are an expert SEO specialist..."
                                className="w-full px-3 py-2 bg-card border border-border rounded-md focus:ring-2 focus:ring-primary outline-none text-sm"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium flex items-center gap-2">
                                <Info className="w-4 h-4 text-muted-foreground" />
                                Context / Background
                            </label>
                            <textarea
                                name="context"
                                value={fields.context}
                                onChange={handleFieldChange}
                                placeholder="Provide background information or necessary details..."
                                className="w-full h-24 px-3 py-2 bg-card border border-border rounded-md focus:ring-2 focus:ring-primary outline-none text-sm resize-none"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium flex items-center gap-2">
                                <MessageSquare className="w-4 h-4 text-muted-foreground" />
                                Core Task
                            </label>
                            <textarea
                                name="task"
                                value={fields.task}
                                onChange={handleFieldChange}
                                placeholder="What exactly should the AI do?"
                                className="w-full h-24 px-3 py-2 bg-card border border-border rounded-md focus:ring-2 focus:ring-primary outline-none text-sm resize-none"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium flex items-center gap-2">
                                <Layout className="w-4 h-4 text-muted-foreground" />
                                Output Format
                            </label>
                            <input
                                name="outputFormat"
                                value={fields.outputFormat}
                                onChange={handleFieldChange}
                                placeholder="e.g., Markdown table, JSON, Bullet points..."
                                className="w-full px-3 py-2 bg-card border border-border rounded-md focus:ring-2 focus:ring-primary outline-none text-sm"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium flex items-center gap-2">
                                Constraints (one per line)
                            </label>
                            <textarea
                                name="constraints"
                                value={fields.constraints}
                                onChange={handleFieldChange}
                                placeholder="Do not use jargon&#10;Keep it under 200 words..."
                                className="w-full h-24 px-3 py-2 bg-card border border-border rounded-md focus:ring-2 focus:ring-primary outline-none text-sm resize-none"
                            />
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <Button onClick={handleClear} variant="outline" className="flex-1 gap-2 text-destructive hover:text-destructive">
                            <Trash2 className="w-4 h-4" />
                            Clear All
                        </Button>
                    </div>
                </div>

                {/* Output Section */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <FileJson className="w-5 h-5 text-primary" />
                            <h2 className="text-xl font-bold">JSON Prompt</h2>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleCopy}
                            className={cn("gap-2", copied && "text-green-500")}
                        >
                            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            {copied ? "Copied" : "Copy JSON"}
                        </Button>
                    </div>

                    <Card className="h-[600px] bg-muted/20 border-2 overflow-hidden">
                        <pre className="p-6 h-full overflow-auto font-mono text-sm leading-relaxed text-primary/80">
                            {jsonOutput}
                        </pre>
                    </Card>
                    
                    <div className="p-4 bg-primary/5 border border-primary/10 rounded-lg">
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            <span className="font-bold text-primary">Pro Tip:</span> Using JSON-formatted prompts helps Large Language Models (LLMs) parse your instructions more reliably, especially for automated workflows and API integrations.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
