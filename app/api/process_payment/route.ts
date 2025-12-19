import { MercadoPagoConfig, Payment } from 'mercadopago';
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { sendEmail } from '@/lib/mail';

const client = new MercadoPagoConfig({ accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN! });
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { formData, orderId } = body;

        // 1. Process Payment with Mercado Pago
        const payment = new Payment(client);

        const paymentData = {
            transaction_amount: formData.transaction_amount,
            token: formData.token,
            description: formData.description,
            payment_method_id: formData.payment_method_id,
            issuer_id: formData.issuer_id,
            payer: {
                email: formData.payer.email,
                first_name: formData.payer.first_name,
                last_name: formData.payer.last_name,
                identification: {
                    type: formData.payer.identification?.type || 'CPF',
                    number: formData.payer.identification?.number || '00000000000'
                },
                address: {
                    zip_code: formData.payer.address.zip_code,
                    street_name: formData.payer.address.street_name,
                    street_number: formData.payer.address.street_number,
                    neighborhood: formData.payer.address.neighborhood,
                    city: formData.payer.address.city,
                    federal_unit: formData.payer.address.federal_unit
                }
            },
            external_reference: orderId,
            installments: formData.installments
        };

        const result = await payment.create({ body: paymentData });



        // 2. Update Order in Supabase
        if (result.id) {
            let orderStatus = result.status;
            if (result.status === 'approved') {
                orderStatus = 'paid';


                // Fetch order items for the email
                const { data: orderData } = await supabase
                    .from('orders')
                    .select('*, items:order_items(*)')
                    .eq('id', orderId)
                    .single();

                const itemsList = orderData?.items?.map((item: any) =>
                    `${item.quantity}x ${item.book_title}`
                ).join('<br/>') || 'Itens do pedido';

                const customerName = formData.payer.name ? ` ${formData.payer.name}` : '';
                const shortOrderId = orderId.slice(0, 8); // Correction for "last characters" or just short ID. User asked for "...7a950b725516", I will use full ID or slice end. User request: "...7a950b725516 (Sugerido: mostrar apenas os últimos caracteres)". I'll use slice(-12) for "last characters".
                const displayOrderId = `...${orderId.slice(-12)}`;

                // --- SEND EMAILS ---
                // 1. Customer Email
                await sendEmail({
                    to: formData.payer.email,
                    subject: 'Recebemos seu pedido! Começa aqui uma nova jornada 📚',
                    html: `
                        <div style="font-family: sans-serif; color: #333;">
                            <p>Olá!${customerName}</p>
                            <p>Que alegria! Seu pagamento foi aprovado e o pedido <strong>#${shortOrderId}</strong> já está confirmado em nosso sistema.</p>
                            <p>Você acaba de investir em conhecimento e conexão para sua família. Estamos honrados em fazer parte desse capítulo da sua história.</p>
                            
                            <h3>Resumo da Compra:</h3>
                            <p>
                                <strong>Valor Total:</strong> R$ ${formData.transaction_amount.toFixed(2)}<br/>
                                <strong>Status:</strong> ✅ Pagamento Aprovado
                            </p>

                            <p>O que acontece agora? Nossa equipe já está separando seus livros com todo cuidado. Assim que o pacote for postado nos Correios, enviaremos um novo e-mail com o código de rastreio.</p>

                            <p>Obrigado pela confiança!</p>
                            <p>Com carinho, Celso Rocha de Abreu</p>
                        </div>
                    `
                });

                // 2. Admin Email
                // Fetch admin email
                const { data: adminSettings } = await supabase.from('site_settings').select('contact_email, admin_email').single();
                const adminEmail = adminSettings?.contact_email || adminSettings?.admin_email;

                if (adminEmail) {
                    await sendEmail({
                        to: adminEmail,
                        subject: `🔔 Nova Venda: R$ ${formData.transaction_amount.toFixed(2)} (${formData.payer.email})`,
                        html: `
                            <div style="font-family: sans-serif; color: #333;">
                                <h2>Nova Venda Realizada! 📦</h2>
                                <p>Um novo pedido acabou de ser processado com sucesso.</p>
                                <p>
                                    <strong>Cliente:</strong> ${formData.payer.name || 'Nome não informado'}<br/>
                                    <strong>Email:</strong> ${formData.payer.email}
                                </p>

                                <p><strong>Itens Vendidos:</strong></p>
                                <p>${itemsList}</p>

                                <p>
                                    <strong>Valor Total:</strong> R$ ${formData.transaction_amount.toFixed(2)}<br/>
                                    <strong>ID do Pedido:</strong> ${displayOrderId}
                                </p>

                                <br/>
                                <a href="${process.env.NEXT_PUBLIC_BASE_URL}/admin/vendas" style="background-color: #000; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">VER PEDIDO NO PAINEL</a>
                            </div>
                        `
                    });
                }
            } else if (formData.payment_method_id === 'pix' && result.status === 'pending') {
                // --- PIX PENDING EMAIL ---
                const qrCode = result.point_of_interaction?.transaction_data?.qr_code;

                await sendEmail({
                    to: formData.payer.email,
                    subject: 'Pague seu pedido via Pix 💠',
                    html: `
                        <div style="font-family: sans-serif; color: #333;">
                            <h2>Quase lá!</h2>
                            <p>Seu pedido <strong>#${orderId.slice(0, 8)}</strong> foi recebido. Para concluir, utilize o código Pix abaixo:</p>
                            
                            <div style="background-color: #f4f4f4; padding: 15px; border-radius: 8px; word-break: break-all; margin: 20px 0;">
                                <code style="font-size: 14px;">${qrCode}</code>
                            </div>

                            <p><strong>Valor:</strong> R$ ${formData.transaction_amount.toFixed(2)}</p>
                            <p>Após o pagamento, a aprovação é instantânea!</p>
                        </div>
                    `
                });
            } else if ((formData.payment_method_id.includes('bol') || formData.payment_method_id === 'pec') && result.status === 'pending') {
                // --- BOLETO/PEC EMAIL ---
                const ticketUrl = result.transaction_details?.external_resource_url || result.point_of_interaction?.transaction_data?.ticket_url;

                if (ticketUrl) {
                    await sendEmail({
                        to: formData.payer.email,
                        subject: 'Seu Boleto Chegou! 📄',
                        html: `
                            <div style="font-family: sans-serif; color: #333;">
                                <h2>Pedido Realizado!</h2>
                                <p>Seu pedido <strong>#${orderId.slice(0, 8)}</strong> foi recebido.</p>
                                <p>Para concluir a compra, acesse seu boleto no link abaixo:</p>
                                
                                <div style="margin: 20px 0;">
                                    <a href="${ticketUrl}" target="_blank" style="background-color: #333; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                                        VISUALIZAR BOLETO
                                    </a>
                                </div>

                                <p style="font-size: 14px; color: #666;">
                                    Ou copie e cole este link no seu navegador:<br/>
                                    <a href="${ticketUrl}">${ticketUrl}</a>
                                </p>

                                <p><strong>Valor:</strong> R$ ${formData.transaction_amount.toFixed(2)}</p>
                                <p>O pagamento será confirmado em até 3 dias úteis.</p>
                            </div>
                        `
                    });
                }
            }

            const { error: updateError } = await supabase
                .from('orders')
                .update({
                    status: orderStatus, // 'paid', 'pending', etc.
                    payment_id: result.id.toString(),
                    payment_method: formData.payment_method_id
                })
                .eq('id', orderId);

            if (updateError) {
                console.error('Error updating order:', updateError);
            }
        }

        return NextResponse.json({
            status: result.status,
            id: result.id,
            detail: result.status_detail,
            point_of_interaction: result.point_of_interaction, // Pix Data
            transaction_details: result.transaction_details // Boleto URL often here
        });

    } catch (error: any) {
        console.error('Payment Processing Error:', error);
        return NextResponse.json({
            error: error.message || 'Erro ao processar pagamento'
        }, { status: 500 });
    }
}
