import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Ear, Clock, Users, Star, BookOpen, Mic, ShoppingCart } from "lucide-react"
import Image from "next/image"
import { Header } from "@/components/header"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      {/* Hero Section */}
      <section className="relative bg-[#1d9b9a] py-20 lg:py-32 pt-32 lg:pt-40">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-2xl">
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
            <div className="relative">
              <Image
                src="/placeholder.svg?height=600&width=500&text=Palestrante"
                alt="Celso Rocha de Abreu - Palestrante e criador do Método OOBA"
                width={500}
                height={600}
                className="w-full h-auto object-cover bg-transparent"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sobre o Método OOBA */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative">
              <Image
                src="/placeholder.svg?height=500&width=600&text=Família+Conectada"
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
                <div className="w-16 h-16 bg-[#1d9b9a] rounded-full flex items-center justify-center">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">Conexão Verdadeira</h3>
                  <p className="text-gray-600">Baseado em anos de pesquisa e experiência prática</p>
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
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Os 4 Pilares do OOBA</h2>
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
                <h3 className="text-xl font-bold text-gray-900 mb-4">Amor com Limites</h3>
                <p className="text-gray-600">
                  Equilibrio perfeito entre afeto incondicional e diretrizes claras para o crescimento saudável.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-0">
                <div className="w-20 h-20 bg-[#ff6b6b] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Ear className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Escuta Ativa</h3>
                <p className="text-gray-600">
                  Técnicas para ouvir verdadeiramente seus filhos, validando sentimentos e fortalecendo a confiança.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-0">
                <div className="w-20 h-20 bg-[#1d9b9a] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Clock className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Rotina com Propósito</h3>
                <p className="text-gray-600">
                  Estruturas diárias que criam segurança emocional e momentos especiais de conexão familiar.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-0">
                <div className="w-20 h-20 bg-[#ff6b6b] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Participação</h3>
                <p className="text-gray-600">
                  Envolvimento ativo de todos os membros da família na construção de um ambiente harmonioso.
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
                src="/placeholder.svg?height=400&width=600"
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
                As palestras de Celso Rocha de Abreu já impactaram milhares de famílias em todo o Brasil. Com uma
                abordagem calorosa e prática, ele compartilha ferramentas concretas para transformar relacionamentos
                familiares e criar legados de amor duradouros.
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
            {/* Método OOBA Para a Vida Toda */}
            <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow flex flex-col h-full">
              <div className="relative">
                <Image
                  src="/placeholder.svg?height=300&width=240"
                  alt="Capa do livro Método OOBA Para a Vida Toda"
                  width={240}
                  height={300}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-3 right-3 bg-[#1d9b9a] text-white px-3 py-1 rounded-full text-xs font-semibold">
                  Bestseller
                </div>
              </div>
              <CardContent className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Método OOBA Para a Vida Toda</h3>
                <p className="text-gray-600 mb-4 leading-relaxed text-sm flex-grow">
                  O guia definitivo para aplicar o Método OOBA em todas as fases da vida familiar. Ferramentas práticas
                  e estratégias comprovadas.
                </p>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">4.9/5</span>
                </div>
                <div className="space-y-2 mt-auto">
                  <Button className="w-full bg-[#1d9b9a] hover:bg-[#16807f] rounded-full text-sm" asChild>
                    <Link href="/livros/metodo-ooba-livro">Ver detalhes</Link>
                  </Button>
                  <Button variant="outline" className="w-full rounded-full text-sm bg-transparent">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    R$ 69,90
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Pais e Filhos: Um Legado de Grandes Valores */}
            <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow flex flex-col h-full">
              <div className="relative">
                <Image
                  src="/placeholder.svg?height=300&width=240"
                  alt="Capa do livro Pais e Filhos: Um Legado de Grandes Valores"
                  width={240}
                  height={300}
                  className="w-full h-64 object-cover"
                />
              </div>
              <CardContent className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Pais e Filhos: Um Legado de Grandes Valores</h3>
                <p className="text-gray-600 mb-4 leading-relaxed text-sm flex-grow">
                  Um guia completo para pais que desejam construir relacionamentos sólidos e transmitir valores
                  essenciais para as próximas gerações.
                </p>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">4.8/5</span>
                </div>
                <div className="space-y-2 mt-auto">
                  <Button className="w-full bg-[#ff6b6b] hover:bg-[#e55555] rounded-full text-sm" asChild>
                    <Link href="/livros/pais-e-filhos">Ver detalhes</Link>
                  </Button>
                  <Button variant="outline" className="w-full rounded-full text-sm bg-transparent">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    R$ 59,90
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* 96 Poesias */}
            <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow flex flex-col h-full">
              <div className="relative">
                <Image
                  src="/placeholder.svg?height=300&width=240"
                  alt="Capa do livro 96 Poesias"
                  width={240}
                  height={300}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-3 right-3 bg-[#1d9b9a] text-white px-3 py-1 rounded-full text-xs font-semibold">
                  Poesia
                </div>
              </div>
              <CardContent className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-900 mb-3">96 Poesias</h3>
                <p className="text-gray-600 mb-4 leading-relaxed text-sm flex-grow">
                  Uma coletânea sensível de poesias que tocam o coração e despertam reflexões profundas sobre amor,
                  família e os momentos preciosos da vida.
                </p>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">4.7/5</span>
                </div>
                <div className="space-y-2 mt-auto">
                  <Button className="w-full bg-[#1d9b9a] hover:bg-[#16807f] rounded-full text-sm" asChild>
                    <Link href="/livros/96-poesias">Ver detalhes</Link>
                  </Button>
                  <Button variant="outline" className="w-full rounded-full text-sm bg-transparent">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    R$ 49,90
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* As 8 Maravilhas Naturais de Schroeder em Poesia */}
            <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow flex flex-col h-full">
              <div className="relative">
                <Image
                  src="/placeholder.svg?height=300&width=240"
                  alt="Capa do livro As 8 Maravilhas Naturais de Schroeder em Poesia"
                  width={240}
                  height={300}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-3 right-3 bg-[#ff6b6b] text-white px-3 py-1 rounded-full text-xs font-semibold">
                  Regional
                </div>
              </div>
              <CardContent className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-900 mb-3">As 8 Maravilhas Naturais de Schroeder</h3>
                <p className="text-gray-600 mb-4 leading-relaxed text-sm flex-grow">
                  Uma homenagem poética às belezas naturais de Schroeder, SC. Versos que retratam as maravilhas que
                  fazem desta região um paraíso natural.
                </p>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">4.6/5</span>
                </div>
                <div className="space-y-2 mt-auto">
                  <Button className="w-full bg-[#ff6b6b] hover:bg-[#e55555] rounded-full text-sm">Ver detalhes</Button>
                  <Button variant="outline" className="w-full rounded-full text-sm bg-transparent">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    R$ 45,90
                  </Button>
                </div>
              </CardContent>
            </Card>
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
