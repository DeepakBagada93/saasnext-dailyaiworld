export type Post = {
    id: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    category: string;
    cover_image: string;
    is_published: boolean;
    scheduled_publish_date?: string | null;
    created_at: string;
    meta_title?: string;
    meta_description?: string;
    keywords?: string;
};
