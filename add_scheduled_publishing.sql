-- Add scheduled publishing columns to posts table
ALTER TABLE public.posts 
ADD COLUMN IF NOT EXISTS scheduled_publish_date timestamp with time zone,
ADD COLUMN IF NOT EXISTS updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL;

-- Create index for efficient scheduled post queries
CREATE INDEX IF NOT EXISTS idx_posts_scheduled_publish 
ON public.posts(scheduled_publish_date) 
WHERE is_published = false AND scheduled_publish_date IS NOT NULL;

-- Update the RLS policy to respect scheduled publish dates
DROP POLICY IF EXISTS "Public posts are viewable by everyone" ON public.posts;

CREATE POLICY "Public posts are viewable by everyone"
ON public.posts FOR SELECT
USING (
  is_published = true 
  AND (
    scheduled_publish_date IS NULL 
    OR scheduled_publish_date <= timezone('utc'::text, now())
  )
);

-- Add trigger to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_posts_updated_at ON public.posts;

CREATE TRIGGER update_posts_updated_at 
BEFORE UPDATE ON public.posts 
FOR EACH ROW 
EXECUTE FUNCTION update_updated_at_column();
