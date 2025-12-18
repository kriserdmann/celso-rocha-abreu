
"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Mic,
  Users,
  CheckCircle,
  Send,
  Phone,
  Mail,
  MessageCircle,
  Star,
  School,
  Church,
  Briefcase,
} from "lucide-react"
import Image from "next/image"
import { Header } from "@/components/header"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"

export default function AgendarPalestraPage() {
  const [formData, setFormData] = useState({
    nomeResponsavel: "",
    email: "",
    telefone: "",
    nomeInstituicao: "",
    tipoInstituicao: "",
    cargo: "",
    cidade: "",
    estado: "",
    dataPreferencial: "",
    dataAlternativa: "",
    horarioPreferencial: "",
    duracaoDesejada: "",
    publicoAlvo: "",
    numeroParticipantes: "",
    temaPreferido: "",
    formatoPalestra: "",
    infraestrutura: "",
    orcamento: "",
    objetivos: "",
    informacoesAdicionais: "",
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
      const messageBody = `
        Nome da Instituição: ${formData.nomeInstituicao}
        Tipo de Instituição: ${formData.tipoInstituicao}
        Cargo: ${formData.cargo}
        Cidade/Estado: ${formData.cidade}/${formData.estado}
        Data Preferencial: ${formData.dataPreferencial}
        Data Alternativa: ${formData.dataAlternativa}
        Horário Preferencial: ${formData.horarioPreferencial}
        Duração Desejada: ${formData.duracaoDesejada}
        Público Alvo: ${formData.publicoAlvo}
        Número de Participantes: ${formData.numeroParticipantes}
        Tema Preferido: ${formData.temaPreferido}
        Formato da Palestra: ${formData.formatoPalestra}
        Infraestrutura: ${formData.infraestrutura}
        Orçamento: ${formData.orcamento}
        Objetivos: ${formData.objetivos}
        Informações Adicionais: ${formData.informacoesAdicionais}
      `

      const { error } = await supabase
        .from('contacts')
        .insert([
          {
            name: formData.nomeResponsavel,
            email: formData.email,
            phone: formData.telefone,
            subject: `Solicitação de Palestra - ${formData.nomeInstituicao}`,
            type: 'palestra',
            message: messageBody,
            status: 'new'
          }
        ])

      if (error) throw error

      setIsSubmitted(true)
      toast.success("Solicitação enviada com sucesso!")

      // Reset form after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({
          nomeResponsavel: "",
          email: "",
          telefone: "",
          nomeInstituicao: "",
          tipoInstituicao: "",
          cargo: "",
          cidade: "",
          estado: "",
          dataPreferencial: "",
          dataAlternativa: "",
          horarioPreferencial: "",
          duracaoDesejada: "",
          publicoAlvo: "",
          numeroParticipantes: "",
          temaPreferido: "",
          formatoPalestra: "",
          infraestrutura: "",
          orcamento: "",
          objetivos: "",
          informacoesAdicionais: "",
        })
      }, 5000)
    } catch (error) {
      console.error('Error submitting lecture request:', error)
      toast.error("Erro ao enviar solicitação. Tente novamente.")
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
                  <Mic className="w-6 h-6 text-white" />
                </div>
                <span className="text-white/90 font-semibold text-lg">Palestras Transformadoras</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">Agende uma Palestra</h1>
              <p className="text-xl md:text-2xl mb-6 opacity-90 leading-relaxed">
                Leve o poder transformador do Método OOBA para sua instituição
              </p>
              <p className="text-lg md:text-xl mb-8 opacity-80 leading-relaxed">
                Mais de 500 palestras realizadas, 50.000+ pessoas impactadas e resultados comprovados em todo o Brasil
              </p>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8">
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-white" />
                    <span>Conteúdo personalizado</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-white" />
                    <span>Presencial e online</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-white" />
                    <span>Material de apoio incluso</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-white" />
                    <span>Acompanhamento pós-evento</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=500&width=600"
                alt="Celso Rocha palestrando para uma audiência"
                width={600}
                height={500}
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-4 -left-4 bg-white text-[#1d9b9a] p-4 rounded-xl shadow-lg">
                <div className="text-2xl font-bold">4.9/5</div>
                <div className="text-sm">Avaliação média</div>
                <div className="flex mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* Tipos de Instituições */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Palestras para Diferentes Públicos
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Conteúdo adaptado e personalizado para cada tipo de instituição e público
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-shadow text-center">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-[#1d9b9a] rounded-full flex items-center justify-center mx-auto mb-6">
                  <School className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Escolas e Universidades</h3>
                <p className="text-gray-600 mb-6">
                  Palestras para educadores, pais e estudantes sobre relacionamentos saudáveis e educação familiar.
                </p>
                <div className="space-y-2 text-sm text-gray-600">
                  <div>• Gestão de sala de aula</div>
                  <div>• Parceria escola-família</div>
                  <div>• Desenvolvimento emocional</div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-shadow text-center">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-[#ff6b6b] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Briefcase className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Empresas</h3>
                <p className="text-gray-600 mb-6">
                  Equilíbrio vida-trabalho, liderança humanizada e qualidade de vida para colaboradores.
                </p>
                <div className="space-y-2 text-sm text-gray-600">
                  <div>• Qualidade de vida familiar</div>
                  <div>• Comunicação no trabalho</div>
                  <div>• Liderança com propósito</div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-shadow text-center">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-[#1d9b9a] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Church className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Igrejas</h3>
                <p className="text-gray-600 mb-6">
                  Família cristã, valores bíblicos e relacionamentos segundo os princípios divinos.
                </p>
                <div className="space-y-2 text-sm text-gray-600">
                  <div>• Família segundo a Bíblia</div>
                  <div>• Educação cristã dos filhos</div>
                  <div>• Valores eternos</div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-shadow text-center">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-[#ff6b6b] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Eventos e Congressos</h3>
                <p className="text-gray-600 mb-6">
                  Keynotes inspiradoras, workshops práticos e painéis de discussão sobre família.
                </p>
                <div className="space-y-2 text-sm text-gray-600">
                  <div>• Keynotes motivacionais</div>
                  <div>• Workshops interativos</div>
                  <div>• Painéis de especialistas</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Formulário de Agendamento */}
      <section className="py-20 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Solicite um Orçamento</h2>
              <p className="text-lg md:text-xl text-gray-600">
                Preencha o formulário abaixo e receba uma proposta personalizada em até 24 horas
              </p>
            </div>

            <Card className="p-8 md:p-12 border-0 shadow-2xl">
              <CardContent className="p-0">
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">Solicitação Enviada!</h3>
                    <p className="text-lg text-gray-600 mb-6">
                      Obrigado pelo interesse! Analisaremos sua solicitação e entraremos em contato em até 24 horas com
                      uma proposta personalizada.
                    </p>
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <p className="text-gray-700">
                        <strong>Próximos passos:</strong>
                      </p>
                      <div className="text-left mt-4 space-y-2">
                        <div>1. Análise da sua solicitação</div>
                        <div>2. Preparação da proposta personalizada</div>
                        <div>3. Contato para alinhamento de detalhes</div>
                        <div>4. Confirmação e agendamento</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Informações do Responsável */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#1d9b9a] rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">1</span>
                        </div>
                        Informações do Responsável
                      </h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="nomeResponsavel" className="block text-sm font-medium text-gray-700 mb-2">
                            Nome Completo *
                          </label>
                          <Input
                            id="nomeResponsavel"
                            name="nomeResponsavel"
                            type="text"
                            required
                            value={formData.nomeResponsavel}
                            onChange={handleInputChange}
                            placeholder="Seu nome completo"
                          />
                        </div>
                        <div>
                          <label htmlFor="cargo" className="block text-sm font-medium text-gray-700 mb-2">
                            Cargo/Função *
                          </label>
                          <Input
                            id="cargo"
                            name="cargo"
                            type="text"
                            required
                            value={formData.cargo}
                            onChange={handleInputChange}
                            placeholder="Ex: Diretor, Coordenador, Pastor"
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
                            placeholder="seu@email.com"
                          />
                        </div>
                        <div>
                          <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-2">
                            Telefone/WhatsApp *
                          </label>
                          <Input
                            id="telefone"
                            name="telefone"
                            type="tel"
                            required
                            value={formData.telefone}
                            onChange={handleInputChange}
                            placeholder="(00) 00000-0000"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Informações da Instituição */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#ff6b6b] rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">2</span>
                        </div>
                        Informações da Instituição
                      </h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="nomeInstituicao" className="block text-sm font-medium text-gray-700 mb-2">
                            Nome da Instituição *
                          </label>
                          <Input
                            id="nomeInstituicao"
                            name="nomeInstituicao"
                            type="text"
                            required
                            value={formData.nomeInstituicao}
                            onChange={handleInputChange}
                            placeholder="Nome da escola, empresa, igreja, etc."
                          />
                        </div>
                        <div>
                          <label htmlFor="tipoInstituicao" className="block text-sm font-medium text-gray-700 mb-2">
                            Tipo de Instituição *
                          </label>
                          <select
                            id="tipoInstituicao"
                            name="tipoInstituicao"
                            required
                            value={formData.tipoInstituicao}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1d9b9a] focus:border-[#1d9b9a]"
                          >
                            <option value="">Selecione o tipo</option>
                            <option value="escola">Escola/Colégio</option>
                            <option value="universidade">Universidade/Faculdade</option>
                            <option value="empresa">Empresa</option>
                            <option value="igreja">Igreja</option>
                            <option value="ong">ONG/Associação</option>
                            <option value="evento">Evento/Congresso</option>
                            <option value="governo">Órgão Público</option>
                            <option value="outros">Outros</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="cidade" className="block text-sm font-medium text-gray-700 mb-2">
                            Cidade *
                          </label>
                          <Input
                            id="cidade"
                            name="cidade"
                            type="text"
                            required
                            value={formData.cidade}
                            onChange={handleInputChange}
                            placeholder="Cidade onde será realizada a palestra"
                          />
                        </div>
                        <div>
                          <label htmlFor="estado" className="block text-sm font-medium text-gray-700 mb-2">
                            Estado *
                          </label>
                          <select
                            id="estado"
                            name="estado"
                            required
                            value={formData.estado}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1d9b9a] focus:border-[#1d9b9a]"
                          >
                            <option value="">Selecione o estado</option>
                            <option value="AC">Acre</option>
                            <option value="AL">Alagoas</option>
                            <option value="AP">Amapá</option>
                            <option value="AM">Amazonas</option>
                            <option value="BA">Bahia</option>
                            <option value="CE">Ceará</option>
                            <option value="DF">Distrito Federal</option>
                            <option value="ES">Espírito Santo</option>
                            <option value="GO">Goiás</option>
                            <option value="MA">Maranhão</option>
                            <option value="MT">Mato Grosso</option>
                            <option value="MS">Mato Grosso do Sul</option>
                            <option value="MG">Minas Gerais</option>
                            <option value="PA">Pará</option>
                            <option value="PB">Paraíba</option>
                            <option value="PR">Paraná</option>
                            <option value="PE">Pernambuco</option>
                            <option value="PI">Piauí</option>
                            <option value="RJ">Rio de Janeiro</option>
                            <option value="RN">Rio Grande do Norte</option>
                            <option value="RS">Rio Grande do Sul</option>
                            <option value="RO">Rondônia</option>
                            <option value="RR">Roraima</option>
                            <option value="SC">Santa Catarina</option>
                            <option value="SP">São Paulo</option>
                            <option value="SE">Sergipe</option>
                            <option value="TO">Tocantins</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Detalhes do Evento */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#1d9b9a] rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">3</span>
                        </div>
                        Detalhes do Evento
                      </h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="dataPreferencial" className="block text-sm font-medium text-gray-700 mb-2">
                            Data Preferencial *
                          </label>
                          <Input
                            id="dataPreferencial"
                            name="dataPreferencial"
                            type="date"
                            required
                            value={formData.dataPreferencial}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div>
                          <label htmlFor="dataAlternativa" className="block text-sm font-medium text-gray-700 mb-2">
                            Data Alternativa
                          </label>
                          <Input
                            id="dataAlternativa"
                            name="dataAlternativa"
                            type="date"
                            value={formData.dataAlternativa}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div>
                          <label htmlFor="horarioPreferencial" className="block text-sm font-medium text-gray-700 mb-2">
                            Horário Preferencial *
                          </label>
                          <select
                            id="horarioPreferencial"
                            name="horarioPreferencial"
                            required
                            value={formData.horarioPreferencial}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1d9b9a] focus:border-[#1d9b9a]"
                          >
                            <option value="">Selecione o horário</option>
                            <option value="manha">Manhã (8h às 12h)</option>
                            <option value="tarde">Tarde (13h às 17h)</option>
                            <option value="noite">Noite (18h às 22h)</option>
                            <option value="flexivel">Flexível</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="duracaoDesejada" className="block text-sm font-medium text-gray-700 mb-2">
                            Duração Desejada *
                          </label>
                          <select
                            id="duracaoDesejada"
                            name="duracaoDesejada"
                            required
                            value={formData.duracaoDesejada}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1d9b9a] focus:border-[#1d9b9a]"
                          >
                            <option value="">Selecione a duração</option>
                            <option value="45min">45 minutos</option>
                            <option value="1h">1 hora</option>
                            <option value="1h30">1h30</option>
                            <option value="2h">2 horas</option>
                            <option value="3h">3 horas (workshop)</option>
                            <option value="flexivel">A definir</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="numeroParticipantes" className="block text-sm font-medium text-gray-700 mb-2">
                            Número de Participantes *
                          </label>
                          <select
                            id="numeroParticipantes"
                            name="numeroParticipantes"
                            required
                            value={formData.numeroParticipantes}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1d9b9a] focus:border-[#1d9b9a]"
                          >
                            <option value="">Selecione o número</option>
                            <option value="ate50">Até 50 pessoas</option>
                            <option value="51-100">51 a 100 pessoas</option>
                            <option value="101-200">101 a 200 pessoas</option>
                            <option value="201-500">201 a 500 pessoas</option>
                            <option value="500+">Mais de 500 pessoas</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="formatoPalestra" className="block text-sm font-medium text-gray-700 mb-2">
                            Formato da Palestra *
                          </label>
                          <select
                            id="formatoPalestra"
                            name="formatoPalestra"
                            required
                            value={formData.formatoPalestra}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1d9b9a] focus:border-[#1d9b9a]"
                          >
                            <option value="">Selecione o formato</option>
                            <option value="presencial">Presencial</option>
                            <option value="online">Online (ao vivo)</option>
                            <option value="hibrido">Híbrido</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Conteúdo e Público */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#ff6b6b] rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">4</span>
                        </div>
                        Conteúdo e Público
                      </h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="publicoAlvo" className="block text-sm font-medium text-gray-700 mb-2">
                            Público-Alvo *
                          </label>
                          <select
                            id="publicoAlvo"
                            name="publicoAlvo"
                            required
                            value={formData.publicoAlvo}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1d9b9a] focus:border-[#1d9b9a]"
                          >
                            <option value="">Selecione o público</option>
                            <option value="pais">Pais e Famílias</option>
                            <option value="educadores">Educadores/Professores</option>
                            <option value="colaboradores">Colaboradores/Funcionários</option>
                            <option value="lideres">Líderes Religiosos</option>
                            <option value="jovens">Jovens/Adolescentes</option>
                            <option value="misto">Público Misto</option>
                            <option value="outros">Outros</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="temaPreferido" className="block text-sm font-medium text-gray-700 mb-2">
                            Tema Preferido
                          </label>
                          <select
                            id="temaPreferido"
                            name="temaPreferido"
                            value={formData.temaPreferido}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1d9b9a] focus:border-[#1d9b9a]"
                          >
                            <option value="">Deixe o palestrante escolher</option>
                            <option value="metodo-ooba">O Método OOBA na Prática</option>
                            <option value="pais-filhos">Pais e Filhos: Construindo Pontes</option>
                            <option value="comunicacao">Comunicação que Transforma</option>
                            <option value="valores">Legado de Grandes Valores</option>
                            <option value="tempo-qualidade">Tempo de Qualidade em Família</option>
                            <option value="personalizado">Tema Personalizado</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Infraestrutura e Orçamento */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#1d9b9a] rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">5</span>
                        </div>
                        Infraestrutura e Orçamento
                      </h3>
                      <div className="space-y-6">
                        <div>
                          <label htmlFor="infraestrutura" className="block text-sm font-medium text-gray-700 mb-2">
                            Infraestrutura Disponível
                          </label>
                          <Textarea
                            id="infraestrutura"
                            name="infraestrutura"
                            value={formData.infraestrutura}
                            onChange={handleInputChange}
                            rows={3}
                            placeholder="Ex: Auditório com 200 lugares, projetor, som, microfone, ar condicionado..."
                          />
                        </div>
                        <div>
                          <label htmlFor="orcamento" className="block text-sm font-medium text-gray-700 mb-2">
                            Faixa de Orçamento
                          </label>
                          <select
                            id="orcamento"
                            name="orcamento"
                            value={formData.orcamento}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1d9b9a] focus:border-[#1d9b9a]"
                          >
                            <option value="">Prefiro não informar</option>
                            <option value="ate2k">Até R$ 2.000</option>
                            <option value="2k-5k">R$ 2.000 a R$ 5.000</option>
                            <option value="5k-10k">R$ 5.000 a R$ 10.000</option>
                            <option value="10k+">Acima de R$ 10.000</option>
                            <option value="negociar">A negociar</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Objetivos e Informações Adicionais */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#ff6b6b] rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">6</span>
                        </div>
                        Objetivos e Informações Adicionais
                      </h3>
                      <div className="space-y-6">
                        <div>
                          <label htmlFor="objetivos" className="block text-sm font-medium text-gray-700 mb-2">
                            Objetivos do Evento *
                          </label>
                          <Textarea
                            id="objetivos"
                            name="objetivos"
                            required
                            value={formData.objetivos}
                            onChange={handleInputChange}
                            rows={4}
                            placeholder="Descreva quais são os principais objetivos que esperam alcançar com a palestra..."
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="informacoesAdicionais"
                            className="block text-sm font-medium text-gray-700 mb-2"
                          >
                            Informações Adicionais
                          </label>
                          <Textarea
                            id="informacoesAdicionais"
                            name="informacoesAdicionais"
                            value={formData.informacoesAdicionais}
                            onChange={handleInputChange}
                            rows={4}
                            placeholder="Qualquer informação adicional que considere importante para a preparação da palestra..."
                          />
                        </div>
                      </div>
                    </div>

                    <div className="border-t pt-8">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#1d9b9a] hover:bg-[#16807f] py-4 text-lg font-semibold rounded-full"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                            Enviando Solicitação...
                          </>
                        ) : (
                          <>
                            <Send className="w-6 h-6 mr-3" />
                            Solicitar Orçamento
                          </>
                        )}
                      </Button>
                      <p className="text-center text-gray-600 mt-4">
                        Resposta em até 24 horas • Orçamento sem compromisso
                      </p>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Processo de Contratação */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Como Funciona</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Processo simples e transparente para garantir o sucesso do seu evento
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-8 border-0 shadow-lg text-center">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-[#1d9b9a] rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Solicitação</h3>
                <p className="text-gray-600">
                  Preencha o formulário com os detalhes do seu evento e necessidades específicas.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 border-0 shadow-lg text-center">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-[#ff6b6b] rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Análise</h3>
                <p className="text-gray-600">
                  Analisamos sua solicitação e preparamos uma proposta personalizada para seu público.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 border-0 shadow-lg text-center">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-[#1d9b9a] rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Proposta</h3>
                <p className="text-gray-600">
                  Receba uma proposta detalhada com conteúdo, investimento e todos os detalhes técnicos.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 border-0 shadow-lg text-center">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-[#ff6b6b] rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white font-bold text-xl">4</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Realização</h3>
                <p className="text-gray-600">
                  Palestra impactante com material de apoio e acompanhamento pós-evento quando necessário.
                </p>
              </CardContent>
            </Card>
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
