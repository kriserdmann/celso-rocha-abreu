"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, Brain, Frown, Users, Target, Search, Mic, Lightbulb, CheckCircle, Star, Award, ChevronRight, AlertTriangle, Clock, CalendarX, UserMinus, Zap, Activity, HelpCircle, TrendingDown, Settings, Radio, Scale, HeartPulse, TrendingUp, Handshake, Rocket } from "lucide-react"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"

export default function CorporateLandingPageV2() {
  return (
    <div className="min-h-screen bg-[#F5F5F5] relative">
      <Header />

      {/* 1. Hero Section */}
      <section
        className="relative bg-gradient-to-br from-[#1d9b9a] to-[#16807f] text-white overflow-hidden flex items-center"
        style={{ minHeight: "100svh", paddingTop: "80px" }}
      >
        {/* Decorativo de fundo */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 70% 50%, white 1px, transparent 1px)", backgroundSize: "32px 32px" }}></div>

        <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10 w-full">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">

            {/* Texto */}
            <div className="space-y-4 lg:space-y-6">
              <div className="flex items-center gap-2 lg:gap-3">
                <div className="w-9 h-9 lg:w-12 lg:h-12 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                  <Mic className="w-4 h-4 lg:w-6 lg:h-6 text-white" />
                </div>
                <span className="text-white/90 font-semibold text-xs sm:text-sm lg:text-base tracking-widest uppercase">
                  Alta Performance Comportamental
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight tracking-tight uppercase">
                EQUIPE <br />
                <span className="text-white/80">CONGRUENTE</span>
              </h1>

              <p className="text-base sm:text-lg lg:text-2xl font-bold text-white/90 leading-snug">
                Pensamento • Comunicação • Ação • Resultado
              </p>

              <p className="text-sm lg:text-lg font-light text-white/75 italic">
                Método OOBA: Para a vida toda.
              </p>

              <div className="pt-1 lg:pt-2">
                <Button
                  size="lg"
                  className="bg-white text-[#1d9b9a] hover:bg-white/90 px-6 py-4 lg:px-8 lg:py-6 text-sm lg:text-base font-bold rounded-sm shadow-xl transition-all hover:shadow-2xl hover:-translate-y-1 w-full sm:w-auto uppercase tracking-wide"
                  asChild
                >
                  <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3">
                    <MessageCircle className="w-5 h-5" />
                    Agendar Palestra
                  </a>
                </Button>
              </div>
            </div>

            {/* Imagem quadrada — oculta no mobile, visível em md+ */}
            <div className="hidden md:block relative">
              <div className="absolute -inset-4 bg-white/10 rounded-2xl blur-xl"></div>
              <div className="relative aspect-square w-full max-w-[460px] mx-auto lg:ml-auto lg:mr-0 overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src="/images/celso-rocha-de-abreu.jpg"
                  alt="Celso Rocha de Abreu, palestrante corporativo"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* 2. Seção de Conscientização - Estilo OOBA */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-tight">
              Problemas pessoais, <br className="hidden md:block" />
              <span className="text-[#1d9b9a]">geram problemas na equipe!</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <div className="space-y-8">
                {/* Pergunta / Bloco 1 */}
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-[#1d9b9a] rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-md">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                      Falta de Equilíbrio?
                    </h3>
                    <p className="text-gray-600 leading-relaxed font-medium">
                      Seus colaboradores estão conseguindo equilibrar a vida pessoal e profissional?
                      Ou os problemas de casa estão afetando sua concentração e produtividade no trabalho?
                    </p>
                  </div>
                </div>

                {/* Pergunta / Bloco 2 */}
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-[#ff6b6b] rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-md">
                    <HeartPulse className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                      Clima Organizacional Acumulado
                    </h3>
                    <p className="text-gray-600 leading-relaxed font-medium">
                      O estresse e a ansiedade causados por problemas pessoais estão se refletindo no clima organizacional da sua empresa?
                      Como a família dos seus colaboradores veem a empresa?
                    </p>
                  </div>
                </div>

                {/* Pergunta / Bloco 3 */}
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-[#1d9b9a] rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-md">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                      Aumento de Erros
                    </h3>
                    <p className="text-gray-600 leading-relaxed font-medium">
                      Você tem notado aumento no número de erros, atrasos ou reclamações no trabalho?
                      Isso pode indicar uma influência pessoal negativa sobre os processos definidos pela empresa.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-[#1d9b9a]/5 rounded-3xl -z-10 transform rotate-3"></div>
              <Image
                src="/images/stress-work.jpg"
                alt="Impacto de problemas pessoais no trabalho"
                width={600}
                height={600}
                className="rounded-3xl shadow-2xl object-cover aspect-square md:aspect-auto md:h-[600px] w-full grayscale"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Diagnóstico e 6 Sintomas */}
      <section className="py-20 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Sua equipe está desmotivada?
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto italic">
              "Elevamos a conscientização da equipe de que <strong className="text-[#1d9b9a] font-bold">a empresa é o meio para as conquistas pessoais.</strong>"
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">

            <Card className="p-6 border-0 shadow-lg">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-[#1d9b9a] rounded-full flex items-center justify-center mb-4">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Desafio às regras da Empresa</h3>
              </CardContent>
            </Card>

            <Card className="p-6 border-0 shadow-lg">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-[#ff6b6b] rounded-full flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Descumprimento do horário</h3>
              </CardContent>
            </Card>

            <Card className="p-6 border-0 shadow-lg">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-[#1d9b9a] rounded-full flex items-center justify-center mb-4">
                  <CalendarX className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Faltas recorrentes</h3>
              </CardContent>
            </Card>

            <Card className="p-6 border-0 shadow-lg">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-[#ff6b6b] rounded-full flex items-center justify-center mb-4">
                  <UserMinus className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Oposição à chefia</h3>
              </CardContent>
            </Card>

            <Card className="p-6 border-0 shadow-lg">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-[#1d9b9a] rounded-full flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Intrigas na equipe</h3>
              </CardContent>
            </Card>

            <Card className="p-6 border-0 shadow-lg">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-[#ff6b6b] rounded-full flex items-center justify-center mb-4">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Problemas emocionais</h3>
              </CardContent>
            </Card>

          </div>

          <div className="text-center mt-12 bg-[#1d9b9a] py-10 px-6 rounded-3xl shadow-xl">
            <p className="text-3xl md:text-4xl text-white font-extrabold tracking-tight drop-shadow-md">
              Você está satisfeito com essa situação?
            </p>
          </div>
        </div>
      </section>

      {/* 4. Os 3 Custos */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16 text-gray-900">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 tracking-tight leading-relaxed">
              3 Custos para a Empresa com colaboradores desmotivados
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="p-8 border-t-8 border-t-[#1d9b9a] border-x-0 border-b-0 shadow-lg hover:shadow-2xl transition-all bg-[#F5F5F5] rounded-xl">
              <CardContent className="p-0 pt-6">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-8 shadow-sm">
                  <Target className="w-8 h-8 text-[#1d9b9a]" />
                </div>
                <h3 className="text-xl font-bold text-[#1d9b9a] mb-4 uppercase tracking-wide">Perda de Talentos</h3>
                <p className="text-gray-700 text-lg leading-relaxed font-light">
                  O desequilíbrio emocional leva à perda de talentos estratégicos.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 border-t-8 border-t-[#1d9b9a] border-x-0 border-b-0 shadow-lg hover:shadow-2xl transition-all bg-[#F5F5F5] rounded-xl">
              <CardContent className="p-0 pt-6">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-8 shadow-sm">
                  <TrendingDown className="w-8 h-8 text-[#1d9b9a]" />
                </div>
                <h3 className="text-xl font-bold text-[#1d9b9a] mb-4 uppercase tracking-wide">Queda no desempenho</h3>
                <p className="text-gray-700 text-lg leading-relaxed font-light">
                  Colaboradores dispersos são menos produtivos
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 border-t-8 border-t-[#1d9b9a] border-x-0 border-b-0 shadow-lg hover:shadow-2xl transition-all bg-[#F5F5F5] rounded-xl">
              <CardContent className="p-0 pt-6">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-8 shadow-sm">
                  <Frown className="w-8 h-8 text-[#1d9b9a]" />
                </div>
                <h3 className="text-xl font-bold text-[#1d9b9a] mb-4 uppercase tracking-wide">Clima Desgastado</h3>
                <p className="text-gray-700 text-lg leading-relaxed font-light">
                  O desregramento contamina o ambiente com negatividade e conflitos
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 5. Método O.O.B.A. (A Fábrica dos Sonhos adaptada) */}
      <section className="relative py-20 lg:py-32 bg-[#1d9b9a] text-white overflow-hidden">
        {/* Fundo decorativo em off-white inspirado no recorte curvo da imagem */}
        <div className="absolute right-0 top-0 w-3/4 lg:w-1/2 h-full bg-[#E5E7EB] rounded-l-full translate-x-1/3 opacity-20 hidden md:block z-0 pointer-events-none"></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto">

            {/* Esquerda: Texto */}
            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-extrabold tracking-widest uppercase drop-shadow-sm">
                Método O.O.B.A.
              </h3>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black leading-relaxed tracking-normal mb-6 drop-shadow-md">
                Congruência entre pensamentos e ações que geram melhores resultados.
              </h2>
              <p className="text-lg md:text-xl font-light leading-relaxed text-white/90">
                O <strong className="font-bold">Método O.O.B.A.</strong> é a ferramenta que poderá transformar o ambiente de trabalho da sua empresa. Invista na gestão emocional dos seus colaboradores e usufrua dos benefícios gerados.
              </p>
            </div>

            {/* Direita: Imagem Circular da Equipe (Conforme referência da imagem) */}
            <div className="relative flex justify-center md:justify-end">
              <div className="relative w-80 h-80 lg:w-[500px] lg:h-[500px] rounded-full overflow-hidden border-[16px] border-[#F5F5F5] shadow-2xl hover:scale-105 transition-transform duration-500 z-10 bg-gray-200">
                <Image
                  src="/images/happy-team.jpg"
                  alt="Equipe trabalhando em sinergia"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. Princípios do Método O.O.B.A. */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">

          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Conheça o <span className="text-[#1d9b9a]">Método O.O.B.A.</span> e veja sua equipe decolar!
            </h2>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8">
              Uma abordagem transformadora que constrói equipes de alta performance através da congruência entre pensamento, comunicação, ação e resultado.
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
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Equipe de Alta Performance</h3>
                    <p className="text-gray-600 leading-relaxed">
                      O <strong>Método O.O.B.A.</strong> é o princípio para construir uma equipe harmoniosa de alta performance, consciente e engajada.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#ff6b6b] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Lightbulb className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Benefícios na Vida Pessoal</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Com o <strong>Método O.O.B.A.</strong>, seus colaboradores verão que a presença integral no processo laboral lhes trará melhores benefícios na vida pessoal.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#1d9b9a] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Desenvolvimento Individual e Coletivo</h3>
                    <p className="text-gray-600 leading-relaxed">
                      O <strong>Método O.O.B.A.</strong> mostrará as técnicas eficazes para o desenvolvimento individual e coletivo da sua equipe.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <Image
                src="/images/palestra-celso.jpg"
                alt="Celso Rocha de Abreu ministrando palestra"
                width={500}
                height={500}
                className="rounded-2xl shadow-2xl object-cover object-top"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 7. Benefícios para sua Empresa */}
      <section className="py-20 lg:py-32 bg-[#F5F5F5]">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">

          {/* Cabeçalho da Seção */}
          <div className="mb-16 max-w-2xl">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-tight tracking-tight">
              Benefícios para <span className="text-[#1d9b9a]">sua Empresa</span>
            </h2>
            <div className="w-24 h-2 bg-[#ff6b6b] rounded-full mt-6"></div>
          </div>

          {/* Grade de Cards — mesmo padrão visual da Seção 8 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Card 1 */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:border-[#1d9b9a] hover:shadow-xl transition-all duration-300 group cursor-default">
              <div className="w-14 h-14 bg-[#1d9b9a]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#1d9b9a] transition-colors duration-300">
                <Users className="w-7 h-7 text-[#1d9b9a] group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 leading-snug">Relacionamento Corporativo</h3>
              <p className="text-gray-500 font-light leading-relaxed">
                Melhoria no relacionamento corporativo e interpessoal entre todos os níveis da equipe.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:border-[#1d9b9a] hover:shadow-xl transition-all duration-300 group cursor-default">
              <div className="w-14 h-14 bg-[#1d9b9a]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#1d9b9a] transition-colors duration-300">
                <Scale className="w-7 h-7 text-[#1d9b9a] group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 leading-snug">Equilíbrio Vida-Trabalho</h3>
              <p className="text-gray-500 font-light leading-relaxed">
                Maior equilíbrio entre vida familiar e profissional, resultando em colaboradores mais presentes.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:border-[#1d9b9a] hover:shadow-xl transition-all duration-300 group cursor-default">
              <div className="w-14 h-14 bg-[#1d9b9a]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#1d9b9a] transition-colors duration-300">
                <HeartPulse className="w-7 h-7 text-[#1d9b9a] group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 leading-snug">Saúde Mental no Trabalho</h3>
              <p className="text-gray-500 font-light leading-relaxed">
                Redução do estresse e da ansiedade no trabalho, elevando o bem-estar e a produtividade.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:border-[#1d9b9a] hover:shadow-xl transition-all duration-300 group cursor-default">
              <div className="w-14 h-14 bg-[#1d9b9a]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#1d9b9a] transition-colors duration-300">
                <TrendingUp className="w-7 h-7 text-[#1d9b9a] group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 leading-snug">Performance Elevada</h3>
              <p className="text-gray-500 font-light leading-relaxed">
                Aumento do engajamento, diminuição de erros e melhora consistente nos indicadores operacionais.
              </p>
            </div>

            {/* Card 5 */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:border-[#1d9b9a] hover:shadow-xl transition-all duration-300 group cursor-default">
              <div className="w-14 h-14 bg-[#1d9b9a]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#1d9b9a] transition-colors duration-300">
                <Handshake className="w-7 h-7 text-[#1d9b9a] group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 leading-snug">Comprometimento com a Empresa</h3>
              <p className="text-gray-500 font-light leading-relaxed">
                Colaboradores que entendem o propósito organizacional assumem compromisso genuíno com os resultados.
              </p>
            </div>

            {/* Card 6 — Destaque CTA */}
            <div className="bg-[#1d9b9a] rounded-3xl p-8 shadow-lg flex flex-col justify-between group cursor-default hover:bg-[#168f8e] transition-colors duration-300">
              <div>
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                  <Rocket className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 leading-snug">Cultura de Alta Performance</h3>
                <p className="text-white/80 font-light leading-relaxed">
                  Uma equipe consciente e congruente transforma o clima organizacional de dentro para fora.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. O Diferencial do Palestrante */}
      <section className="py-20 lg:py-32 bg-gray-900 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="relative w-full aspect-square md:aspect-[4/5] rounded-sm overflow-hidden shadow-2xl">
              <Image
                src="/images/celso-rocha-de-abreu.jpg"
                alt="Celso Abreu palestrando"
                fill
                className="object-cover transition-all duration-700"
              />
              <div className="absolute inset-0 bg-[#1d9b9a]/20 mix-blend-overlay"></div>
            </div>
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <Award className="w-10 h-10 text-[#1d9b9a]" />
                <span className="text-[#1d9b9a] font-bold tracking-widest uppercase text-sm">Alta Performance Comportamental</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-6 uppercase tracking-wide">Celso Rocha de Abreu</h2>
              <p className="text-xl text-gray-300 leading-relaxed font-light border-l-4 border-[#1d9b9a] pl-6">
                Especialista em Relacionamento Humano e Criador do Método OOBA
              </p>
              <p className="text-lg text-gray-400 leading-relaxed font-light">
                Com 30 anos de experiência, Celso entrega <strong className="text-white font-semibold">conscientização real</strong>, não apenas motivação. Ele unifica o time ao mostrar que a empresa é o meio para as conquistas pessoais de cada colaborador, gerando engajamento e performance.
              </p>
              <div className="bg-[#1d9b9a]/10 p-6 rounded-sm border border-[#1d9b9a]/30">
                <h4 className="text-[#1d9b9a] font-bold uppercase mb-2">Público Ideal</h4>
                <p className="text-gray-300 font-light">
                  Empresas inovadoras e tradicionais que buscam unificar a consciência da equipe em um mesmo corpo orgânico: o corpo da empresa.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Depoimentos Corporativos */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Empresas Transformadas pelo <span className="text-[#1d9b9a]">Método OOBA</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Histórias reais de transformação nos resultados e no clima organizacional
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl p-8 border-0 shadow-lg">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic leading-relaxed text-lg">
                "O choque de conscientização foi imediato. Os gestores começaram a relatar nas primeiras semanas que a equipe de operação estava muito mais proativa e alinhada. Entender que a empresa é o veículo do sucesso pessoal deles mudou a energia do escritório."
              </p>
              <div>
                <p className="font-semibold text-gray-900">Marta Rodrigues</p>
                <p className="text-sm text-gray-500">Gestora de RH — Lojas União</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border-0 shadow-lg">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic leading-relaxed text-lg">
                "Aplicamos o Método OOBA e a diferença foi notável em menos de 30 dias. Conflitos internos caíram, o absenteísmo reduziu e os líderes passaram a reportar uma equipe mais presente e engajada. Recomendo para qualquer empresa que queira resultados de verdade."
              </p>
              <div>
                <p className="font-semibold text-gray-900">Ricardo Alves</p>
                <p className="text-sm text-gray-500">Diretor de Pessoas — Grupo Ágil Logística</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Investimento e CTA final */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4 md:px-6">

          {/* Cabeçalho centralizado — padrão OOBA */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Investimento <span className="text-[#1d9b9a]">Customizado</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Palestras imersivas de 60 minutos focadas inteiramente em gerar sinergia, adaptada para o tamanho da sua corporação.
            </p>
          </div>

          {/* Grid 2 colunas — padrão visual OOBA */}
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto">

            {/* Coluna Esquerda: Lista de investimento */}
            <div>
              <div className="space-y-6">

                {/* Item 1 */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#1d9b9a] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Até 50 Pessoas</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Palestra imersiva ideal para equipes menores, com alta personalização e interação direta com o palestrante.
                    </p>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#ff6b6b] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Até 150 Pessoas</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Formato médio com dinâmicas adaptadas para grupos maiores, mantendo o impacto e a profundidade da experiência.
                    </p>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#1d9b9a] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Acima de 150 Pessoas</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Eventos corporativos de grande porte com estrutura de palco, projeção e recursos audiovisuais completos.
                    </p>
                  </div>
                </div>

              </div>

              <Button
                size="lg"
                className="bg-[#1d9b9a] hover:bg-[#16807f] text-white px-8 py-6 md:text-lg font-bold rounded-2xl mt-10 shadow-xl transition-all hover:shadow-2xl hover:-translate-y-1 w-full sm:w-auto uppercase tracking-wide"
                asChild
              >
                <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3">
                  <MessageCircle className="w-5 h-5" />
                  Solicitar Orçamento Detalhado
                </a>
              </Button>
            </div>

            {/* Coluna Direita: Depoimento */}
            <div className="relative">
              <div className="absolute -inset-4 bg-[#1d9b9a]/5 rounded-3xl -z-10 transform rotate-3"></div>
              <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 border border-gray-100">
                <h3 className="text-2xl font-extrabold text-[#1d9b9a] mb-6 uppercase tracking-tight">O Impacto</h3>
                <div className="flex mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#1d9b9a] text-[#1d9b9a]" />
                  ))}
                </div>
                <p className="text-gray-700 mb-8 italic leading-relaxed text-lg font-light">
                  "O choque de conscientização foi imediato. Os gestores começaram a relatar nas primeiras semanas que a equipe de operação estava muito mais proativa e alinhada. Entender que a empresa é o veículo do sucesso pessoal deles mudou a energia do escritório."
                </p>
                <div className="border-t border-gray-100 pt-6">
                  <p className="font-bold text-gray-900 text-lg uppercase">Marta Rodrigues</p>
                  <p className="text-sm text-[#1d9b9a] font-medium tracking-widest uppercase mt-1">Gestora de RH, Lojas União</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Final Corporativo */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-[#1d9b9a] to-[#16807f] text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Pronto para transformar sua equipe?
          </h2>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed">
            Leve o Método OOBA para dentro da sua empresa e veja colaboradores mais engajados, conscientes e alinhados com os resultados do negócio.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-[#1d9b9a] hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full"
              asChild
            >
              <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
                <MessageCircle className="w-5 h-5" />
                Agendar Palestra
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-[#1d9b9a] px-8 py-4 text-lg font-semibold rounded-full bg-transparent"
              asChild
            >
              <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer">
                Solicitar Orçamento
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* CTA Flutuante WhatsApp */}
      <a
        href="https://wa.me/5511999999999"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-[#1d9b9a] hover:bg-[#16807f] text-white p-4 rounded-full shadow-2xl flex items-center transition-all duration-800 hover:-translate-y-1 z-50 group"
      >
        <MessageCircle className="w-7 h-7 flex-shrink-0" />
        <span className="font-bold tracking-wider w-0 overflow-hidden group-hover:w-auto group-hover:ml-3 group-hover:mr-1 transition-all duration-800 ease-in-out whitespace-nowrap opacity-0 group-hover:opacity-100 uppercase text-sm">
          FALE CONOSCO
        </span>
      </a>
    </div>
  )
}