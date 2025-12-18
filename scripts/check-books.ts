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
            const value = match[2].trim().replace(/^["']|["']$/g, '')
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
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function checkBooks() {
    console.log('Checking "books" table...')
    const { data, error } = await supabase
        .from('books')
        .select('*')
        .limit(1)

    if (error) {
        console.log('Error fetching books:', error.message)
    } else if (data && data.length > 0) {
        console.log('Books columns:', Object.keys(data[0]))
    } else {
        console.log('Books table empty or no data returned.')
    }
}

checkBooks()
