import { createServerSupabaseClient } from "@/lib/supabase-server";
import { Schema } from "@/components/seo/Schema";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { MarkdownRenderer } from "@/components/ui/MarkdownRenderer";

import { BlogAudioPlayer } from "@/components/ui/BlogAudioPlayer";
import { RelatedPosts } from "@/components/ui/RelatedPosts";
import { ReadingProgressBar } from "@/components/ui/ReadingProgressBar";
import { TableOfContents } from "@/components/ui/TableOfContents";
import { SocialShareButtons } from "@/components/ui/SocialShareButtons";
import { ArticleStats } from "@/components/ui/ArticleStats";

export const revalidate = 0;

interface PostPageProps {
    params: Promise<{
        slug: string;
    }>;
}

async function getPost(slug: string) {
    const supabase = await createServerSupabaseClient();
    const now = new Date().toISOString();

    // Try standard posts first
    const { data: post } = await supabase
        .from("posts")
        .select("*")
        .eq("slug", slug)
        .eq("is_published", true)
        .or(`scheduled_publish_date.is.null,scheduled_publish_date.lte.${now}`)
        .single();

    if (post) return { ...post, _table: "posts" };

    // Fall back to bulk_posts
    const { data: bulkPost } = await supabase
        .from("bulk_posts")
        .select("*")
        .eq("slug", slug)
        .eq("is_published", true)
        .or(`scheduled_publish_date.is.null,scheduled_publish_date.lte.${now}`)
        .single();

    if (bulkPost) return { ...bulkPost, _table: "bulk_posts" };

    return null;
}

async function getRelatedPosts(category: string, currentSlug: string) {
    const supabase = await createServerSupabaseClient();
    const { data: posts } = await supabase
        .from("posts")
        .select("slug, title, cover_image, created_at, category")
        .eq("category", category)
        .eq("is_published", true)
        .neq("slug", currentSlug)
        .or(`scheduled_publish_date.is.null,scheduled_publish_date.lte.${new Date().toISOString()}`)
        .limit(4);

    return posts || [];
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPost(slug);

    if (!post) {
        return {
            title: "Post Not Found",
        };
    }

    return {
        title: `${post.title} | Daily AI World`,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            images: [post.cover_image],
            type: "article",
        },
    };
}

export default async function PostPage({ params }: PostPageProps) {
    const { slug } = await params;
    const post = await getPost(slug);

    if (!post) {
        notFound();
    }

    const relatedPosts = await getRelatedPosts(post.category, slug);

    if (!post) {
        notFound();
    }

    return (
        <>
            <ReadingProgressBar />
            <SocialShareButtons
                title={post.title}
                url={`https://dailyaiworld.com/post/${post.slug}`}
                variant="floating"
            />
            <Schema
                type="Article"
                data={{
                    headline: post.title,
                    description: post.excerpt,
                    image: post.cover_image,
                    datePublished: post.created_at,
                    dateModified: post.updated_at || post.created_at,
                    author: {
                        "@type": "Person",
                        name: "Daily AI World Team",
                        url: "https://dailyaiworld.com/about",
                    },
                    publisher: {
                        "@type": "Organization",
                        name: "Daily AI World",
                        logo: {
                            "@type": "ImageObject",
                            url: "https://dailyaiworld.com/siteicon.png",
                        },
                    },
                    mainEntityOfPage: {
                        "@type": "WebPage",
                        "@id": `https://dailyaiworld.com/post/${post.slug}`,
                    },
                    wordCount: post.content.split(/\s+/).length,
                    articleSection: post.category,
                    keywords: post.category, // Could be improved if tags existed
                    isAccessibleForFree: true,
                }}
            />
            <Schema
                type="BreadcrumbList"
                data={{
                    itemListElement: [
                        {
                            "@type": "ListItem",
                            position: 1,
                            name: "Home",
                            item: "https://dailyaiworld.com",
                        },
                        {
                            "@type": "ListItem",
                            position: 2,
                            name: post.category || "Blog",
                            item: `https://dailyaiworld.com/category/${post.category?.toLowerCase().replace(/\s+/g, '-') || 'blog'}`,
                        },
                        {
                            "@type": "ListItem",
                            position: 3,
                            name: post.title,
                            item: `https://dailyaiworld.com/post/${post.slug}`,
                        },
                    ],
                }}
            />
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Main Content */}
                    <article className="lg:col-span-8">
                        <header className="mb-8">
                            <div className="flex items-center justify-between mb-4">
                                <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-orange-500/10 text-orange-400 rounded-full border border-orange-500/20">
                                    {post.category}
                                </span>
                                <ArticleStats createdAt={post.created_at} content={post.content || post.excerpt || ""} />
                            </div>
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 leading-tight text-white">
                                {post.title}
                            </h1>
                            <div className="border-t border-b border-zinc-800/50 py-4 my-6">
                                <SocialShareButtons
                                    title={post.title}
                                    url={`https://dailyaiworld.com/post/${post.slug}`}
                                    variant="inline"
                                />
                            </div>
                        </header>

                        {post.cover_image && (
                        <div className="relative aspect-video w-full mb-8 rounded-xl overflow-hidden border border-zinc-800/50">
                            <img
                                src={post.cover_image}
                                alt={post.title}
                                className="object-cover w-full h-full"
                            />
                        </div>
                        )}

                        <BlogAudioPlayer content={post.content} />

                        <div className="prose prose-invert prose-lg max-w-none">
                            <MarkdownRenderer content={post.content} />
                        </div>

                        <div className="mt-12 pt-8 border-t border-zinc-800/50">
                            <div className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800/50">
                                <h3 className="text-lg font-bold text-white mb-4">Share this article</h3>
                                <SocialShareButtons
                                    title={post.title}
                                    url={`https://dailyaiworld.com/post/${post.slug}`}
                                    variant="inline"
                                />
                            </div>
                        </div>
                    </article>

                    {/* Sidebar */}
                    <aside className="lg:col-span-4 space-y-6">
                        <div className="sticky top-24 space-y-6">
                            <TableOfContents content={post.content || ""} />
                            <RelatedPosts posts={relatedPosts} />
                        </div>
                    </aside>
                </div>
            </div>
        </>
    );
}
