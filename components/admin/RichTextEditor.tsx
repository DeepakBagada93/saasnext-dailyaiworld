"use client";

import { useEffect, useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { marked } from "marked";
import TurndownService from "turndown";
import "react-quill-new/dist/quill.snow.css";
import { cn } from "@/lib/utils";

// Dynamic import for ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill-new"), {
    ssr: false,
    loading: () => <div className="h-64 w-full bg-muted/20 animate-pulse rounded-md" />,
});

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    className?: string;
}

export function RichTextEditor({ value, onChange, className }: RichTextEditorProps) {
    const [editorHtml, setEditorHtml] = useState("");
    const [isMounted, setIsMounted] = useState(false);

    // Initialize Turndown service for HTML -> Markdown conversion
    const turndownService = useMemo(() => {
        const service = new TurndownService({
            headingStyle: "atx",
            codeBlockStyle: "fenced",
            emDelimiter: "_",
        });
        return service;
    }, []);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Convert initial Markdown value to HTML for the editor
    useEffect(() => {
        if (value && !editorHtml) {
            const html = marked.parse(value, { async: false }) as string;
            setEditorHtml(html);
        }
    }, [value, editorHtml]);

    const handleChange = (html: string) => {
        setEditorHtml(html);
        // Convert HTML back to Markdown for the parent component
        const markdown = turndownService.turndown(html);
        onChange(markdown);
    };

    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ["link", "image", "video"],
            ["clean"],
        ],
    };

    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "script",
        "indent",
        "color",
        "background",
        "align",
        "link",
        "image",
        "video",
    ];

    if (!isMounted) {
        return null;
    }

    return (
        <div className={cn("rich-text-editor", className)}>
            <style jsx global>{`
                .ql-container {
                    font-family: inherit;
                    font-size: 1rem;
                    border-bottom-left-radius: 0.5rem;
                    border-bottom-right-radius: 0.5rem;
                    background: hsl(var(--background));
                    color: hsl(var(--foreground));
                }
                .ql-toolbar {
                    border-top-left-radius: 0.5rem;
                    border-top-right-radius: 0.5rem;
                    background: hsl(var(--muted));
                    border-color: hsl(var(--border)) !important;
                }
                .ql-container.ql-snow {
                    border-color: hsl(var(--border)) !important;
                }
                .ql-picker-label {
                    color: hsl(var(--foreground)) !important;
                }
                .ql-stroke {
                    stroke: hsl(var(--foreground)) !important;
                }
                .ql-fill {
                    fill: hsl(var(--foreground)) !important;
                }
                .ql-editor {
                    min-height: 300px;
                }
            `}</style>
            <ReactQuill
                theme="snow"
                value={editorHtml}
                onChange={handleChange}
                modules={modules}
                formats={formats}
                className="bg-background text-foreground rounded-md"
            />
        </div>
    );
}
