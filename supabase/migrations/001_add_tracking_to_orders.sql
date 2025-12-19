alter table orders 
add column if not exists carrier_name text,
add column if not exists tracking_code text;
