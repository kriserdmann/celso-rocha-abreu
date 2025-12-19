import { MercadoPagoConfig, Preference } from 'mercadopago';
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const client = new MercadoPagoConfig({ accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN! });
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: Request) {
    try {
        // Parse request body
        const { items, payer, checkoutType } = await req.json();


        // 1. Calculate total
        const totalAmount = items.reduce((sum: number, item: any) => sum + (Number(item.price) * Number(item.quantity)), 0);
        console.log('Total calculated:', totalAmount);

        // 2. Create Order in Supabase
        console.log('Attempting Insert Order...');
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

        if (orderError) {
            console.error('Supabase Order Insert Error:', JSON.stringify(orderError, null, 2));
            throw new Error(`Erro ao criar pedido: ${orderError.message}`);
        }
        console.log('Order created:', order.id);

        // 3. Create Order Items
        console.log('Attempting Insert Items...');
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

        if (itemsError) {
            console.error('Supabase Items Insert Error:', JSON.stringify(itemsError, null, 2));
            throw new Error(`Erro ao criar itens do pedido: ${itemsError.message}`);
        }
        console.log('Items created successfully');

        // IF THIS IS A BRICK CHECKOUT, WE STOP HERE AND RETURN THE ORDER ID
        if (checkoutType === 'brick') {
            console.log('Brick Checkout: Skipping Preference Creation');
            return NextResponse.json({ orderId: order.id, totalAmount });
        }

        // 4. Create Mercado Pago Preference
        console.log('Preparing Mercado Pago Preference...');

        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

        const isLocalhost = baseUrl.includes('localhost');

        const preferenceData: any = {
            external_reference: order.id,
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
                success: `${baseUrl}/checkout/success?order_id=${order.id}`,
                failure: `${baseUrl}/checkout/failure?order_id=${order.id}`,
                pending: `${baseUrl}/checkout/pending?order_id=${order.id}`,
            },
            notification_url: `${baseUrl}/api/webhooks/mercadopago`,
        };

        if (!isLocalhost) {
            preferenceData.auto_return = 'approved';
        }

        console.log('--- PREFERENCE DATA ---');
        console.log(JSON.stringify(preferenceData, null, 2));

        const mpResponse = await fetch('https://api.mercadopago.com/checkout/preferences', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(preferenceData)
        });

        if (!mpResponse.ok) {
            const errorData = await mpResponse.json();
            console.error('MERCADO PAGO API ERROR:', errorData);
            throw new Error(`Mercado Pago API Error: ${mpResponse.statusText} - ${errorData.message || ''}`);
        }

        const response = await mpResponse.json();
        console.log('Mercado Pago preference created:', response.id);

        return NextResponse.json({ url: response.init_point, orderId: order.id });
    } catch (error: any) {
        console.error('Checkout Critical Error:', error);
        return NextResponse.json({ error: error.message || 'Erro ao processar checkout' }, { status: 500 });
    }
}
