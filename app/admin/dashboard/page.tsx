"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { Post } from "@/types/database";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { MotivationalCard } from "@/components/admin/MotivationalCard";
import { FileText, Settings, TrendingUp, Menu, X } from "lucide-react";

export default function DashboardPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        const fetchPosts = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push("/admin/login");
                return;
            }

            const { data, error } = await supabase
                .from("posts")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) {
                console.error("Error fetching posts:", error);
            } else {
                setPosts(data || []);
            }
            setLoading(false);
        };

        fetchPosts();
    }, [router, supabase]);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this post?")) return;

        const { error } = await supabase.from("posts").delete().eq("id", id);

        if (error) {
            alert("Error deleting post");
        } else {
            setPosts(posts.filter((post) => post.id !== id));
        }
    };

    const handleLogout = async () => {
        try {
            await supabase.auth.signOut();
            // Use window.location for a hard redirect to ensure session is cleared
            window.location.href = "/admin/login";
        } catch (error) {
            console.error("Logout error:", error);
            // Force redirect even if there's an error
            window.location.href = "/admin/login";
        }
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    // Calculate stats
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const publishedPosts = posts.filter(post => post.is_published);
    const draftPosts = posts.filter(post => !post.is_published);

    const postsThisMonth = posts.filter(post => {
        const postDate = new Date(post.created_at);
        return postDate.getMonth() === currentMonth && postDate.getFullYear() === currentYear;
    }).length;

    const monthlyTarget = 50;

    return (
        <div className="min-h-screen bg-background font-sans pt-16 lg:pt-0">
            <nav className="hidden lg:block border-b border-border bg-card">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <h1 className="text-lg sm:text-xl font-bold">Admin Dashboard</h1>

                    {/* Desktop Navigation */}
                    <div className="flex items-center gap-4">
                        <Link href="/" className="text-sm hover:underline">View Site</Link>
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
                            AD
                        </div>
                    </div>
                </div>
            </nav>

            <main className="container mx-auto px-4 py-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-card border border-border rounded-xl p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground mb-1">Total Posts</p>
                                <p className="text-3xl font-bold">{posts.length}</p>
                            </div>
                            <FileText className="w-10 h-10 text-primary opacity-20" />
                        </div>
                    </div>

                    <div className="bg-card border border-border rounded-xl p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground mb-1">Published</p>
                                <p className="text-3xl font-bold text-green-600">{publishedPosts.length}</p>
                            </div>
                            <TrendingUp className="w-10 h-10 text-green-600 opacity-20" />
                        </div>
                    </div>

                    <div className="bg-card border border-border rounded-xl p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground mb-1">Drafts</p>
                                <p className="text-3xl font-bold text-yellow-600">{draftPosts.length}</p>
                            </div>
                            <FileText className="w-10 h-10 text-yellow-600 opacity-20" />
                        </div>
                    </div>
                </div>

                {/* Motivational Card */}
                <div className="mb-8">
                    <MotivationalCard
                        title="Monthly Publishing Goal"
                        currentValue={postsThisMonth}
                        targetValue={monthlyTarget}
                        period={now.toLocaleString('default', { month: 'long', year: 'numeric' })}
                    />
                </div>

                {/* Posts Table */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <h2 className="text-xl sm:text-2xl font-bold">Recent Posts</h2>
                    <Link
                        href="/admin/editor"
                        className="w-full sm:w-auto px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-center"
                    >
                        <span className="hidden sm:inline">Create New Post</span>
                        <span className="sm:hidden">+ New Post</span>
                    </Link>
                </div>

                {/* Desktop Table View */}
                <div className="hidden md:block bg-card border border-border rounded-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-muted">
                                <tr>
                                    <th className="p-4 font-medium">Title</th>
                                    <th className="p-4 font-medium">Category</th>
                                    <th className="p-4 font-medium">Status</th>
                                    <th className="p-4 font-medium">Date</th>
                                    <th className="p-4 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {posts.map((post) => (
                                    <tr key={post.id} className="border-t border-border hover:bg-muted/50 transition-colors">
                                        <td className="p-4 font-medium">{post.title}</td>
                                        <td className="p-4 text-muted-foreground">{post.category}</td>
                                        <td className="p-4">
                                            <span
                                                className={cn(
                                                    "px-2 py-1 rounded-full text-xs font-medium",
                                                    post.is_published
                                                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                                        : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                                                )}
                                            >
                                                {post.is_published ? "Published" : "Draft"}
                                            </span>
                                        </td>
                                        <td className="p-4 text-muted-foreground">
                                            {new Date(post.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="p-4 text-right space-x-2">
                                            <Link
                                                href={`/admin/editor?id=${post.id}`}
                                                className="text-sm font-medium hover:underline"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(post.id)}
                                                className="text-sm font-medium text-destructive hover:underline"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {posts.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="p-8 text-center text-muted-foreground">
                                            No posts found. Create one to get started.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden space-y-4">
                    {posts.map((post) => (
                        <div key={post.id} className="bg-card border border-border rounded-xl p-4 space-y-3">
                            <div className="flex items-start justify-between gap-2">
                                <h3 className="font-medium flex-1">{post.title}</h3>
                                <span
                                    className={cn(
                                        "px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap",
                                        post.is_published
                                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                            : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                                    )}
                                >
                                    {post.is_published ? "Published" : "Draft"}
                                </span>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span>{post.category}</span>
                                <span>•</span>
                                <span>{new Date(post.created_at).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-2 pt-2">
                                <Link
                                    href={`/admin/editor?id=${post.id}`}
                                    className="flex-1 px-3 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-center"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(post.id)}
                                    className="flex-1 px-3 py-2 text-sm font-medium bg-destructive/10 text-destructive rounded-md hover:bg-destructive/20 transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                    {posts.length === 0 && (
                        <div className="bg-card border border-border rounded-xl p-8 text-center text-muted-foreground">
                            No posts found. Create one to get started.
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
