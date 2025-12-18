'use client'

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
    Star,
    ShoppingCart,
    CheckCircle,
    Heart,
    Users,
    Award,
    Target,
    Lightbulb,
    Clock,
    Ear,
    BookOpen,
    Download,
} from "@/components/icons"
import Image from "next/image"
import { Header } from "@/components/header"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useCart } from "@/context/cart-context"

interface Book {
    id: string
    title: string
    description: string
    price: number
    category: string
    rating: number
    image_url: string
    features: string[]
    sold: number
}

export default function BookDetailPage() {
    const params = useParams()
    const router = useRouter()
    const { addItem } = useCart()
    const [book, setBook] = useState<Book | null>(null)
    const [loading, setLoading] = useState(true)
    const supabase = createClient()

    useEffect(() => {
        async function fetchBook() {
            if (!params.id) return

            try {
                const { data, error } = await supabase
                    .from('books')
                    .select('*')
                    .eq('id', params.id)
                    .single()

                if (error) throw error

                if (data) {
                    setBook(data)
                }
            } catch (error) {
                console.error('Error fetching book:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchBook()
    }, [params.id])

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1d9b9a]"></div>
            </div>
        )
    }

    if (!book) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Livro não encontrado</h1>
                    <Button asChild>
                        <a href="/">Voltar para a Home</a>
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white">
            <Header />

            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-[#1d9b9a] to-[#16807f] text-white py-20 lg:py-32 pt-32 lg:pt-40">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                                    <BookOpen className="w-6 h-6 text-white" />
                                </div>
                                <span className="text-white/90 font-semibold text-lg">{book.category}</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                                {book.title}
                            </h1>
                            <p className="text-xl md:text-2xl mb-6 opacity-90 leading-relaxed">
                                {book.description}
                            </p>

                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-white/80 text-lg">Adquira o livro por apenas</p>
                                        <p className="text-3xl md:text-4xl font-bold text-white">R$ {book.price.toFixed(2)}</p>
                                        <p className="text-white/80">com FRETE GRÁTIS</p>
                                    </div>
                                    <div className="text-right">
                                        <Button
                                            size="lg"
                                            onClick={() => {
                                                if (book) {
                                                    addItem({
                                                        id: book.id,
                                                        title: book.title,
                                                        price: book.price,
                                                        imageUrl: book.image_url
                                                    })
                                                    router.push('/checkout')
                                                }
                                            }}
                                            className="bg-white text-[#1d9b9a] hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full"
                                        >
                                            <ShoppingCart className="w-5 h-5 mr-2" />
                                            Comprar Agora
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <Image
                                src={book.image_url || '/images/placeholder-book.jpg'}
                                alt={`Capa do livro ${book.title}`}
                                width={400}
                                height={600}
                                className="rounded-2xl shadow-2xl mx-auto"
                            />
                        </div>
                    </div>
                </div>

            </section>

            {/* Features Section */}
            {book.features && book.features.length > 0 && (
                <section className="py-20 lg:py-32">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                                O que você vai encontrar
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {book.features.map((feature, index) => (
                                <Card key={index} className="p-8 border-0 shadow-lg hover:shadow-xl transition-shadow">
                                    <CardContent className="p-0">
                                        <div className="w-16 h-16 bg-[#1d9b9a] rounded-full flex items-center justify-center mx-auto mb-6">
                                            <CheckCircle className="w-8 h-8 text-white" />
                                        </div>
                                        <p className="text-gray-600 text-center text-lg">
                                            {feature}
                                        </p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="container mx-auto px-4 md:px-6 text-center">
                    <h3 className="text-2xl font-bold mb-4">Celso Rocha de Abreu</h3>
                    <p className="text-gray-400 mb-6">Escritor, palestrante e criador do Método OOBA</p>
                    <p className="text-sm text-gray-500">© 2024 Celso Rocha de Abreu. Todos os direitos reservados.</p>
                </div>
            </footer>
        </div>
    )
}
