'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import AdminNav from '@/components/admin-nav'
import { Users, UserCheck, TrendingUp, Mail } from 'lucide-react'

export default function CustomerManagement() {
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

  const customerStats = [
    { title: 'Total de Clientes', value: '342', icon: Users, color: 'text-blue-600' },
    { title: 'Clientes Ativos', value: '298', icon: UserCheck, color: 'text-green-600' },
    { title: 'Taxa de Retorno', value: '87%', icon: TrendingUp, color: 'text-purple-600' },
    { title: 'Clientes VIP', value: '45', icon: Mail, color: 'text-orange-600' }
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminNav />

      <div className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Gerenciamento de Clientes</h1>
            <p className="text-gray-600 mt-1">Visualize e gerencie informações dos clientes</p>
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

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Funcionalidades em Desenvolvimento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-[#1d9b9a]" />
                  <div>
                    <h4 className="font-medium text-gray-900">Cadastro de Clientes</h4>
                    <p className="text-sm text-gray-600">Gerenciamento completo de informações dos clientes</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <UserCheck className="w-5 h-5 text-green-600" />
                  <div>
                    <h4 className="font-medium text-gray-900">Segmentação de Clientes</h4>
                    <p className="text-sm text-gray-600">Categorização e análise de perfil de clientes</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-purple-600" />
                  <div>
                    <h4 className="font-medium text-gray-900">Comunicação com Clientes</h4>
                    <p className="text-sm text-gray-600">Envio de emails e notificações personalizadas</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <TrendingUp className="w-5 h-5 text-orange-600" />
                  <div>
                    <h4 className="font-medium text-gray-900">Análise de Comportamento</h4>
                    <p className="text-sm text-gray-600">Histórico de compras e preferências</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Em breve:</strong> Esta seção terá funcionalidades completas para gerenciamento
                  de clientes, incluindo cadastro, histórico de compras, análise de perfil e ferramentas
                  de comunicação direta.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}