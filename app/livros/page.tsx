
'use client'

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Star, ShoppingCart, Heart, Users, Feather, Mountain } from "@/components/icons"
import Image from "next/image"
import { Header } from "@/components/header"
import Link from "next/link"
import { useEffect, useState } from "react"

interface Book {
  id: string
  title: string
  description: string
  price: number
  category: string
  rating: number
  imageUrl: string
  features: string[]
  sold: number
}

export default function LivrosPage() {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    async function fetchBooks() {
      try {
        const { data, error } = await supabase
          .from('books')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: false })

        if (error) throw error

        if (data) {
          setBooks(data.map((book: any) => ({
            id: book.id,
            title: book.title,
            description: book.description || '',
            price: book.price,
            category: book.category || '',
            rating: book.rating || 0,
            imageUrl: book.image_url || '/images/placeholder-book.jpg',
            features: book.features || [],
            sold: book.sold
          })))
        }
      } catch (error) {
        console.error('Error fetching books:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBooks()
  }, [])

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
                <span className="text-white/90 font-semibold text-lg">Biblioteca OOBA</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Livros que Transformam Vidas
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
                Obras cuidadosamente escritas para guiar famílias em sua jornada de conexão, crescimento e descoberta
                dos valores mais profundos da vida.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-white text-[#1d9b9a] hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full"
                >
                  Ver Coleção Completa
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-[#1d9b9a] px-8 py-4 text-lg font-semibold rounded-full bg-transparent"
                >
                  Comprar Conjunto
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/images/livros.jpg"
                alt="Coleção de livros de Celso Rocha"
                width={600}
                height={500}
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Estatísticas dos Livros */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-8 border-0 shadow-lg">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-[#1d9b9a] rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{books.length}</h3>
                <p className="text-gray-600">Livros Publicados</p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 border-0 shadow-lg">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-[#ff6b6b] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">10.000+</h3>
                <p className="text-gray-600">Leitores Impactados</p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 border-0 shadow-lg">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-[#1d9b9a] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">4.8</h3>
                <p className="text-gray-600">Avaliação Média</p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 border-0 shadow-lg">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-[#ff6b6b] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">98%</h3>
                <p className="text-gray-600">Recomendação</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Livros Principais */}
      <section className="py-20 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Nossa Coleção</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Cada livro é uma jornada única de descoberta, crescimento e transformação
            </p>
          </div>

          <div className="space-y-20">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1d9b9a]"></div>
              </div>
            ) : books.length === 0 ? (
              <div className="text-center text-gray-500">Nenhum livro encontrado.</div>
            ) : (
              books.map((book, index) => (
                <div key={book.id} className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                  <div className={`${index % 2 === 1 ? 'lg:order-2' : ''} relative`}>
                    <Image
                      src={book.imageUrl}
                      alt={`Capa do livro ${book.title}`}
                      width={400}
                      height={600}
                      className="rounded-2xl shadow-2xl mx-auto"
                    />
                  </div>
                  <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-12 h-12 ${index % 2 === 0 ? 'bg-[#1d9b9a]' : 'bg-[#ff6b6b]'} rounded-full flex items-center justify-center`}>
                        {index % 2 === 0 ? <Heart className="w-6 h-6 text-white" /> : <Users className="w-6 h-6 text-white" />}
                      </div>
                      <span className={`${index % 2 === 0 ? 'text-[#1d9b9a]' : 'text-[#ff6b6b]'} font-semibold text-lg`}>{book.category}</span>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{book.title}</h3>
                    <p className="text-lg text-gray-600 leading-relaxed mb-6">
                      {book.description}
                    </p>
                    <div className="space-y-3 mb-8">
                      {book.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className={`w-2 h-2 ${index % 2 === 0 ? 'bg-[#1d9b9a]' : 'bg-[#ff6b6b]'} rounded-full`}></div>
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-5 h-5 ${i < Math.floor(book.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                        ))}
                      </div>
                      <span className="text-gray-600">{book.rating}/5 ({book.sold} vendidos)</span>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button className={`${index % 2 === 0 ? 'bg-[#1d9b9a] hover:bg-[#16807f]' : 'bg-[#ff6b6b] hover:bg-[#e55555]'} px-8 py-3 rounded-full font-semibold`}>
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        Comprar Agora
                      </Button>
                      <Button
                        variant="outline"
                        className={`border-${index % 2 === 0 ? '[#1d9b9a]' : '[#ff6b6b]'} text-${index % 2 === 0 ? '[#1d9b9a]' : '[#ff6b6b]'} hover:bg-${index % 2 === 0 ? '[#1d9b9a]' : '[#ff6b6b]'} hover:text-white px-8 py-3 rounded-full font-semibold bg-transparent`}
                        asChild
                      >
                        <Link href={`/livros/${book.id}`}>
                          <BookOpen className="w-5 h-5 mr-2" />
                          Saiba mais
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Depoimentos dos Leitores */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">O que dizem os leitores</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Histórias reais de transformação através da leitura
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="p-8 border-0 shadow-lg">
              <CardContent className="p-0">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic leading-relaxed">
                  "O 'Método OOBA Para a Vida Toda' mudou completamente nossa dinâmica familiar. Aplicamos as técnicas e
                  vemos resultados incríveis todos os dias. Recomendo para todos os pais!"
                </p>
                <div>
                  <p className="font-semibold text-gray-900">Fernanda Lima</p>
                  <p className="text-sm text-gray-500">Mãe de 2 filhos, Porto Alegre</p>
                </div>
              </CardContent>
            </Card>

            <Card className="p-8 border-0 shadow-lg">
              <CardContent className="p-0">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic leading-relaxed">
                  "As '96 Poesias' tocaram meu coração de forma única. Cada verso é uma reflexão profunda sobre a vida.
                  Leio e releio sempre que preciso de inspiração."
                </p>
                <div>
                  <p className="font-semibold text-gray-900">Roberto Mendes</p>
                  <p className="text-sm text-gray-500">Professor, Florianópolis</p>
                </div>
              </CardContent>
            </Card>

            <Card className="p-8 border-0 shadow-lg">
              <CardContent className="p-0">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic leading-relaxed">
                  "'Pais e Filhos' me ajudou a entender como transmitir valores para meus filhos de forma natural e
                  efetiva. Um livro essencial para qualquer pai ou mãe."
                </p>
                <div>
                  <p className="font-semibold text-gray-900">Carla Santos</p>
                  <p className="text-sm text-gray-500">Psicóloga, Curitiba</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Onde Comprar */}
      <section className="py-20 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Onde Comprar</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Disponível nas principais livrarias e plataformas digitais
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <Card className="p-6 border-0 shadow-lg text-center hover:shadow-xl transition-shadow">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-[#1d9b9a] rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Amazon</h3>
                <p className="text-gray-600 text-sm mb-4">Físico e digital</p>
                <Button size="sm" className="bg-[#1d9b9a] hover:bg-[#16807f] rounded-full">
                  Comprar
                </Button>
              </CardContent>
            </Card>

            <Card className="p-6 border-0 shadow-lg text-center hover:shadow-xl transition-shadow">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-[#ff6b6b] rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Saraiva</h3>
                <p className="text-gray-600 text-sm mb-4">Físico e digital</p>
                <Button size="sm" className="bg-[#ff6b6b] hover:bg-[#e55555] rounded-full">
                  Comprar
                </Button>
              </CardContent>
            </Card>

            <Card className="p-6 border-0 shadow-lg text-center hover:shadow-xl transition-shadow">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-[#1d9b9a] rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Americanas</h3>
                <p className="text-gray-600 text-sm mb-4">Físico e digital</p>
                <Button size="sm" className="bg-[#1d9b9a] hover:bg-[#16807f] rounded-full">
                  Comprar
                </Button>
              </CardContent>
            </Card>

            <Card className="p-6 border-0 shadow-lg text-center hover:shadow-xl transition-shadow">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-[#ff6b6b] rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Livraria Cultura</h3>
                <p className="text-gray-600 text-sm mb-4">Físico e digital</p>
                <Button size="sm" className="bg-[#ff6b6b] hover:bg-[#e55555] rounded-full">
                  Comprar
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Chamada para Ação */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-[#1d9b9a] to-[#16807f] text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Comece sua jornada de transformação</h2>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed">
            Escolha o livro que mais ressoa com seu momento atual e inicie uma jornada de descoberta, crescimento e
            conexão familiar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-[#1d9b9a] hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full"
            >
              Comprar Coleção Completa
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-[#1d9b9a] px-8 py-4 text-lg font-semibold rounded-full bg-transparent"
            >
              Falar com o Autor
            </Button>
          </div>
        </div>
      </section>

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
