import { MercadoPagoConfig, Preference } from 'mercadopago';
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const client = new MercadoPagoConfig({ accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN! });
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: Request) {
    try {
        const { items, payer } = await req.json();

        // 1. Calculate total
        const totalAmount = items.reduce((sum: number, item: any) => sum + (Number(item.price) * Number(item.quantity)), 0);

        // 2. Create Order in Supabase
        const { data: order, error: orderError } = await supabase
            .from('orders')
            .insert({
                customer_name: payer.name,
                customer_email: payer.email,
                customer_cpf: payer.identification.number,
                total_amount: totalAmount,
                status: 'pending',
                created_at: new Date().toISOString(),
                // shipping_address can be added if passed from frontend
            })
            .select()
            .single();

        if (orderError) throw new Error(`Erro ao criar pedido: ${orderError.message}`);

        // 3. Create Order Items
        const orderItems = items.map((item: any) => ({
            order_id: order.id,
            book_id: item.id, // Assuming item.id is the book uuid, if not this might need adjustment or be nullable
            book_title: item.title,
            quantity: Number(item.quantity),
            price: Number(item.price),
            total: Number(item.price) * Number(item.quantity)
        }));

        const { error: itemsError } = await supabase
            .from('order_items')
            .insert(orderItems);

        if (itemsError) throw new Error(`Erro ao criar itens do pedido: ${itemsError.message}`);

        // 4. Create Mercado Pago Preference
        const preference = new Preference(client);

        const preferenceData = {
            body: {
                external_reference: order.id, // Link MP payment to our Order ID
                items: items.map((item: any) => ({
                    id: item.id,
                    title: item.title,
                    quantity: Number(item.quantity),
                    unit_price: Number(item.price),
                    currency_id: 'BRL',
                    picture_url: item.imageUrl,
                })),
                payer: {
                    name: payer.name,
                    email: payer.email,
                    identification: {
                        type: payer.identification.type,
                        number: payer.identification.number,
                    },
                },
                back_urls: {
                    success: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/checkout/success?order_id=${order.id}`,
                    failure: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/checkout/failure?order_id=${order.id}`,
                    pending: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/checkout/pending?order_id=${order.id}`,
                },
                auto_return: 'approved',
                notification_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/webhooks/mercadopago`, // Placeholder for future webhook
            },
        };

        const response = await preference.create(preferenceData);

        return NextResponse.json({ url: response.init_point, orderId: order.id });
    } catch (error: any) {
        console.error('Checkout Error:', error);
        return NextResponse.json({ error: error.message || 'Erro ao processar checkout' }, { status: 500 });
    }
}
