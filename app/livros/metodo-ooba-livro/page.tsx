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
} from "lucide-react"
import Image from "next/image"
import { Header } from "@/components/header"

export default function MetodoOOBALivroPage() {
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
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <span className="text-white/90 font-semibold text-lg">Guia Completo do Método OOBA</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Método OOBA Para a Vida Toda
              </h1>
              <p className="text-xl md:text-2xl mb-6 opacity-90 leading-relaxed">
                O guia definitivo para transformar relacionamentos familiares através dos 4 pilares fundamentais
              </p>
              <p className="text-lg md:text-xl mb-8 opacity-80 leading-relaxed">
                Ferramentas práticas, estratégias comprovadas e exercícios para aplicação imediata em todas as fases da
                vida familiar
              </p>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/80 text-lg">Adquira o livro por apenas</p>
                    <p className="text-3xl md:text-4xl font-bold text-white">R$ 69,90</p>
                    <p className="text-white/80">com FRETE GRÁTIS + Bônus Exclusivos</p>
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
                alt="Capa do livro Método OOBA Para a Vida Toda"
                width={400}
                height={600}
                className="rounded-2xl shadow-2xl mx-auto"
              />
              <div className="absolute -top-4 -right-4 bg-white text-[#1d9b9a] px-4 py-2 rounded-full text-sm font-semibold">
                #1 Bestseller
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Por que este livro é diferente */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Por que este livro é diferente?
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Não é apenas teoria - é um sistema completo testado por milhares de famílias
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-[#1d9b9a] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Método Comprovado</h3>
                <p className="text-gray-600 text-center">
                  Mais de 15 anos de desenvolvimento e aplicação prática em milhares de famílias brasileiras.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-[#ff6b6b] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Lightbulb className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Aplicação Prática</h3>
                <p className="text-gray-600 text-center">
                  Exercícios, checklists e ferramentas que você pode usar imediatamente no seu dia a dia familiar.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-[#1d9b9a] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Para Todas as Idades</h3>
                <p className="text-gray-600 text-center">
                  Estratégias adaptadas desde a primeira infância até a adolescência e vida adulta.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Os 4 Pilares Detalhados */}
      <section className="py-20 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Os 4 Pilares do Método OOBA
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Cada pilar é explicado em detalhes com exemplos práticos e exercícios de aplicação
            </p>
          </div>

          <div className="space-y-16">
            {/* Pilar 1 */}
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-[#1d9b9a] rounded-full flex items-center justify-center">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <span className="text-[#1d9b9a] font-semibold text-lg">1º Pilar</span>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Amor com Limites</h3>
                  </div>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Aprenda a equilibrar afeto incondicional com diretrizes claras. Este capítulo ensina como estabelecer
                  limites saudáveis sem perder a conexão emocional com seus filhos.
                </p>
                <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">O que você vai aprender:</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-[#1d9b9a]" />
                      <span className="text-gray-700">Como dizer "não" com amor</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-[#1d9b9a]" />
                      <span className="text-gray-700">Técnicas de disciplina positiva</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-[#1d9b9a]" />
                      <span className="text-gray-700">Consistência nas regras familiares</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <Image
                  src="/placeholder.svg?height=400&width=500"
                  alt="Família demonstrando amor com limites"
                  width={500}
                  height={400}
                  className="rounded-2xl shadow-lg"
                />
              </div>
            </div>

            {/* Pilar 2 */}
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="relative lg:order-1">
                <Image
                  src="/placeholder.svg?height=400&width=500"
                  alt="Família praticando escuta ativa"
                  width={500}
                  height={400}
                  className="rounded-2xl shadow-lg"
                />
              </div>
              <div className="lg:order-2">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-[#ff6b6b] rounded-full flex items-center justify-center">
                    <Ear className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <span className="text-[#ff6b6b] font-semibold text-lg">2º Pilar</span>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Escuta Ativa</h3>
                  </div>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Descubra como ouvir verdadeiramente seus filhos, validar seus sentimentos e criar um ambiente de
                  confiança onde eles se sintam seguros para se expressar.
                </p>
                <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Técnicas incluídas:</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-[#ff6b6b]" />
                      <span className="text-gray-700">Comunicação não-violenta</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-[#ff6b6b]" />
                      <span className="text-gray-700">Validação emocional</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-[#ff6b6b]" />
                      <span className="text-gray-700">Criação de momentos de diálogo</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pilar 3 */}
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-[#1d9b9a] rounded-full flex items-center justify-center">
                    <Clock className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <span className="text-[#1d9b9a] font-semibold text-lg">3º Pilar</span>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Rotina com Propósito</h3>
                  </div>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Transforme a rotina familiar em momentos de conexão. Aprenda a criar estruturas que geram segurança
                  emocional e oportunidades de qualidade em família.
                </p>
                <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Estratégias práticas:</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-[#1d9b9a]" />
                      <span className="text-gray-700">Rituais familiares significativos</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-[#1d9b9a]" />
                      <span className="text-gray-700">Planejamento de tempo de qualidade</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-[#1d9b9a]" />
                      <span className="text-gray-700">Tradições que fortalecem vínculos</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <Image
                  src="/placeholder.svg?height=400&width=500"
                  alt="Família em rotina com propósito"
                  width={500}
                  height={400}
                  className="rounded-2xl shadow-lg"
                />
              </div>
            </div>

            {/* Pilar 4 */}
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="relative lg:order-1">
                <Image
                  src="/placeholder.svg?height=400&width=500"
                  alt="Família participando juntos"
                  width={500}
                  height={400}
                  className="rounded-2xl shadow-lg"
                />
              </div>
              <div className="lg:order-2">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-[#ff6b6b] rounded-full flex items-center justify-center">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <span className="text-[#ff6b6b] font-semibold text-lg">4º Pilar</span>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Participação</h3>
                  </div>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Envolva todos os membros da família na construção de um ambiente harmonioso. Cada pessoa tem voz,
                  responsabilidades e contribui para o bem-estar coletivo.
                </p>
                <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Como implementar:</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-[#ff6b6b]" />
                      <span className="text-gray-700">Responsabilidades por idade</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-[#ff6b6b]" />
                      <span className="text-gray-700">Decisões familiares colaborativas</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-[#ff6b6b]" />
                      <span className="text-gray-700">Desenvolvimento do senso de pertencimento</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Conteúdo do Livro */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              O que você encontrará no livro
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Mais de 300 páginas de conteúdo prático e transformador
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 max-w-6xl mx-auto">
            <div className="space-y-8">
              <Card className="p-6 border-0 shadow-lg">
                <CardContent className="p-0">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#1d9b9a] rounded-full flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">Casos Reais</h3>
                      <p className="text-gray-600">
                        Mais de 50 histórias reais de famílias que aplicaram o método com sucesso.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-6 border-0 shadow-lg">
                <CardContent className="p-0">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#ff6b6b] rounded-full flex items-center justify-center flex-shrink-0">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">Exercícios Práticos</h3>
                      <p className="text-gray-600">
                        Atividades e exercícios para cada pilar, adaptados para diferentes idades.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-6 border-0 shadow-lg">
                <CardContent className="p-0">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#1d9b9a] rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">Checklists e Ferramentas</h3>
                      <p className="text-gray-600">
                        Guias práticos para implementação imediata em sua rotina familiar.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-8">
              <Card className="p-6 border-0 shadow-lg">
                <CardContent className="p-0">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#ff6b6b] rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">Adaptações por Idade</h3>
                      <p className="text-gray-600">
                        Estratégias específicas para bebês, crianças, pré-adolescentes e adolescentes.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-6 border-0 shadow-lg">
                <CardContent className="p-0">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#1d9b9a] rounded-full flex items-center justify-center flex-shrink-0">
                      <Lightbulb className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">Soluções para Desafios</h3>
                      <p className="text-gray-600">
                        Respostas para os problemas mais comuns enfrentados pelas famílias modernas.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-6 border-0 shadow-lg">
                <CardContent className="p-0">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#ff6b6b] rounded-full flex items-center justify-center flex-shrink-0">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">Plano de Implementação</h3>
                      <p className="text-gray-600">Guia passo a passo para implementar o método em 90 dias.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Bônus Exclusivos */}
      <section className="py-20 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Bônus Exclusivos</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Materiais complementares para potencializar sua jornada familiar
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-[#1d9b9a] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Download className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">E-book de Atividades</h3>
                <p className="text-gray-600 text-center mb-4">
                  50 atividades práticas para fortalecer vínculos familiares em formato digital.
                </p>
                <div className="text-center">
                  <span className="text-lg font-semibold text-[#1d9b9a]">Valor: R$ 29,90</span>
                  <p className="text-sm text-gray-500">GRÁTIS com o livro</p>
                </div>
              </CardContent>
            </Card>

            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-[#ff6b6b] rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Planner Familiar</h3>
                <p className="text-gray-600 text-center mb-4">
                  Planejador mensal para organizar rotinas e momentos especiais da família.
                </p>
                <div className="text-center">
                  <span className="text-lg font-semibold text-[#ff6b6b]">Valor: R$ 19,90</span>
                  <p className="text-sm text-gray-500">GRÁTIS com o livro</p>
                </div>
              </CardContent>
            </Card>

            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-[#1d9b9a] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Acesso ao Grupo VIP</h3>
                <p className="text-gray-600 text-center mb-4">
                  Comunidade exclusiva para troca de experiências e suporte contínuo.
                </p>
                <div className="text-center">
                  <span className="text-lg font-semibold text-[#1d9b9a]">Valor: R$ 39,90</span>
                  <p className="text-sm text-gray-500">GRÁTIS com o livro</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Valor Total dos Bônus</h3>
              <div className="text-3xl font-bold text-gray-400 line-through mb-2">R$ 89,70</div>
              <div className="text-4xl font-bold text-[#1d9b9a] mb-4">GRÁTIS</div>
              <p className="text-gray-600">Apenas para os primeiros 100 compradores</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Principal */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-[#1d9b9a] to-[#16807f] text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Transforme sua família hoje mesmo!</h2>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed">
            Adquira o "Método OOBA Para a Vida Toda" por apenas R$ 69,90 com frete grátis e ganhe R$ 89,70 em bônus
            exclusivos. Sua família merece essa transformação!
          </p>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto mb-8">
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-white" />
                  <span>Livro físico com 300+ páginas</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-white" />
                  <span>Frete grátis para todo Brasil</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-white" />
                  <span>E-book de atividades</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-white" />
                  <span>Planner familiar</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-white" />
                  <span>Acesso ao grupo VIP</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-white" />
                  <span>Garantia de 30 dias</span>
                </div>
              </div>
            </div>
          </div>
          <Button
            size="lg"
            className="bg-white text-[#1d9b9a] hover:bg-gray-100 px-12 py-6 text-xl font-bold rounded-full"
          >
            <ShoppingCart className="w-6 h-6 mr-3" />
            Comprar Agora com Bônus!
          </Button>
          <p className="text-white/80 mt-4">Oferta limitada - apenas para os primeiros 100 compradores</p>
        </div>
      </section>

      {/* Sobre o Autor */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative">
              <Image
                src="/placeholder.svg?height=500&width=400"
                alt="Celso Rocha de Abreu com sua família"
                width={400}
                height={500}
                className="rounded-2xl shadow-2xl mx-auto"
              />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#1d9b9a] rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <span className="text-[#1d9b9a] font-semibold text-lg">Criador do Método OOBA</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Celso Rocha de Abreu</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  <strong>Mais de 15 anos</strong> dedicados ao desenvolvimento e aperfeiçoamento do Método OOBA, Celso
                  Rocha de Abreu é reconhecido como uma das principais autoridades em relacionamentos familiares no
                  Brasil.
                </p>
                <p>
                  Pai de dois filhos, ele desenvolveu o método através de sua própria experiência familiar, combinada
                  com anos de estudo e aplicação prática com milhares de famílias em todo o país.
                </p>
                <p>
                  <strong>Palestrante requisitado</strong>, já impactou mais de 50.000 pessoas através de suas palestras
                  e workshops, sempre com foco na aplicação prática e resultados duradouros.
                </p>
              </div>
              <div className="mt-8 grid md:grid-cols-2 gap-6">
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-2xl font-bold text-[#1d9b9a]">500+</div>
                  <div className="text-sm text-gray-600">Palestras realizadas</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-2xl font-bold text-[#1d9b9a]">10.000+</div>
                  <div className="text-sm text-gray-600">Famílias transformadas</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="py-20 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Famílias transformadas pelo método
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Histórias reais de quem aplicou o Método OOBA
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
                  "Este livro salvou nossa família! Meu filho adolescente estava se afastando, mas com o Método OOBA
                  conseguimos reconstruir nossa conexão. Os exercícios práticos fizeram toda a diferença."
                </p>
                <div>
                  <p className="font-semibold text-gray-900">Patricia Mendes</p>
                  <p className="text-sm text-gray-500">Mãe de 2 filhos, Brasília</p>
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
                  "Aplicamos o método há 6 meses e a diferença é incrível. Nossos filhos são mais responsáveis,
                  participativos e carinhosos. O plano de 90 dias funcionou perfeitamente!"
                </p>
                <div>
                  <p className="font-semibold text-gray-900">Carlos e Marina Santos</p>
                  <p className="text-sm text-gray-500">Pais de 3 filhos, Curitiba</p>
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
                  "Como educadora, recomendo este livro para todos os pais. O método é científico, mas simples de
                  aplicar. Os casos reais me ajudaram muito a entender como implementar."
                </p>
                <div>
                  <p className="font-semibold text-gray-900">Ana Carolina Silva</p>
                  <p className="text-sm text-gray-500">Pedagoga, São Paulo</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="bg-[#1d9b9a] hover:bg-[#16807f] px-12 py-4 text-lg font-semibold rounded-full">
              <ShoppingCart className="w-6 h-6 mr-3" />
              Quero transformar minha família também!
            </Button>
          </div>
        </div>
      </section>

      {/* Garantia */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-br from-[#1d9b9a] to-[#16807f] text-white p-12 rounded-3xl">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Garantia de 30 Dias</h2>
              <p className="text-xl mb-8 opacity-90 leading-relaxed">
                Estamos tão confiantes na eficácia do Método OOBA que oferecemos uma garantia incondicional de 30 dias.
                Se você não ficar completamente satisfeito, devolvemos 100% do seu dinheiro.
              </p>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <p className="text-lg">
                  <strong>Sem perguntas, sem complicações.</strong> Sua satisfação é nossa prioridade.
                </p>
              </div>
            </div>
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
