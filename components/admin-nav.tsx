'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import {
  BarChart3,
  BookOpen,
  DollarSign,
  Users,
  Settings,
  LogOut,
  Package,
  FileText,
  MessageCircle
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: BarChart3 },
  { name: 'Livros', href: '/admin/livros', icon: BookOpen },
  { name: 'Vendas', href: '/admin/vendas', icon: DollarSign },
  { name: 'Clientes', href: '/admin/clientes', icon: Users },
  { name: 'Mensagens', href: '/admin/mensagens', icon: MessageCircle },
  { name: 'Usuários', href: '/admin/usuarios', icon: Users },
  { name: 'Relatórios', href: '/admin/relatorios', icon: FileText },
  { name: 'Configurações', href: '/admin/configuracoes', icon: Settings },
]

export default function AdminNav() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('adminAuth')
    localStorage.removeItem('adminUser')
    router.push('/admin/login')
  }

  return (
    <nav className="w-64 bg-white shadow-sm border-r min-h-screen">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-8 h-8 bg-[#1d9b9a] rounded-lg flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Admin</h2>
            <p className="text-sm text-gray-600">Celso Rocha</p>
          </div>
        </div>

        <div className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-[#1d9b9a] text-white'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                )}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-red-600 transition-colors w-full"
          >
            <LogOut className="w-5 h-5" />
            <span>Sair</span>
          </button>
        </div>
      </div>
    </nav>
  )
}