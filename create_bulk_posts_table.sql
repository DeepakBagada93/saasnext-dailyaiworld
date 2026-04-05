-- Create bulk_posts table for curated or batch-imported content
create table if not exists public.bulk_posts (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text not null unique,
  content text not null,
  excerpt text not null,
  category text not null,
  is_published boolean default false,
  scheduled_publish_date timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.bulk_posts enable row level security;

-- Create policy to allow public read access to published bulk posts
create policy "Public bulk posts are viewable by everyone"
  on public.bulk_posts for select
  using (is_published = true AND (scheduled_publish_date IS NULL OR scheduled_publish_date <= now()));

-- Create policy to allow authenticated users (admin) to do everything
create policy "Admins can do everything on bulk posts"
  on public.bulk_posts for all
  using (auth.role() = 'authenticated');

-- Add trigger to automatically update updated_at timestamp
CREATE TRIGGER update_bulk_posts_updated_at 
BEFORE UPDATE ON public.bulk_posts 
FOR EACH ROW 
EXECUTE FUNCTION update_updated_at_column();
