'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import AdminNav from '@/components/admin-nav'
import {
  BarChart3,
  BookOpen,
  DollarSign,
  Package,
  Users,
  TrendingUp,
  ShoppingCart,
  LogOut,
  Settings,
  FileText,
  UserCheck
} from 'lucide-react'

// Mock data for demonstration - in production, this would come from an API/database
const mockSalesData = {
  totalSales: 15420.50,
  totalOrders: 186,
  totalBooksSold: 312,
  averageOrderValue: 82.90,
  monthlySales: [
    { month: 'Jan', sales: 2450.00, orders: 28 },
    { month: 'Feb', sales: 3200.00, orders: 35 },
    { month: 'Mar', sales: 2890.00, orders: 32 },
    { month: 'Apr', sales: 4100.00, orders: 45 },
    { month: 'May', sales: 3780.00, orders: 46 }
  ],
  recentOrders: [
    { id: '001', customer: 'Maria Silva', book: 'Método OOBA', amount: 89.90, status: 'completed', date: '2024-05-15' },
    { id: '002', customer: 'João Santos', book: 'Pais e Filhos', amount: 79.90, status: 'processing', date: '2024-05-14' },
    { id: '003', customer: 'Ana Costa', book: '96 Poesias', amount: 59.90, status: 'completed', date: '2024-05-13' },
    { id: '004', customer: 'Pedro Oliveira', book: 'Método OOBA', amount: 89.90, status: 'pending', date: '2024-05-12' }
  ],
  booksInventory: [
    { title: 'Método OOBA Para a Vida Toda', stock: 45, sold: 128, price: 89.90 },
    { title: 'Pais e Filhos: Um Legado de Grandes Valores', stock: 32, sold: 95, price: 79.90 },
    { title: '96 Poesias', stock: 28, sold: 67, price: 59.90 },
    { title: 'As 8 Maravilhas Naturais de Schroeder', stock: 15, sold: 22, price: 69.90 }
  ]
}

export default function AdminDashboard() {
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

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
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

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminNav />

      <div className="flex-1">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
                <span className="text-sm text-gray-500">Visão geral das vendas</span>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" className="rounded-full">
                  <Settings className="w-4 h-4 mr-2" />
                  Configurações
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="rounded-full border-red-200 text-red-600 hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sair
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Vendas Totais</CardTitle>
                <DollarSign className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">R$ {mockSalesData.totalSales.toLocaleString('pt-BR')}</div>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-xs text-green-600">+12.5% este mês</span>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Total de Pedidos</CardTitle>
                <ShoppingCart className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{mockSalesData.totalOrders}</div>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-xs text-green-600">+8.2% este mês</span>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Livros Vendidos</CardTitle>
                <BookOpen className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{mockSalesData.totalBooksSold}</div>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-xs text-green-600">+15.3% este mês</span>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Ticket Médio</CardTitle>
                <Package className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">R$ {mockSalesData.averageOrderValue.toFixed(2)}</div>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-xs text-green-600">+5.1% este mês</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Orders */}
            <div className="lg:col-span-2">
              <Card className="shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-gray-900">Pedidos Recentes</CardTitle>
                  <Button variant="outline" size="sm" className="rounded-full">
                    Ver Todos
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockSalesData.recentOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-[#1d9b9a] rounded-full flex items-center justify-center">
                            <BookOpen className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{order.customer}</p>
                            <p className="text-sm text-gray-600">{order.book}</p>
                            <p className="text-xs text-gray-500">{order.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">R$ {order.amount.toFixed(2)}</p>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${order.status === 'completed' ? 'bg-green-100 text-green-800' :
                            order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                            {order.status === 'completed' ? 'Concluído' :
                              order.status === 'processing' ? 'Processando' :
                                'Pendente'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Book Inventory */}
            <div>
              <Card className="shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-gray-900">Estoque de Livros</CardTitle>
                  <Button variant="outline" size="sm" className="rounded-full">
                    <Package className="w-4 h-4 mr-2" />
                    Gerenciar
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockSalesData.booksInventory.map((book, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-gray-900 text-sm leading-tight">{book.title}</h4>
                          <span className="text-sm font-semibold text-gray-900">R$ {book.price.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-xs text-gray-600">
                          <span>Estoque: {book.stock}</span>
                          <span>Vendidos: {book.sold}</span>
                        </div>
                        <div className="mt-2 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-[#1d9b9a] h-2 rounded-full"
                            style={{ width: `${(book.sold / (book.stock + book.sold)) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button className="bg-[#1d9b9a] hover:bg-[#16807f] rounded-full flex flex-col items-center py-4 h-auto">
                    <ShoppingCart className="w-6 h-6 mb-2" />
                    <span className="text-sm">Novo Pedido</span>
                  </Button>
                  <Button variant="outline" className="rounded-full flex flex-col items-center py-4 h-auto border-[#1d9b9a] text-[#1d9b9a]">
                    <Users className="w-6 h-6 mb-2" />
                    <span className="text-sm">Clientes</span>
                  </Button>
                  <Button variant="outline" className="rounded-full flex flex-col items-center py-4 h-auto border-[#1d9b9a] text-[#1d9b9a]">
                    <FileText className="w-6 h-6 mb-2" />
                    <span className="text-sm">Relatórios</span>
                  </Button>
                  <Button variant="outline" className="rounded-full flex flex-col items-center py-4 h-auto border-[#1d9b9a] text-[#1d9b9a]">
                    <UserCheck className="w-6 h-6 mb-2" />
                    <span className="text-sm">Estoque</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}