import Link from "next/link";
import { cn } from "@/lib/utils";
import { Post } from "@/types/database";
import { Badge } from "@/components/ui/Badge";
import { Calendar, Clock } from "lucide-react";

interface BentoGridProps {
    posts: Post[];
}

export function BentoGrid({ posts }: BentoGridProps) {
    if (!posts || posts.length === 0) {
        return <div className="text-center py-20 text-muted-foreground">No posts found.</div>;
    }

    return (
        <div className="container mx-auto px-4 pb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[400px]">
                {posts.map((post, i) => (
                    <Link
                        key={post.id}
                        href={`/post/${post.slug}`}
                        className={cn(
                            "group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1",
                            i === 0 || i === 3 ? "lg:col-span-2" : "lg:col-span-1"
                        )}
                    >
                        {/* Image Background */}
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                            style={{ backgroundImage: `url(${post.cover_image})` }}
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-90" />

                        {/* Content */}
                        <div className="absolute inset-0 p-8 flex flex-col justify-end">
                            <div className="transform transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
                                <div className="flex items-center gap-3 mb-4">
                                    <Badge variant="glass" className="backdrop-blur-md">
                                        {post.category}
                                    </Badge>
                                    <div className="flex items-center text-xs text-white/70 gap-1">
                                        <Calendar className="w-3 h-3" />
                                        <span>{new Date(post.created_at).toLocaleDateString()}</span>
                                    </div>
                                </div>

                                <h3 className={cn(
                                    "font-bold leading-tight mb-3 text-white group-hover:text-primary transition-colors duration-300",
                                    i === 0 || i === 3 ? "text-3xl md:text-4xl" : "text-2xl"
                                )}>
                                    {post.title}
                                </h3>

                                <p className={cn(
                                    "text-white/70 line-clamp-2 mb-4 opacity-0 transition-opacity duration-500 delay-100 group-hover:opacity-100",
                                    i === 0 || i === 3 ? "text-lg" : "text-sm"
                                )}>
                                    {post.excerpt}
                                </p>

                                <div className="flex items-center text-sm font-medium text-primary opacity-0 transition-opacity duration-500 delay-200 group-hover:opacity-100">
                                    Read Article <Clock className="ml-2 w-4 h-4" />
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
