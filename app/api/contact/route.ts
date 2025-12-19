import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import { sendEmail } from '@/lib/mail'

// Use Service Role Key to bypass RLS for public contact form
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, subject, type, message } = body

    // 1. Save to database (Using Service Key bypasses RLS)
    const { error: dbError } = await supabase
      .from('contacts')
      .insert([
        {
          name,
          email,
          phone,
          subject,
          type,
          message,
          status: 'new'
        }
      ])

    if (dbError) {
      console.error('Database error:', dbError)
      return NextResponse.json({ error: 'Erro ao salvar mensagem' }, { status: 500 })
    }

    // 2. Send Admin Notification using shared utility
    // We already fetch settings inside sendEmail, so we just pass the static admin email if known,
    // or let's use the same logic as process_payment to get the destination.
    // Actually, sendEmail inside logic fetches settings to get SMTP auth, 
    // but the TO address usually comes from settings too (contact_email).

    // We need to fetch settings here to know WHERE to send it, 
    // OR update sendEmail to handle "send to admin" logic?
    // Let's stick to the pattern: Fetch settings to get the "To" address.

    const { data: settings } = await supabase
      .from('site_settings')
      .select('contact_email, admin_email')
      .single()

    const adminEmail = settings?.contact_email || settings?.admin_email

    if (adminEmail) {
      await sendEmail({
        to: adminEmail,
        subject: `Nova Mensagem: ${subject}`,
        html: `
                <h2>Nova mensagem recebida pelo site</h2>
                <p><strong>Nome:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Telefone:</strong> ${phone}</p>
                <p><strong>Tipo:</strong> ${type}</p>
                <p><strong>Assunto:</strong> ${subject}</p>
                <br>
                <p><strong>Mensagem:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
            `
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Request error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
