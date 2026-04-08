"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Post } from "@/types/database";
import { BlogCard, TrendingCard, FeaturedPost } from "./BlogCard";
import { ChevronLeft, ChevronRight, Sparkles, TrendingUp, Clock, Calendar, Star, ArrowRight } from "lucide-react";

interface ForbesBlogGridProps {
    posts: Post[];
    trendingPosts?: Post[];
}

const categories = ["All", "AI Business", "AI Design", "AI Marketing", "Future of AI"];

export function ForbesBlogGrid({ posts, trendingPosts = [] }: ForbesBlogGridProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const postsPerPage = 9;

    const filteredPosts = selectedCategory === "All"
        ? posts
        : posts.filter(post => post.category === selectedCategory);

    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
    const featuredPost = posts[0];
    const gridPosts = currentPosts.slice(1);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        document.getElementById("latest-posts")?.scrollIntoView({ behavior: "smooth" });
    };

    if (!posts || posts.length === 0) {
        return (
            <div className="text-center py-20">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-zinc-800 flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-zinc-600" />
                </div>
                <p className="text-zinc-400">No posts found.</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 sm:space-y-12 w-full overflow-hidden">
            {/* Featured Post Row */}
            <div className="w-full">
                {featuredPost && <FeaturedPost post={featuredPost} />}
            </div>

            {/* Separate Trending Section Row */}
            {trendingPosts.length > 0 && (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="py-8 border-y border-zinc-800/50 bg-zinc-900/10 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-12 lg:px-12"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500 to-red-600">
                            <TrendingUp className="w-4 h-4 text-white" />
                        </div>
                        <div>
                            <h3 className="font-bold text-white uppercase tracking-widest text-sm">Trending Now</h3>
                            <p className="text-[10px] text-zinc-500">Most read articles this week</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {trendingPosts.slice(0, 4).map((post, index) => (
                            <TrendingCard key={post.id} post={post} index={index} />
                        ))}
                    </div>
                </motion.div>
            )}

            {posts.length > 6 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="py-6 sm:py-8"
                >
                    <div className="flex items-center gap-3 mb-4 sm:mb-6">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600">
                            <Star className="w-4 h-4 text-white" />
                        </div>
                        <div>
                            <h3 className="font-bold text-white">Editor&apos;s Picks</h3>
                            <p className="text-xs text-zinc-500">Curated selections for you</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                        {posts.slice(1, 4).map((post, index) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                            >
                                <Link
                                    href={`/post/${post.slug}`}
                                    className="group flex items-center gap-3 p-3 rounded-xl bg-zinc-900/30 border border-zinc-800/50 hover:border-orange-500/30 hover:bg-zinc-900/60 transition-all duration-300"
                                >
                                    <div className="w-14 h-14 relative rounded-lg overflow-hidden flex-shrink-0">
                                        <Image
                                            src={post.cover_image || "/placeholder.jpg"}
                                            alt={post.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                            sizes="56px"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <span className="text-[9px] font-bold uppercase tracking-wider text-orange-500">
                                            {post.category}
                                        </span>
                                        <h4 className="text-xs font-semibold text-white leading-tight line-clamp-2 group-hover:text-orange-400 transition-colors">
                                            {post.title}
                                        </h4>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}

            <div id="latest-posts" className="scroll-mt-20">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-orange-500/20">
                            <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
                        </div>
                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold text-white">Latest Stories</h2>
                            <p className="text-xs sm:text-sm text-zinc-500">Fresh AI insights and analysis</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => {
                                    setSelectedCategory(category);
                                    setCurrentPage(1);
                                }}
                                className={cn(
                                    "px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-full transition-all duration-300",
                                    selectedCategory === category
                                        ? "bg-orange-500 text-white"
                                        : "bg-zinc-800/50 text-zinc-400 hover:bg-zinc-700/50 hover:text-white"
                                )}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={`${currentPage}-${selectedCategory}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
                    >
                        {gridPosts.map((post, index) => (
                            <BlogCard key={post.id} post={post} variant="compact" index={index} />
                        ))}
                    </motion.div>
                </AnimatePresence>

                {totalPages > 1 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mt-8 sm:mt-12 flex items-center justify-center gap-4"
                    >
                        <motion.button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            whileHover={currentPage !== 1 ? { scale: 1.02 } : {}}
                            whileTap={currentPage !== 1 ? { scale: 0.98 } : {}}
                            className={cn(
                                "group relative flex items-center gap-2 sm:gap-3 px-5 sm:px-8 py-3 sm:py-4 rounded-full font-semibold transition-all duration-300 text-sm sm:text-base",
                                currentPage === 1
                                    ? "bg-zinc-800/30 border border-zinc-700/30 text-zinc-600 cursor-not-allowed"
                                    : "bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 text-white hover:from-orange-500 hover:to-red-600 hover:border-orange-500 hover:shadow-lg hover:shadow-orange-500/20"
                            )}
                        >
                            <span className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-red-600 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:-translate-x-1" />
                            <span>Previous</span>
                        </motion.button>

                        <div className="hidden sm:flex items-center gap-2">
                            <span className="text-sm text-zinc-500">
                                Page <span className="text-orange-500 font-bold">{currentPage}</span> of {totalPages}
                            </span>
                        </div>

                        <motion.button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            whileHover={currentPage !== totalPages ? { scale: 1.02 } : {}}
                            whileTap={currentPage !== totalPages ? { scale: 0.98 } : {}}
                            className={cn(
                                "group relative flex items-center gap-2 sm:gap-3 px-5 sm:px-8 py-3 sm:py-4 rounded-full font-semibold transition-all duration-300 text-sm sm:text-base",
                                currentPage === totalPages
                                    ? "bg-zinc-800/30 border border-zinc-700/30 text-zinc-600 cursor-not-allowed"
                                    : "bg-gradient-to-r from-orange-500 to-red-600 border border-orange-500 text-white hover:shadow-lg hover:shadow-orange-500/25"
                            )}
                        >
                            <span>Next</span>
                            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
                        </motion.button>
                    </motion.div>
                )}

                <div className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-zinc-500 flex items-center justify-center gap-2">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>
                        Showing {indexOfFirstPost + 1}-{Math.min(indexOfLastPost, filteredPosts.length)} of {filteredPosts.length} articles
                    </span>
                </div>
            </div>
        </div>
    );
}
