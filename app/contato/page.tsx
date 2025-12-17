
"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  CheckCircle,
  Calendar,
  Mic,
  BookOpen,
  Users,
} from "@/components/icons"
import Image from "next/image"
import { Header } from "@/components/header"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"

export default function ContatoPage() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    assunto: "",
    tipo: "",
    mensagem: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const supabase = createClient()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.nome,
          email: formData.email,
          phone: formData.telefone,
          subject: formData.assunto,
          type: formData.tipo,
          message: formData.mensagem,
        }),
      })

      if (!response.ok) throw new Error('Erro ao enviar mensagem')

      setIsSubmitted(true)
      toast.success("Mensagem enviada com sucesso!")

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({
          nome: "",
          email: "",
          telefone: "",
          assunto: "",
          tipo: "",
          mensagem: "",
        })
      }, 3000)
    } catch (error) {
      console.error('Error submitting contact form:', error)
      toast.error("Erro ao enviar mensagem. Tente novamente.")
    } finally {
      setIsSubmitting(false)
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
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <span className="text-white/90 font-semibold text-lg">Vamos Conversar</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">Entre em Contato</h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
                Estou aqui para ajudar você a transformar sua família através do Método OOBA. Entre em contato para
                agendar palestras, tirar dúvidas ou compartilhar sua jornada.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-white text-[#1d9b9a] hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full"
                >
                  WhatsApp Direto
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-[#1d9b9a] px-8 py-4 text-lg font-semibold rounded-full bg-transparent"
                >
                  Agendar Reunião
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/images/contato-celso.jpg"
                alt="Celso Rocha em seu escritório"
                width={600}
                height={500}
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Informações de Contato */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Como me encontrar</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Múltiplas formas de entrar em contato para sua comodidade
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-8 border-0 shadow-lg text-center hover:shadow-xl transition-shadow">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-[#1d9b9a] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Telefone</h3>
                <p className="text-gray-600 mb-4">(47) 98900-4121</p>
                <Button size="sm" className="bg-[#1d9b9a] hover:bg-[#16807f] rounded-full">
                  Ligar Agora
                </Button>
              </CardContent>
            </Card>

            <Card className="p-8 border-0 shadow-lg text-center hover:shadow-xl transition-shadow">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-[#ff6b6b] rounded-full flex items-center justify-center mx-auto mb-6">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">WhatsApp</h3>
                <p className="text-gray-600 mb-4">(47) 98900-4121</p>
                <Button size="sm" className="bg-[#ff6b6b] hover:bg-[#e55555] rounded-full">
                  Conversar
                </Button>
              </CardContent>
            </Card>

            <Card className="p-8 border-0 shadow-lg text-center hover:shadow-xl transition-shadow">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-[#1d9b9a] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">E-mail</h3>
                <p className="text-gray-600 mb-4">celsorochadeabreu@gmail.com</p>
                <Button size="sm" className="bg-[#1d9b9a] hover:bg-[#16807f] rounded-full">
                  Enviar E-mail
                </Button>
              </CardContent>
            </Card>

            <Card className="p-8 border-0 shadow-lg text-center hover:shadow-xl transition-shadow">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-[#ff6b6b] rounded-full flex items-center justify-center mx-auto mb-6">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Localização</h3>
                <p className="text-gray-600 mb-4">Rua Alberto Zanella, 2035 - Schroeder SC</p>
                <Button size="sm" className="bg-[#ff6b6b] hover:bg-[#e55555] rounded-full">
                  Ver Mapa
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Formulário de Contato */}
      <section className="py-20 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Envie sua mensagem</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Preencha o formulário abaixo e entrarei em contato o mais breve possível. Seja para agendar uma
                palestra, tirar dúvidas sobre o Método OOBA ou compartilhar sua experiência.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#1d9b9a] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Tempo de Resposta</h3>
                    <p className="text-gray-600">Respondo todas as mensagens em até 24 horas úteis.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#ff6b6b] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Atendimento Personalizado</h3>
                    <p className="text-gray-600">Cada contato recebe atenção individual e cuidadosa.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#1d9b9a] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Confidencialidade</h3>
                    <p className="text-gray-600">Suas informações são tratadas com total privacidade e respeito.</p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="p-8 border-0 shadow-lg">
              <CardContent className="p-0">
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Mensagem Enviada!</h3>
                    <p className="text-gray-600">Obrigado pelo contato. Responderei sua mensagem em breve.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-2">
                          Nome Completo *
                        </label>
                        <Input
                          id="nome"
                          name="nome"
                          type="text"
                          required
                          value={formData.nome}
                          onChange={handleInputChange}
                          className="w-full"
                          placeholder="Seu nome completo"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          E-mail *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full"
                          placeholder="seu@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-2">
                          Telefone/WhatsApp
                        </label>
                        <Input
                          id="telefone"
                          name="telefone"
                          type="tel"
                          value={formData.telefone}
                          onChange={handleInputChange}
                          className="w-full"
                          placeholder="(00) 00000-0000"
                        />
                      </div>
                      <div>
                        <label htmlFor="tipo" className="block text-sm font-medium text-gray-700 mb-2">
                          Tipo de Contato *
                        </label>
                        <select
                          id="tipo"
                          name="tipo"
                          required
                          value={formData.tipo}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1d9b9a] focus:border-[#1d9b9a]"
                        >
                          <option value="">Selecione uma opção</option>
                          <option value="palestra">Agendar Palestra</option>
                          <option value="consultoria">Consultoria Familiar</option>
                          <option value="livros">Dúvidas sobre Livros</option>
                          <option value="metodo">Método OOBA</option>
                          <option value="midia">Imprensa/Mídia</option>
                          <option value="outros">Outros</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="assunto" className="block text-sm font-medium text-gray-700 mb-2">
                        Assunto *
                      </label>
                      <Input
                        id="assunto"
                        name="assunto"
                        type="text"
                        required
                        value={formData.assunto}
                        onChange={handleInputChange}
                        className="w-full"
                        placeholder="Resumo do que você gostaria de conversar"
                      />
                    </div>

                    <div>
                      <label htmlFor="mensagem" className="block text-sm font-medium text-gray-700 mb-2">
                        Mensagem *
                      </label>
                      <Textarea
                        id="mensagem"
                        name="mensagem"
                        required
                        value={formData.mensagem}
                        onChange={handleInputChange}
                        rows={5}
                        className="w-full"
                        placeholder="Conte-me mais detalhes sobre sua necessidade ou dúvida..."
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#1d9b9a] hover:bg-[#16807f] py-3 text-lg font-semibold rounded-full"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Enviando...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Enviar Mensagem
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Tipos de Atendimento */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Como posso ajudar você</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Diferentes formas de apoio para sua jornada familiar
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-[#1d9b9a] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Mic className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Palestras</h3>
                <p className="text-gray-600 text-center mb-6">
                  Palestras transformadoras para escolas, empresas, igrejas e eventos familiares.
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#1d9b9a]" />
                    <span className="text-sm text-gray-600">Presencial e online</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#1d9b9a]" />
                    <span className="text-sm text-gray-600">Conteúdo personalizado</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#1d9b9a]" />
                    <span className="text-sm text-gray-600">Material de apoio</span>
                  </div>
                </div>
                <Button className="w-full bg-[#1d9b9a] hover:bg-[#16807f] rounded-full">Solicitar Orçamento</Button>
              </CardContent>
            </Card>

            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-[#ff6b6b] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Consultoria Familiar</h3>
                <p className="text-gray-600 text-center mb-6">
                  Acompanhamento personalizado para aplicar o Método OOBA em sua família.
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#ff6b6b]" />
                    <span className="text-sm text-gray-600">Sessões individuais</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#ff6b6b]" />
                    <span className="text-sm text-gray-600">Plano personalizado</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#ff6b6b]" />
                    <span className="text-sm text-gray-600">Acompanhamento contínuo</span>
                  </div>
                </div>
                <Button className="w-full bg-[#ff6b6b] hover:bg-[#e55555] rounded-full">Agendar Consulta</Button>
              </CardContent>
            </Card>

            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-[#1d9b9a] rounded-full flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Suporte aos Livros</h3>
                <p className="text-gray-600 text-center mb-6">
                  Tire dúvidas sobre os livros e receba orientações para aplicar os conceitos.
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#1d9b9a]" />
                    <span className="text-sm text-gray-600">Esclarecimentos sobre conteúdo</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#1d9b9a]" />
                    <span className="text-sm text-gray-600">Dicas de aplicação prática</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#1d9b9a]" />
                    <span className="text-sm text-gray-600">Grupos de estudo</span>
                  </div>
                </div>
                <Button className="w-full bg-[#1d9b9a] hover:bg-[#16807f] rounded-full">Falar sobre Livros</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Horários de Atendimento */}
      <section className="py-20 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Horários de Atendimento</h2>
              <p className="text-lg md:text-xl text-gray-600">
                Estou disponível nos seguintes horários para melhor atendê-lo
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-8 border-0 shadow-lg">
                <CardContent className="p-0">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-[#1d9b9a] rounded-full flex items-center justify-center">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Atendimento Geral</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Segunda a Sexta:</span>
                      <span className="font-semibold text-gray-900">8h às 18h</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sábado:</span>
                      <span className="font-semibold text-gray-900">8h às 12h</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Domingo:</span>
                      <span className="font-semibold text-gray-900">Fechado</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-8 border-0 shadow-lg">
                <CardContent className="p-0">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-[#ff6b6b] rounded-full flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Consultorias</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Segunda a Quinta:</span>
                      <span className="font-semibold text-gray-900">14h às 17h</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sexta:</span>
                      <span className="font-semibold text-gray-900">9h às 12h</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Agendamento:</span>
                      <span className="font-semibold text-gray-900">Obrigatório</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-8">
              <p className="text-gray-600 mb-4">Para emergências ou casos urgentes, entre em contato via WhatsApp</p>
              <Button className="bg-[#25D366] hover:bg-[#20BA5A] text-white px-8 py-3 rounded-full font-semibold">
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp Urgente
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Chamada para Ação */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-[#1d9b9a] to-[#16807f] text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Vamos começar sua transformação?</h2>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed">
            Não deixe para amanhã a oportunidade de fortalecer os laços com quem você mais ama. Entre em contato agora e
            dê o primeiro passo rumo a uma família mais unida e feliz.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-[#1d9b9a] hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full"
            >
              Falar no WhatsApp
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-[#1d9b9a] px-8 py-4 text-lg font-semibold rounded-full bg-transparent"
            >
              Agendar Reunião
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
