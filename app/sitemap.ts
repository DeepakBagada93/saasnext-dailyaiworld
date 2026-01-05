import { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase'
import { toolsConfig } from '@/config/tools'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const supabase = createClient()
    const { data: posts } = await supabase
        .from('posts')
        .select('slug, updated_at')
        .eq('is_published', true)
        .or(`scheduled_publish_date.is.null,scheduled_publish_date.lte.${new Date().toISOString()}`)

    const postEntries: MetadataRoute.Sitemap = (posts || []).map((post) => ({
        url: `https://dailyaiworld.com/post/${post.slug}`,
        lastModified: new Date(post.updated_at),
        changeFrequency: 'weekly',
        priority: 0.8,
    }))

    const toolEntries: MetadataRoute.Sitemap = Object.keys(toolsConfig).map((tool) => ({
        url: `https://dailyaiworld.com/tools/${tool}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
    }))

    const categories = ['ai-business', 'ai-design', 'ai-marketing', 'future-of-ai']
    const categoryEntries: MetadataRoute.Sitemap = categories.map((category) => ({
        url: `https://dailyaiworld.com/category/${category}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
    }))

    const staticPages: MetadataRoute.Sitemap = [
        {
            url: 'https://dailyaiworld.com',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: 'https://dailyaiworld.com/about',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: 'https://dailyaiworld.com/contact',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: 'https://dailyaiworld.com/privacy-policy',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: 'https://dailyaiworld.com/terms',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
    ]

    return [
        ...staticPages,
        ...categoryEntries,
        ...toolEntries,
        ...postEntries,
    ]
}
