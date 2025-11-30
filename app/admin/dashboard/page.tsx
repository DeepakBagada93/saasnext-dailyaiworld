"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { Post } from "@/types/database";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

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

    return (
        <div className="min-h-screen bg-background font-sans">
            <nav className="border-b border-border bg-card">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <h1 className="text-xl font-bold">Admin Dashboard</h1>
                    <div className="flex items-center gap-4">
                        <Link href="/" className="text-sm hover:underline">View Site</Link>
                        <button onClick={handleLogout} className="text-sm text-destructive hover:underline">
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            <main className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold">Posts</h2>
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
