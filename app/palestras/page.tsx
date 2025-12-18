
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Mic, Users, Clock, MapPin, Video, Star, CheckCircle, Calendar, Award, Target, Heart } from "@/components/icons"
import Image from "next/image"
import { Header } from "@/components/header"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"

interface Lecture {
  id: string
  title: string
  description: string
  duration: string
  target_audience: string
  topics: string[]
  image_url: string
}

export default function PalestrasPage() {
  const [lectures, setLectures] = useState<Lecture[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchLectures()
  }, [])

  const fetchLectures = async () => {
    try {
      const { data, error } = await supabase
        .from('lectures')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      if (data) {
        setLectures(data)
      }
    } catch (error) {
      console.error('Error fetching lectures:', error)
      console.error('Error details:', JSON.stringify(error, null, 2))
    } finally {
      setLoading(false)
    }
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
                  <Mic className="w-6 h-6 text-white" />
                </div>
                <span className="text-white/90 font-semibold text-lg">Palestras Transformadoras</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">Inspire sua Comunidade</h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
                Palestras que tocam o coração e transformam relacionamentos familiares. Conteúdo prático, inspirador e
                adaptado para cada público.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/agendar-palestra">
                  <Button
                    size="lg"
                    className="bg-white text-[#1d9b9a] hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full w-full sm:w-auto"
                  >
                    Agendar Palestra
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-[#1d9b9a] px-8 py-4 text-lg font-semibold rounded-full bg-transparent"
                  onClick={() => {
                    document.getElementById('temas')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  Ver Temas
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/images/palestra-celso.jpg"
                alt="Celso Rocha palestrando para uma audiência"
                width={600}
                height={500}
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>

      </section>

      {/* Números e Impacto */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Impacto Comprovado</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Mais de uma década transformando vidas através de palestras inspiradoras
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-8 border-0 shadow-lg">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-[#1d9b9a] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mic className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">200+</h3>
                <p className="text-gray-600">Palestras Realizadas</p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 border-0 shadow-lg">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-[#ff6b6b] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">20.000+</h3>
                <p className="text-gray-600">Pessoas Impactadas</p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 border-0 shadow-lg">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-[#1d9b9a] rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">50+</h3>
                <p className="text-gray-600">Cidades Visitadas</p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 border-0 shadow-lg">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-[#ff6b6b] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">10+</h3>
                <p className="text-gray-600">Anos de Experiência</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Tipos de Palestras */}
      <section className="py-20 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Tipos de Palestras</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Conteúdo adaptado para diferentes públicos e necessidades
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-[#1d9b9a] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Para Pais e Famílias</h3>
                <p className="text-gray-600 text-center mb-6">
                  Palestras focadas em fortalecer vínculos familiares e aplicar o Método OOBA no dia a dia.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#1d9b9a]" />
                    <span className="text-sm text-gray-600">Comunicação familiar efetiva</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#1d9b9a]" />
                    <span className="text-sm text-gray-600">Disciplina positiva</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#1d9b9a]" />
                    <span className="text-sm text-gray-600">Construção de valores</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-[#ff6b6b] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Para Educadores</h3>
                <p className="text-gray-600 text-center mb-6">
                  Capacitação para professores e profissionais da educação sobre relacionamentos saudáveis.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#ff6b6b]" />
                    <span className="text-sm text-gray-600">Gestão de sala de aula</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#ff6b6b]" />
                    <span className="text-sm text-gray-600">Relacionamento professor-aluno</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#ff6b6b]" />
                    <span className="text-sm text-gray-600">Parceria escola-família</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-[#1d9b9a] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Para Empresas</h3>
                <p className="text-gray-600 text-center mb-6">
                  Palestras sobre equilíbrio vida-trabalho e relacionamentos interpessoais no ambiente corporativo.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#1d9b9a]" />
                    <span className="text-sm text-gray-600">Qualidade de vida familiar</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#1d9b9a]" />
                    <span className="text-sm text-gray-600">Comunicação no trabalho</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#1d9b9a]" />
                    <span className="text-sm text-gray-600">Liderança humanizada</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-[#ff6b6b] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Para Igrejas</h3>
                <p className="text-gray-600 text-center mb-6">
                  Ministração sobre família cristã, valores bíblicos e relacionamentos segundo os princípios divinos.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#ff6b6b]" />
                    <span className="text-sm text-gray-600">Família segundo a Bíblia</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#ff6b6b]" />
                    <span className="text-sm text-gray-600">Educação cristã dos filhos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#ff6b6b]" />
                    <span className="text-sm text-gray-600">Valores eternos</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-[#1d9b9a] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Para Eventos</h3>
                <p className="text-gray-600 text-center mb-6">
                  Palestras especiais para congressos, seminários e eventos sobre família e relacionamentos.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#1d9b9a]" />
                    <span className="text-sm text-gray-600">Keynotes inspiradoras</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#1d9b9a]" />
                    <span className="text-sm text-gray-600">Workshops práticos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#1d9b9a]" />
                    <span className="text-sm text-gray-600">Painéis de discussão</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-[#ff6b6b] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Video className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Online</h3>
                <p className="text-gray-600 text-center mb-6">
                  Palestras virtuais com a mesma qualidade e impacto, alcançando públicos em qualquer lugar do mundo.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#ff6b6b]" />
                    <span className="text-sm text-gray-600">Transmissão ao vivo</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#ff6b6b]" />
                    <span className="text-sm text-gray-600">Interação com o público</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#ff6b6b]" />
                    <span className="text-sm text-gray-600">Material complementar</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Temas Principais */}
      <section id="temas" className="py-20 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Temas Principais</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Conteúdos desenvolvidos para gerar transformação real e duradoura
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1d9b9a]"></div>
            </div>
          ) : lectures.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-12 lg:gap-20 max-w-6xl mx-auto">
              {lectures.map((lecture, index) => (
                <div key={lecture.id} className="flex items-start gap-4">
                  <div className={`w-12 h-12 ${index % 2 === 0 ? 'bg-[#1d9b9a]' : 'bg-[#ff6b6b]'} rounded-full flex items-center justify-center flex-shrink-0 mt-1`}>
                    <Mic className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{lecture.title}</h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {lecture.description}
                    </p>
                    {lecture.topics && lecture.topics.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {lecture.topics.map((topic, i) => (
                          <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                            {topic}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Nenhuma palestra encontrada no momento.</p>
            </div>
          )}
        </div>
      </section>

      {/* Formato das Palestras */}
      <section className="py-20 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Formato das Palestras</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Flexibilidade para atender diferentes necessidades e públicos
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 border-0 shadow-lg text-center">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-[#1d9b9a] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Duração Flexível</h3>
                <p className="text-gray-600 mb-4">De 45 minutos a 3 horas, adaptável às necessidades do evento.</p>
                <div className="text-sm text-gray-500">
                  <p>• Palestras rápidas: 45-60 min</p>
                  <p>• Palestras completas: 90-120 min</p>
                  <p>• Workshops: 2-3 horas</p>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6 border-0 shadow-lg text-center">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-[#ff6b6b] rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Presencial</h3>
                <p className="text-gray-600 mb-4">Experiência completa com interação direta e energia contagiante.</p>
                <div className="text-sm text-gray-500">
                  <p>• Auditórios e teatros</p>
                  <p>• Salões de eventos</p>
                  <p>• Espaços corporativos</p>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6 border-0 shadow-lg text-center">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-[#1d9b9a] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Video className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Online</h3>
                <p className="text-gray-600 mb-4">
                  Alcance global com qualidade profissional e interação em tempo real.
                </p>
                <div className="text-sm text-gray-500">
                  <p>• Plataformas digitais</p>
                  <p>• Transmissão ao vivo</p>
                  <p>• Gravação disponível</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Depoimentos de Palestras */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              O que dizem sobre as palestras
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Feedback de organizadores e participantes que vivenciaram a transformação
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
                  "A palestra do Celso foi o ponto alto do nosso evento. Mais de 800 pessoas emocionadas e
                  transformadas. Já estamos planejando o próximo encontro!"
                </p>
                <div>
                  <p className="font-semibold text-gray-900">Marcos Oliveira</p>
                  <p className="text-sm text-gray-500">Diretor de Escola, Salvador</p>
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
                  "Conteúdo profundo, apresentação envolvente e aplicação prática. Nossa igreja foi impactada de forma
                  extraordinária. Recomendo sem reservas!"
                </p>
                <div>
                  <p className="font-semibold text-gray-900">Pastor Roberto Silva</p>
                  <p className="text-sm text-gray-500">Igreja Batista Central, Goiânia</p>
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
                  "Palestrante excepcional! Conseguiu conectar com nossos colaboradores de forma única. O feedback foi
                  unânime: queremos mais!"
                </p>
                <div>
                  <p className="font-semibold text-gray-900">Ana Beatriz Costa</p>
                  <p className="text-sm text-gray-500">RH Corporativo, São Paulo</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Como Contratar */}
      <section className="py-20 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Como Contratar</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Processo simples e transparente para levar transformação ao seu evento
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#1d9b9a] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Contato Inicial</h3>
              <p className="text-gray-600 text-sm">
                Entre em contato através do formulário ou WhatsApp para conversarmos sobre sua necessidade.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#ff6b6b] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Personalização</h3>
              <p className="text-gray-600 text-sm">
                Adaptamos o conteúdo e formato da palestra para seu público específico e objetivos do evento.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#1d9b9a] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Confirmação</h3>
              <p className="text-gray-600 text-sm">
                Definimos data, local, investimento e todos os detalhes técnicos necessários para o sucesso do evento.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#ff6b6b] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">4</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Realização</h3>
              <p className="text-gray-600 text-sm">
                Palestra impactante com material de apoio e acompanhamento pós-evento quando necessário.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Chamada para Ação */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-[#1d9b9a] to-[#16807f] text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Pronto para transformar vidas?</h2>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed">
            Leve uma palestra transformadora para sua comunidade. Entre em contato e vamos juntos impactar vidas através
            do poder dos relacionamentos familiares.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/agendar-palestra">
              <Button
                size="lg"
                className="bg-white text-[#1d9b9a] hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full"
              >
                Solicitar Orçamento
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-[#1d9b9a] px-8 py-4 text-lg font-semibold rounded-full bg-transparent"
            >
              Falar no WhatsApp
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
