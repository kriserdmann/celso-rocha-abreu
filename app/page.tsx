"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Ear, Clock, Users, Star, BookOpen, Mic, ShoppingCart } from "@/components/icons"
import Image from "next/image"
import { Header } from "@/components/header"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { useEffect, useState } from "react"
import { useCart } from "@/context/cart-context"
import { useRouter } from "next/navigation"

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

export default function LandingPage() {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()
  const router = useRouter()
  const { addItem } = useCart()

  useEffect(() => {
    async function fetchBooks() {
      try {
        const { data, error } = await supabase
          .from('books')
          .select('*')
          .eq('is_active', true)
          .order('display_order', { ascending: true })
          .limit(4)

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
      <section className="relative bg-[#1d9b9a] pt-16 lg:pt-20 pb-0">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-2xl self-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-gray-900">
                Transforme sua família com amor, conexão e propósito
              </h1>
              <p className="text-lg md:text-xl mb-8 text-gray-600 leading-relaxed">
                Descubra o poder do Método OOBA – Olhar, Ouvir, Bendizer e Abraçar.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-[#1d9b9a] hover:bg-[#16807f] text-white px-8 py-4 text-lg font-semibold rounded-full"
                >
                  Conheça o Método OOBA
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-[#1d9b9a] text-[#1d9b9a] hover:bg-[#1d9b9a] hover:text-white px-8 py-4 text-lg font-semibold rounded-full bg-transparent"
                >
                  Agende uma palestra
                </Button>
              </div>
            </div>
            <div className="relative flex items-end h-full" style={{ minHeight: 0 }}>
              <Image
                src="/images/capa-celso-2.png"
                alt="Celso Rocha de Abreu - Palestrante e criador do Método OOBA"
                width={500}
                height={600}
                className="w-full h-auto object-contain m-0 p-0"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sobre o Método OOBA */}
      <section className="py-10 lg:py-16 mt-0">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative">
              <Image
                src="/images/metodo-ooba.jpg"
                alt="Família conectada - Método OOBA"
                width={600}
                height={500}
                className="rounded-2xl shadow-2xl"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">O Método OOBA</h2>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8">
                Uma abordagem revolucionária que combina amor, limites e comunicação autêntica para fortalecer os laços
                familiares. O OOBA não é apenas um método, é uma filosofia de vida que transforma a maneira como pais e
                filhos se conectam, criando memórias afetivas que duram para sempre.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-[#1d9b9a] rounded-full flex items-center justify-center shrink-0">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">Conexão Absoluta</h3>
                  <p className="text-gray-600">Baseado em anos de pesquisa, depoimentos, escuta e observação,  compilando com exemplos de êxito e aplicando na própria família, bem como em centenas de outras famílias que vivenciaram esta plena harmonia.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Pilares do Método OOBA */}
      <section className="py-20 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Os 4 Atos do OOBA</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Fundamentos essenciais para construir relacionamentos familiares sólidos e duradouros
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-8 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-0">
                <div className="w-20 h-20 bg-[#1d9b9a] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Olhar</h3>
                <p className="text-gray-600">
                  Desenvolver a habilidade de enxergar além do que os olhos veem. Colocar em prática seu poder de pai e mãe sobre as atitudes, sentimentos e emoções.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-0">
                <div className="w-20 h-20 bg-[#ff6b6b] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Ear className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Ouvir</h3>
                <p className="text-gray-600">
                  Ativar as Técnicas para ouvir verdadeiramente seus filhos, validando sentimentos e fortalecendo a confiança.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-0">
                <div className="w-20 h-20 bg-[#1d9b9a] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Clock className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Bendizer</h3>
                <p className="text-gray-600">
                  Saber como utilizar esta poderosa ferramenta para construir as capacidades dos seus filhos, na medida e momento certo, sem ferir seu inconsciente.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-0">
                <div className="w-20 h-20 bg-[#ff6b6b] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Abraçar</h3>
                <p className="text-gray-600">
                  Envolvolvimento ativo de todos os membros da família na construção da convivência harmoniosa.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Palestras */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative">
              <Image
                src="/images/palestras-celso-diana.jpg"
                alt="Celso Rocha palestrando"
                width={600}
                height={400}
                className="rounded-2xl shadow-2xl"
              />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Mic className="w-8 h-8 text-[#1d9b9a]" />
                <span className="text-[#1d9b9a] font-semibold text-lg">Palestras Transformadoras</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Inspire sua comunidade</h2>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8">
                As palestras de Celso e Diana Abreu já impactaram milhares de famílias no Sul brasileiro.  Com uma abordagem prática, calorosa e leve, onde compartilham as ferramentas concretas para transformar os relacionamentos familiares, criando legados do verdadeiro amor.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#1d9b9a] rounded-full"></div>
                  <span className="text-gray-700">Mais de 500 palestras realizadas</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#1d9b9a] rounded-full"></div>
                  <span className="text-gray-700">Conteúdo adaptado para cada público</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#1d9b9a] rounded-full"></div>
                  <span className="text-gray-700">Resultados comprovados e duradouros</span>
                </div>
              </div>
              <Button
                size="lg"
                className="bg-[#1d9b9a] hover:bg-[#16807f] px-8 py-4 text-lg font-semibold rounded-full"
              >
                Agendar agora
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Livros */}
      <section className="py-20 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <BookOpen className="w-8 h-8 text-[#1d9b9a]" />
              <span className="text-[#1d9b9a] font-semibold text-lg">Biblioteca OOBA</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Livros que transformam vidas
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Obras cuidadosamente escritas para guiar famílias em sua jornada de conexão e crescimento
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {loading ? (
              <div className="col-span-2 flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1d9b9a]"></div>
              </div>
            ) : books.length === 0 ? (
              <div className="col-span-2 text-center text-gray-500">Nenhum livro encontrado.</div>
            ) : (
              books.map((book) => (
                <Card key={book.id} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow flex flex-col h-full">
                  <div className="relative">
                    <Image
                      src={book.imageUrl}
                      alt={`Capa do livro ${book.title}`}
                      width={240}
                      height={300}
                      className="w-full h-64 object-cover"
                    />
                    {book.category && (
                      <div className="absolute top-3 right-3 bg-[#1d9b9a] text-white px-3 py-1 rounded-full text-xs font-semibold">
                        {book.category}
                      </div>
                    )}
                  </div>
                  <CardContent className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{book.title}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed text-sm flex-grow line-clamp-3">
                      {book.description}
                    </p>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < Math.floor(book.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">{book.rating}/5</span>
                    </div>
                    <div className="space-y-2 mt-auto">
                      <Button className="w-full bg-[#1d9b9a] hover:bg-[#16807f] rounded-full text-sm" asChild>
                        <Link href={`/livros/${book.id}`}>Ver detalhes</Link>
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full rounded-full text-sm bg-transparent"
                        onClick={() => {
                          addItem({
                            id: book.id,
                            title: book.title,
                            price: book.price,
                            imageUrl: book.imageUrl
                          })
                          router.push('/checkout')
                        }}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        R$ {book.price.toFixed(2)}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              className="bg-[#1d9b9a] hover:bg-[#16807f] px-8 py-4 text-lg font-semibold rounded-full"
              asChild
            >
              <Link href="/livros">
                <BookOpen className="w-6 h-6 mr-3" />
                Ver Todos os Livros
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Vidas transformadas</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Histórias reais de famílias que descobriram o poder do Método OOBA
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
                  "O Método OOBA revolucionou nossa família. Meus filhos agora se sentem verdadeiramente ouvidos e nossa
                  comunicação nunca foi tão profunda. Gratidão eterna ao Celso!"
                </p>
                <div>
                  <p className="font-semibold text-gray-900">Maria Silva</p>
                  <p className="text-sm text-gray-500">Mãe de 3 filhos, São Paulo</p>
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
                  "A palestra do Celso foi um divisor de águas. Aprendi a equilibrar amor e limites de forma natural.
                  Meu relacionamento com minha filha adolescente se transformou completamente."
                </p>
                <div>
                  <p className="font-semibold text-gray-900">João Santos</p>
                  <p className="text-sm text-gray-500">Pai e empresário, Rio de Janeiro</p>
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
                  "Os livros do Celso são tesouros. 'Pais e Filhos' me deu ferramentas práticas que uso diariamente.
                  Nossa casa se tornou um ambiente de mais amor e compreensão."
                </p>
                <div>
                  <p className="font-semibold text-gray-900">Ana Costa</p>
                  <p className="text-sm text-gray-500">Educadora e mãe, Belo Horizonte</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Chamada Final */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-[#1d9b9a] to-[#16807f] text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Pronto para transformar sua família?</h2>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed">
            Não deixe para amanhã a oportunidade de fortalecer os laços com quem você mais ama. Entre em contato e
            descubra como o Método OOBA pode revolucionar sua família.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-[#1d9b9a] hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full"
            >
              Agendar uma palestra
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-[#1d9b9a] px-8 py-4 text-lg font-semibold rounded-full bg-transparent"
            >
              Tirar dúvidas
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
