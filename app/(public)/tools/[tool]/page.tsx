import { Metadata } from "next";
import { toolsConfig } from "@/config/tools";
import { Schema } from "@/components/seo/Schema";

export async function generateMetadata({ params }: { params: Promise<{ tool: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const config = toolsConfig[resolvedParams.tool as keyof typeof toolsConfig];

    if (!config) {
        return {
            title: "Tool Not Found - Daily AI World",
        };
    }

    return {
        title: config.title,
        description: config.description,
        openGraph: {
            title: config.title,
            description: config.description,
            type: "website",
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
    const config = toolsConfig[resolvedParams.tool as keyof typeof toolsConfig];

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
                }}
            />
            <ToolComponent />
        </>
    );
}

export async function generateStaticParams() {
    return Object.keys(toolsConfig).map((tool) => ({
        tool,
    }));
}
