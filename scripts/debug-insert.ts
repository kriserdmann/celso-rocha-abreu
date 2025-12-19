import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as path from 'path'

function getEnvVar(key: string): string | undefined {
    // Try process.env first
    if (process.env[key]) return process.env[key]

    // Manual parsing of .env.local
    try {
        const envPath = path.resolve(process.cwd(), '.env.local')
        if (fs.existsSync(envPath)) {
            const content = fs.readFileSync(envPath, 'utf8')
            const line = content.split('\n').find(l => l.startsWith(`${key}=`))
            if (line) {
                return line.split('=')[1].trim().replace(/^["']|["']$/g, '')
            }
        }
    } catch (e) { }
    return undefined
}

const supabaseUrl = getEnvVar('NEXT_PUBLIC_SUPABASE_URL')
const supabaseKey = getEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY')

console.log('Env Check:')
console.log('URL:', supabaseUrl ? 'Found' : 'MISSING')
console.log('Start of Local Key:', supabaseKey ? supabaseKey.substring(0, 10) + '...' : 'MISSING')

if (!supabaseUrl || !supabaseKey) {
    console.error('CRITICAL: Missing environment variables. Cannot Connect.')
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function debugInsert() {
    console.log('\n--- Attempting Insert into ORDERS ---')
    const { data, error } = await supabase
        .from('orders')
        .insert({
            customer_name: 'Debug User',
            customer_email: 'debug@test.com',
            total_amount: 10.00,
            status: 'debug_pending'
        })
        .select()
        .single()

    if (error) {
        console.error('INSERT FAILED:')
        console.error(JSON.stringify(error, null, 2))
    } else {
        console.log('INSERT SUCCESS! New ID:', data.id)

        console.log('\n--- Attempting Insert into ORDER_ITEMS ---')
        const { error: itemError } = await supabase
            .from('order_items')
            .insert({
                order_id: data.id,
                book_title: 'Debug Book',
                quantity: 1,
                price: 10.00,
                total: 10.00
            })

        if (itemError) {
            console.error('ITEM INSERT FAILED:')
            console.error(JSON.stringify(itemError, null, 2))
        } else {
            console.log('ITEM INSERT SUCCESS!')
        }

        // Clean up
        console.log('\n--- Cleaning up ---')
        await supabase.from('orders').delete().eq('id', data.id)
    }
}

debugInsert()
