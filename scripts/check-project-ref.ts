import * as fs from 'fs'
import * as path from 'path'

function getProjectRef(url: string) {
    try {
        // Expected format: https://<project-ref>.supabase.co
        const match = url.match(/https:\/\/([^.]+)\./)
        return match ? match[1] : 'Unknown format'
    } catch {
        return 'Error parsing URL'
    }
}

try {
    const envPath = path.resolve(process.cwd(), '.env.local')
    if (fs.existsSync(envPath)) {
        const envContent = fs.readFileSync(envPath, 'utf8')
        const urlLine = envContent.split('\n').find(l => l.includes('NEXT_PUBLIC_SUPABASE_URL'))

        if (urlLine) {
            const url = urlLine.split('=')[1].trim().replace(/["']/g, '')
            const ref = getProjectRef(url)
            console.log('------------------------------------------------')
            console.log('CURRENT PROJECT REF in .env.local:', ref)
            console.log('------------------------------------------------')
            console.log('Check if your Supabase Dashboard URL contains this ID.')
        } else {
            console.log('NEXT_PUBLIC_SUPABASE_URL not found in .env.local')
        }
    } else {
        console.log('.env.local file not found')
    }
} catch (e) {
    console.log('Error:', e)
}
