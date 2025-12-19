'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import AdminNav from '@/components/admin-nav'
import { BarChart3, Download, TrendingUp, DollarSign, BookOpen, Users } from 'lucide-react'
import { toast } from 'sonner'

export default function Reports() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [generating, setGenerating] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkUser = async () => {
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

  const downloadCSV = (content: string, fileName: string) => {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', fileName)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const generateReport = async (reportType: string) => {
    setGenerating(reportType)
    try {
      if (reportType === 'sales') {
        const { data: orders, error } = await supabase
          .from('orders')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) throw error

        const csvHeader = 'ID,Data,Cliente,Email,Status,Valor Total,Metodo Pagamento\n'
        const csvRows = orders.map(order => {
          return `${order.id},${new Date(order.created_at).toLocaleDateString('pt-BR')},"${order.customer_name}","${order.customer_email}",${order.status},${order.total_amount},${order.payment_method || ''}`
        }).join('\n')

        downloadCSV(csvHeader + csvRows, `relatorio_vendas_${new Date().toISOString().split('T')[0]}.csv`)
        toast.success('Relatório de vendas gerado com sucesso!')

      } else if (reportType === 'books') {
        const { data: books, error: booksError } = await supabase.from('books').select('*')
        const { data: items, error: itemsError } = await supabase.from('order_items').select('*')

        if (booksError) throw booksError
        if (itemsError) throw itemsError

        const soldByBook = items.reduce((acc: any, item: any) => {
          const key = item.book_id || item.book_title
          acc[key] = (acc[key] || 0) + item.quantity
          return acc
        }, {})

        const csvHeader = 'Titulo,Preco,Estoque,Total Vendido,Receita Estimada\n'
        const csvRows = books.map((book: any) => {
          const sold = soldByBook[book.id] || soldByBook[book.title] || 0
          const revenue = sold * book.price
          return `"${book.title}",${book.price},${book.stock || 0},${sold},${revenue.toFixed(2)}`
        }).join('\n')

        downloadCSV(csvHeader + csvRows, `relatorio_livros_${new Date().toISOString().split('T')[0]}.csv`)
        toast.success('Relatório de livros gerado com sucesso!')

      } else if (reportType === 'customers') {
        const { data: orders, error } = await supabase.from('orders').select('*')
        if (error) throw error

        const clientsMap = new Map()
        orders.forEach(order => {
          if (!clientsMap.has(order.customer_email)) {
            clientsMap.set(order.customer_email, {
              name: order.customer_name,
              email: order.customer_email,
              phone: order.customer_phone || '',
              orders: 0,
              spent: 0,
              lastOrder: order.created_at
            })
          }
          const client = clientsMap.get(order.customer_email)
          client.orders += 1
          client.spent += Number(order.total_amount)
          if (new Date(order.created_at) > new Date(client.lastOrder)) {
            client.lastOrder = order.created_at
          }
        })

        const csvHeader = 'Nome,Email,Telefone,Total Pedidos,Total Gasto,Ultima Compra\n'
        const csvRows = Array.from(clientsMap.values()).map((client: any) => {
          return `"${client.name}","${client.email}","${client.phone}",${client.orders},${client.spent.toFixed(2)},${new Date(client.lastOrder).toLocaleDateString('pt-BR')}`
        }).join('\n')

        downloadCSV(csvHeader + csvRows, `relatorio_clientes_${new Date().toISOString().split('T')[0]}.csv`)
        toast.success('Relatório de clientes gerado com sucesso!')
      } else {
        toast.info('Este relatório ainda não está disponível.')
      }

    } catch (error) {
      console.error('Error generating report:', error)
      toast.error('Erro ao gerar relatório. Tente novamente.')
    } finally {
      setGenerating(null)
    }
  }

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
      title: 'Relatório de Vendas',
      description: 'Exportar lista completa de pedidos em CSV',
      type: 'sales',
      icon: DollarSign
    },
    {
      title: 'Relatório de Livros',
      description: 'Exportar dados de inventário e vendas por livro',
      type: 'books',
      icon: BookOpen
    },
    {
      title: 'Relatório de Clientes',
      description: 'Exportar base de clientes com histórico de compras',
      type: 'customers',
      icon: Users
    },
    // Placeholders
    {
      title: 'Relatório de Estoque',
      description: 'Controle e análise de inventário (Em Breve)',
      type: 'inventory',
      icon: TrendingUp,
      disabled: true
    },
    {
      title: 'Relatório de Performance',
      description: 'Métricas gerais de desempenho (Em Breve)',
      type: 'performance',
      icon: BarChart3,
      disabled: true
    }
  ]

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
                <Card key={report.type} className={`shadow-sm transition-shadow ${!report.disabled ? 'hover:shadow-md' : 'opacity-70'}`}>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${!report.disabled ? 'bg-[#1d9b9a]' : 'bg-gray-400'}`}>
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <CardTitle className="text-lg font-semibold text-gray-900">
                        {report.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4">{report.description}</p>
                    <div className="flex items-center justify-end">
                      <Button
                        onClick={() => generateReport(report.type)}
                        disabled={!!report.disabled || generating === report.type}
                        className={`rounded-full text-sm ${!report.disabled ? 'bg-[#1d9b9a] hover:bg-[#16807f]' : 'bg-gray-400'}`}
                      >
                        {generating === report.type ? (
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        ) : (
                          <Download className="w-4 h-4 mr-2" />
                        )}
                        {generating === report.type ? 'Gerando...' : 'Exportar CSV'}
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