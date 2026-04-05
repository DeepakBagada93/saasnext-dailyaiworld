import { createClient } from "@/lib/supabase";
import { ForbesBlogGrid } from "@/components/ui/ForbesBlogGrid";
import { SEOContent } from "@/components/ui/SEOContent";
import { Schema } from "@/components/seo/Schema";
import { Section } from "@/components/ui/Section";
import { ArrowRight, Zap, Brain, TrendingUp, Sparkles } from "lucide-react";
import Link from "next/link";

export const revalidate = 0;

async function getPosts() {
  const supabase = createClient();
  const { data: posts, error } = await supabase
    .from("posts")
    .select("*")
    .eq("is_published", true)
    .or(`scheduled_publish_date.is.null,scheduled_publish_date.lte.${new Date().toISOString()}`)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching posts:", error);
    return [];
  }

  return posts;
}

async function getBulkPosts() {
  const supabase = createClient();
  const { data: posts, error } = await supabase
    .from("bulk_posts")
    .select("*")
    .eq("is_published", true)
    .or(`scheduled_publish_date.is.null,scheduled_publish_date.lte.${new Date().toISOString()}`)
    .order("created_at", { ascending: false })
    .limit(5);

  if (error) {
    console.error("Error fetching bulk posts:", error);
    return [];
  }

  return posts;
}

export const metadata = {
  title: "Daily AI World | AI Business, Design & Future Trends",
  description: "Discover the latest AI news today. Daily AI World provides real-time updates on AI business, design, and future trends from India and Asia.",
  keywords: ["AI news", "artificial intelligence", "AI business", "AI design", "AI trends", "machine learning", "India AI", "Asia AI"],
  openGraph: {
    title: "Daily AI World | AI Business, Design & Future Trends",
    description: "Discover the latest AI news today. Daily AI World provides real-time updates on AI business, design, and future trends from India and Asia.",
    type: "website",
    locale: "en_US",
    siteName: "Daily AI World",
  },
  twitter: {
    card: "summary_large_image",
    title: "Daily AI World | AI Business, Design & Future Trends",
    description: "Discover the latest AI news today. Daily AI World provides real-time updates on AI business, design, and future trends.",
  },
};

export default async function Home() {
  const [posts, bulkPosts] = await Promise.all([getPosts(), getBulkPosts()]);

  return (
    <>
      <Schema
        type="WebPage"
        data={{
          name: "Daily AI World | AI Business, Design & Future Trends",
          description: "Discover the latest AI news today. Daily AI World provides real-time updates on AI business, design, and future trends from India and Asia.",
          speakable: {
            "@type": "SpeakableSpecification",
            cssSelector: [".headline", ".summary"]
          }
        }}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden w-full">
        <div className="absolute inset-0 bg-grid-white/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
        
        <div className="relative w-full pt-20 sm:pt-24 pb-6 sm:pb-8 px-4 sm:px-6">
          <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-4 sm:mb-6">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500" />
              <span className="text-xs sm:text-sm font-semibold text-orange-400">Your Daily Dose of AI Insights</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 sm:mb-6 tracking-tight leading-tight">
              The Future of <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">AI</span> Starts Here
            </h1>
            
            <p className="text-sm sm:text-base md:text-lg text-zinc-400 max-w-2xl mx-auto mb-6 sm:mb-8">
              Stay ahead with real-time AI news, in-depth analysis, and expert insights on AI business, design, and emerging trends.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="#latest-posts"
                className="group inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold rounded-full hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300 text-sm sm:text-base"
              >
                <span>Explore Articles</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-zinc-800/50 border border-zinc-700 text-white font-semibold rounded-full hover:bg-zinc-700/50 transition-all duration-300 text-sm sm:text-base"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
            <span className="text-xs sm:text-sm font-semibold text-zinc-500 w-full text-center mb-2">Popular Categories:</span>
            {["AI Business", "AI Design", "AI Marketing", "Future of AI"].map((category) => (
              <Link
                key={category}
                href={`#latest-posts`}
                className="group px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-zinc-400 bg-zinc-800/30 border border-zinc-700/50 rounded-full hover:bg-orange-500/20 hover:border-orange-500/50 hover:text-orange-400 transition-all duration-300"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <Section className="py-6 sm:py-8 border-y border-zinc-800/50 bg-zinc-900/20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 text-center">
          <div>
            <div className="flex items-center justify-center gap-2 mb-1 sm:mb-2">
              <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
              <span className="text-2xl sm:text-3xl font-black text-white">{posts.length}+</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-500">AI Articles</p>
          </div>
          <div>
            <div className="flex items-center justify-center gap-2 mb-1 sm:mb-2">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
              <span className="text-2xl sm:text-3xl font-black text-white">50+</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-500">Trending Stories</p>
          </div>
          <div>
            <div className="flex items-center justify-center gap-2 mb-1 sm:mb-2">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
              <span className="text-2xl sm:text-3xl font-black text-white">Daily</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-500">New Updates</p>
          </div>
          <div>
            <div className="flex items-center justify-center gap-2 mb-1 sm:mb-2">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
              <span className="text-2xl sm:text-3xl font-black text-white">Expert</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-500">Analysis</p>
          </div>
        </div>
      </Section>

      {/* Main Blog Grid */}
      <Section className="py-16">
        <ForbesBlogGrid posts={posts} trendingPosts={bulkPosts} />
      </Section>

      <SEOContent />
    </>
  );
}
