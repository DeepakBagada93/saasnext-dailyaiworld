"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Post } from "@/types/database";
import { Badge } from "@/components/ui/Badge";
import { Calendar, Clock, ChevronLeft, ChevronRight } from "lucide-react";

interface BentoGridProps {
    posts: Post[];
}

export function BentoGrid({ posts }: BentoGridProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 12;

    if (!posts || posts.length === 0) {
        return <div className="text-center py-20 text-muted-foreground">No posts found.</div>;
    }

    // Calculate pagination
    const totalPages = Math.ceil(posts.length / postsPerPage);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        // Smooth scroll to top of posts section
        document.getElementById('latest-posts')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="container mx-auto px-4 pb-20">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentPage}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[400px]"
                >
                    {currentPosts.map((post, i) => (
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
                                            <span suppressHydrationWarning>
                                                {new Date(post.created_at).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })}
                                            </span>
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
                </motion.div>
            </AnimatePresence>

            {/* Creative Pagination */}
            {totalPages > 1 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-16 flex items-center justify-center gap-6"
                >
                    {/* Previous Button */}
                    <motion.button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={cn(
                            "group relative px-8 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2",
                            "bg-white/5 backdrop-blur-sm border border-white/10",
                            "hover:bg-white/10 hover:border-white/20 hover:text-white",
                            "disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
                        )}
                    >
                        <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span>Previous</span>
                    </motion.button>

                    {/* Page Indicator */}
                    <div className="text-center">
                        <p className="text-sm text-white/40">
                            Page <span className="text-primary font-semibold">{currentPage}</span> of <span className="text-white/60">{totalPages}</span>
                        </p>
                    </div>

                    {/* Next Button */}
                    <motion.button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={cn(
                            "group relative px-8 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2",
                            "bg-white/5 backdrop-blur-sm border border-white/10",
                            "hover:bg-white/10 hover:border-white/20 hover:text-white",
                            "disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
                        )}
                    >
                        <span>Next</span>
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                </motion.div>
            )}


        </div>
    );
}
