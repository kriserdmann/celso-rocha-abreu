'use client'

import { useState, useEffect } from 'react'
import { useCart } from '@/context/cart-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Trash2, ArrowLeft, CreditCard, Truck, Plus } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'

import PaymentBrick from '@/components/checkout/payment-brick'

export default function CheckoutPage() {
    const { items, removeItem, updateQuantity, addItem, total } = useCart()
    const router = useRouter()
    const supabase = createClient()
    const [loading, setLoading] = useState(false)
    const [availableBooks, setAvailableBooks] = useState<any[]>([])
    const [showBrick, setShowBrick] = useState(false)
    const [orderId, setOrderId] = useState<string | null>(null)

    useEffect(() => {
        const fetchBooks = async () => {
            const { data } = await supabase
                .from('books')
                .select('*')
                .eq('is_active', true)
                .order('display_order', { ascending: true })

            if (data) setAvailableBooks(data)
        }
        fetchBooks()
    }, [])

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        cpf: '',
        cep: '',
        street: '',
        number: '',
        complement: '',
        neighborhood: '',
        city: '',
        state: ''
    })

    // Redirect if cart is empty
    useEffect(() => {
        if (items.length === 0) {
            // router.push('/') // Commented out to allow viewing empty state for now
        }
    }, [items, router])

    const handleCepBlur = async () => {
        if (formData.cep.length !== 8) return

        try {
            const response = await fetch(`https://viacep.com.br/ws/${formData.cep}/json/`)
            const data = await response.json()

            if (data.erro) {
                toast.error('CEP não encontrado')
                return
            }

            setFormData(prev => ({
                ...prev,
                street: data.logradouro,
                neighborhood: data.bairro,
                city: data.localidade,
                state: data.uf
            }))
            toast.success('Endereço encontrado!')
        } catch (error) {
            console.error('Error fetching CEP:', error)
            toast.error('Erro ao buscar CEP')
        }
    }

    const handlePaymentStart = async (e: React.FormEvent) => {
        e.preventDefault()

        if (items.length === 0) {
            toast.error('Seu carrinho está vazio')
            return
        }

        try {
            setLoading(true)
            // Create Order in Supabase first (using type='brick' to skip preference)
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    items,
                    checkoutType: 'brick',
                    payer: {
                        email: formData.email,
                        name: formData.name,
                        identification: { type: 'CPF', number: formData.cpf }
                    }
                })
            })

            const data = await response.json()

            if (!response.ok) throw new Error(data.error || 'Erro ao criar pedido')

            if (data.orderId) {
                setOrderId(data.orderId)
                setShowBrick(true)
                // Scroll to brick?
            } else {
                throw new Error('ID do pedido não retornado')
            }
        } catch (error: any) {
            console.error('Checkout error:', error)
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    const handlePaymentSuccess = (paymentId: string, status: string, result?: any) => {
        if (status === 'rejected') {
            toast.error('Pagamento recusado pelo banco/operadora. Tente outro cartão.')
            return
        }

        const message = status === 'approved' ? 'Pagamento aprovado!' : 'Pagamento iniciado!'
        toast.success(message)

        // Save Pix data if available
        if (status === 'pending' && result?.point_of_interaction) {
            localStorage.setItem(`pix_data_${orderId}`, JSON.stringify(result.point_of_interaction))
        }

        // Redirect to success page with status
        window.location.href = `/checkout/success?order_id=${orderId}&collection_id=${paymentId}&status=${status}`
    }

    const handlePaymentError = (error: any) => {
        toast.error('Erro no pagamento. Tente novamente.')
        console.error(error)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
                <div className="text-center space-y-4">
                    <h1 className="text-2xl font-bold text-gray-900">Seu carrinho está vazio</h1>
                    <p className="text-gray-600">Adicione alguns livros para continuar.</p>
                    <Link href="/">
                        <Button className="bg-[#1d9b9a] hover:bg-[#16807f]">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Voltar para a Loja
                        </Button>
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <Link href="/" className="text-[#1d9b9a] hover:underline flex items-center">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Continuar Comprando
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900 mt-4">Finalizar Compra</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Checkout Form */}
                    <div className="space-y-6">
                        <form onSubmit={handlePaymentStart}>
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <CreditCard className="w-5 h-5 mr-2 text-[#1d9b9a]" />
                                        Dados Pessoais
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Nome Completo</Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Seu nome completo"
                                            disabled={showBrick}
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                required
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="seu@email.com"
                                                disabled={showBrick}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="cpf">CPF</Label>
                                            <Input
                                                id="cpf"
                                                name="cpf"
                                                required
                                                value={formData.cpf}
                                                onChange={handleChange}
                                                placeholder="000.000.000-00"
                                                disabled={showBrick}
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="mt-6">
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <Truck className="w-5 h-5 mr-2 text-[#1d9b9a]" />
                                        Endereço de Entrega
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="cep">CEP</Label>
                                            <Input
                                                id="cep"
                                                name="cep"
                                                required
                                                value={formData.cep}
                                                onChange={handleChange}
                                                onBlur={handleCepBlur}
                                                placeholder="00000-000"
                                                disabled={showBrick}
                                            />
                                        </div>
                                        <div className="space-y-2 md:col-span-2">
                                            <Label htmlFor="street">Rua</Label>
                                            <Input
                                                id="street"
                                                name="street"
                                                required
                                                value={formData.street}
                                                onChange={handleChange}
                                                readOnly
                                                className="bg-gray-50"
                                                disabled={showBrick}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="number">Número</Label>
                                            <Input
                                                id="number"
                                                name="number"
                                                required
                                                value={formData.number}
                                                onChange={handleChange}
                                                disabled={showBrick}
                                            />
                                        </div>
                                        <div className="space-y-2 md:col-span-2">
                                            <Label htmlFor="complement">Complemento</Label>
                                            <Input
                                                id="complement"
                                                name="complement"
                                                value={formData.complement}
                                                onChange={handleChange}
                                                placeholder="Apto, Bloco, etc."
                                                disabled={showBrick}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="neighborhood">Bairro</Label>
                                            <Input
                                                id="neighborhood"
                                                name="neighborhood"
                                                required
                                                value={formData.neighborhood}
                                                onChange={handleChange}
                                                readOnly
                                                className="bg-gray-50"
                                                disabled={showBrick}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="city">Cidade</Label>
                                            <Input
                                                id="city"
                                                name="city"
                                                required
                                                value={formData.city}
                                                onChange={handleChange}
                                                readOnly
                                                className="bg-gray-50"
                                                disabled={showBrick}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="state">Estado (UF)</Label>
                                            <Input
                                                id="state"
                                                name="state"
                                                required
                                                maxLength={2}
                                                value={formData.state}
                                                onChange={(e) => {
                                                    e.target.value = e.target.value.toUpperCase();
                                                    handleChange(e);
                                                }}
                                                readOnly={false} // Allow editing if CEP fails or returns bad data, though usually readOnly. I'll check handleCepBlur.
                                                className="bg-gray-50 uppercase"
                                                disabled={showBrick}
                                                placeholder="UF"
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    {!showBrick ? (
                                        <Button
                                            type="submit"
                                            className="w-full bg-[#1d9b9a] hover:bg-[#16807f] h-12 text-lg"
                                            disabled={loading}
                                        >
                                            {loading ? 'Preparando...' : 'Ir para Pagamento'}
                                        </Button>
                                    ) : (
                                        <div className="w-full">
                                            <PaymentBrick
                                                amount={total}
                                                orderId={orderId!}
                                                payerEmail={formData.email}
                                                payerName={formData.name}
                                                payerAddress={{
                                                    zip_code: formData.cep,
                                                    street: formData.street,
                                                    number: formData.number,
                                                    neighborhood: formData.neighborhood,
                                                    city: formData.city,
                                                    state: formData.state
                                                }}
                                                onSuccess={handlePaymentSuccess}
                                                onError={handlePaymentError}
                                            />
                                        </div>
                                    )}
                                </CardFooter>
                            </Card>
                        </form>
                    </div>

                    {/* Cart Summary */}
                    <div>
                        <Card className="sticky top-8">
                            <CardHeader>
                                <CardTitle>Resumo do Pedido</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {items.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="w-16 h-24 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                                            <img
                                                src={item.imageUrl}
                                                alt={item.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-medium text-gray-900 line-clamp-2">{item.title}</h3>
                                            <p className="text-[#1d9b9a] font-bold mt-1">
                                                R$ {item.price.toFixed(2).replace('.', ',')}
                                            </p>
                                            <div className="flex items-center mt-2 space-x-2">
                                                <div className="flex items-center border rounded-md">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="px-2 py-1 hover:bg-gray-100"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="px-2 text-sm">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="px-2 py-1 hover:bg-gray-100"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                                    onClick={() => removeItem(item.id)}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <Separator />

                                <div className="space-y-2">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal</span>
                                        <span>R$ {total.toFixed(2).replace('.', ',')}</span>
                                    </div>
                                    <div className="flex justify-between text-green-600 font-medium">
                                        <span>Frete</span>
                                        <span>Grátis</span>
                                    </div>
                                    <Separator />
                                    <div className="flex justify-between text-lg font-bold text-gray-900">
                                        <span>Total</span>
                                        <span>R$ {total.toFixed(2).replace('.', ',')}</span>
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="outline" className="w-full border-dashed border-2">
                                                <Plus className="w-4 h-4 mr-2" />
                                                Adicionar mais itens
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                                            <DialogHeader>
                                                <DialogTitle>Adicionar Livros ao Pedido</DialogTitle>
                                            </DialogHeader>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                                                {availableBooks.map((book) => (
                                                    <div key={book.id} className="flex gap-4 border p-4 rounded-lg">
                                                        <div className="w-20 h-28 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                                                            <img
                                                                src={book.image_url || '/images/placeholder-book.jpg'}
                                                                alt={book.title}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                        <div className="flex flex-col justify-between flex-1">
                                                            <div>
                                                                <h4 className="font-medium text-sm line-clamp-2">{book.title}</h4>
                                                                <p className="text-[#1d9b9a] font-bold mt-1">
                                                                    R$ {book.price.toFixed(2).replace('.', ',')}
                                                                </p>
                                                            </div>
                                                            <Button
                                                                size="sm"
                                                                className="w-full mt-2 bg-[#1d9b9a] hover:bg-[#16807f]"
                                                                onClick={() => {
                                                                    addItem({
                                                                        id: book.id,
                                                                        title: book.title,
                                                                        price: book.price,
                                                                        imageUrl: book.image_url || '/images/placeholder-book.jpg'
                                                                    })
                                                                    toast.success('Livro adicionado!')
                                                                }}
                                                            >
                                                                Adicionar
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
