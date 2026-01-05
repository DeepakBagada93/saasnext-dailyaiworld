import { createClient } from "@/lib/supabase";
import { BentoGrid } from "@/components/ui/BentoGrid";
import { Schema } from "@/components/seo/Schema";
import { notFound } from "next/navigation";

export const revalidate = 0;

// Map slug to display name
const categoryNames: Record<string, string> = {
    "ai-business": "AI Business",
    "ai-design": "AI Design",
    "ai-marketing": "AI Marketing",
    "future-of-ai": "Future of AI",
};

interface CategoryPageProps {
    params: Promise<{
        category: string;
    }>;
}

async function getPostsByCategory(category: string) {
    const supabase = createClient();
    const { data: posts, error } = await supabase
        .from("posts")
        .select("*")
        .eq("is_published", true)
        .eq("category", category)
        .or(`scheduled_publish_date.is.null,scheduled_publish_date.lte.${new Date().toISOString()}`)
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching posts:", error);
        return [];
    }

    return posts;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { category } = await params;
    const categoryName = categoryNames[category];

    if (!categoryName) {
        notFound();
    }

    const posts = await getPostsByCategory(categoryName);

    return (
        <>
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
                            name: categoryName,
                            item: `https://dailyaiworld.com/category/${category}`,
                        },
                    ],
                }}
            />
            <header className="mb-12 text-center max-w-2xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
                    {categoryName}
                </h1>
                <p className="text-lg text-muted-foreground">
                    Latest insights and trends in {categoryName}.
                </p>
            </header>

            <BentoGrid posts={posts} />
        </>
    );
}
