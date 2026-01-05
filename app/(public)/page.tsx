import { createClient } from "@/lib/supabase";
import { BentoGrid } from "@/components/ui/BentoGrid";
import { AnimatedHero } from "@/components/ui/AnimatedHero";

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
      <AnimatedHero />
      <section id="latest-posts" className="scroll-mt-20">
        <BentoGrid posts={posts} />
      </section>
    </>
  );
}
