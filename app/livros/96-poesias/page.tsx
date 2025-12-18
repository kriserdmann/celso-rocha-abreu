import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star, ShoppingCart, CheckCircle, Heart, Feather, Award, BookOpen, Quote } from "@/components/icons"
import Image from "next/image"
import { Header } from "@/components/header"

export default function PoesiasPage() {
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
                  <Feather className="w-6 h-6 text-white" />
                </div>
                <span className="text-white/90 font-semibold text-lg">Coletânea Poética</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">96 Poesias</h1>
              <p className="text-xl md:text-2xl mb-6 opacity-90 leading-relaxed">
                Uma jornada sensível através dos sentimentos mais profundos da alma humana
              </p>
              <p className="text-lg md:text-xl mb-8 opacity-80 leading-relaxed">
                Versos que tocam o coração e despertam reflexões sobre amor, família, fé e os momentos preciosos da vida
              </p>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/80 text-lg">Adquira o livro por apenas</p>
                    <p className="text-3xl md:text-4xl font-bold text-white">R$ 49,90</p>
                    <p className="text-white/80">com FRETE GRÁTIS</p>
                  </div>
                  <div className="text-right">
                    <Button
                      size="lg"
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
                src="/placeholder.svg?height=600&width=400"
                alt="Capa do livro 96 Poesias"
                width={400}
                height={600}
                className="rounded-2xl shadow-2xl mx-auto"
              />
              <div className="absolute -top-4 -right-4 bg-white text-[#1d9b9a] px-4 py-2 rounded-full text-sm font-semibold">
                Bestseller Poético
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* Sobre o Livro */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#1d9b9a] rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <span className="text-[#1d9b9a] font-semibold text-lg">Sensibilidade Poética</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Uma coletânea que toca a alma</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                "96 Poesias" é uma obra que nasce do coração e fala diretamente ao coração. Cada verso foi
                cuidadosamente elaborado para despertar emoções, provocar reflexões e conectar o leitor com os
                sentimentos mais genuínos da experiência humana.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Através de uma linguagem acessível, mas profundamente tocante, Celso Rocha de Abreu nos convida a uma
                jornada poética que explora temas universais como amor, família, fé, esperança e os pequenos milagres do
                cotidiano.
              </p>
              <Button className="bg-[#1d9b9a] hover:bg-[#16807f] px-8 py-3 rounded-full font-semibold">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Adquirir Coletânea
              </Button>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=400&width=500"
                alt="Pessoa lendo poesias em ambiente acolhedor"
                width={500}
                height={400}
                className="rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Temas das Poesias */}
      <section className="py-20 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Temas que Inspiram</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Uma rica variedade de temas que refletem a complexidade e beleza da vida humana
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-[#1d9b9a] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Amor e Relacionamentos</h3>
                <p className="text-gray-600 text-center">
                  Versos que celebram o amor em suas múltiplas formas: romântico, familiar, fraternal e o amor próprio.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-[#ff6b6b] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Família e Valores</h3>
                <p className="text-gray-600 text-center">
                  Poesias que exaltam os laços familiares e a importância dos valores que nos definem como pessoas.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-[#1d9b9a] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Feather className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Fé e Espiritualidade</h3>
                <p className="text-gray-600 text-center">
                  Reflexões profundas sobre a dimensão espiritual da vida e nossa conexão com o divino.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-[#ff6b6b] rounded-full flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Natureza e Contemplação</h3>
                <p className="text-gray-600 text-center">
                  Versos inspirados na beleza natural e nos momentos de contemplação que ela nos proporciona.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-[#1d9b9a] rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Reflexões da Vida</h3>
                <p className="text-gray-600 text-center">
                  Pensamentos poéticos sobre as experiências que moldam nossa jornada e nos fazem crescer.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-[#ff6b6b] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Quote className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Momentos Especiais</h3>
                <p className="text-gray-600 text-center">
                  Poesias que capturam e eternizam os pequenos momentos que tornam a vida extraordinária.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Amostra de Poesia */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-12 h-12 bg-[#1d9b9a] rounded-full flex items-center justify-center">
                <Quote className="w-6 h-6 text-white" />
              </div>
              <span className="text-[#1d9b9a] font-semibold text-lg">Amostra Poética</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Um Gostinho da Sensibilidade</h2>

            <Card className="p-12 border-0 shadow-2xl bg-gradient-to-br from-gray-50 to-white">
              <CardContent className="p-0">
                <div className="text-6xl text-[#1d9b9a] mb-6">"</div>
                <div className="space-y-4 text-lg text-gray-700 leading-relaxed italic">
                  <p>No silêncio da manhã que desperta,</p>
                  <p>Encontro a paz que minha alma liberta.</p>
                  <p>Entre versos que nascem do coração,</p>
                  <p>Descubro a força da contemplação.</p>
                  <br />
                  <p>Cada palavra é uma ponte de amor,</p>
                  <p>Que conecta almas com seu fervor.</p>
                  <p>Na simplicidade do verso singelo,</p>
                  <p>Revela-se a beleza do que é belo.</p>
                </div>
                <div className="text-6xl text-[#1d9b9a] mt-6 transform rotate-180">"</div>
                <p className="text-gray-500 mt-6 text-sm">Trecho de uma das 96 poesias</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Por que ler este livro */}
      <section className="py-20 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative lg:order-1">
              <Image
                src="/placeholder.svg?height=400&width=500"
                alt="Pessoa em momento de reflexão com o livro"
                width={500}
                height={400}
                className="rounded-2xl shadow-lg"
              />
            </div>
            <div className="lg:order-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#ff6b6b] rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <span className="text-[#ff6b6b] font-semibold text-lg">Benefícios da Leitura</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Por que ler "96 Poesias"?</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-[#ff6b6b] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Momentos de Reflexão</h3>
                    <p className="text-gray-600">Cada poesia oferece uma pausa para reflexão e autoconhecimento.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-[#ff6b6b] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Inspiração Diária</h3>
                    <p className="text-gray-600">
                      Versos que podem ser lidos e relidos, sempre oferecendo nova inspiração.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-[#ff6b6b] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Conexão Emocional</h3>
                    <p className="text-gray-600">Linguagem que toca o coração e desperta emoções genuínas.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-[#ff6b6b] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Presente Especial</h3>
                    <p className="text-gray-600">Ideal para presentear pessoas queridas em datas especiais.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Button className="bg-[#ff6b6b] hover:bg-[#e55555] px-8 py-3 rounded-full font-semibold">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Comprar Agora
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Principal */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-[#1d9b9a] to-[#16807f] text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Adquira por apenas R$ 49,90 com frete grátis!
          </h2>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed">
            Permita-se mergulhar em uma jornada poética que tocará sua alma e despertará reflexões profundas sobre a
            vida, o amor e os momentos que realmente importam.
          </p>
          <Button
            size="lg"
            className="bg-white text-[#1d9b9a] hover:bg-gray-100 px-12 py-6 text-xl font-bold rounded-full"
          >
            <ShoppingCart className="w-6 h-6 mr-3" />
            Comprar "96 Poesias" Agora!
          </Button>
        </div>
      </section>

      {/* Sobre o Autor */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative">
              <Image
                src="/placeholder.svg?height=500&width=400"
                alt="Celso Rocha de Abreu escrevendo"
                width={400}
                height={500}
                className="rounded-2xl shadow-2xl mx-auto"
              />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#1d9b9a] rounded-full flex items-center justify-center">
                  <Feather className="w-6 h-6 text-white" />
                </div>
                <span className="text-[#1d9b9a] font-semibold text-lg">O Poeta</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Celso Rocha de Abreu</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  <strong>Poeta, escritor e compositor</strong>, Celso Rocha de Abreu encontra na poesia uma forma única
                  de expressar os sentimentos mais profundos da alma humana. Suas palavras nascem da observação
                  cuidadosa da vida, dos relacionamentos e da espiritualidade.
                </p>
                <p>
                  Com mais de 15 anos dedicados à escrita e ao desenvolvimento familiar, Celso combina sua sensibilidade
                  poética com sua experiência como palestrante e educador, criando versos que não apenas emocionam, mas
                  também ensinam e inspiram.
                </p>
                <p>
                  "96 Poesias" representa uma coletânea cuidadosamente selecionada de seus melhores trabalhos poéticos,
                  cada um carregando uma mensagem de amor, esperança e reflexão sobre os valores que realmente importam
                  na vida.
                </p>
                <p className="italic">
                  "A poesia é a linguagem da alma. Através dela, podemos tocar corações e despertar consciências para a
                  beleza que existe em cada momento da vida."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="py-20 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">O que dizem os leitores</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Palavras de quem se emocionou com as poesias
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
                  "Cada poesia é uma joia rara. Leio uma por dia como forma de meditação e sempre encontro algo novo que
                  me toca profundamente. Um livro para ter sempre por perto."
                </p>
                <div>
                  <p className="font-semibold text-gray-900">Maria Fernanda</p>
                  <p className="text-sm text-gray-500">Professora, São Paulo</p>
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
                  "Presenteei minha mãe com este livro e ela ficou emocionada. As poesias sobre família são
                  especialmente tocantes. Recomendo para quem aprecia boa literatura."
                </p>
                <div>
                  <p className="font-semibold text-gray-900">Roberto Silva</p>
                  <p className="text-sm text-gray-500">Engenheiro, Rio de Janeiro</p>
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
                  "Linguagem simples, mas profundamente emotiva. Celso consegue capturar em versos os sentimentos que
                  muitas vezes não conseguimos expressar. Uma obra sensível e inspiradora."
                </p>
                <div>
                  <p className="font-semibold text-gray-900">Ana Carolina</p>
                  <p className="text-sm text-gray-500">Psicóloga, Belo Horizonte</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="bg-[#1d9b9a] hover:bg-[#16807f] px-12 py-4 text-lg font-semibold rounded-full">
              <ShoppingCart className="w-6 h-6 mr-3" />
              Adquirir minha cópia agora!
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
