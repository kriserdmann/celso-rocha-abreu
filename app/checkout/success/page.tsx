'use client'

import { useEffect, Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCart } from '@/context/cart-context'
import { CheckCircle, ArrowRight, QrCode } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { toast } from 'sonner'

function SuccessContent() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const { clearCart } = useCart()
    const orderId = searchParams.get('order_id')
    const paymentId = searchParams.get('collection_id') || searchParams.get('payment_id')
    const status = searchParams.get('status')

    const [paymentData, setPaymentData] = useState<any>(null)

    useEffect(() => {
        if (orderId) {
            clearCart()
            const storedData = localStorage.getItem(`pix_data_${orderId}`) // Using same key for now, maybe rename later
            if (storedData) {
                setPaymentData(JSON.parse(storedData))
            }
        }
    }, [orderId, clearCart])

    const copyPixCode = () => {
        if (paymentData?.point_of_interaction?.transaction_data?.qr_code) {
            navigator.clipboard.writeText(paymentData.point_of_interaction.transaction_data.qr_code)
            toast.success('Código Pix copiado!')
        }
    }

    const openBoleto = () => {
        const ticketUrl = paymentData?.transaction_details?.external_resource_url || paymentData?.transaction_data?.ticket_url
        if (ticketUrl) {
            window.open(ticketUrl, '_blank')
        }
    }

    const getStatusInfo = () => {
        if (status === 'approved') {
            return {
                title: 'Pagamento Aprovado!',
                message: 'Seu pedido foi confirmado e já estamos preparando tudo.',
                color: 'text-green-600',
                bg: 'bg-green-100',
                icon: <CheckCircle className="w-8 h-8 text-green-600" />
            }
        }
        return {
            title: 'Pedido Realizado!',
            message: 'Aguardando confirmação do pagamento.',
            color: 'text-blue-600',
            bg: 'bg-blue-100',
            icon: <CheckCircle className="w-8 h-8 text-blue-600" />
        }
    }

    const statusInfo = getStatusInfo()

    const isPix = paymentData?.point_of_interaction?.type === 'uplift' || paymentData?.point_of_interaction?.type === 'pix' || paymentData?.payment_method_id === 'pix'

    // Check for Boleto URL or Payment Method
    const boletoUrl = paymentData?.transaction_details?.external_resource_url || paymentData?.transaction_data?.ticket_url
    const isBoleto = boletoUrl || (paymentData?.payment_method_id && paymentData?.payment_method_id.includes('bol'))

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <Card className="w-full max-w-md text-center">
                <CardContent className="pt-6 space-y-6">
                    <div className="flex justify-center">
                        <div className={`w-16 h-16 ${statusInfo.bg} rounded-full flex items-center justify-center`}>
                            {statusInfo.icon}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h1 className="text-2xl font-bold text-gray-900">{statusInfo.title}</h1>
                        <p className="text-gray-600">
                            {statusInfo.message}
                        </p>
                    </div>

                    {/* Pix Display Section */}
                    {status === 'pending' && isPix && (
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-left space-y-3">
                            <h3 className="font-semibold text-blue-900 flex items-center justify-center">
                                <QrCode className="w-4 h-4 mr-2" />
                                Pague com Pix
                            </h3>
                            <p className="text-sm text-blue-700 text-center">
                                Utilize o código abaixo para pagar no seu banco:
                            </p>

                            {paymentData?.point_of_interaction?.transaction_data?.qr_code_base64 && (
                                <div className="flex justify-center py-2">
                                    <img
                                        src={`data:image/png;base64,${paymentData.point_of_interaction.transaction_data.qr_code_base64}`}
                                        alt="QR Code Pix"
                                        className="w-48 h-48"
                                    />
                                </div>
                            )}

                            <div className="relative">
                                <textarea
                                    readOnly
                                    value={paymentData?.point_of_interaction?.transaction_data?.qr_code}
                                    className="w-full h-20 text-xs p-2 border rounded bg-white resize-none font-mono"
                                />
                                <Button
                                    size="sm"
                                    onClick={copyPixCode}
                                    className="w-full mt-2 bg-blue-600 hover:bg-blue-700"
                                >
                                    Copiar Código Pix
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Boleto Display Section */}
                    {status === 'pending' && isBoleto && (
                        <div className="bg-gray-100 p-4 rounded-lg border border-gray-200 text-left space-y-3">
                            <h3 className="font-semibold text-gray-900 flex items-center justify-center">
                                📄 Pague com Boleto
                            </h3>
                            <p className="text-sm text-gray-700 text-center">
                                Clique abaixo para visualizar e imprimir seu boleto:
                            </p>

                            {paymentData?.transaction_data?.barcode_number && (
                                <div className="text-center text-sm text-gray-800 font-mono break-all">
                                    <p className="font-semibold">Código de Barras:</p>
                                    <p>{paymentData.transaction_data.barcode_number}</p>
                                </div>
                            )}

                            <Button
                                onClick={openBoleto}
                                className="w-full bg-gray-800 hover:bg-gray-900"
                            >
                                Visualizar Boleto
                            </Button>
                        </div>
                    )}

                    <div className="bg-gray-50 p-4 rounded-lg text-left space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Pedido:</span>
                            <span className="font-medium">{orderId}</span>
                        </div>
                        {paymentId && (
                            <div className="flex justify-between">
                                <span className="text-gray-600">Pagamento:</span>
                                <span className="font-medium">{paymentId}</span>
                            </div>
                        )}
                    </div>

                    <div className="space-y-3">
                        <p className="text-sm text-gray-500">
                            Você receberá os detalhes da compra no seu email.
                        </p>

                        <Link href="/">
                            <Button className="w-full bg-[#1d9b9a] hover:bg-[#16807f]">
                                Voltar para a Loja
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default function CheckoutSuccessPage() {
    return (
        <Suspense fallback={<div>Carregando...</div>}>
            <SuccessContent />
        </Suspense>
    )
}
