import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, BookOpen, Mic, Users, Award, Clock } from "@/components/icons"
import Image from "next/image"
import { Header } from "@/components/header"

export default function QuemSouPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1d9b9a] to-[#16807f] text-white py-20 lg:py-32 pt-32 lg:pt-40">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">Celso Rocha de Abreu</h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
                Cristão, esposo, pai, escritor, palestrante e educador familiar,  dedicado a transformar relacionamentos e fortalecer os vínculos familiares através do amor e da compreensão.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-white text-[#1d9b9a] hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full"
                >
                  Conheça o Método OOBA
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-[#1d9b9a] px-8 py-4 text-lg font-semibold rounded-full bg-transparent"
                >
                  Agende uma Palestra
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/images/celso-quem-sou-eu.jpg"
                alt="Celso Rocha de Abreu"
                width={500}
                height={600}
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Minha História */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Minha História</h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                Uma jornada de descobertas, aprendizados e transformações que me levaram a criar o Método OOBA
              </p>
            </div>

            <div className="space-y-8">
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Minha jornada como educador familiar começou de forma muito pessoal.  Como esposo e pai, enfrentei os mesmos desafios que milhares de famílias enfrentam diariamente: como equilibrar necessidades, sentimentos e emoções, como me comunicar integralmente com minha família, em especial com nossos filhos e sobretudo criar um ambiente familiar que nutrisse o crescimento saudável desenvolvendo suas potências.
                </p>

                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Foi através dessas experiências combinadas com orações, anos de estudo e pesquisa, que nasceu o método OOBA.
                </p>

                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  Não se trata apenas de teoria acadêmica,  mas de ferramentas práticas testadas no dia a dia, na realidade das famílias brasileiras.
                </p>

                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  Hoje,  após mais de 30 anos dedicados a esta missão,  tenho o privilégio de ver famílias inteiras usufruindo das transformações propostas. Cada palestra, cada livro, cada conversa é uma oportunidade de plantar sementes de fé, esperança e amor.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Conquistas e Números */}
      <section className="py-20 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Impacto e Conquistas</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Números que representam vidas transformadas e famílias fortalecidas
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <Card className="text-center p-8 border-0 shadow-lg">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-[#1d9b9a] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mic className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">500+</h3>
                <p className="text-gray-600">Palestras Realizadas</p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 border-0 shadow-lg">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-[#ff6b6b] rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">4</h3>
                <p className="text-gray-600">Livros Publicados</p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 border-0 shadow-lg">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-[#1d9b9a] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">3.000+</h3>
                <p className="text-gray-600">Famílias Impactadas</p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 border-0 shadow-lg">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-[#ff6b6b] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">30+</h3>
                <p className="text-gray-600">Anos de Experiência</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Missão e Valores */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8">Missão e Valores</h2>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#1d9b9a] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Amor Incondicional</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Acredito que o amor é a base de toda transformação familiar. Não um amor permissivo, mas um amor
                      que orienta, protege e fortalece.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#ff6b6b] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Conexão Verdadeira</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Promover relacionamentos autênticos onde cada membro da família se sinta ouvido, compreendido e
                      valorizado.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#1d9b9a] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Legado de Valores</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Ajudar famílias a construírem legados duradouros baseados em valores sólidos que transcendem
                      gerações.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <Image
                src="/images/ooba-familia.jpg"
                alt="Família unida representando valores"
                width={600}
                height={500}
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Formação e Experiência */}
      <section className="py-20 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Formação e Experiência</h2>
              <p className="text-lg md:text-xl text-gray-600">Uma base sólida de conhecimento e experiência prática</p>
            </div>

            <div className="space-y-8">
              <Card className="p-8 border-0 shadow-lg">
                <CardContent className="p-0">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-[#1d9b9a] rounded-full flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">Educação e Desenvolvimento Familiar</h3>
                      <p className="text-gray-600 leading-relaxed mb-4">
                        Formação em Teologia Católica e desenvolvimento em Bioética, com foco em desenvolvimento familiar e comunicação interpessoal.
                      </p>
                      <ul className="text-gray-600 space-y-2">
                        <li>• Especialização Católica em Terapia de Casais e Familiar</li>
                        <li>• Certificação em comunicação assertiva e não violenta</li>
                        <li>• Formador na Escola de Pais</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-8 border-0 shadow-lg">
                <CardContent className="p-0">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-[#ff6b6b] rounded-full flex items-center justify-center flex-shrink-0">
                      <Mic className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">Experiência como Palestrante</h3>

                      <ul className="text-gray-600 space-y-2">
                        <li>• Palestrante em mais de 200 instituições de ensino, religiosa e corporativa. </li>
                        <li>• Consultor familiar para empresas,  comunidades e rede de proteção </li>
                        <li>• Participação em rádios, programas, colegiados, seminários, debates sociais.</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Chamada para Ação */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-[#1d9b9a] to-[#16807f] text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Vamos transformar sua família juntos?</h2>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed">
            Estou aqui para ajudar você a construir relacionamentos mais profundos e duradouros com quem você mais ama.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-[#1d9b9a] hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full"
            >
              Conheça o Método OOBA
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-[#1d9b9a] px-8 py-4 text-lg font-semibold rounded-full bg-transparent"
            >
              Entre em Contato
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
