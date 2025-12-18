'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import {
  Search,
  Filter,
  Download,
  Eye,
  Package,
  DollarSign,
  Calendar,
  User,
  BookOpen,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Plus
} from 'lucide-react'
import AdminNav from '@/components/admin-nav'
import { createClient } from '@/lib/supabase/client'
import { useEffect } from 'react'

interface Order {
  id: string
  customerName: string
  customerEmail: string
  customerPhone: string
  items: {
    bookTitle: string
    quantity: number
    price: number
    total: number
  }[]
  totalAmount: number
  status: 'pending' | 'processing' | 'completed' | 'cancelled'
  paymentMethod: string
  orderDate: string
  shippingAddress: {
    street: string
    city: string
    state: string
    zipCode: string
  }
  notes?: string
}

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  processing: 'bg-blue-100 text-blue-800 border-blue-200',
  completed: 'bg-green-100 text-green-800 border-green-200',
  cancelled: 'bg-red-100 text-red-800 border-red-200'
}

const statusLabels = {
  pending: 'Pendente',
  processing: 'Processando',
  completed: 'Concluído',
  cancelled: 'Cancelado'
}

export default function SalesManagement() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [dateFilter, setDateFilter] = useState<string>('all')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const supabase = createClient()

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          items:order_items(*)
        `)
        .order('created_at', { ascending: false })

      if (error) throw error

      if (data) {
        // Map Supabase data to local Order interface
        const mappedOrders: Order[] = data.map(order => ({
          id: order.id,
          customerName: order.customer_name,
          customerEmail: order.customer_email,
          customerPhone: order.customer_phone || 'Não informado',
          customerCpf: order.customer_cpf,
          items: order.items.map((item: any) => ({
            bookTitle: item.book_title,
            quantity: item.quantity,
            price: Number(item.price),
            total: Number(item.total)
          })),
          totalAmount: Number(order.total_amount),
          status: order.status as any,
          paymentMethod: order.payment_method || 'Pendente',
          orderDate: order.created_at,
          shippingAddress: order.shipping_address || {
            street: 'Não informado', city: '', state: '', zipCode: ''
          },
          notes: order.notes
        }))
        setOrders(mappedOrders)
      }
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter

    let matchesDate = true
    if (dateFilter !== 'all') {
      const orderDate = new Date(order.orderDate)
      const today = new Date()
      const daysAgo = parseInt(dateFilter)
      const cutoffDate = new Date(today.getTime() - daysAgo * 24 * 60 * 60 * 1000)
      matchesDate = orderDate >= cutoffDate
    }

    return matchesSearch && matchesStatus && matchesDate
  })

  const updateOrderStatus = async (orderId: string, newStatus: Order['status']) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId)

      if (error) throw error

      setOrders(orders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      ))
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'processing':
        return <Clock className="w-4 h-4 text-blue-600" />
      case 'pending':
        return <AlertCircle className="w-4 h-4 text-yellow-600" />
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-red-600" />
      default:
        return null
    }
  }

  const totalSales = orders.filter(order => order.status === 'completed').reduce((sum, order) => sum + order.totalAmount, 0)
  const totalOrders = orders.length
  const completedOrders = orders.filter(order => order.status === 'completed').length
  const pendingOrders = orders.filter(order => order.status === 'pending').length

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminNav />

      <div className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Gerenciamento de Vendas</h1>
              <p className="text-gray-600 mt-1">Gerencie pedidos, clientes e pagamentos</p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" className="rounded-full" onClick={fetchOrders}>
                Atualizar
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Vendas Totais</CardTitle>
                <DollarSign className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">R$ {totalSales.toFixed(2)}</div>
                <p className="text-xs text-gray-500 mt-1">Total em vendas concluídas</p>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Total de Pedidos</CardTitle>
                <Package className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{totalOrders}</div>
                <p className="text-xs text-gray-500 mt-1">Todos os pedidos</p>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Pedidos Concluídos</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{completedOrders}</div>
                <p className="text-xs text-gray-500 mt-1">Pedidos finalizados</p>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Pendentes</CardTitle>
                <AlertCircle className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{pendingOrders}</div>
                <p className="text-xs text-gray-500 mt-1">Aguardando processamento</p>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="shadow-sm mb-8">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="search">Buscar</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="search"
                      placeholder="Cliente ou número do pedido"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 rounded-full"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger id="status" className="rounded-full">
                      <SelectValue placeholder="Filtrar por status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="pending">Pendente</SelectItem>
                      <SelectItem value="processing">Processando</SelectItem>
                      <SelectItem value="completed">Concluído</SelectItem>
                      <SelectItem value="cancelled">Cancelado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date">Período</Label>
                  <Select value={dateFilter} onValueChange={setDateFilter}>
                    <SelectTrigger id="date" className="rounded-full">
                      <SelectValue placeholder="Filtrar por data" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todo período</SelectItem>
                      <SelectItem value="7">Últimos 7 dias</SelectItem>
                      <SelectItem value="30">Últimos 30 dias</SelectItem>
                      <SelectItem value="90">Últimos 90 dias</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>&nbsp;</Label>
                  <Button variant="outline" className="w-full rounded-full">
                    <Filter className="w-4 h-4 mr-2" />
                    Aplicar Filtros
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Orders Table */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Lista de Pedidos</CardTitle>
              <p className="text-sm text-gray-600">{filteredOrders.length} pedidos encontrados</p>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center p-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Pedido</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Cliente</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Valor</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Pagamento</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Data</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOrders.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="text-center py-8 text-gray-500">
                            Nenhum pedido encontrado
                          </td>
                        </tr>
                      ) : (
                        filteredOrders.map((order) => (
                          <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 px-4">
                              <div>
                                <p className="font-medium text-gray-900" title={order.id}>{order.id.slice(0, 8)}...</p>
                                <p className="text-sm text-gray-600">{order.items.length} item(s)</p>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div>
                                <p className="font-medium text-gray-900">{order.customerName}</p>
                                <p className="text-sm text-gray-600">{order.customerEmail}</p>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <p className="font-semibold text-gray-900">R$ {order.totalAmount.toFixed(2)}</p>
                            </td>
                            <td className="py-3 px-4">
                              <Badge className={`${statusColors[order.status]} border`}>
                                {getStatusIcon(order.status)}
                                <span className="ml-1">{statusLabels[order.status]}</span>
                              </Badge>
                            </td>
                            <td className="py-3 px-4">
                              <p className="text-sm text-gray-900">{order.paymentMethod}</p>
                            </td>
                            <td className="py-3 px-4">
                              <p className="text-sm text-gray-900">{new Date(order.orderDate).toLocaleDateString('pt-BR')}</p>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex space-x-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => setSelectedOrder(order)}
                                  className="rounded-full border-[#1d9b9a] text-[#1d9b9a] hover:bg-[#1d9b9a] hover:text-white"
                                >
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Select
                                  value={order.status}
                                  onValueChange={(newStatus) => updateOrderStatus(order.id, newStatus as Order['status'])}
                                >
                                  <SelectTrigger className="w-32 rounded-full text-xs">
                                    <SelectValue placeholder="Mudar status" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="pending">Pendente</SelectItem>
                                    <SelectItem value="processing">Processando</SelectItem>
                                    <SelectItem value="completed">Concluído</SelectItem>
                                    <SelectItem value="cancelled">Cancelado</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </td>
                          </tr>
                        )))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Order Details Modal */}
          {selectedOrder && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-xl font-semibold">
                    Detalhes do Pedido {selectedOrder.id}
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedOrder(null)}
                    className="rounded-full"
                  >
                    <XCircle className="w-4 h-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Customer Info */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Informações do Cliente</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label>Nome</Label>
                          <p className="text-gray-900">{selectedOrder.customerName}</p>
                        </div>
                        <div>
                          <Label>Email</Label>
                          <p className="text-gray-900">{selectedOrder.customerEmail}</p>
                        </div>
                        <div>
                          <Label>Telefone</Label>
                          <p className="text-gray-900">{selectedOrder.customerPhone}</p>
                        </div>
                        <div>
                          <Label>Data do Pedido</Label>
                          <p className="text-gray-900">{new Date(selectedOrder.orderDate).toLocaleDateString('pt-BR')}</p>
                        </div>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Itens do Pedido</h3>
                      <div className="space-y-3">
                        {selectedOrder.items.map((item, index) => (
                          <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <div>
                              <p className="font-medium text-gray-900">{item.bookTitle}</p>
                              <p className="text-sm text-gray-600">Quantidade: {item.quantity}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-gray-900">R$ {item.total.toFixed(2)}</p>
                              <p className="text-sm text-gray-600">R$ {item.price.toFixed(2)} cada</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Shipping Address */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Endereço de Entrega</h3>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-gray-900">{selectedOrder.shippingAddress.street}</p>
                        <p className="text-gray-900">{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state}</p>
                        <p className="text-gray-900">CEP: {selectedOrder.shippingAddress.zipCode}</p>
                      </div>
                    </div>

                    {/* Payment & Status */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label>Forma de Pagamento</Label>
                        <p className="text-gray-900">{selectedOrder.paymentMethod}</p>
                      </div>
                      <div>
                        <Label>Status</Label>
                        <Badge className={`${statusColors[selectedOrder.status]} border`}>
                          {statusLabels[selectedOrder.status]}
                        </Badge>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-gray-900">Total do Pedido:</span>
                        <span className="text-2xl font-bold text-[#1d9b9a]">R$ {selectedOrder.totalAmount.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Notes */}
                    {selectedOrder.notes && (
                      <div>
                        <Label>Observações</Label>
                        <p className="text-gray-900">{selectedOrder.notes}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
