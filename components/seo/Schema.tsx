import Script from "next/script";

type SchemaProps = {
    type: "WebSite" | "Article" | "BreadcrumbList";
    data: Record<string, any>;
};

export function Schema({ type, data }: SchemaProps) {
    const schema = {
        "@context": "https://schema.org",
        "@type": type,
        ...data,
    };

    return (
        <Script
            id={`schema-${type.toLowerCase()}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
