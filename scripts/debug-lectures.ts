import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as path from 'path'

// Manual .env loading
try {
    const envPath = path.resolve(process.cwd(), '.env.local')
    console.log('Loading env from:', envPath)
    const envFile = fs.readFileSync(envPath, 'utf8')
    envFile.split('\n').forEach(line => {
        const match = line.match(/^([^=]+)=(.*)$/)
        if (match) {
            const key = match[1].trim()
            const value = match[2].trim().replace(/^["']|["']$/g, '') // Remove quotes if present
            process.env[key] = value
        }
    })
} catch (e) {
    console.log('Could not read .env.local', e)
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase environment variables')
    console.log('Available keys:', Object.keys(process.env).filter(k => k.startsWith('NEXT_PUBLIC')))
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testFetch() {
    console.log('Testing fetch from "lectures" table...')
    const { data, error } = await supabase
        .from('lectures')
        .select('*')
        .limit(1)

    if (error) {
        console.error('Supabase Error:', JSON.stringify(error, null, 2))
        console.error('Error message:', error.message)
        console.error('Error details:', error.details)
        console.error('Error hint:', error.hint)
        console.error('Error code:', error.code)
    } else {
        console.log('Success! Data:', data)
    }
}

testFetch()
