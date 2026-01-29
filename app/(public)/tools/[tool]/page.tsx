import { Metadata } from "next";
import { toolsConfig } from "@/config/tools";
import { Schema } from "@/components/seo/Schema";

export async function generateMetadata({ params }: { params: Promise<{ tool: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const config = toolsConfig[resolvedParams.tool as keyof typeof toolsConfig] as {
        title: string;
        description: string;
        component: React.ComponentType;
        content?: React.ReactNode;
    };

    if (!config) {
        return {
            title: "Tool Not Found - Daily AI World",
        };
    }

    return {
        title: config.title,
        description: config.description,
        keywords: [
            config.title.split(' - ')[0],
            'online tool',
            'free tool',
            'Daily AI World',
            resolvedParams.tool.split('-').join(' '),
        ],
        alternates: {
            canonical: `https://dailyaiworld.com/tools/${resolvedParams.tool}`,
        },
        openGraph: {
            title: config.title,
            description: config.description,
            type: "website",
            url: `https://dailyaiworld.com/tools/${resolvedParams.tool}`,
        },
        twitter: {
            card: "summary_large_image",
            title: config.title,
            description: config.description,
        },
    };
}

export default async function ToolPage({ params }: { params: Promise<{ tool: string }> }) {
    const resolvedParams = await params;
    const config = toolsConfig[resolvedParams.tool as keyof typeof toolsConfig] as {
        title: string;
        description: string;
        component: React.ComponentType;
        content?: React.ReactNode;
    };

    if (!config) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-12 text-center">
                <h1 className="text-4xl font-bold mb-4">Tool Not Found</h1>
                <p className="text-muted-foreground">The requested tool does not exist.</p>
            </div>
        );
    }

    const ToolComponent = config.component;

    return (
        <>
            <Schema
                type="SoftwareApplication"
                data={{
                    name: config.title,
                    description: config.description,
                    applicationCategory: "UtilitiesApplication",
                    operatingSystem: "Web",
                    offers: {
                        "@type": "Offer",
                        price: "0",
                        priceCurrency: "USD",
                    },
                    aggregateRating: {
                        "@type": "AggregateRating",
                        ratingValue: "4.8",
                        ratingCount: "124",
                    },
                }}
            />
            <ToolComponent />

            {config.content && (
                <div className="container mx-auto px-4 py-12 max-w-4xl">
                    <div className="prose dark:prose-invert max-w-none">
                        {config.content}
                    </div>
                </div>
            )}
        </>
    );
}

export async function generateStaticParams() {
    return Object.keys(toolsConfig).map((tool) => ({
        tool,
    }));
}
