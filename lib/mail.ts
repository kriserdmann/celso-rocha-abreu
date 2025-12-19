
import nodemailer from 'nodemailer'
import { createClient } from '@supabase/supabase-js'

// Need to use a service role or anon key that has access to settings
// Or, passed client. For now we create a new client for simplicity in the util
// But normally we'd pass the client or settings.
// Let's make it accept settings or fetch them if not provided.

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
// Use Service Role Key for backend operations to bypass RLS
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

interface SendEmailParams {
    to: string;
    subject: string;
    html: string;
}

export async function sendEmail({ to, subject, html }: SendEmailParams) {
    try {
        // Fetch settings
        const { data: settings, error } = await supabase
            .from('site_settings')
            .select('*')
            .single()

        if (error || !settings) {
            console.error('Failed to fetch site settings for email', error)
            return false
        }

        if (!settings.email_notifications || !settings.smtp_settings?.server) {
            console.log('Email notifications disabled or missing SMTP config')
            return false
        }

        const transporter = nodemailer.createTransport({
            host: settings.smtp_settings.server,
            port: settings.smtp_settings.port,
            secure: settings.smtp_settings.port === 465, // true for 465, false for other ports
            auth: {
                user: settings.smtp_settings.user,
                pass: settings.smtp_settings.password,
            },
        })

        const mailOptions = {
            from: `"${settings.admin_name}" <${settings.smtp_settings.user}>`,
            to,
            subject,
            html,
        }

        await transporter.sendMail(mailOptions)
        return true

    } catch (error) {
        console.error('Error sending email:', error)
        return false
    }
}
