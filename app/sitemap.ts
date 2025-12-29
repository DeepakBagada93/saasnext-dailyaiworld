import { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const supabase = createClient()
    const { data: posts } = await supabase
        .from('posts')
        .select('slug, updated_at')
        .eq('is_published', true)

    const postEntries: MetadataRoute.Sitemap = (posts || []).map((post) => ({
        url: `https://dailyaiworld.com/post/${post.slug}`,
        lastModified: new Date(post.updated_at),
        changeFrequency: 'weekly',
        priority: 0.8,
    }))

    return [
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
        ...postEntries,
    ]
}
