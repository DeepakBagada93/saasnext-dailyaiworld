"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Copy, AlertCircle, CheckCircle2, Trash2, Send, FileJson } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const POST_TEMPLATE = [
    {
        "title": "The Rise of Agentic Enterprises: Managing a 1:10 Human-to-AI Ratio",
        "slug": "rise-of-agentic-enterprises-2026",
        "category": "AI Business",
        "excerpt": "In 2026, the most successful startups aren't hiring more people—they're scaling their 'digital headcount'. Here is how to manage a workforce of autonomous agents.",
        "content": "# The Rise of Agentic Enterprises\n\nBy mid-2026, the corporate landscape has shifted from using AI as a 'tool' to employing AI as an 'agent'. Successful CEOs now manage orchestration layers rather than just task lists.\n\n## Key Strategies for 2026:\n- **Agent Orchestration:** Moving from prompts to goals.\n- **Digital Twin Workforces:** Scaling operations without increasing overhead.\n- **Real-time Pivot Capabilities:** Using AI to analyze market shifts in seconds.",
        "is_published": true,
        "scheduled_publish_date": null
    },
    {
        "title": "Generative UI: The End of Static Interface Design",
        "slug": "generative-ui-design-trends-2026",
        "category": "AI Design",
        "excerpt": "Static Figma files are becoming artifacts of the past. Discover how AI is now generating unique user interfaces on-the-fly based on individual user intent.",
        "content": "# Generative UI: The End of Static Interfaces\n\nWhy design one interface when AI can generate a billion? Generative UI (GenUI) adapts to the user's accessibility needs, aesthetic preferences, and current task context.\n\n## What's Changing:\n- **Intent-Based Layouts:** The UI reshapes itself to help the user complete their specific goal.\n- **Adaptive Accessibility:** Fonts, colors, and spacing adjust automatically for the viewer.\n- **AI-Native Components:** Design systems that learn from user interaction data.",
        "is_published": true,
        "scheduled_publish_date": null
    },
    {
        "title": "Zero-Click Marketing: How to Win When AI Does the Searching",
        "slug": "zero-click-marketing-strategy-2026",
        "category": "AI Marketing",
        "excerpt": "Traditional SEO is dead. In a world where Gemini and Claude answer users directly, your brand must learn to be the 'Source of Truth' for AI models.",
        "content": "# Zero-Click Marketing in 2026\n\nWith 70% of searches ending in an AI-generated summary, driving traffic to a website is no longer the primary goal. Brands now compete for **Citations**.\n\n## The New Playbook:\n- **Answer Engine Optimization (AEO):** Structuring data for machine consumption.\n- **Brand Authority Nodes:** Building entity relationships that AI agents trust.\n- **Conversational Conversion:** Selling products through LLM interfaces.",
        "is_published": true,
        "scheduled_publish_date": null
    },
    {
        "title": "Beyond LLMs: The Shift Toward Physical World Intelligence",
        "slug": "future-of-ai-physical-intelligence-2026",
        "category": "Future of AI",
        "excerpt": "Large Language Models were just the beginning. The next frontier is LMMs (Large Multimodal Models) that understand physics, spatial logic, and real-world robotics.",
        "content": "# The Future: Physical World Intelligence\n\nWe are moving beyond chatbots. The AI of late 2026 is embodied—whether in a humanoid robot or a smart city infrastructure. It no longer just 'knows' things; it 'does' things in the physical world.\n\n## Predictions for 2027:\n- **Spatial Reasoning:** AI that understands depth and physics as well as humans.\n- **Autonomous Infrastructure:** Energy grids and traffic systems managed by AGI-lite.\n- **Personal Robot Assistants:** The first mass-market consumer home robots arrive.",
        "is_published": true,
        "scheduled_publish_date": null
    }
];

const VALID_CATEGORIES = ["AI Business", "AI Design", "AI Marketing", "Future of AI"];

export default function BulkPostPage() {
    const [jsonInput, setJsonInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [parsedPosts, setParsedPosts] = useState<any[]>([]);
    const router = useRouter();
    const supabase = createClient();

    const handleValidate = () => {
        setError(null);
        setSuccess(null);
        try {
            const data = JSON.parse(jsonInput);
            if (!Array.isArray(data)) {
                throw new Error("Input must be a JSON array of posts.");
            }

            // Basic validation
            data.forEach((post, index) => {
                if (!post.title) throw new Error(`Post at index ${index} is missing "title"`);
                if (!post.slug) throw new Error(`Post at index ${index} is missing "slug"`);
                if (!post.category) throw new Error(`Post at index ${index} is missing "category"`);
                if (!post.content) throw new Error(`Post at index ${index} is missing "content"`);
                if (!post.excerpt) throw new Error(`Post at index ${index} is missing "excerpt"`);
                
                if (!VALID_CATEGORIES.includes(post.category)) {
                    throw new Error(`Post at index ${index} has invalid category: ${post.category}. Valid are: ${VALID_CATEGORIES.join(", ")}`);
                }
            });

            setParsedPosts(data);
            setSuccess(`Successfully validated ${data.length} posts!`);
        } catch (e: any) {
            setError(e.message || "Invalid JSON format");
            setParsedPosts([]);
        }
    };

    const handleSubmit = async () => {
        if (parsedPosts.length === 0) return;
        
        setLoading(true);
        setError(null);
        
        try {
            const { error: insertError } = await supabase
                .from("bulk_posts")
                .insert(parsedPosts);

            if (insertError) throw insertError;

            setSuccess(`Successfully posted ${parsedPosts.length} blogs to Bulk Table! Redirecting...`);
            setJsonInput("");
            setParsedPosts([]);
            
            setTimeout(() => {
                router.push("/admin/dashboard");
            }, 2000);
        } catch (e: any) {
            setError(e.message || "Failed to submit posts");
        } finally {
            setLoading(false);
        }
    };

    const loadTemplate = () => {
        setJsonInput(JSON.stringify(POST_TEMPLATE, null, 4));
        setError(null);
        setSuccess(null);
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Bulk Blog Posting</h1>
                    <p className="text-muted-foreground">Add curated trending blogs to the <span className="text-primary font-mono">bulk_posts</span> table.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={loadTemplate} className="gap-2">
                        <FileJson className="w-4 h-4" />
                        Load Trending Template
                    </Button>
                    <Button variant="outline" onClick={() => { setJsonInput(""); setParsedPosts([]); setError(null); setSuccess(null); }} className="gap-2 text-destructive hover:text-destructive">
                        <Trash2 className="w-4 h-4" />
                        Clear
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Input Section */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Copy className="w-5 h-5 text-primary" />
                        <h2 className="text-xl font-bold">JSON Editor</h2>
                    </div>
                    <textarea
                        value={jsonInput}
                        onChange={(e) => setJsonInput(e.target.value)}
                        placeholder='[{"title": "...", "slug": "...", ...}]'
                        className="w-full h-[500px] p-4 bg-card border border-border rounded-xl font-mono text-sm focus:ring-2 focus:ring-primary outline-none resize-none"
                    />
                    <Button 
                        onClick={handleValidate} 
                        className="w-full h-12 text-lg font-bold"
                        disabled={!jsonInput.trim()}
                    >
                        Validate JSON
                    </Button>
                </div>

                {/* Status & Preview Section */}
                <div className="space-y-6">
                    <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 className="w-5 h-5 text-primary" />
                        <h2 className="text-xl font-bold">Status & Actions</h2>
                    </div>

                    {error && (
                        <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-xl flex gap-3 text-destructive animate-in fade-in slide-in-from-top-2">
                            <AlertCircle className="w-5 h-5 shrink-0" />
                            <p className="text-sm font-medium">{error}</p>
                        </div>
                    )}

                    {success && (
                        <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex gap-3 text-green-500 animate-in fade-in slide-in-from-top-2">
                            <CheckCircle2 className="w-5 h-5 shrink-0" />
                            <p className="text-sm font-medium">{success}</p>
                        </div>
                    )}

                    {!error && !success && !jsonInput && (
                        <div className="p-8 border-2 border-dashed border-border rounded-3xl flex flex-col items-center justify-center text-center space-y-4">
                            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                                <FileJson className="w-6 h-6 text-muted-foreground" />
                            </div>
                            <div>
                                <p className="font-medium">No posts to process</p>
                                <p className="text-sm text-muted-foreground mt-1">Paste your JSON data or load the template to get started.</p>
                            </div>
                        </div>
                    )}

                    {parsedPosts.length > 0 && (
                        <Card className="p-0 overflow-hidden border-border/50">
                            <div className="bg-muted/50 p-4 border-b border-border flex items-center justify-between">
                                <span className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Preview ({parsedPosts.length} posts)</span>
                            </div>
                            <div className="max-h-[350px] overflow-y-auto">
                                {parsedPosts.map((post, i) => (
                                    <div key={i} className="p-4 border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="space-y-1">
                                                <h4 className="font-bold text-sm line-clamp-1">{post.title}</h4>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bold">{post.category}</span>
                                                    <span className="text-[10px] text-muted-foreground font-mono">{post.slug}</span>
                                                </div>
                                            </div>
                                            <div className="shrink-0">
                                                {post.is_published ? (
                                                    <span className="text-[10px] text-green-500 font-bold uppercase tracking-widest">Published</span>
                                                ) : (
                                                    <span className="text-[10px] text-orange-500 font-bold uppercase tracking-widest">Draft</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="p-4 bg-muted/50">
                                <Button 
                                    onClick={handleSubmit} 
                                    className="w-full gap-2 bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-600/20 h-12 text-lg font-bold"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        "Posting to Bulk Table..."
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5" />
                                            Submit to Bulk Table
                                        </>
                                    )}
                                </Button>
                            </div>
                        </Card>
                    )}

                    <div className="p-6 bg-primary/5 border border-primary/10 rounded-2xl space-y-4">
                        <h4 className="font-bold text-primary flex items-center gap-2">
                            <AlertCircle className="w-4 h-4" />
                            Bulk Table Tips
                        </h4>
                        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-4">
                            <li>These posts are stored in <code className="bg-background px-1 rounded text-primary">bulk_posts</code>.</li>
                            <li>They will be displayed in a separate "Trending" section on the frontend.</li>
                            <li>No cover images are required for this creative text-based layout.</li>
                            <li>Ensure categories match: <code className="text-white italic">AI Business, AI Design, AI Marketing, Future of AI</code>.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
