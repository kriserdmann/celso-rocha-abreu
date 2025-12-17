import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
    const supabase = await createClient()

    const email = 'kriartecnologia@gmail.com'
    const password = 'loomine@123'

    // Check if user already exists
    const { data: existingUser } = await supabase
        .from('profiles')
        .select('*')
        .eq('email', email)
        .single()

    if (existingUser) {
        return NextResponse.json({ message: 'User already exists' })
    }

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: 'Loomine Design',
            },
        },
    })

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ message: 'Admin user created successfully', user: data.user })
}
