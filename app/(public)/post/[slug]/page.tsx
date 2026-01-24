import { createClient } from "@/lib/supabase";
import { Schema } from "@/components/seo/Schema";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { MarkdownRenderer } from "@/components/ui/MarkdownRenderer";

import { BlogAudioPlayer } from "@/components/ui/BlogAudioPlayer";
import { RelatedPosts } from "@/components/ui/RelatedPosts";

export const revalidate = 0;

interface PostPageProps {
    params: Promise<{
        slug: string;
    }>;
}

async function getPost(slug: string) {
    const supabase = createClient();
    const { data: post, error } = await supabase
        .from("posts")
        .select("*")
        .eq("slug", slug)
        .eq("is_published", true)
        .or(`scheduled_publish_date.is.null,scheduled_publish_date.lte.${new Date().toISOString()}`)
        .single();

    if (error || !post) {
        return null;
    }

    return post;
}

async function getRelatedPosts(category: string, currentSlug: string) {
    const supabase = createClient();
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
                        <header className="mb-8 text-center lg:text-left">
                            <div className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-4">
                                {post.category}
                            </div>
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter mb-6 leading-tight">
                                {post.title}
                            </h1>
                            <div className="text-sm text-muted-foreground">
                                {new Date(post.created_at).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </div>
                        </header>

                        <div className="relative aspect-video w-full mb-8 rounded-xl overflow-hidden border border-border">
                            <img
                                src={post.cover_image}
                                alt={post.title}
                                className="object-cover w-full h-full"
                            />
                        </div>

                        <BlogAudioPlayer content={post.content} />

                        <MarkdownRenderer content={post.content} />
                    </article>

                    {/* Sidebar */}
                    <aside className="lg:col-span-4 space-y-8">
                        <div className="sticky top-24">
                            <RelatedPosts posts={relatedPosts} />
                        </div>
                    </aside>
                </div>
            </div>
        </>
    );
}
