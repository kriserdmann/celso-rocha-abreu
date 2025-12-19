import * as fs from 'fs'
import * as path from 'path'

// Try to read .env.local manually to check for keys
try {
    const envPath = path.resolve(process.cwd(), '.env.local')
    if (fs.existsSync(envPath)) {
        const envContent = fs.readFileSync(envPath, 'utf8')
        const hasServiceKey = envContent.includes('SUPABASE_SERVICE_ROLE_KEY')
        console.log('Has SUPABASE_SERVICE_ROLE_KEY:', hasServiceKey)
    } else {
        console.log('.env.local not found')
    }
} catch (e) {
    console.log('Error reading .env.local:', e)
}
