'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import AdminNav from '@/components/admin-nav'
import {
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
import Link from 'next/link'

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalBooksSold: 0,
    averageOrderValue: 0
  })
  const [recentOrders, setRecentOrders] = useState<any[]>([])
  const [booksInventory, setBooksInventory] = useState<any[]>([])

  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        router.push('/admin/login')
      } else {
        setIsAuthenticated(true)
        fetchDashboardData()
      }
      setIsLoading(false)
    }

    checkUser()
  }, [router])

  const fetchDashboardData = async () => {
    try {
      // Fetch Orders
      const { data: orders, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })

      if (ordersError) throw ordersError

      // Fetch Order Items
      const { data: items, error: itemsError } = await supabase
        .from('order_items')
        .select('*')

      if (itemsError) throw itemsError

      // Fetch Books
      const { data: books, error: booksError } = await supabase
        .from('books')
        .select('*')

      if (booksError) throw booksError

      // Calculate Stats
      if (orders && items && books) {
        const totalOrders = orders.length
        const totalSales = orders
          .filter(o => o.status === 'completed' || o.status === 'paid') // adjusting for probable statuses
          .reduce((sum, o) => sum + Number(o.total_amount), 0)

        // Items logic
        const totalBooksSold = items.reduce((sum, i) => sum + i.quantity, 0)
        const averageOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0

        setStats({
          totalSales,
          totalOrders,
          totalBooksSold,
          averageOrderValue
        })

        // Recent Orders
        setRecentOrders(orders.slice(0, 5).map(o => ({
          id: o.id,
          customer: o.customer_name,
          amount: Number(o.total_amount),
          status: o.status,
          date: new Date(o.created_at).toLocaleDateString('pt-BR'),
          book: items.find(i => i.order_id === o.id)?.book_title || 'Livro(s)'
        })))

        // Books Inventory / Sales
        // Count sold per book
        const soldByBook = items.reduce((acc: any, item: any) => {
          // Try to match by ID if available, or title
          const key = item.book_id || item.book_title
          acc[key] = (acc[key] || 0) + item.quantity
          return acc
        }, {})

        const inventoryData = books.map((book: any) => ({
          title: book.title,
          price: Number(book.price),
          stock: book.stock || 0, // Fallback if column missing
          sold: soldByBook[book.id] || soldByBook[book.title] || 0
        })).sort((a: any, b: any) => b.sold - a.sold)

        setBooksInventory(inventoryData)
      }

    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    }
  }

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
      localStorage.removeItem('adminAuth')
      localStorage.removeItem('adminUser')
      router.refresh()
      router.push('/admin/login')
    } catch (error) {
      console.error('Logout error:', error)
      window.location.href = '/admin/login'
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
                <div className="text-2xl font-bold text-gray-900">R$ {stats.totalSales.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-xs text-green-600">Receita confirmada</span>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Total de Pedidos</CardTitle>
                <ShoppingCart className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stats.totalOrders}</div>
                <div className="flex items-center mt-1">
                  <Users className="h-4 w-4 text-gray-600 mr-1" />
                  <span className="text-xs text-gray-600">Pedidos realizados</span>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Livros Vendidos</CardTitle>
                <BookOpen className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stats.totalBooksSold}</div>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-purple-600">Unidades vendidas</span>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Ticket Médio</CardTitle>
                <Package className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">R$ {stats.averageOrderValue.toFixed(2)}</div>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-orange-600">Média por pedido</span>
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
                  <Link href="/admin/vendas">
                    <Button variant="outline" size="sm" className="rounded-full">
                      Ver Todos
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentOrders.length === 0 ? (
                      <p className="text-center text-gray-500 py-4">Nenhum pedido recente</p>
                    ) : (
                      recentOrders.map((order) => (
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
                              order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                                order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                  'bg-yellow-100 text-yellow-800'
                              }`}>
                              {order.status === 'completed' ? 'Concluído' :
                                order.status === 'processing' ? 'Processando' :
                                  order.status === 'cancelled' ? 'Cancelado' :
                                    'Pendente'}
                            </span>
                          </div>
                        </div>
                      )))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Book Inventory */}
            <div>
              <Card className="shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-gray-900">Performance</CardTitle>
                  <Button variant="outline" size="sm" className="rounded-full">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Vendas
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {booksInventory.map((book, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-gray-900 text-sm leading-tight">{book.title}</h4>
                          <span className="text-sm font-semibold text-gray-900">R$ {book.price.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-xs text-gray-600">
                          {/* If stock is 0 (missing), usually better not to show it or show infinite. Assuming if 0 it might be real 0 or missing. 
                               For now, lets show sold count as the primary metric here. */}
                          <span>Vendidos: {book.sold}</span>
                          {book.stock > 0 && <span>Estoque: {book.stock}</span>}
                        </div>
                        <div className="mt-2 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-[#1d9b9a] h-2 rounded-full"
                            style={{ width: book.stock > 0 ? `${(book.sold / (book.stock + book.sold)) * 100}%` : '0%' }}
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
                  <Link href="/admin/vendas" className="w-full">
                    <Button className="w-full bg-[#1d9b9a] hover:bg-[#16807f] rounded-full flex flex-col items-center py-4 h-auto">
                      <ShoppingCart className="w-6 h-6 mb-2" />
                      <span className="text-sm">Gerenciar Vendas</span>
                    </Button>
                  </Link>
                  <Link href="/admin/clientes" className="w-full">
                    <Button variant="outline" className="w-full rounded-full flex flex-col items-center py-4 h-auto border-[#1d9b9a] text-[#1d9b9a]">
                      <Users className="w-6 h-6 mb-2" />
                      <span className="text-sm">Clientes</span>
                    </Button>
                  </Link>
                  {/* Placeholders for future routes */}
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