import { createClient } from "@/lib/supabase";
import { Schema } from "@/components/seo/Schema";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Metadata } from "next";

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

    return (
        <>
            <Schema
                type="Article"
                data={{
                    headline: post.title,
                    description: post.excerpt,
                    image: post.cover_image,
                    datePublished: post.created_at,
                    author: {
                        "@type": "Person",
                        name: "Daily AI World Team",
                    },
                }}
            />
            <article className="max-w-3xl mx-auto">
                <header className="mb-12 text-center">
                    <div className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-4">
                        {post.category}
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6 leading-tight">
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

                <div className="relative aspect-video w-full mb-12 rounded-xl overflow-hidden border border-border">
                    <img
                        src={post.cover_image}
                        alt={post.title}
                        className="object-cover w-full h-full"
                    />
                </div>

                <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary prose-img:rounded-xl">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {post.content}
                    </ReactMarkdown>
                </div>
            </article>
        </>
    );
}
