-- Create users table (managed by Supabase Auth)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text,
  role text check (role in ('user', 'admin')) default 'user',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create tier lists table
create table if not exists public.tier_lists (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  category text not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  likes integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create tier rows table
create table if not exists public.tier_rows (
  id uuid default uuid_generate_v4() primary key,
  tier_list_id uuid references public.tier_lists(id) on delete cascade not null,
  label text not null,
  color text not null,
  position integer not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create tier items table
create table if not exists public.tier_items (
  id uuid default uuid_generate_v4() primary key,
  tier_row_id uuid references public.tier_rows(id) on delete cascade not null,
  image_url text not null,
  position integer not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.profiles enable row level security;
alter table public.tier_lists enable row level security;
alter table public.tier_rows enable row level security;
alter table public.tier_items enable row level security;

-- Create policies
create policy "Users can read any profile"
  on public.profiles for select
  using (true);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can read any tier list"
  on public.tier_lists for select
  using (true);

create policy "Users can create their own tier lists"
  on public.tier_lists for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own tier lists"
  on public.tier_lists for update
  using (auth.uid() = user_id);

create policy "Users can delete their own tier lists"
  on public.tier_lists for delete
  using (auth.uid() = user_id);

-- Similar policies for tier_rows and tier_items
create policy "Users can read any tier row"
  on public.tier_rows for select
  using (true);

create policy "Users can manage their own tier rows"
  on public.tier_rows for all
  using (exists (
    select 1 from public.tier_lists
    where id = tier_list_id
    and user_id = auth.uid()
  ));

create policy "Users can read any tier item"
  on public.tier_items for select
  using (true);

create policy "Users can manage their own tier items"
  on public.tier_items for all
  using (exists (
    select 1 from public.tier_rows r
    join public.tier_lists l on l.id = r.tier_list_id
    where r.id = tier_row_id
    and l.user_id = auth.uid()
  ));