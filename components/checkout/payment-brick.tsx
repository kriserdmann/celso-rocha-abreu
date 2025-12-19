'use client'

import { useEffect, useState } from 'react';
import { Payment } from '@mercadopago/sdk-react';
import { initMercadoPago } from '@mercadopago/sdk-react';
import { AlertCircle } from 'lucide-react';

// Initialize MP with Public Key
initMercadoPago(process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY!);

interface PaymentBrickProps {
    amount: number;
    orderId: string;
    payerEmail: string;
    payerName?: string; // Add prop
    payerAddress?: any;
    onSuccess: (paymentId: string, status: string, result?: any) => void;
    onError: (error: any) => void;
}

export default function PaymentBrick({ amount, orderId, payerEmail, payerName, payerAddress, onSuccess, onError }: PaymentBrickProps) {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const initialization = {
        amount: amount,
        payer: {
            email: payerEmail,
            ...(payerName && {
                first_name: payerName.split(' ')[0],
                last_name: payerName.split(' ').slice(1).join(' ') || 'Sobrenome',
            }),
            ...(payerAddress && {
                address: {
                    zip_code: payerAddress.zip_code,
                    street_name: payerAddress.street,
                    street_number: parseInt(payerAddress.number) || 0,
                    neighborhood: payerAddress.neighborhood,
                    city: payerAddress.city,
                    federal_unit: payerAddress.state
                }
            })
        },
    };

    const customization = {
        paymentMethods: {
            creditCard: 'all',
            bankTransfer: 'all',
            ticket: 'all',
        } as any,
        visual: {
            style: {
                theme: 'default' as const,
            }
        }
    };

    const onSubmit = async ({ formData }: any) => {
        setErrorMessage(null); // Clear previous errors
        try {
            // Merge address into formData if provided
            if (payerAddress && formData.payer) {
                formData.payer.address = {
                    zip_code: payerAddress.zip_code,
                    street_name: payerAddress.street, // Mapped locally
                    street_number: payerAddress.number,
                    neighborhood: payerAddress.neighborhood,
                    city: payerAddress.city,
                    federal_unit: payerAddress.state
                };
            }

            const response = await fetch('/api/process_payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    formData,
                    orderId
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Erro ao processar pagamento');
            }

            // Check for rejected status explicitly
            if (result.status === 'rejected') {
                setErrorMessage('Pagamento recusado pelo banco ou operadora. Verifique os dados do cartão e tente novamente.');
                // Throwing error keeps the Brick in "editing" mode so user can retry
                // We use a specific message to identify it in catch
                throw new Error('payment_rejected');
            }

            // onSuccess callback only for approved or pending
            onSuccess(result.id, result.status, result);

        } catch (error: any) {
            console.error(error);
            // Only fire generic onError if it's not our controlled rejection
            if (error.message !== 'payment_rejected') {
                onError(error);
            }
        }
    };

    const onErrorCallback = async (error: any) => {
        console.error('Brick Error:', error);
        // We generally don't want to show generic SDK errors as alerts, 
        // the Brick usually highlights fields. But we pass it up.
        onError(error);
    };

    const onReady = async () => {
        console.log('Brick is ready');
    };

    return (
        <div className="w-full max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-sm border">
            <h2 className="text-lg font-semibold mb-4 text-center">Pagamento Seguro</h2>

            {errorMessage && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center text-red-700 text-sm">
                    <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                    {errorMessage}
                </div>
            )}

            <Payment
                initialization={initialization}
                customization={customization}
                onSubmit={onSubmit}
                onReady={onReady}
                onError={onErrorCallback}
            />
        </div>
    );
}
