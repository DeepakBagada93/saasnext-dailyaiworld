"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { Post } from "@/types/database";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { MotivationalCard } from "@/components/admin/MotivationalCard";
import { FileText, Settings, TrendingUp } from "lucide-react";

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
        await supabase.auth.signOut();
        router.push("/admin/login");
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
        <div className="min-h-screen bg-background font-sans">
            <nav className="border-b border-border bg-card">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <h1 className="text-xl font-bold">Admin Dashboard</h1>
                    <div className="flex items-center gap-4">
                        <Link href="/admin/settings" className="text-sm hover:text-primary transition-colors flex items-center gap-1">
                            <Settings className="w-4 h-4" />
                            Settings
                        </Link>
                        <Link href="/" className="text-sm hover:underline">View Site</Link>
                        <button onClick={handleLogout} className="text-sm text-destructive hover:underline">
                            Logout
                        </button>
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
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold">Recent Posts</h2>
                    <Link
                        href="/admin/editor"
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                    >
                        Create New Post
                    </Link>
                </div>

                <div className="bg-card border border-border rounded-xl overflow-hidden">
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
            </main>
        </div>
    );
}
