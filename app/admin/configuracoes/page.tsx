'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import AdminNav from '@/components/admin-nav'
import { Settings, User, Bell, Shield, CreditCard, Mail } from 'lucide-react'
import { toast } from 'sonner'

export default function AdminSettings() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [settings, setSettings] = useState<any>(null)
  const [saving, setSaving] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        router.push('/admin/login')
      } else {
        setIsAuthenticated(true)
        fetchSettings()
      }
      setIsLoading(false)
    }

    checkUser()
  }, [router])

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .single()

      if (error) throw error
      setSettings(data)
    } catch (error) {
      console.error('Error fetching settings:', error)
      toast.error('Erro ao carregar configurações')
    }
  }

  const handleSaveSettings = async () => {
    try {
      setSaving(true)
      const { error } = await supabase
        .from('site_settings')
        .update({
          admin_name: settings.admin_name,
          admin_email: settings.admin_email,
          contact_email: settings.contact_email,
          email_notifications: settings.email_notifications,
          new_order_alerts: settings.new_order_alerts,
          payment_methods: settings.payment_methods,
          smtp_settings: settings.smtp_settings
        })
        .eq('id', 1)

      if (error) throw error
      toast.success('Configurações salvas com sucesso')
    } catch (error) {
      console.error('Error saving settings:', error)
      toast.error('Erro ao salvar configurações')
    } finally {
      setSaving(false)
    }
  }

  const handlePasswordChange = async () => {
    const newPassword = (document.getElementById('newPassword') as HTMLInputElement).value
    const confirmPassword = (document.getElementById('confirmPassword') as HTMLInputElement).value

    if (!newPassword || !confirmPassword) {
      toast.error('Por favor, preencha todos os campos')
      return
    }

    if (newPassword !== confirmPassword) {
      toast.error('As senhas não coincidem')
      return
    }

    if (newPassword.length < 6) {
      toast.error('A senha deve ter pelo menos 6 caracteres')
      return
    }

    try {
      setSaving(true)
      const { error } = await supabase.auth.updateUser({ password: newPassword })

      if (error) throw error

      toast.success('Senha alterada com sucesso')
        ; (document.getElementById('newPassword') as HTMLInputElement).value = ''
        ; (document.getElementById('confirmPassword') as HTMLInputElement).value = ''
        ; (document.getElementById('currentPassword') as HTMLInputElement).value = ''
    } catch (error: any) {
      console.error('Error changing password:', error)
      toast.error(error.message || 'Erro ao alterar senha')
    } finally {
      setSaving(false)
    }
  }

  const updateSetting = (key: string, value: any) => {
    setSettings((prev: any) => ({ ...prev, [key]: value }))
  }

  const updateNestedSetting = (parent: string, key: string, value: any) => {
    setSettings((prev: any) => ({
      ...prev,
      [parent]: { ...prev[parent], [key]: value }
    }))
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

      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
            <p className="text-gray-600 mt-1">Gerencie as configurações do sistema</p>
          </div>

          <div className="space-y-6">
            {/* Profile Settings */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center">
                  <User className="w-5 h-5 mr-2 text-[#1d9b9a]" />
                  Configurações de Perfil
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="adminName">Nome do Administrador</Label>
                    <Input
                      id="adminName"
                      value={settings?.admin_name || ''}
                      onChange={(e) => updateSetting('admin_name', e.target.value)}
                      className="rounded-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="adminEmail">Email</Label>
                    <Input
                      id="adminEmail"
                      type="email"
                      value={settings?.admin_email || ''}
                      onChange={(e) => updateSetting('admin_email', e.target.value)}
                      className="rounded-full"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="contactEmail">Email para Recebimento de Mensagens</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={settings?.contact_email || ''}
                      onChange={(e) => updateSetting('contact_email', e.target.value)}
                      placeholder="ex: contato@site.com.br"
                      className="rounded-full"
                    />
                  </div>
                </div>
                <Button
                  onClick={handleSaveSettings}
                  disabled={saving}
                  className="bg-[#1d9b9a] hover:bg-[#16807f] rounded-full"
                >
                  {saving ? 'Salvando...' : 'Salvar Alterações'}
                </Button>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center">
                  <Bell className="w-5 h-5 mr-2 text-[#1d9b9a]" />
                  Notificações
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="emailNotifications">Notificações por Email</Label>
                    <p className="text-sm text-gray-600">Receber alertas por email</p>
                  </div>
                  <Switch
                    id="emailNotifications"
                    checked={settings?.email_notifications || false}
                    onCheckedChange={(checked) => updateSetting('email_notifications', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="newOrderAlerts">Novos Pedidos</Label>
                    <p className="text-sm text-gray-600">Notificar sobre novos pedidos</p>
                  </div>
                  <Switch
                    id="newOrderAlerts"
                    checked={settings?.new_order_alerts || false}
                    onCheckedChange={(checked) => updateSetting('new_order_alerts', checked)}
                  />
                </div>
                <Button
                  onClick={handleSaveSettings}
                  disabled={saving}
                  className="bg-[#1d9b9a] hover:bg-[#16807f] rounded-full mt-4"
                >
                  {saving ? 'Salvando...' : 'Salvar Alterações'}
                </Button>
              </CardContent>
            </Card>

            {/* Security Settings */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-[#1d9b9a]" />
                  Segurança
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Senha Atual</Label>
                  <Input id="currentPassword" type="password" placeholder="Digite sua senha atual" className="rounded-full" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">Nova Senha</Label>
                  <Input id="newPassword" type="password" placeholder="Digite sua nova senha" className="rounded-full" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
                  <Input id="confirmPassword" type="password" placeholder="Confirme sua nova senha" className="rounded-full" />
                </div>
                <Button
                  onClick={handlePasswordChange}
                  disabled={saving}
                  className="bg-[#1d9b9a] hover:bg-[#16807f] rounded-full"
                >
                  {saving ? 'Alterando...' : 'Alterar Senha'}
                </Button>
              </CardContent>
            </Card>

            {/* Payment Settings */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center">
                  <CreditCard className="w-5 h-5 mr-2 text-[#1d9b9a]" />
                  Configurações de Pagamento
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="paymentMethods">Métodos de Pagamento Aceitos</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="creditCard"
                        checked={settings?.payment_methods?.credit_card || false}
                        onCheckedChange={(checked) => updateNestedSetting('payment_methods', 'credit_card', checked)}
                      />
                      <Label htmlFor="creditCard">Cartão de Crédito</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="pix"
                        checked={settings?.payment_methods?.pix || false}
                        onCheckedChange={(checked) => updateNestedSetting('payment_methods', 'pix', checked)}
                      />
                      <Label htmlFor="pix">PIX</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="boleto"
                        checked={settings?.payment_methods?.boleto || false}
                        onCheckedChange={(checked) => updateNestedSetting('payment_methods', 'boleto', checked)}
                      />
                      <Label htmlFor="boleto">Boleto Bancário</Label>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={handleSaveSettings}
                  disabled={saving}
                  className="bg-[#1d9b9a] hover:bg-[#16807f] rounded-full mt-4"
                >
                  {saving ? 'Salvando...' : 'Salvar Alterações'}
                </Button>
              </CardContent>
            </Card>

            {/* Email Settings */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center">
                  <Mail className="w-5 h-5 mr-2 text-[#1d9b9a]" />
                  Configurações de Email
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="smtpServer">Servidor SMTP</Label>
                  <Input
                    id="smtpServer"
                    value={settings?.smtp_settings?.server || ''}
                    onChange={(e) => updateNestedSetting('smtp_settings', 'server', e.target.value)}
                    placeholder="smtp.gmail.com"
                    className="rounded-full"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="smtpPort">Porta SMTP</Label>
                    <Input
                      id="smtpPort"
                      type="number"
                      value={settings?.smtp_settings?.port || ''}
                      onChange={(e) => updateNestedSetting('smtp_settings', 'port', parseInt(e.target.value))}
                      placeholder="587"
                      className="rounded-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtpUser">Usuário SMTP</Label>
                    <Input
                      id="smtpUser"
                      value={settings?.smtp_settings?.user || ''}
                      onChange={(e) => updateNestedSetting('smtp_settings', 'user', e.target.value)}
                      placeholder="seu@email.com"
                      className="rounded-full"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="smtpSsl"
                    checked={settings?.smtp_settings?.ssl || false}
                    onCheckedChange={(checked) => updateNestedSetting('smtp_settings', 'ssl', checked)}
                  />
                  <Label htmlFor="smtpSsl">Usar SSL/TLS</Label>
                </div>
                <Button
                  onClick={handleSaveSettings}
                  disabled={saving}
                  className="bg-[#1d9b9a] hover:bg-[#16807f] rounded-full mt-4"
                >
                  {saving ? 'Salvando...' : 'Salvar Alterações'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}