import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as path from 'path'

function loadEnv(filename: string) {
    try {
        const envPath = path.resolve(process.cwd(), filename)
        if (!fs.existsSync(envPath)) return {}
        const envFile = fs.readFileSync(envPath, 'utf8')
        const env: Record<string, string> = {}
        envFile.split('\n').forEach(line => {
            const match = line.match(/^([^=]+)=(.*)$/)
            if (match) {
                const key = match[1].trim()
                const value = match[2].trim().replace(/^["']|["']$/g, '')
                env[key] = value
            }
        })
        return env
    } catch {
        return {}
    }
}

const envLocal = loadEnv('.env.local')
const envMain = loadEnv('.env')
const env = { ...envMain, ...envLocal }

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY

console.log('URL:', supabaseUrl ? 'Found' : 'Missing')
console.log('Key:', supabaseAnonKey ? 'Found' : 'Missing')

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing env vars')
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testInsert() {
    console.log('Testing insert order...')

    const { data, error } = await supabase
        .from('orders')
        .insert({
            customer_name: 'Test Debug',
            customer_email: 'test_debug@example.com',
            total_amount: 50,
            status: 'pending'
        })
        .select() // This triggers the select policy
        .single()

    if (error) {
        console.error('Insert Error:', JSON.stringify(error, null, 2))
    } else {
        console.log('Insert Success. ID:', data.id)
        // Try to delete (might fail if delete policy is strict)
        const { error: delError } = await supabase.from('orders').delete().eq('id', data.id)
        if (delError) console.log('Delete failed (expected if no delete policy):', delError.message)
        else console.log('Cleanup successful')
    }
}

testInsert()
