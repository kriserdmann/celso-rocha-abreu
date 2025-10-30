import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Star, ShoppingCart, Heart, Users, Feather, Mountain } from "@/components/icons"
import Image from "next/image"
import { Header } from "@/components/header"
import Link from "next/link"

export default function LivrosPage() {
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
                <h3 className="text-3xl font-bold text-gray-900 mb-2">4</h3>
                <p className="text-gray-600">Livros Publicados</p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 border-0 shadow-lg">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-[#ff6b6b] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">15.000+</h3>
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
            {/* Método OOBA Para a Vida Toda */}
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="relative">
                <Image
                  src="/images/ooba-livro.jpg"
                  alt="Capa do livro Método OOBA Para a Vida Toda"
                  width={400}
                  height={600}
                  className="rounded-2xl shadow-2xl mx-auto"
                />
                <div className="absolute -top-4 -right-4 bg-[#1d9b9a] text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Bestseller
                </div>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-[#1d9b9a] rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-[#1d9b9a] font-semibold text-lg">Guia Completo</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Método OOBA Para a Vida Toda</h3>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  O guia definitivo para aplicar o Método OOBA em todas as fases da vida familiar. Desde a primeira
                  infância até a adolescência, este livro oferece ferramentas práticas e estratégias comprovadas para
                  construir relacionamentos familiares sólidos e duradouros.
                </p>
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#1d9b9a] rounded-full"></div>
                    <span className="text-gray-700">Os 4 pilares explicados em detalhes</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#1d9b9a] rounded-full"></div>
                    <span className="text-gray-700">Casos reais e exemplos práticos</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#1d9b9a] rounded-full"></div>
                    <span className="text-gray-700">Exercícios para aplicação imediata</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#1d9b9a] rounded-full"></div>
                    <span className="text-gray-700">Adaptações para diferentes idades</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-gray-600">4.9/5 (1.247 avaliações)</span>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-[#1d9b9a] hover:bg-[#16807f] px-8 py-3 rounded-full font-semibold">
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Comprar Agora
                  </Button>
                  <Button
                    variant="outline"
                    className="border-[#1d9b9a] text-[#1d9b9a] hover:bg-[#1d9b9a] hover:text-white px-8 py-3 rounded-full font-semibold bg-transparent"
                    asChild
                  >
                    <Link href="/livros/metodo-ooba-livro">
                      <BookOpen className="w-5 h-5 mr-2" />
                      Saiba mais
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Pais e Filhos: Um Legado de Grandes Valores */}
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="lg:order-2 relative">
                <Image
                  src="/images/pais-filhos-capa.jpg"
                  alt="Capa do livro Pais e Filhos: Um Legado de Grandes Valores"
                  width={400}
                  height={600}
                  className="rounded-2xl shadow-2xl mx-auto"
                />
              </div>
              <div className="lg:order-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-[#ff6b6b] rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-[#ff6b6b] font-semibold text-lg">Educação Familiar</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Pais e Filhos: Um Legado de Grandes Valores
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Uma obra profunda sobre a transmissão de valores entre gerações. Este livro explora como pais podem
                  ser mentores efetivos, criando um legado de princípios sólidos que transcendem o tempo e formam o
                  caráter das próximas gerações.
                </p>
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#ff6b6b] rounded-full"></div>
                    <span className="text-gray-700">Estratégias para transmitir valores</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#ff6b6b] rounded-full"></div>
                    <span className="text-gray-700">Formação do caráter infantil</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#ff6b6b] rounded-full"></div>
                    <span className="text-gray-700">Histórias inspiradoras reais</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#ff6b6b] rounded-full"></div>
                    <span className="text-gray-700">Reflexões sobre legado familiar</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-gray-600">4.8/5 (892 avaliações)</span>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-[#ff6b6b] hover:bg-[#e55555] px-8 py-3 rounded-full font-semibold">
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Comprar Agora
                  </Button>
                  <Button
                    variant="outline"
                    className="border-[#ff6b6b] text-[#ff6b6b] hover:bg-[#ff6b6b] hover:text-white px-8 py-3 rounded-full font-semibold bg-transparent"
                    asChild
                  >
                    <Link href="/livros/pais-e-filhos">
                      <BookOpen className="w-5 h-5 mr-2" />
                      Saiba mais
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* 96 Poesias */}
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="relative">
                <Image
                  src="/images/96poesia-capa.jpg"
                  alt="Capa do livro 96 Poesias"
                  width={400}
                  height={600}
                  className="rounded-2xl shadow-2xl mx-auto"
                />
                <div className="absolute -top-4 -right-4 bg-[#1d9b9a] text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Poesia
                </div>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-[#1d9b9a] rounded-full flex items-center justify-center">
                    <Feather className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-[#1d9b9a] font-semibold text-lg">Coletânea Poética</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">96 Poesias</h3>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Uma coletânea sensível e tocante que explora os sentimentos mais profundos da experiência humana.
                  Através de versos cuidadosamente elaborados, este livro convida à reflexão sobre amor, família, fé e
                  os momentos preciosos que dão significado à vida.
                </p>
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#1d9b9a] rounded-full"></div>
                    <span className="text-gray-700">Poesias sobre família e amor</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#1d9b9a] rounded-full"></div>
                    <span className="text-gray-700">Reflexões sobre a vida</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#1d9b9a] rounded-full"></div>
                    <span className="text-gray-700">Momentos de contemplação</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#1d9b9a] rounded-full"></div>
                    <span className="text-gray-700">Linguagem acessível e profunda</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-gray-600">4.7/5 (634 avaliações)</span>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-[#1d9b9a] hover:bg-[#16807f] px-8 py-3 rounded-full font-semibold">
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Comprar Agora
                  </Button>
                  <Button
                    variant="outline"
                    className="border-[#1d9b9a] text-[#1d9b9a] hover:bg-[#1d9b9a] hover:text-white px-8 py-3 rounded-full font-semibold bg-transparent"
                    asChild
                  >
                    <Link href="/livros/96-poesias">
                      <BookOpen className="w-5 h-5 mr-2" />
                      Saiba mais
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* As 8 Maravilhas Naturais de Schroeder em Poesia */}
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="lg:order-2 relative">
                <Image
                  src="/images/maravilhas-capa.jpg"
                  alt="Capa do livro As 8 Maravilhas Naturais de Schroeder em Poesia"
                  width={400}
                  height={600}
                  className="rounded-2xl shadow-2xl mx-auto"
                />
                <div className="absolute -top-4 -right-4 bg-[#ff6b6b] text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Regional
                </div>
              </div>
              <div className="lg:order-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-[#ff6b6b] rounded-full flex items-center justify-center">
                    <Mountain className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-[#ff6b6b] font-semibold text-lg">Poesia Regional</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  As 8 Maravilhas Naturais de Schroeder em Poesia
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Uma homenagem poética às belezas naturais de Schroeder, Santa Catarina. Este livro único combina o
                  amor pela natureza com a sensibilidade poética, retratando através de versos as maravilhas que fazem
                  desta região um verdadeiro paraíso natural.
                </p>
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#ff6b6b] rounded-full"></div>
                    <span className="text-gray-700">8 poemas dedicados às belezas locais</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#ff6b6b] rounded-full"></div>
                    <span className="text-gray-700">Fotografias das paisagens</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#ff6b6b] rounded-full"></div>
                    <span className="text-gray-700">Conexão com a natureza</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#ff6b6b] rounded-full"></div>
                    <span className="text-gray-700">Valorização do patrimônio natural</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-gray-600">4.6/5 (312 avaliações)</span>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-[#ff6b6b] hover:bg-[#e55555] px-8 py-3 rounded-full font-semibold">
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Comprar Agora
                  </Button>
                  <Button
                    variant="outline"
                    className="border-[#ff6b6b] text-[#ff6b6b] hover:bg-[#ff6b6b] hover:text-white px-8 py-3 rounded-full font-semibold bg-transparent"
                  >
                    <BookOpen className="w-5 h-5 mr-2" />
                    Saiba mais
                  </Button>
                </div>
              </div>
            </div>
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
