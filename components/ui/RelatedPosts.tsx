import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Post {
    slug: string;
    title: string;
    cover_image: string;
    created_at: string;
    category: string;
}

interface RelatedPostsProps {
    posts: Post[];
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
    if (!posts || posts.length === 0) {
        return null;
    }

    return (
        <div className="bg-muted/30 border border-border rounded-xl p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                Related Articles
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
            </h3>
            <div className="flex flex-col gap-6">
                {posts.map((post) => (
                    <Link key={post.slug} href={`/post/${post.slug}`} className="group block">
                        <div className="flex gap-4 items-start">
                            <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border border-border">
                                <img
                                    src={post.cover_image}
                                    alt={post.title}
                                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-xs font-medium text-primary mb-1 uppercase tracking-wide">
                                    {post.category}
                                </div>
                                <h4 className="text-sm font-semibold leading-snug group-hover:text-primary transition-colors line-clamp-2">
                                    {post.title}
                                </h4>
                                <div className="text-xs text-muted-foreground mt-1">
                                    {new Date(post.created_at).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                    })}
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
