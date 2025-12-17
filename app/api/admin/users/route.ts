import { createClient } from '@/lib/supabase/server'
import { createClient as createAdminClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        // 1. Check if current user is admin
        const supabase = await createClient()
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single()

        if (profile?.role !== 'admin') {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
        }

        // 2. Parse request body
        const { email, password, role } = await request.json()

        if (!email || !password) {
            return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
        }

        // 3. Create user using service role key
        const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

        if (!serviceRoleKey) {
            return NextResponse.json({ error: 'Server configuration error: Missing service role key' }, { status: 500 })
        }

        const supabaseAdmin = createAdminClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            serviceRoleKey,
            {
                auth: {
                    autoRefreshToken: false,
                    persistSession: false
                }
            }
        )

        const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
            email,
            password,
            email_confirm: true
        })

        if (createError) throw createError

        // 4. Update role if needed (default is client, but if admin is selected)
        // The trigger will create the profile with 'client' (or 'admin' if email matches hardcoded one)
        // We need to update it if the requested role is different from what the trigger assigned
        // OR we can just update it explicitly to be sure.

        if (newUser.user) {
            // Wait a bit for trigger? Or just update directly.
            // Since we are admin, we can update the profile.
            // But we need to wait for the trigger to create the profile first, 
            // or we can upsert.

            // Actually, since we have the service role client, we can insert/update the profile directly
            // bypassing RLS if needed, but the trigger should handle creation.
            // Let's just update the role using the admin client (which bypasses RLS).

            const { error: updateError } = await supabaseAdmin
                .from('profiles')
                .update({ role: role || 'client' })
                .eq('id', newUser.user.id)

            if (updateError) {
                console.error('Error updating role:', updateError)
                // Continue, as user is created
            }
        }

        return NextResponse.json({ user: newUser.user })
    } catch (error: any) {
        console.error('Error creating user:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function DELETE(request: Request) {
    try {
        // 1. Check if current user is admin
        const supabase = await createClient()
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single()

        if (profile?.role !== 'admin') {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
        }

        // 2. Parse request body
        const { userId } = await request.json()

        if (!userId) {
            return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
        }

        // 3. Delete user using service role key
        const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

        if (!serviceRoleKey) {
            return NextResponse.json({ error: 'Server configuration error: Missing service role key' }, { status: 500 })
        }

        const supabaseAdmin = createAdminClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            serviceRoleKey,
            {
                auth: {
                    autoRefreshToken: false,
                    persistSession: false
                }
            }
        )

        const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(userId)

        if (deleteError) throw deleteError

        return NextResponse.json({ success: true })
    } catch (error: any) {
        console.error('Error deleting user:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
