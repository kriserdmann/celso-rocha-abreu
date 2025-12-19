-- Enable RLS on tables
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Create Policies for Orders
-- Allow Authenticated Users (Admins) to do everything
CREATE POLICY "Enable all for authenticated users on orders"
ON orders
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Allow Service Role (Server-side) to do everything (Implicit, but good to know)
-- Service Role bypasses RLS automatically.

-- Deny Anon (Public) access implicitly by not having a policy for them.
-- But if we want to be explicit or if there was a previous "Enable read access for all users" policy, we should drop it.
-- DROP POLICY IF EXISTS "Enable read access for all users" ON orders; 

-- Create Policies for Order Items
CREATE POLICY "Enable all for authenticated users on order_items"
ON order_items
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Ensure no public access policies exist (Optional cleanup if you had them)
-- DROP POLICY IF EXISTS "Enable read access for all users" ON order_items;
