import Link from "next/link";
import { cn } from "@/lib/utils";
import { Post } from "@/types/database";

interface BentoGridProps {
    posts: Post[];
}

export function BentoGrid({ posts }: BentoGridProps) {
    if (!posts || posts.length === 0) {
        return <div className="text-center py-20 text-muted-foreground">No posts found.</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[300px]">
            {posts.map((post, i) => (
                <Link
                    key={post.id}
                    href={`/post/${post.slug}`}
                    className={cn(
                        "group relative overflow-hidden rounded-xl border border-border bg-card transition-all hover:shadow-lg",
                        i === 0 || i === 3 ? "md:col-span-2" : "md:col-span-1"
                    )}
                >
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                        style={{ backgroundImage: `url(${post.cover_image})` }}
                    />
                    <div className="absolute inset-0 bg-black/40 transition-opacity group-hover:bg-black/50" />
                    <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                        <span className="text-xs font-medium uppercase tracking-wider mb-2 opacity-80">
                            {post.category}
                        </span>
                        <h3 className="text-xl md:text-2xl font-bold leading-tight mb-2">
                            {post.title}
                        </h3>
                        <p className="text-sm opacity-80 line-clamp-2">
                            {post.excerpt}
                        </p>
                    </div>
                </Link>
            ))}
        </div>
    );
}
