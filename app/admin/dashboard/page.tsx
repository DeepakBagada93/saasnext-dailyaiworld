"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { Post } from "@/types/database";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
    PlusCircle, 
    FileText, 
    TrendingUp, 
    Clock, 
    CheckCircle2, 
    FileEdit, 
    Trash2, 
    Search,
    ChevronLeft,
    ChevronRight,
    Copy
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

export default function AdminDashboard() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [bulkPosts, setBulkPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'standard' | 'bulk'>('standard');
    const supabase = createClient();
    const router = useRouter();

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        setLoading(true);
        try {
            const [postsRes, bulkPostsRes] = await Promise.all([
                supabase.from("posts").select("*").order("created_at", { ascending: false }),
                supabase.from("bulk_posts").select("*").order("created_at", { ascending: false })
            ]);

            if (postsRes.error) throw postsRes.error;
            if (bulkPostsRes.error) throw bulkPostsRes.error;

            setPosts(postsRes.data || []);
            setBulkPosts(bulkPostsRes.data || []);
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
        } finally {
            setLoading(false);
        }
    }

    const handleDelete = async (id: string, table: 'posts' | 'bulk_posts') => {
        if (!confirm("Are you sure you want to delete this post?")) return;

        try {
            const { error } = await supabase.from(table).delete().eq("id", id);
            if (error) throw error;
            fetchData();
        } catch (error) {
            console.error(`Error deleting from ${table}:`, error);
            alert("Failed to delete post");
        }
    };

    const stats = [
        { label: "Total Standard Posts", value: posts.length, icon: FileText, color: "text-blue-500" },
        { label: "Trending Bulk Posts", value: bulkPosts.length, icon: Copy, color: "text-orange-500" },
        { label: "Published (Total)", value: posts.filter(p => p.is_published).length + bulkPosts.filter(p => p.is_published).length, icon: CheckCircle2, color: "text-green-500" },
        { label: "Scheduled", value: posts.filter(p => p.scheduled_publish_date).length + bulkPosts.filter(p => p.scheduled_publish_date).length, icon: Clock, color: "text-purple-500" },
    ];

    return (
        <div className="space-y-8 pb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
                    <p className="text-muted-foreground">Manage your AI content and digital assets.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button onClick={() => router.push("/admin/bulk-post")} variant="outline" className="gap-2 border-orange-500/20 hover:bg-orange-500/5">
                        <Copy className="w-4 h-4 text-orange-500" />
                        Bulk Upload
                    </Button>
                    <Button onClick={() => router.push("/admin/editor")} className="gap-2">
                        <PlusCircle className="w-4 h-4" />
                        New Post
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                    <Card key={i} className="p-6 bg-card border-border/50">
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                                <p className="text-2xl font-bold">{stat.value}</p>
                            </div>
                            <stat.icon className={stat.color} size={24} />
                        </div>
                    </Card>
                ))}
            </div>

            {/* Content Table */}
            <div className="space-y-4">
                <div className="flex border-b border-border">
                    <button 
                        onClick={() => setActiveTab('standard')}
                        className={cn(
                            "px-6 py-3 text-sm font-bold transition-all border-b-2",
                            activeTab === 'standard' ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
                        )}
                    >
                        Standard Posts ({posts.length})
                    </button>
                    <button 
                        onClick={() => setActiveTab('bulk')}
                        className={cn(
                            "px-6 py-3 text-sm font-bold transition-all border-b-2",
                            activeTab === 'bulk' ? "border-orange-500 text-orange-500" : "border-transparent text-muted-foreground hover:text-foreground"
                        )}
                    >
                        Trending Bulk Posts ({bulkPosts.length})
                    </button>
                </div>

                <Card className="overflow-hidden border-border/50">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-muted/50 text-xs font-bold uppercase tracking-wider text-muted-foreground border-b border-border">
                                <tr>
                                    <th className="px-6 py-4">Title</th>
                                    <th className="px-6 py-4">Category</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Created At</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {loading ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                                            Loading content...
                                        </td>
                                    </tr>
                                ) : (activeTab === 'standard' ? posts : bulkPosts).length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                                            No posts found.
                                        </td>
                                    </tr>
                                ) : (activeTab === 'standard' ? posts : bulkPosts).map((post) => (
                                    <tr key={post.id} className="hover:bg-muted/30 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-sm text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                                                    {post.title}
                                                </span>
                                                <span className="text-xs text-muted-foreground font-mono">/{post.slug}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Badge variant="outline" className="font-bold">
                                                {post.category}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4">
                                            {post.is_published ? (
                                                <div className="flex items-center gap-1.5 text-green-500 font-bold text-[10px] uppercase tracking-widest">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                                    Published
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-1.5 text-orange-500 font-bold text-[10px] uppercase tracking-widest">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                                                    Draft
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-xs text-muted-foreground">
                                            {new Date(post.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                {activeTab === 'standard' && (
                                                    <Button 
                                                        variant="ghost" 
                                                        size="icon" 
                                                        className="h-8 w-8 text-muted-foreground hover:text-foreground"
                                                        onClick={() => router.push(`/admin/editor?id=${post.id}`)}
                                                    >
                                                        <FileEdit size={16} />
                                                    </Button>
                                                )}
                                                <Button 
                                                    variant="ghost" 
                                                    size="icon" 
                                                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                                    onClick={() => handleDelete(post.id, activeTab === 'standard' ? 'posts' : 'bulk_posts')}
                                                >
                                                    <Trash2 size={16} />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </div>
    );
}
