'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import {
  Search,
  Filter,
  Eye,
  Package,
  DollarSign,
  CheckCircle,
  XCircle,
  AlertCircle,
  Truck,
  Box
} from 'lucide-react'
import AdminNav from '@/components/admin-nav'
import { createClient } from '@/lib/supabase/client'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

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
  status: 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'completed'
  paymentMethod: string
  orderDate: string
  shippingAddress: {
    street: string
    city: string
    state: string
    zipCode: string
  }
  notes?: string
  carrierName?: string
  trackingCode?: string
  trackingUrl?: string
}

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  paid: 'bg-green-100 text-green-800 border-green-200',
  processing: 'bg-blue-100 text-blue-800 border-blue-200',
  shipped: 'bg-purple-100 text-purple-800 border-purple-200',
  delivered: 'bg-gray-100 text-gray-800 border-gray-200',
  cancelled: 'bg-red-100 text-red-800 border-red-200',
  completed: 'bg-green-100 text-green-800 border-green-200'
}

const statusLabels = {
  pending: 'Pendente',
  paid: 'Pago',
  processing: 'Processando',
  shipped: 'Enviado',
  delivered: 'Entregue',
  cancelled: 'Cancelado',
  completed: 'Concluído'
}

export default function SalesManagement() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [dateFilter, setDateFilter] = useState<string>('all')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  // Tracking Dialog State
  const [isTrackingDialogOpen, setIsTrackingDialogOpen] = useState(false)
  const [trackingOrderId, setTrackingOrderId] = useState<string | null>(null)
  const [carrierName, setCarrierName] = useState('')
  const [trackingCode, setTrackingCode] = useState('')
  const [trackingUrl, setTrackingUrl] = useState('')

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
          notes: order.notes,
          carrierName: order.carrier_name,
          trackingCode: order.tracking_code,
          trackingUrl: order.tracking_url
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
    // If status is 'shipped', open dialog instead of updating directly
    if (newStatus === 'shipped') {
      setTrackingOrderId(orderId)
      setCarrierName('')
      setTrackingCode('')
      setTrackingUrl('')
      setIsTrackingDialogOpen(true)
      return
    }

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

  const handleSaveTracking = async () => {
    if (!trackingOrderId) return

    try {
      const { error } = await supabase
        .from('orders')
        .update({
          status: 'shipped',
          carrier_name: carrierName,
          tracking_code: trackingCode,
          tracking_url: trackingUrl
        })
        .eq('id', trackingOrderId)

      if (error) throw error

      setOrders(orders.map(order =>
        order.id === trackingOrderId ? {
          ...order,
          status: 'shipped',
          carrierName: carrierName,
          trackingCode: trackingCode,
          trackingUrl: trackingUrl
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any : order
      ))

      // Trigger Email Notification
      await fetch('/api/orders/notify-shipment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: trackingOrderId,
          carrierName,
          trackingCode,
          trackingUrl
        })
      })

      setIsTrackingDialogOpen(false)
    } catch (error) {
      console.error('Error saving tracking info:', error)
    }
  }

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'paid':
        return <DollarSign className="w-4 h-4 text-green-600" />
      case 'processing':
        return <Package className="w-4 h-4 text-blue-600" />
      case 'shipped':
        return <Truck className="w-4 h-4 text-purple-600" />
      case 'delivered':
        return <Box className="w-4 h-4 text-gray-600" />
      case 'completed': // Legacy/Alt
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'pending':
        return <AlertCircle className="w-4 h-4 text-yellow-600" />
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-red-600" />
      default:
        return null
    }
  }

  const totalSales = orders.filter(order => ['paid', 'processing', 'shipped', 'delivered', 'completed'].includes(order.status)).reduce((sum, order) => sum + order.totalAmount, 0)
  const totalOrders = orders.length

  // Update stats counters
  const paidOrders = orders.filter(order => order.status === 'paid').length
  const processingOrders = orders.filter(order => order.status === 'processing').length
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
                <CardTitle className="text-sm font-medium text-gray-600">Vendas Confirmadas</CardTitle>
                <DollarSign className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">R$ {totalSales.toFixed(2)}</div>
                <p className="text-xs text-gray-500 mt-1">Total confirmado</p>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Pagos</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{paidOrders}</div>
                <p className="text-xs text-gray-500 mt-1">Novos pagamentos</p>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Em Processamento</CardTitle>
                <Package className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{processingOrders}</div>
                <p className="text-xs text-gray-500 mt-1">Separando/Preparando</p>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Pendentes</CardTitle>
                <AlertCircle className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{pendingOrders}</div>
                <p className="text-xs text-gray-500 mt-1">Aguardando pagamento</p>
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
                      placeholder="Cliente ou pedido"
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
                      <SelectItem value="paid">Pago</SelectItem>
                      <SelectItem value="processing">Processando</SelectItem>
                      <SelectItem value="shipped">Enviado</SelectItem>
                      <SelectItem value="delivered">Entregue</SelectItem>
                      <SelectItem value="cancelled">Cancelado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Date Filter (kept simplified) */}
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
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Orders Table */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Lista de Pedidos</CardTitle>
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
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOrders.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="text-center py-8 text-gray-500">
                            Nenhum pedido encontrado
                          </td>
                        </tr>
                      ) : (
                        filteredOrders.map((order) => (
                          <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 px-4">
                              <div>
                                <p className="font-medium text-gray-900" title={order.id}>{order.id.slice(0, 8)}...</p>
                                <p className="text-sm text-gray-600">{new Date(order.orderDate).toLocaleDateString()}</p>
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
                              <div className="flex space-x-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => setSelectedOrder(order)}
                                  className="rounded-full"
                                >
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Select
                                  value={order.status}
                                  onValueChange={(newStatus) => updateOrderStatus(order.id, newStatus as Order['status'])}
                                >
                                  <SelectTrigger className="w-32 rounded-full text-xs">
                                    <SelectValue placeholder="Status" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="pending">Pendente</SelectItem>
                                    <SelectItem value="paid">Pago</SelectItem>
                                    <SelectItem value="processing">Processando</SelectItem>
                                    <SelectItem value="shipped">Enviado</SelectItem>
                                    <SelectItem value="delivered">Entregue</SelectItem>
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

          {/* Dialog for Tracking Info */}
          <Dialog open={isTrackingDialogOpen} onOpenChange={setIsTrackingDialogOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Informações de Envio</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="carrier" className="text-right">
                    Transportadora
                  </Label>
                  <Input
                    id="carrier"
                    value={carrierName}
                    onChange={(e) => setCarrierName(e.target.value)}
                    className="col-span-3"
                    placeholder="Ex: Correios, Jadlog..."
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="tracking" className="text-right">
                    Rastreio
                  </Label>
                  <Input
                    id="tracking"
                    value={trackingCode}
                    onChange={(e) => setTrackingCode(e.target.value)}
                    className="col-span-3"
                    placeholder="Código de rastreio"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="trackingUrl" className="text-right">
                    Link
                  </Label>
                  <Input
                    id="trackingUrl"
                    value={trackingUrl}
                    onChange={(e) => setTrackingUrl(e.target.value)}
                    className="col-span-3"
                    placeholder="https://rastreio..."
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleSaveTracking}>Salvar e Marcar como Enviado</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Order Details Modal */}
          {selectedOrder && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-xl font-semibold">
                    Pedido {selectedOrder.id.slice(0, 8)} - {statusLabels[selectedOrder.status]}
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Cliente</Label>
                        <p className="text-gray-900 font-medium">{selectedOrder.customerName}</p>
                        <p className="text-gray-600 text-sm">{selectedOrder.customerEmail}</p>
                        <p className="text-gray-600 text-sm">{selectedOrder.customerPhone}</p>
                      </div>
                      <div>
                        <Label>Endereço</Label>
                        <p className="text-gray-900 text-sm">{selectedOrder.shippingAddress.street}</p>
                        <p className="text-gray-900 text-sm">{selectedOrder.shippingAddress.city} - {selectedOrder.shippingAddress.state}</p>
                        <p className="text-gray-900 text-sm">{selectedOrder.shippingAddress.zipCode}</p>
                      </div>
                    </div>

                    {/* Tracking Info if available */}
                    {selectedOrder.status === 'shipped' && (
                      <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                        <h4 className="font-semibold text-purple-900 mb-2 flex items-center">
                          <Truck className="w-4 h-4 mr-2" /> Dados de Envio
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <span className="text-xs text-purple-700 block">Transportadora</span>
                            <span className="text-sm font-medium text-purple-900">{selectedOrder.carrierName || 'Não informado'}</span>
                          </div>
                          <div>
                            <span className="text-xs text-purple-700 block">Código</span>
                            <span className="text-sm font-medium text-purple-900">{selectedOrder.trackingCode || 'Não informado'}</span>
                          </div>
                          {selectedOrder.trackingUrl && (
                            <div>
                              <span className="text-xs text-purple-700 block">Link de Rastreio</span>
                              <span className="text-sm font-medium text-purple-900 truncate block max-w-full"><a href={selectedOrder.trackingUrl} target="_blank" className="hover:underline">{selectedOrder.trackingUrl}</a></span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Items */}
                    <div className="border-t pt-4">
                      <Label className="mb-2 block">Itens</Label>
                      <div className="space-y-2">
                        {selectedOrder.items.map((item, i) => (
                          <div key={i} className="flex justify-between text-sm">
                            <span>{item.quantity}x {item.bookTitle}</span>
                            <span>R$ {item.total.toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border-t pt-4 flex justify-between items-center">
                      <span className="font-semibold">Total</span>
                      <span className="text-xl font-bold text-green-700">R$ {selectedOrder.totalAmount.toFixed(2)}</span>
                    </div>

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
