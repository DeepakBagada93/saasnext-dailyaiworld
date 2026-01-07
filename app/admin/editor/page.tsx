
"use client";

import { useEffect, useState, Suspense } from "react";
import { createClient } from "@/lib/supabase";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { MarkdownEditor } from "@/components/admin/MarkdownEditor";

function Editor() {
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [content, setContent] = useState("");
    const [excerpt, setExcerpt] = useState("");
    const [category, setCategory] = useState("AI Business");
    const [coverImage, setCoverImage] = useState("");
    const [isPublished, setIsPublished] = useState(false);
    const [scheduledPublishDate, setScheduledPublishDate] = useState("");
    const [publishMode, setPublishMode] = useState<"draft" | "now" | "schedule">("draft");

    // SEO Fields
    const [metaTitle, setMetaTitle] = useState("");
    const [metaDescription, setMetaDescription] = useState("");
    const [keywords, setKeywords] = useState("");

    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [fetching, setFetching] = useState(true);

    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const supabase = createClient();

    useEffect(() => {
        const checkAuthAndFetch = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push("/admin/login");
                return;
            }

            if (id) {
                const { data, error } = await supabase
                    .from("posts")
                    .select("*")
                    .eq("id", id)
                    .single();

                if (error) {
                    console.error("Error fetching post:", error);
                    alert("Post not found");
                    router.push("/admin/dashboard");
                } else if (data) {
                    setTitle(data.title);
                    setSlug(data.slug);
                    setContent(data.content);
                    setExcerpt(data.excerpt);
                    setCategory(data.category);
                    setCoverImage(data.cover_image);
                    setIsPublished(data.is_published);
                    setScheduledPublishDate(data.scheduled_publish_date || "");
                    setPublishMode(data.scheduled_publish_date ? "schedule" : (data.is_published ? "now" : "draft"));
                    setMetaTitle(data.meta_title || "");
                    setMetaDescription(data.meta_description || "");
                    setKeywords(data.keywords || "");
                }
            }
            setFetching(false);
        };

        checkAuthAndFetch();
    }, [id, router, supabase]);

    // Auto-generate slug from title if creating new post
    useEffect(() => {
        if (!id && title) {
            setSlug(title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""));
        }
    }, [title, id]);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) {
            return;
        }

        const file = e.target.files[0];
        const fileExt = file.name.split(".").pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        setUploading(true);

        const { error: uploadError } = await supabase.storage
            .from("blog-images")
            .upload(filePath, file);

        if (uploadError) {
            alert(`Error uploading image: ${uploadError.message}`);
            setUploading(false);
            return;
        }

        const { data: { publicUrl } } = supabase.storage
            .from("blog-images")
            .getPublicUrl(filePath);

        setCoverImage(publicUrl);
        setUploading(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Determine publish status based on mode
        // For scheduled posts, we set is_published to true, but the RLS policy and frontend filters 
        // will hide it until the scheduled date.
        const finalIsPublished = publishMode === "now" || (publishMode === "schedule" && !!scheduledPublishDate);
        const finalScheduledDate = publishMode === "schedule" && scheduledPublishDate ? scheduledPublishDate : null;

        const postData = {
            title,
            slug,
            content,
            excerpt,
            category,
            cover_image: coverImage,
            is_published: finalIsPublished,
            scheduled_publish_date: finalScheduledDate,
            meta_title: metaTitle,
            meta_description: metaDescription,
            keywords,
        };

        let error;
        if (id) {
            const { error: updateError } = await supabase
                .from("posts")
                .update(postData)
                .eq("id", id);
            error = updateError;
        } else {
            const { error: insertError } = await supabase
                .from("posts")
                .insert([postData]);
            error = insertError;
        }

        if (error) {
            alert(`Error saving post: ${error.message}`);
        } else {
            router.push("/admin/dashboard");
        }
        setLoading(false);
    };

    if (fetching) return <div className="p-8">Loading...</div>;

    return (
        <div className="min-h-screen bg-background font-sans pb-20">
            <nav className="border-b border-border bg-card sticky top-0 z-10">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/admin/dashboard" className="text-sm hover:underline">
                            &larr; Back to Dashboard
                        </Link>
                        <h1 className="text-xl font-bold">{id ? "Edit Post" : "New Post"}</h1>
                    </div>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className={cn(
                            "px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors",
                            loading && "opacity-50 cursor-not-allowed"
                        )}
                    >
                        {loading ? "Saving..." : "Save Post"}
                    </button>
                </div>
            </nav>

            <main className="container mx-auto px-4 py-8 max-w-4xl">
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Title</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                    className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Slug</label>
                                <input
                                    type="text"
                                    value={slug}
                                    onChange={(e) => setSlug(e.target.value)}
                                    required
                                    className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring font-mono text-sm"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Category</label>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                                >
                                    <option value="AI Business">AI Business</option>
                                    <option value="AI Design">AI Design</option>
                                    <option value="AI Marketing">AI Marketing</option>
                                    <option value="Future of AI">Future of AI</option>
                                </select>
                            </div>

                            <div className="space-y-4 pt-4 border-t border-border">
                                <label className="text-sm font-semibold">Publishing Options</label>
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="publishMode"
                                            checked={publishMode === "draft"}
                                            onChange={() => setPublishMode("draft")}
                                            className="h-4 w-4 text-primary focus:ring-primary"
                                        />
                                        <span className="text-sm">Save as Draft</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="publishMode"
                                            checked={publishMode === "now"}
                                            onChange={() => setPublishMode("now")}
                                            className="h-4 w-4 text-primary focus:ring-primary"
                                        />
                                        <span className="text-sm">Publish Immediately</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="publishMode"
                                            checked={publishMode === "schedule"}
                                            onChange={() => setPublishMode("schedule")}
                                            className="h-4 w-4 text-primary focus:ring-primary"
                                        />
                                        <span className="text-sm">Schedule for Later</span>
                                    </label>
                                </div>
                                {publishMode === "schedule" && (
                                    <div className="pl-6 space-y-2">
                                        <label className="text-xs text-muted-foreground">Publish Date & Time</label>
                                        <div className="relative">
                                            <input
                                                type="datetime-local"
                                                value={scheduledPublishDate}
                                                onChange={(e) => setScheduledPublishDate(e.target.value)}
                                                min={new Date().toISOString().slice(0, 16)}
                                                className="w-full pl-10 pr-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring text-sm [color-scheme:dark]"
                                            />
                                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                                                    <line x1="16" x2="16" y1="2" y2="6" />
                                                    <line x1="8" x2="8" y1="2" y2="6" />
                                                    <line x1="3" x2="21" y1="10" y2="10" />
                                                </svg>
                                            </div>
                                        </div>
                                        <p className="text-[10px] text-muted-foreground">
                                            Post will be visible to the public after this date.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Cover Image</label>
                                <div className="flex flex-col gap-2">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        disabled={uploading}
                                        className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                                    />
                                    {uploading && <p className="text-xs text-muted-foreground">Uploading...</p>}
                                </div>
                                <input
                                    type="url"
                                    value={coverImage}
                                    onChange={(e) => setCoverImage(e.target.value)}
                                    required
                                    placeholder="Or enter image URL..."
                                    className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring mt-2"
                                />
                            </div>
                            {coverImage && (
                                <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-border">
                                    <img src={coverImage} alt="Preview" className="object-cover w-full h-full" />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="space-y-4 border-t border-border pt-8">
                        <h3 className="text-lg font-semibold">SEO Settings</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Meta Title</label>
                                <input
                                    type="text"
                                    value={metaTitle}
                                    onChange={(e) => setMetaTitle(e.target.value)}
                                    placeholder="SEO Title (defaults to post title)"
                                    className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Keywords</label>
                                <input
                                    type="text"
                                    value={keywords}
                                    onChange={(e) => setKeywords(e.target.value)}
                                    placeholder="ai, business, future (comma separated)"
                                    className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                                />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-medium">Meta Description</label>
                                <textarea
                                    value={metaDescription}
                                    onChange={(e) => setMetaDescription(e.target.value)}
                                    rows={2}
                                    placeholder="Brief description for search engines"
                                    className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Excerpt</label>
                        <textarea
                            value={excerpt}
                            onChange={(e) => setExcerpt(e.target.value)}
                            required
                            rows={3}
                            className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Content</label>
                        <div className="prose-editor">
                            <MarkdownEditor
                                value={content}
                                onChange={setContent}
                                className="min-h-[500px]"
                            />
                        </div>
                    </div>
                </form>
            </main>
        </div>
    );
}

export default function EditorPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Editor />
        </Suspense>
    );
}
