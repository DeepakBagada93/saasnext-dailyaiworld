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
        "title": "Example Post 1",
        "slug": "example-post-1",
        "category": "AI Business",
        "excerpt": "This is a short summary of the first example post.",
        "content": "# Example Post 1\n\nThis is the main content using markdown.",
        "cover_image": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
        "is_published": true,
        "scheduled_publish_date": null
    },
    {
        "title": "Example Post 2",
        "slug": "example-post-2",
        "category": "AI Design",
        "excerpt": "This is a short summary of the second example post.",
        "content": "# Example Post 2\n\nThis is the main content using markdown.",
        "cover_image": "https://images.unsplash.com/photo-1561070791-2526d30994b5",
        "is_published": false,
        "scheduled_publish_date": "2026-04-01T10:00:00Z"
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
                .from("posts")
                .insert(parsedPosts);

            if (insertError) throw insertError;

            setSuccess(`Successfully posted ${parsedPosts.length} blogs! Redirecting...`);
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
                    <p className="text-muted-foreground">Add multiple blog posts at once using JSON format.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={loadTemplate} className="gap-2">
                        <FileJson className="w-4 h-4" />
                        Load Template
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
                                        "Posting..."
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5" />
                                            Submit All Posts
                                        </>
                                    )}
                                </Button>
                            </div>
                        </Card>
                    )}

                    <div className="p-6 bg-primary/5 border border-primary/10 rounded-2xl space-y-4">
                        <h4 className="font-bold text-primary flex items-center gap-2">
                            <AlertCircle className="w-4 h-4" />
                            Helpful Tips
                        </h4>
                        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-4">
                            <li>Ensure all posts have a unique <code className="bg-background px-1 rounded text-primary">slug</code>.</li>
                            <li>Images should be publicly accessible URLs.</li>
                            <li>Categories must match exactly: <code className="text-white italic">AI Business, AI Design, AI Marketing, Future of AI</code>.</li>
                            <li>Content supports full Markdown syntax.</li>
                            <li><code className="bg-background px-1 rounded text-primary">scheduled_publish_date</code> uses ISO 8601 format (e.g., <code className="text-white">2026-04-01T10:00:00Z</code>).</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
