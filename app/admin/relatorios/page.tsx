'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import AdminNav from '@/components/admin-nav'
import { BarChart3, Download, TrendingUp, DollarSign, BookOpen, Users } from 'lucide-react'

export default function Reports() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkUser = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        router.push('/admin/login')
      } else {
        setIsAuthenticated(true)
      }
      setIsLoading(false)
    }

    checkUser()
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-[#1d9b9a] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  const reports = [
    {
      title: 'Relatório de Vendas Mensal',
      description: 'Análise detalhada das vendas por mês',
      type: 'sales',
      lastGenerated: '2024-05-15',
      icon: DollarSign
    },
    {
      title: 'Relatório de Livros Mais Vendidos',
      description: 'Ranking dos livros com maior saída',
      type: 'books',
      lastGenerated: '2024-05-14',
      icon: BookOpen
    },
    {
      title: 'Relatório de Clientes',
      description: 'Análise do perfil e comportamento dos clientes',
      type: 'customers',
      lastGenerated: '2024-05-13',
      icon: Users
    },
    {
      title: 'Relatório de Estoque',
      description: 'Controle e análise de inventário',
      type: 'inventory',
      lastGenerated: '2024-05-12',
      icon: TrendingUp
    },
    {
      title: 'Relatório de Performance',
      description: 'Métricas gerais de desempenho',
      type: 'performance',
      lastGenerated: '2024-05-11',
      icon: BarChart3
    }
  ]

  const generateReport = (reportType: string) => {
    // Simulate report generation
    alert(`Gerando relatório de ${reportType}...`)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminNav />

      <div className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Relatórios e Analytics</h1>
            <p className="text-gray-600 mt-1">Gere relatórios detalhados sobre vendas, estoque e performance</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reports.map((report) => {
              const IconComponent = report.icon
              return (
                <Card key={report.type} className="shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-[#1d9b9a] rounded-lg flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <CardTitle className="text-lg font-semibold text-gray-900">
                        {report.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4">{report.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-500">
                        <p>Última geração:</p>
                        <p>{new Date(report.lastGenerated).toLocaleDateString('pt-BR')}</p>
                      </div>
                      <Button
                        onClick={() => generateReport(report.type)}
                        className="bg-[#1d9b9a] hover:bg-[#16807f] rounded-full text-sm"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Gerar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="mt-8">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Funcionalidades Futuras</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Relatórios Personalizados</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Crie relatórios personalizados com filtros específicos, períodos personalizados
                      e métricas selecionadas.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Filtros por data, produto e cliente</li>
                      <li>• Exportação em PDF, Excel e CSV</li>
                      <li>• Agendamento automático de relatórios</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Dashboards Interativos</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Visualizações gráficas interativas com gráficos dinâmicos
                      e análises em tempo real.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Gráficos de vendas por período</li>
                      <li>• Análise de tendências</li>
                      <li>• Comparativos mensais e anuais</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}