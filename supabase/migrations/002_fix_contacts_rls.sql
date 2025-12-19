-- Allow anonymous users to insert into contacts (for the contact form)
create policy "Enable insert for everyone" on contacts for insert with check (true);

-- Ensure RLS is enabled (good practice, though likely already is)
alter table contacts enable row level security;
