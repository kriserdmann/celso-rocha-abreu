-- Create a table for public profiles
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text,
  role text default 'client' check (role in ('admin', 'client')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS)
alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone." on public.profiles
  for select using (true);

create policy "Users can insert their own profile." on public.profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on public.profiles
  for update using (auth.uid() = id);

create policy "Admins can update any profile." on public.profiles
  for update using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, role)
  values (
    new.id,
    new.email,
    case
      when new.email = 'kriartecnologia@gmail.com' then 'admin'
      else 'client'
    end
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to call the function on new user creation
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Create a storage bucket for book covers
insert into storage.buckets (id, name, public)
values ('book-covers', 'book-covers', true)
on conflict (id) do nothing;

-- Set up RLS for storage
create policy "Cover images are publicly accessible." on storage.objects
  for select using (bucket_id = 'book-covers');

create policy "Admins can upload cover images." on storage.objects
  for insert with check (bucket_id = 'book-covers' and auth.role() = 'authenticated');

create policy "Admins can update cover images." on storage.objects
  for update using (bucket_id = 'book-covers' and auth.role() = 'authenticated');

create policy "Admins can delete cover images." on storage.objects
  for delete using (bucket_id = 'book-covers' and auth.role() = 'authenticated');

-- Add display_order to books table
alter table public.books add column if not exists display_order integer default 0;

-- Create site_settings table
create table if not exists public.site_settings (
  id integer primary key check (id = 1),
  admin_name text default 'Celso Rocha',
  admin_email text default 'celso@metodoooba.com.br',
  email_notifications boolean default true,
  low_stock_alerts boolean default true,
  new_order_alerts boolean default true,
  payment_methods jsonb default '{"credit_card": true, "pix": true, "boleto": true}'::jsonb,
  smtp_settings jsonb default '{"server": "", "port": 587, "user": "", "ssl": false}'::jsonb,
  contact_email text default 'celso@metodoooba.com.br',
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Insert default settings if not exists
insert into public.site_settings (id) values (1) on conflict (id) do nothing;

-- RLS for site_settings
alter table public.site_settings enable row level security;

create policy "Settings are viewable by everyone." on public.site_settings
  for select using (true);

  for update using (auth.role() = 'authenticated');

-- Create contacts table
create table if not exists public.contacts (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  phone text,
  subject text not null,
  type text not null,
  message text not null,
  status text default 'new' check (status in ('new', 'read', 'archived')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for contacts
alter table public.contacts enable row level security;

create policy "Anyone can insert contacts." on public.contacts
  for insert with check (true);

create policy "Admins can view contacts." on public.contacts
  for select using (auth.role() = 'authenticated');

create policy "Admins can update contacts." on public.contacts
  for update using (auth.role() = 'authenticated');

create policy "Admins can delete contacts." on public.contacts
  for delete using (auth.role() = 'authenticated');
