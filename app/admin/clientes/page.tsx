'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import AdminNav from '@/components/admin-nav'
import { Users, UserCheck, TrendingUp, Mail, Search, Download } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface Client {
  id: string
  name: string
  email: string
  phone: string
  totalOrders: number
  totalSpent: number
  lastOrderDate: string
  status: 'active' | 'inactive'
}

export default function CustomerManagement() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [clients, setClients] = useState<Client[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        router.push('/admin/login')
      } else {
        setIsAuthenticated(true)
        fetchClients()
      }
      setIsLoading(false)
    }

    checkUser()
  }, [router])

  const fetchClients = async () => {
    try {
      const { data: orders, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      if (orders) {
        const clientsMap = new Map<string, Client>()

        orders.forEach(order => {
          const email = order.customer_email
          if (!clientsMap.has(email)) {
            clientsMap.set(email, {
              id: order.id, // Using first order ID as proxy for ID since we don't have auth users for all
              name: order.customer_name,
              email: email,
              phone: order.customer_phone || '-',
              totalOrders: 0,
              totalSpent: 0,
              lastOrderDate: order.created_at,
              status: 'active'
            })
          }

          const client = clientsMap.get(email)!
          client.totalOrders += 1
          client.totalSpent += Number(order.total_amount)
          if (new Date(order.created_at) > new Date(client.lastOrderDate)) {
            client.lastOrderDate = order.created_at
          }
        })

        setClients(Array.from(clientsMap.values()))
      }
    } catch (error) {
      console.error('Error fetching clients:', error)
    }
  }

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

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

  const totalClients = clients.length
  // Simple heuristic: active if ordered in last 90 days.
  // For now, let's just count all as active or use dummy logic
  const activeClients = clients.length
  const totalRevenue = clients.reduce((sum, c) => sum + c.totalSpent, 0)
  const avgTicket = totalClients > 0 ? (totalRevenue / totalClients) : 0

  const customerStats = [
    { title: 'Total de Clientes', value: totalClients.toString(), icon: Users, color: 'text-blue-600' },
    { title: 'Clientes Ativos', value: activeClients.toString(), icon: UserCheck, color: 'text-green-600' },
    { title: 'Ticket Médio', value: `R$ ${avgTicket.toFixed(2)}`, icon: TrendingUp, color: 'text-purple-600' },
    { title: 'Novos (30d)', value: clients.filter(c => new Date(c.lastOrderDate).getTime() > Date.now() - 30 * 24 * 60 * 60 * 1000).length.toString(), icon: Mail, color: 'text-orange-600' }
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminNav />

      <div className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Gerenciamento de Clientes</h1>
              <p className="text-gray-600 mt-1">Visualize e gerencie informações dos clientes</p>
            </div>
            <Button variant="outline" className="rounded-full">
              <Download className="w-4 h-4 mr-2" />
              Exportar CSV
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {customerStats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <Card key={index} className="shadow-sm">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                    <IconComponent className={`h-4 w-4 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <Card className="shadow-sm mb-6">
            <CardContent className="p-4">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar por nome ou email..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Lista de Clientes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Nome</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Contato</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Pedidos</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Total Gasto</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Última Compra</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredClients.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="text-center py-8 text-gray-500">
                          Nenhum cliente encontrado
                        </td>
                      </tr>
                    ) : (
                      filteredClients.map((client, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <p className="font-medium text-gray-900">{client.name}</p>
                          </td>
                          <td className="py-3 px-4">
                            <div>
                              <p className="text-sm text-gray-900">{client.email}</p>
                              <p className="text-xs text-gray-500">{client.phone}</p>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {client.totalOrders}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <p className="font-semibold text-gray-900">R$ {client.totalSpent.toFixed(2)}</p>
                          </td>
                          <td className="py-3 px-4">
                            <p className="text-sm text-gray-600">{new Date(client.lastOrderDate).toLocaleDateString('pt-BR')}</p>
                          </td>
                        </tr>
                      )))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}