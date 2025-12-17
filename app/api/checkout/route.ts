import { MercadoPagoConfig, Preference } from 'mercadopago';
import { NextResponse } from 'next/server';

const client = new MercadoPagoConfig({ accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN! });

export async function POST(req: Request) {
    try {
        const { items, payer } = await req.json();

        const preference = new Preference(client);

        const preferenceData = {
            body: {
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
                    success: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/checkout/success`,
                    failure: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/checkout/failure`,
                    pending: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/checkout/pending`,
                },
                auto_return: 'approved',
            },
        };

        const response = await preference.create(preferenceData);

        return NextResponse.json({ url: response.init_point });
    } catch (error: any) {
        console.error('Mercado Pago Error:', error);
        return NextResponse.json({ error: error.message || 'Erro ao criar preferência' }, { status: 500 });
    }
}
