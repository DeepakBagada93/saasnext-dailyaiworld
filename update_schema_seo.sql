-- Add SEO columns to posts table
alter table public.posts
add column if not exists meta_title text,
add column if not exists meta_description text,
add column if not exists keywords text;

-- Create storage bucket for images
insert into storage.buckets (id, name, public)
values ('blog-images', 'blog-images', true)
on conflict (id) do nothing;

-- Allow public access to view images
create policy "Public Access"
  on storage.objects for select
  using ( bucket_id = 'blog-images' );

-- Allow authenticated users (admins) to upload images
create policy "Authenticated Upload"
  on storage.objects for insert
  with check ( bucket_id = 'blog-images' and auth.role() = 'authenticated' );

-- Allow authenticated users to update/delete their images
create policy "Authenticated Update"
  on storage.objects for update
  using ( bucket_id = 'blog-images' and auth.role() = 'authenticated' );

create policy "Authenticated Delete"
  on storage.objects for delete
  using ( bucket_id = 'blog-images' and auth.role() = 'authenticated' );
