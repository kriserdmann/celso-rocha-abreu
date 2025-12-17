import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const body = await request.json()
    const { name, email, phone, subject, type, message } = body

    // 1. Save to database
    const { data: contactData, error: dbError } = await supabase
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
      .select()

    if (dbError) {
      console.error('Database error:', dbError)
      return NextResponse.json({ error: 'Erro ao salvar mensagem' }, { status: 500 })
    }

    // 2. Fetch settings for email
    const { data: settings } = await supabase
      .from('site_settings')
      .select('*')
      .single()

    if (settings?.email_notifications && settings?.smtp_settings?.server) {
      try {
        const transporter = nodemailer.createTransport({
          host: settings.smtp_settings.server,
          port: settings.smtp_settings.port,
          secure: settings.smtp_settings.ssl,
          auth: {
            user: settings.smtp_settings.user,
            pass: settings.smtp_settings.password, // Note: In a real app, this should be decrypted/handled securely
          },
        })

        const mailOptions = {
          from: `"${settings.admin_name}" <${settings.smtp_settings.user}>`,
          to: settings.contact_email || settings.admin_email,
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
          `,
        }

        await transporter.sendMail(mailOptions)
      } catch (emailError) {
        console.error('Email sending error:', emailError)
        // Don't fail the request if email fails, just log it
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Request error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
