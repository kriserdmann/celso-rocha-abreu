import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import { sendEmail } from '@/lib/mail'

// Use Service Role Key to look up order details and send email
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

export async function POST(request: Request) {
    try {
        const { orderId, carrierName, trackingCode, trackingUrl } = await request.json()

        // 1. Fetch Order Details to get customer email
        const { data: order, error } = await supabase
            .from('orders')
            .select('customer_email, customer_name')
            .eq('id', orderId)
            .single()

        if (error || !order) {
            console.error('Order not found', error)
            return NextResponse.json({ error: 'Order not found' }, { status: 404 })
        }

        // 2. Send Email
        await sendEmail({
            to: order.customer_email,
            subject: `💌 Boas notícias: Um pacote especial foi enviado para você`,
            html: `
            <p>Olá, ${order.customer_name},</p>
            <p><em>"Livros são cartas que escrevemos para o futuro..."</em></p>
            <p>O seu pedido <strong>#${orderId.slice(0, 8)}</strong> acaba de ser despachado. Preparamos o envio com todo o cuidado para que sua experiência comece antes mesmo de abrir a primeira página.</p>
            
            <h3>Detalhes do envio:</h3>
            <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #1d9b9a; margin: 20px 0;">
                <p><strong>Transportadora:</strong> ${carrierName}</p>
                <p><strong>Código de Rastreio:</strong> ${trackingCode}</p>
            </div>

            <p>Você pode acompanhar o trajeto clicando no link abaixo:</p>
            <p>
                <a href="${trackingUrl}" target="_blank" style="background-color: #1d9b9a; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                    👉 Acompanhar Entrega
                </a>
            </p>
            <br/>
            <p>Obrigado por levar nossas palavras para dentro do seu lar.</p>
            <p><strong>Celso Rocha de Abreu</strong></p>
        `
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Request error:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
