import { createClient } from '@supabase/supabase-js'

// Credentials provided by user
const SUPABASE_URL = 'https://ruxvxxnruhhnknvvzkys.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ1eHZ4eG5ydWhobmtudnZ6a3lzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4NDkzNjMsImV4cCI6MjA4MDQyNTM2M30.7uXT4ruMT8yg7cu1KqnYevAlWa_Ycx9WpqxjJJcazM0'

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

async function testConnectionAndInsert() {
    console.log('--- Testing Connection with Provided Credentials ---')
    console.log('Target URL:', SUPABASE_URL)

    // 1. Test Read (should work if public read is on)
    const { data: readData, error: readError } = await supabase
        .from('orders')
        .select('count')
        .limit(1)
        .maybeSingle()

    if (readError) {
        console.error('READ FAILED:', readError)
    } else {
        console.log('READ SUCCESS. Connection OK.')
    }

    // 2. Test Insert (The critical part)
    console.log('\n--- Attempting Insert into ORDERS ---')
    const { data, error } = await supabase
        .from('orders')
        .insert({
            customer_name: 'Auth Test User',
            customer_email: 'authtest@example.com',
            total_amount: 123.45,
            status: 'pending'
        })
        .select()
        .single()

    if (error) {
        console.error('INSERT FAILED:', JSON.stringify(error, null, 2))
        console.log('\nDIAGNOSIS: If this failed with UNAUTHORIZED, RLS is definitely ACTIVE/BLOCKING on the server, regardless of the Dashboard UI.')
    } else {
        console.log('INSERT SUCCESS! ID:', data.id)
        console.log('\nDIAGNOSIS: The credentials and database permissions are CORRECT.')
        console.log('This means your Next.js server was using old cached credentials. A restart is required.')

        // Cleanup
        await supabase.from('orders').delete().eq('id', data.id)
    }
}

testConnectionAndInsert()
