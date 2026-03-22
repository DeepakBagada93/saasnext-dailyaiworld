type SchemaProps = {
    type: "WebSite" | "Article" | "BreadcrumbList" | "SoftwareApplication" | "Organization" | "FAQPage" | "AboutPage" | "ContactPage" | "WebPage";
    data: Record<string, any>;
};

export function Schema({ type, data }: SchemaProps) {
    const schema = {
        "@context": "https://schema.org",
        "@type": type,
        ...data,
    };

    return (
        <script
            id={`schema-${type.toLowerCase()}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
