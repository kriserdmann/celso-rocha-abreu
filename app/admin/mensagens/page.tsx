'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import AdminNav from '@/components/admin-nav'
import { createClient } from '@/lib/supabase/client'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Eye, Trash2, Archive, CheckCircle } from 'lucide-react'
import { toast } from 'sonner'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface Contact {
    id: string
    name: string
    email: string
    phone: string
    subject: string
    type: string
    message: string
    status: 'new' | 'read' | 'archived'
    created_at: string
}

export default function MessagesPage() {
    const [messages, setMessages] = useState<Contact[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedMessage, setSelectedMessage] = useState<Contact | null>(null)
    const supabase = createClient()

    useEffect(() => {
        fetchMessages()
    }, [])

    const fetchMessages = async () => {
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from('contacts')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) throw error

            setMessages(data || [])
        } catch (error) {
            console.error('Error fetching messages:', error)
            toast.error('Erro ao carregar mensagens')
        } finally {
            setLoading(false)
        }
    }

    const updateStatus = async (id: string, status: 'new' | 'read' | 'archived') => {
        try {
            const { error } = await supabase
                .from('contacts')
                .update({ status })
                .eq('id', id)

            if (error) throw error

            setMessages(messages.map(msg => msg.id === id ? { ...msg, status } : msg))
            toast.success('Status atualizado')

            if (selectedMessage?.id === id) {
                setSelectedMessage(prev => prev ? { ...prev, status } : null)
            }
        } catch (error) {
            console.error('Error updating status:', error)
            toast.error('Erro ao atualizar status')
        }
    }

    const deleteMessage = async (id: string) => {
        if (!confirm('Tem certeza que deseja excluir esta mensagem?')) return

        try {
            const { error } = await supabase
                .from('contacts')
                .delete()
                .eq('id', id)

            if (error) throw error

            setMessages(messages.filter(msg => msg.id !== id))
            toast.success('Mensagem excluída')
            setSelectedMessage(null)
        } catch (error) {
            console.error('Error deleting message:', error)
            toast.error('Erro ao excluir mensagem')
        }
    }

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'new':
                return <Badge className="bg-blue-500">Novo</Badge>
            case 'read':
                return <Badge variant="outline" className="text-green-600 border-green-600">Lido</Badge>
            case 'archived':
                return <Badge variant="secondary">Arquivado</Badge>
            default:
                return <Badge variant="outline">{status}</Badge>
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <AdminNav />

            <div className="flex-1 p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Mensagens</h1>
                            <p className="text-gray-600 mt-1">Gerencie as mensagens recebidas pelo site</p>
                        </div>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Caixa de Entrada</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {loading ? (
                                <div className="flex justify-center p-8">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1d9b9a]"></div>
                                </div>
                            ) : messages.length === 0 ? (
                                <div className="text-center py-8 text-gray-500">
                                    Nenhuma mensagem encontrada.
                                </div>
                            ) : (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Data</TableHead>
                                            <TableHead>Nome</TableHead>
                                            <TableHead>Assunto</TableHead>
                                            <TableHead>Tipo</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-right">Ações</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {messages.map((message) => (
                                            <TableRow key={message.id} className={message.status === 'new' ? 'bg-blue-50/50' : ''}>
                                                <TableCell className="whitespace-nowrap">
                                                    {format(new Date(message.created_at), 'dd/MM/yyyy HH:mm', { locale: ptBR })}
                                                </TableCell>
                                                <TableCell className="font-medium">{message.name}</TableCell>
                                                <TableCell>{message.subject}</TableCell>
                                                <TableCell>
                                                    <Badge variant="outline">{message.type}</Badge>
                                                </TableCell>
                                                <TableCell>{getStatusBadge(message.status)}</TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => {
                                                                setSelectedMessage(message)
                                                                if (message.status === 'new') {
                                                                    updateStatus(message.id, 'read')
                                                                }
                                                            }}
                                                        >
                                                            <Eye className="w-4 h-4 text-gray-500" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => updateStatus(message.id, 'archived')}
                                                            disabled={message.status === 'archived'}
                                                        >
                                                            <Archive className="w-4 h-4 text-gray-500" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => deleteMessage(message.id)}
                                                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            )}
                        </CardContent>
                    </Card>

                    <Dialog open={!!selectedMessage} onOpenChange={(open) => !open && setSelectedMessage(null)}>
                        <DialogContent className="max-w-2xl">
                            <DialogHeader>
                                <DialogTitle>Detalhes da Mensagem</DialogTitle>
                                <DialogDescription>
                                    Recebida em {selectedMessage && format(new Date(selectedMessage.created_at), "dd 'de' MMMM 'às' HH:mm", { locale: ptBR })}
                                </DialogDescription>
                            </DialogHeader>

                            {selectedMessage && (
                                <div className="space-y-6 py-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-500">Nome</h4>
                                            <p className="text-gray-900">{selectedMessage.name}</p>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-500">Email</h4>
                                            <p className="text-gray-900">{selectedMessage.email}</p>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-500">Telefone</h4>
                                            <p className="text-gray-900">{selectedMessage.phone || '-'}</p>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-500">Tipo</h4>
                                            <p className="text-gray-900">{selectedMessage.type}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-sm font-medium text-gray-500 mb-2">Assunto</h4>
                                        <p className="text-gray-900 font-medium">{selectedMessage.subject}</p>
                                    </div>

                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h4 className="text-sm font-medium text-gray-500 mb-2">Mensagem</h4>
                                        <p className="text-gray-900 whitespace-pre-wrap">{selectedMessage.message}</p>
                                    </div>

                                    <div className="flex justify-end gap-3 pt-4 border-t">
                                        {selectedMessage.status !== 'archived' && (
                                            <Button
                                                variant="outline"
                                                onClick={() => updateStatus(selectedMessage.id, 'archived')}
                                            >
                                                <Archive className="w-4 h-4 mr-2" />
                                                Arquivar
                                            </Button>
                                        )}
                                        <Button
                                            variant="default"
                                            className="bg-[#1d9b9a] hover:bg-[#16807f]"
                                            onClick={() => setSelectedMessage(null)}
                                        >
                                            Fechar
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    )
}
