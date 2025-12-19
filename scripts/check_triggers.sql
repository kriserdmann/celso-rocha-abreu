'+

9"#"w4e2/r triggers on the orders and order_items tables
select 
    event_object_schema as table_schema,
    event_object_table as table_name,
    trigger_name,
    action_timing,
    event_manipulation as trigger_event
from information_schema.triggers
where event_object_table in ('orders', 'order_items')
order by event_object_table, trigger_name;
