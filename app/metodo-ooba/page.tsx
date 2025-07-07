import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Ear, Clock, Users, Star, CheckCircle, ArrowRight, Target, Lightbulb } from "lucide-react"
import Image from "next/image"
import { Header } from "@/components/header"

export default function MetodoOOBAPage() {
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
                <span className="text-white/90 font-semibold text-lg">Método Revolucionário</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">O Método OOBA</h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
                Uma abordagem transformadora que fortalece vínculos familiares através de quatro pilares fundamentais:
                amor, comunicação, estrutura e participação.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-white text-[#1d9b9a] hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full"
                >
                  Aplicar o Método
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-[#1d9b9a] px-8 py-4 text-lg font-semibold rounded-full bg-transparent"
                >
                  Agendar Palestra
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/images/ooba-capa.jpg"
                alt="Família aplicando o Método OOBA"
                width={600}
                height={500}
                className="rounded-2xl shadow-2xl object-cover"
              />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* O que é o Método OOBA */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">O que é o Método OOBA?</h2>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8">
              OOBA é mais que um método educacional - é uma filosofia de vida familiar que transforma relacionamentos
              através de princípios fundamentais baseados em amor, respeito mútuo e comunicação autêntica.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#1d9b9a] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Objetivo Principal</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Criar famílias mais unidas, onde cada membro se sente valorizado, ouvido e amado, estabelecendo
                      bases sólidas para relacionamentos duradouros.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#ff6b6b] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Lightbulb className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Abordagem Prática</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Ferramentas concretas e aplicáveis no dia a dia, desenvolvidas através de anos de experiência e
                      pesquisa em dinâmicas familiares.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#1d9b9a] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Resultados Comprovados</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Milhares de famílias já experimentaram transformações significativas em seus relacionamentos
                      através da aplicação do Método OOBA.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <Image
                src="/images/ooba-familia.jpg"
                alt="Família feliz representando o método OOBA"
                width={500}
                height={500}
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Os 4 Pilares Detalhados */}
      <section className="py-20 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Os 4 Pilares do OOBA</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Cada pilar representa um aspecto fundamental para construir relacionamentos familiares sólidos e
              duradouros
            </p>
          </div>

          <div className="space-y-16">
            {/* Pilar 1: Amor com Limites */}
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
                  O amor incondicional não significa ausência de limites. Este pilar ensina como demonstrar afeto
                  genuíno enquanto estabelece diretrizes claras que promovem crescimento saudável e segurança emocional.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#1d9b9a]" />
                    <span className="text-gray-700">Estabelecimento de regras com amor</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#1d9b9a]" />
                    <span className="text-gray-700">Disciplina positiva e construtiva</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#1d9b9a]" />
                    <span className="text-gray-700">Consistência nas decisões familiares</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <Image
                  src="/images/ooba-amor.jpg"
                  alt="Amor com limites - família abraçada"
                  width={500}
                  height={400}
                  className="rounded-2xl shadow-lg"
                />
              </div>
            </div>

            {/* Pilar 2: Escuta Ativa */}
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="relative lg:order-1">
                <Image
                  src="/images/ooba-escuta.jpg"
                  alt="Escuta ativa - pai conversando com filho"
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
                  Mais que apenas ouvir, a escuta ativa envolve compreender verdadeiramente os sentimentos e
                  necessidades de cada membro da família, criando um ambiente de confiança e validação emocional.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#ff6b6b]" />
                    <span className="text-gray-700">Técnicas de comunicação empática</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#ff6b6b]" />
                    <span className="text-gray-700">Validação de sentimentos</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#ff6b6b]" />
                    <span className="text-gray-700">Criação de espaços seguros para diálogo</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pilar 3: Rotina com Propósito */}
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
                  Estruturas diárias intencionais que criam segurança emocional e oportunidades regulares de conexão
                  familiar, transformando momentos cotidianos em memórias afetivas duradouras.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#1d9b9a]" />
                    <span className="text-gray-700">Rituais familiares significativos</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#1d9b9a]" />
                    <span className="text-gray-700">Momentos de qualidade planejados</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#1d9b9a]" />
                    <span className="text-gray-700">Tradições que fortalecem vínculos</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <Image
                  src="/images/ooba-escuta.jpg"
                  alt="Rotina familiar - família jantando junta"
                  width={500}
                  height={400}
                  className="rounded-2xl shadow-lg"
                />
              </div>
            </div>

            {/* Pilar 4: Participação */}
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="relative lg:order-1">
                <Image
                  src="/images/ooba-tarefas.jpg"
                  alt="Participação familiar - família trabalhando junta"
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
                  O envolvimento ativo de todos os membros da família na construção de um ambiente harmonioso, onde cada
                  pessoa tem voz, responsabilidades e contribui para o bem-estar coletivo.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#ff6b6b]" />
                    <span className="text-gray-700">Responsabilidades compartilhadas</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#ff6b6b]" />
                    <span className="text-gray-700">Decisões familiares colaborativas</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#ff6b6b]" />
                    <span className="text-gray-700">Senso de pertencimento e propósito</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona o Método */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Como Funciona na Prática</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Um processo estruturado e gradual que transforma relacionamentos familiares
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-8 border-0 shadow-lg relative">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-[#1d9b9a] rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Diagnóstico Familiar</h3>
                <p className="text-gray-600 leading-relaxed">
                  Avaliação inicial dos padrões de comunicação e dinâmicas familiares existentes para identificar pontos
                  de melhoria.
                </p>
              </CardContent>
              <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                <ArrowRight className="w-8 h-8 text-[#1d9b9a]" />
              </div>
            </Card>

            <Card className="text-center p-8 border-0 shadow-lg relative">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-[#ff6b6b] rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Implementação Gradual</h3>
                <p className="text-gray-600 leading-relaxed">
                  Aplicação progressiva dos 4 pilares, com acompanhamento e ajustes personalizados para cada realidade
                  familiar.
                </p>
              </CardContent>
              <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                <ArrowRight className="w-8 h-8 text-[#ff6b6b]" />
              </div>
            </Card>

            <Card className="text-center p-8 border-0 shadow-lg">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-[#1d9b9a] rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Transformação Duradoura</h3>
                <p className="text-gray-600 leading-relaxed">
                  Consolidação dos novos padrões familiares, criando um ambiente de amor, respeito e crescimento
                  contínuo.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefícios e Resultados */}
      <section className="py-20 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Benefícios Comprovados</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Transformações reais que famílias experimentam ao aplicar o Método OOBA
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 border-0 shadow-lg">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-[#1d9b9a] rounded-full flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Relacionamentos Mais Profundos</h3>
                <p className="text-gray-600">
                  Vínculos familiares fortalecidos através de comunicação autêntica e amor genuíno.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 border-0 shadow-lg">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-[#ff6b6b] rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Redução de Conflitos</h3>
                <p className="text-gray-600">Diminuição significativa de discussões e mal-entendidos familiares.</p>
              </CardContent>
            </Card>

            <Card className="p-6 border-0 shadow-lg">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-[#1d9b9a] rounded-full flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Maior Cooperação</h3>
                <p className="text-gray-600">Ambiente familiar mais harmonioso com participação ativa de todos.</p>
              </CardContent>
            </Card>

            <Card className="p-6 border-0 shadow-lg">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-[#ff6b6b] rounded-full flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Desenvolvimento Emocional</h3>
                <p className="text-gray-600">Crianças e adolescentes mais seguros emocionalmente e confiantes.</p>
              </CardContent>
            </Card>

            <Card className="p-6 border-0 shadow-lg">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-[#1d9b9a] rounded-full flex items-center justify-center mb-4">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Valores Sólidos</h3>
                <p className="text-gray-600">Transmissão efetiva de princípios e valores para as próximas gerações.</p>
              </CardContent>
            </Card>

            <Card className="p-6 border-0 shadow-lg">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-[#ff6b6b] rounded-full flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Memórias Afetivas</h3>
                <p className="text-gray-600">Criação de lembranças positivas que fortalecem os laços familiares.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Depoimentos Específicos */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Famílias Transformadas pelo OOBA
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Histórias reais de transformação através do Método OOBA
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="p-8 border-0 shadow-lg">
              <CardContent className="p-0">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic leading-relaxed text-lg">
                  "O Método OOBA salvou nossa família. Meu filho adolescente estava se afastando, mas com os 4 pilares
                  conseguimos reconstruir nossa conexão. Hoje ele me procura para conversar sobre tudo!"
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
                <p className="text-gray-600 mb-6 italic leading-relaxed text-lg">
                  "Aplicamos o OOBA há 6 meses e a diferença é incrível. Nossos filhos são mais responsáveis,
                  participativos e carinhosos. O ambiente em casa mudou completamente!"
                </p>
                <div>
                  <p className="font-semibold text-gray-900">Carlos e Marina Santos</p>
                  <p className="text-sm text-gray-500">Pais de 3 filhos, Curitiba</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Chamada para Ação */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-[#1d9b9a] to-[#16807f] text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Pronto para transformar sua família?</h2>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed">
            Comece hoje mesmo a aplicar o Método OOBA e veja sua família se transformar através do amor, comunicação e
            conexão verdadeira.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-[#1d9b9a] hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full"
            >
              Agendar Consultoria
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-[#1d9b9a] px-8 py-4 text-lg font-semibold rounded-full bg-transparent"
            >
              Solicitar Palestra
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
