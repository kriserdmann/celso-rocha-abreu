-- Create orders table
create table if not exists orders (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  customer_name text not null,
  customer_email text not null,
  customer_phone text,
  customer_cpf text,
  shipping_address jsonb,
  total_amount numeric not null,
  status text default 'pending',
  payment_method text,
  payment_id text,
  notes text
);

-- Create order_items table
create table if not exists order_items (
  id uuid default gen_random_uuid() primary key,
  order_id uuid references orders(id) on delete cascade,
  book_id uuid, -- Optional, if you want to link strictly
  book_title text not null,
  quantity integer not null,
  price numeric not null,
  total numeric not null
);

-- Enable RLS (Optional but recommended, keep open for admin for now)
alter table orders enable row level security;
alter table order_items enable row level security;

-- Policies (Simple permissive policies for now to ensure it works)
create policy "Enable read access for all users" on orders for select using (true);
create policy "Enable insert access for all users" on orders for insert with check (true);
create policy "Enable update access for all users" on orders for update using (true);

create policy "Enable read access for all users" on order_items for select using (true);
create policy "Enable insert access for all users" on order_items for insert with check (true);
