import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star, ShoppingCart, CheckCircle, Heart, Users, Award, Target } from "lucide-react"
import Image from "next/image"
import { Header } from "@/components/header"

export default function PaisEFilhosPage() {
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
                <span className="text-white/90 font-semibold text-lg">Relacionamento entre pais e filhos</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Um legado de grandes valores
              </h1>
              <p className="text-xl md:text-2xl mb-6 opacity-90 leading-relaxed">
                Construa uma convivência incrível com seus filhos e crie memórias inesquecíveis!
              </p>
              <p className="text-lg md:text-xl mb-8 opacity-80 leading-relaxed">
                Eduque com amor e conquiste a felicidade no lar – saiba como neste livro transformador!
              </p>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/80 text-lg">Adquira o livro por apenas</p>
                    <p className="text-3xl md:text-4xl font-bold text-white">R$ 59,90</p>
                    <p className="text-white/80">com FRETE GRÁTIS</p>
                  </div>
                  <div className="text-right">
                    <Button
                      size="lg"
                      className="bg-white text-[#1d9b9a] hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full"
                    >
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Comprar o Livro
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=600&width=400"
                alt="Capa do livro Pais e Filhos: Um Legado de Grandes Valores"
                width={400}
                height={600}
                className="rounded-2xl shadow-2xl mx-auto"
              />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Desafios */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#ff6b6b] rounded-full flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <span className="text-[#ff6b6b] font-semibold text-lg">Desafios</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                A educação dos filhos de 0 a 7 anos pode ser desafiadora e confusa.
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Entender como educar os filhos pode ser um desafio. O livro "Relacionamento entre pais e filhos" oferece
                uma abordagem atual e eficiente para enfrentar esses desafios, apresentando métodos e técnicas que
                ajudarão você a proporcionar a melhor educação possível para seus filhos, desde cedo.
              </p>
              <Button className="bg-[#ff6b6b] hover:bg-[#e55555] px-8 py-3 rounded-full font-semibold">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Comprar o Livro
              </Button>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=400&width=500"
                alt="Pais enfrentando desafios na educação"
                width={500}
                height={400}
                className="rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Lidar com os desafios */}
      <section className="py-20 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative lg:order-1">
              <Image
                src="/placeholder.svg?height=400&width=500"
                alt="Família harmoniosa"
                width={500}
                height={400}
                className="rounded-2xl shadow-lg"
              />
            </div>
            <div className="lg:order-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#1d9b9a] rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <span className="text-[#1d9b9a] font-semibold text-lg">Desafios</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Lidar com os desafios</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Como pais, sempre queremos o melhor para nossos filhos. No entanto, nem sempre sabemos como enfrentar os
                desafios do dia a dia. O livro "Relacionamento entre pais e filhos: Um legado de grandes valores" ensina
                as melhores práticas e estratégias para criar um ambiente familiar harmonioso, onde o amor e a educação
                caminham lado a lado, formando cidadãos felizes e bem-sucedidos.
              </p>
              <Button className="bg-[#1d9b9a] hover:bg-[#16807f] px-8 py-3 rounded-full font-semibold">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Comprar o Livro
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Distanciamento */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#ff6b6b] rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <span className="text-[#ff6b6b] font-semibold text-lg">Distanciamento</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Relação distante e desgastada</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Se você não tomar uma atitude e investir na educação emocional de seus filhos desde cedo, poderá
                enfrentar consequências negativas a longo prazo. A relação com seus filhos pode se tornar distante e
                desgastada, prejudicando a convivência familiar e o desenvolvimento emocional e social das crianças.
              </p>
              <Button className="bg-[#ff6b6b] hover:bg-[#e55555] px-8 py-3 rounded-full font-semibold">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Comprar o Livro
              </Button>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=400&width=500"
                alt="Família com relacionamento distante"
                width={500}
                height={400}
                className="rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Conexão */}
      <section className="py-20 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative lg:order-1">
              <Image
                src="/placeholder.svg?height=400&width=500"
                alt="Família conectada e feliz"
                width={500}
                height={400}
                className="rounded-2xl shadow-lg"
              />
            </div>
            <div className="lg:order-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#1d9b9a] rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <span className="text-[#1d9b9a] font-semibold text-lg">Conexão</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Decisão informada</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                A importância de tomar uma decisão informada sobre a educação e a construção de um relacionamento
                saudável com seus filhos é inegável. O livro "Relacionamento entre pais e filhos: Um legado de grandes
                valores" apresenta os ensinamentos e as técnicas de Celso Abreu, proporcionando um guia valioso para
                pais que buscam estabelecer uma conexão profunda e duradoura com seus filhos, garantindo um futuro
                promissor.
              </p>
              <Button className="bg-[#1d9b9a] hover:bg-[#16807f] px-8 py-3 rounded-full font-semibold">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Comprar o Livro
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Principal */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-[#1d9b9a] to-[#16807f] text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Compre por apenas R$ 59,90, com frete grátis!
          </h2>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed">
            Adquira o livro "Relacionamento entre pais e filhos: Um legado de grandes valores" e comece hoje mesmo a
            transformar a relação com seus filhos! Pague apenas R$ 59,90 e receba com frete grátis.
          </p>
          <Button
            size="lg"
            className="bg-white text-[#1d9b9a] hover:bg-gray-100 px-12 py-6 text-xl font-bold rounded-full"
          >
            <ShoppingCart className="w-6 h-6 mr-3" />
            Comprar Agora!
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
                alt="Celso Rocha de Abreu"
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
                <span className="text-[#1d9b9a] font-semibold text-lg">Sobre o autor</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Conheça o Autor</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Sou <strong>CELSO ROCHA DE ABREU</strong>, nascido em 14 de janeiro de 1972, natural de Laranjeiras do
                  Sul/Pr. Vivi minha infância, adolescência e juventude, na cidade de Cantagalo/Pr, sou casado com Diana
                  Ilaine Gnewuch de Abreu, temos dois filhos, a Valquíria e o Valentino, atualmente sou residente e
                  domiciliado na cidade de Schroeder/SC.
                </p>
                <p>
                  Autor, escritor, poeta, compositor e graduando em Teologia, permanente estudioso nas áreas de
                  desenvolvimento familiar, aplicando inovações nos métodos das relações entre Pais e Filhos, buscando o
                  equilíbrio entre as gerações.
                </p>
                <p>
                  Juntamente com minha esposa, somos palestrantes a mais de 15 anos na área familiar, com
                  aprofundamentos nas relações entre Pais e Filhos, difundindo Técnicas Simples de Harmonização
                  Familiar.
                </p>
                <p>
                  Sou defensor dos Direitos da Criança e do Adolescente, compreendendo também seus deveres, isto é,
                  levar o conhecimento dos Pais e Tutores, as contrapartidas necessárias da Criança e do Adolescente,
                  expondo uma forma simples desenvolver um relacionamento saudável para todos.
                </p>
                <p>
                  <em>
                    Convido você a conhecer as obras e se beneficiar destas experiências que resultaram em qualidade de
                    vida familiar.
                  </em>
                </p>
                <p className="font-semibold">Um forte abraço.</p>
              </div>
              <div className="mt-8">
                <Button className="bg-[#1d9b9a] hover:bg-[#16807f] px-8 py-3 rounded-full font-semibold">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Comprar o livro com frete grátis!
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* O que você vai aprender */}
      <section className="py-20 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">O que você vai aprender?</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Técnicas práticas e eficazes para transformar sua relação familiar
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="p-8 border-0 shadow-lg">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-[#1d9b9a] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Enfrentando Birras Eficazmente</h3>
                <p className="text-gray-600 text-center">
                  Como agir diante de BIRRAS, TEIMOSIA, DESOBEDIÊNCIA, e poder ir aos lugares sem essa preocupação de
                  vexame.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 border-0 shadow-lg">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-[#ff6b6b] rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Extinguindo Rebeldia Juvenil</h3>
                <p className="text-gray-600 text-center">
                  O que faço para eliminar a REBELDIA do meu filho, e acabar com o stress provocado?
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 border-0 shadow-lg">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-[#1d9b9a] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                  Solucionando Conflitos Entre Irmãos
                </h3>
                <p className="text-gray-600 text-center">
                  Nas BRIGAS ENTRE IRMÃOS, apenas assisto ou me posiciono resolvendo com sabedoria?
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 border-0 shadow-lg">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-[#ff6b6b] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Consumo Consciente em Brinquedos</h3>
                <p className="text-gray-600 text-center">Porque devo comprar menos BRINQUEDOS para meu filho?</p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="bg-[#1d9b9a] hover:bg-[#16807f] px-12 py-4 text-lg font-semibold rounded-full">
              <ShoppingCart className="w-6 h-6 mr-3" />
              Comprar agora com frete grátis!
            </Button>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">DEPOIMENTOS</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">Opinião dos leitores</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="p-8 border-0 shadow-lg">
              <CardContent className="p-0">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic leading-relaxed">
                  "Deveria ser um manual obrigatório para quem deseja se aventurar na Odisséia de serem pais: contém
                  dicas preciosas para a criação dos filhos! Parabéns pelo trabalho 👏👏👏"
                </p>
                <div>
                  <p className="font-semibold text-gray-900">Vera Grein</p>
                  <p className="text-sm text-gray-500">Mãe – Joinville SC</p>
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
                  "De fácil leitura, porém com grande ensinamento (para quem desejar aprender a ser pai/mãe). Um livro
                  necessário para dias atuais onde a inversão de valores ultrapassa os níveis do aceitável…., que
                  direciona, ensina não só sobre questões psicológicas mas também cuidados com o físico (acidentes
                  domésticos)"
                </p>
                <div>
                  <p className="font-semibold text-gray-900">Oscar Luciano</p>
                  <p className="text-sm text-gray-500">Pai – Schroeder/ SC</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="bg-[#ff6b6b] hover:bg-[#e55555] px-12 py-4 text-lg font-semibold rounded-full">
              <ShoppingCart className="w-6 h-6 mr-3" />
              Comprar o livro com frete grátis!
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
