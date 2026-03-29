import { createClient } from "@/lib/supabase";
import { BentoGrid } from "@/components/ui/BentoGrid";
import { AnimatedHero } from "@/components/ui/AnimatedHero";
import { SEOContent } from "@/components/ui/SEOContent";
import { Schema } from "@/components/seo/Schema";
import { Section } from "@/components/ui/Section";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight } from "lucide-react";

export const revalidate = 0; // Disable caching for demo purposes

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

export default async function Home() {
  const posts = await getPosts();

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
      <AnimatedHero />

      <Section id="latest-posts" className="scroll-mt-20">
        <div className="flex items-center gap-3 mb-10">
          <div className="h-8 w-1 bg-primary rounded-full" />
          <h2 className="text-3xl font-bold tracking-tight text-white">Latest Analysis</h2>
        </div>
        <BentoGrid posts={posts} />
      </Section>
      
      <SEOContent />
    </>
  );
}
