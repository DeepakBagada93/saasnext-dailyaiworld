"use client";

import { useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";
import {
    Bold,
    Italic,
    Heading1,
    Heading2,
    Heading3,
    List,
    ListOrdered,
    Quote,
    Code,
    Link as LinkIcon,
    Image as ImageIcon,
    Eye,
    Edit2,
} from "lucide-react";

interface MarkdownEditorProps {
    value: string;
    onChange: (value: string) => void;
    className?: string;
}

export function MarkdownEditor({ value, onChange, className }: MarkdownEditorProps) {
    const [isPreview, setIsPreview] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const insertFormatting = (prefix: string, suffix: string = "") => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = textarea.value;
        const before = text.substring(0, start);
        const selection = text.substring(start, end);
        const after = text.substring(end);

        const newText = `${before}${prefix}${selection}${suffix}${after}`;
        onChange(newText);

        // Restore focus and selection
        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(
                start + prefix.length,
                end + prefix.length
            );
        }, 0);
    };

    const tools = [
        { icon: Bold, label: "Bold", action: () => insertFormatting("**", "**") },
        { icon: Italic, label: "Italic", action: () => insertFormatting("_", "_") },
        { icon: Heading1, label: "H1", action: () => insertFormatting("# ", "") },
        { icon: Heading2, label: "H2", action: () => insertFormatting("## ", "") },
        { icon: Heading3, label: "H3", action: () => insertFormatting("### ", "") },
        { icon: List, label: "Bullet List", action: () => insertFormatting("- ", "") },
        { icon: ListOrdered, label: "Numbered List", action: () => insertFormatting("1. ", "") },
        { icon: Quote, label: "Quote", action: () => insertFormatting("> ", "") },
        { icon: Code, label: "Code Block", action: () => insertFormatting("```\n", "\n```") },
        { icon: LinkIcon, label: "Link", action: () => insertFormatting("[", "](url)") },
        { icon: ImageIcon, label: "Image", action: () => insertFormatting("![alt text](", ")") },
    ];

    return (
        <div className={cn("border border-input rounded-md overflow-hidden bg-background", className)}>
            <div className="flex items-center justify-between p-2 border-b border-border bg-muted/30">
                <div className="flex items-center gap-1 flex-wrap">
                    {tools.map((tool, index) => (
                        <button
                            key={index}
                            type="button"
                            onClick={tool.action}
                            className="p-2 hover:bg-muted rounded-md text-muted-foreground hover:text-foreground transition-colors"
                            title={tool.label}
                            disabled={isPreview}
                        >
                            <tool.icon className="w-4 h-4" />
                        </button>
                    ))}
                </div>
                <div className="flex items-center gap-1 border-l border-border pl-2 ml-2">
                    <button
                        type="button"
                        onClick={() => setIsPreview(false)}
                        className={cn(
                            "p-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2",
                            !isPreview
                                ? "bg-primary text-primary-foreground"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                    >
                        <Edit2 className="w-4 h-4" />
                        Write
                    </button>
                    <button
                        type="button"
                        onClick={() => setIsPreview(true)}
                        className={cn(
                            "p-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2",
                            isPreview
                                ? "bg-primary text-primary-foreground"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                    >
                        <Eye className="w-4 h-4" />
                        Preview
                    </button>
                </div>
            </div>

            <div className="relative min-h-[500px]">
                {!isPreview ? (
                    <textarea
                        ref={textareaRef}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        className="w-full h-full min-h-[500px] p-4 bg-transparent border-none resize-y focus:outline-none font-mono text-sm"
                        placeholder="Write your post content in Markdown..."
                    />
                ) : (
                    <div className="prose prose-lg dark:prose-invert max-w-none p-6 min-h-[500px] overflow-y-auto">
                        {value ? (
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {value}
                            </ReactMarkdown>
                        ) : (
                            <p className="text-muted-foreground italic">Nothing to preview</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
