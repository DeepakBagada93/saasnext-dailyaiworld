-- Create posts table
create table if not exists public.posts (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text not null unique,
  content text not null,
  excerpt text not null,
  category text not null,
  cover_image text,
  is_published boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.posts enable row level security;

-- Create policy to allow public read access to published posts
create policy "Public posts are viewable by everyone"
  on public.posts for select
  using (is_published = true);

-- Create policy to allow authenticated users (admin) to do everything
create policy "Admins can do everything"
  on public.posts for all
  using (auth.role() = 'authenticated');

-- Seed data
insert into public.posts (title, slug, content, excerpt, category, cover_image, is_published)
values
  (
    'The Rise of AI in Modern Business',
    'rise-of-ai-business',
    '# The Rise of AI in Modern Business\n\nArtificial Intelligence is reshaping the corporate landscape...',
    'How AI is transforming traditional business models and creating new opportunities for growth.',
    'AI Business',
    'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=2070',
    true
  ),
  (
    'Minimalist Design in the Age of AI',
    'minimalist-design-ai',
    '# Minimalist Design in the Age of AI\n\nAs AI tools become more prevalent, the role of the designer is evolving...',
    'Exploring how AI tools are influencing modern design aesthetics and workflows.',
    'AI Design',
    'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=2000',
    true
  ),
  (
    'Personalization at Scale: AI Marketing',
    'ai-marketing-personalization',
    '# Personalization at Scale\n\nMarketing has always been about connecting with the right audience...',
    'Leveraging machine learning algorithms to deliver hyper-personalized customer experiences.',
    'AI Marketing',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2015',
    true
  ),
  (
    'AGI: The Next Frontier',
    'agi-next-frontier',
    '# AGI: The Next Frontier\n\nArtificial General Intelligence represents the holy grail of AI research...',
    'What lies beyond narrow AI? A look into the future of Artificial General Intelligence.',
    'Future of AI',
    'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1965',
    true
  );
