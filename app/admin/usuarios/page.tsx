'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from '@/components/ui/dialog'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import AdminNav from '@/components/admin-nav'
import { Users, Shield, User, Plus, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

interface Profile {
    id: string
    email: string
    role: 'admin' | 'client'
    created_at: string
}

export default function UserManagement() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [profiles, setProfiles] = useState<Profile[]>([])
    const [updating, setUpdating] = useState<string | null>(null)

    // New state for create/delete
    const [isAddingUser, setIsAddingUser] = useState(false)
    const [newUser, setNewUser] = useState({ email: '', password: '', role: 'client' })
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [userToDelete, setUserToDelete] = useState<string | null>(null)

    const router = useRouter()
    const supabase = createClient()

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()

            if (!user) {
                router.push('/admin/login')
            } else {
                // Verify if user is admin
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('role')
                    .eq('id', user.id)
                    .single()

                if (profile?.role !== 'admin') {
                    router.push('/')
                    return
                }

                setIsAuthenticated(true)
                fetchProfiles()
            }
            setIsLoading(false)
        }

        checkUser()
    }, [router])

    const fetchProfiles = async () => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) throw error
            setProfiles(data || [])
        } catch (error) {
            console.error('Error fetching profiles:', error)
            toast.error('Erro ao carregar usuários')
        }
    }

    const handleRoleChange = async (userId: string, newRole: 'admin' | 'client') => {
        try {
            setUpdating(userId)
            const { error } = await supabase
                .from('profiles')
                .update({ role: newRole })
                .eq('id', userId)

            if (error) throw error

            setProfiles(profiles.map(p =>
                p.id === userId ? { ...p, role: newRole } : p
            ))
            toast.success('Permissão atualizada com sucesso')
        } catch (error) {
            console.error('Error updating role:', error)
            toast.error('Erro ao atualizar permissão')
        } finally {
            setUpdating(null)
        }
    }

    const handleCreateUser = async () => {
        try {
            setUpdating('creating')
            const response = await fetch('/api/admin/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser),
            })

            const data = await response.json()

            if (!response.ok) throw new Error(data.error || 'Erro ao criar usuário')

            toast.success('Usuário criado com sucesso')
            setIsAddingUser(false)
            setNewUser({ email: '', password: '', role: 'client' })
            fetchProfiles()
        } catch (error: any) {
            console.error('Error creating user:', error)
            toast.error(error.message)
        } finally {
            setUpdating(null)
        }
    }

    const handleDeleteUser = async () => {
        if (!userToDelete) return

        try {
            setUpdating(userToDelete)
            const response = await fetch('/api/admin/users', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: userToDelete }),
            })

            const data = await response.json()

            if (!response.ok) throw new Error(data.error || 'Erro ao excluir usuário')

            toast.success('Usuário excluído com sucesso')
            setProfiles(profiles.filter(p => p.id !== userToDelete))
        } catch (error: any) {
            console.error('Error deleting user:', error)
            toast.error(error.message)
        } finally {
            setUpdating(null)
            setDeleteDialogOpen(false)
            setUserToDelete(null)
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

            <div className="flex-1 p-6">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-8 flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Gerenciamento de Usuários</h1>
                            <p className="text-gray-600 mt-1">Gerencie permissões e acessos dos usuários</p>
                        </div>
                        <Button
                            onClick={() => setIsAddingUser(true)}
                            className="bg-[#1d9b9a] hover:bg-[#16807f] rounded-full"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Adicionar Usuário
                        </Button>
                    </div>

                    <Card className="shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold flex items-center">
                                <Users className="w-5 h-5 mr-2 text-[#1d9b9a]" />
                                Lista de Usuários
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Data de Cadastro</TableHead>
                                        <TableHead>Permissão</TableHead>
                                        <TableHead className="text-right">Ações</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {profiles.map((profile) => (
                                        <TableRow key={profile.id}>
                                            <TableCell className="font-medium">{profile.email}</TableCell>
                                            <TableCell>
                                                {new Date(profile.created_at).toLocaleDateString('pt-BR')}
                                            </TableCell>
                                            <TableCell>
                                                <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${profile.role === 'admin'
                                                        ? 'bg-purple-100 text-purple-800'
                                                        : 'bg-green-100 text-green-800'
                                                    }`}>
                                                    {profile.role === 'admin' ? (
                                                        <>
                                                            <Shield className="w-3 h-3 mr-1" />
                                                            Administrador
                                                        </>
                                                    ) : (
                                                        <>
                                                            <User className="w-3 h-3 mr-1" />
                                                            Cliente
                                                        </>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end space-x-2">
                                                    <Select
                                                        value={profile.role}
                                                        onValueChange={(value: 'admin' | 'client') => handleRoleChange(profile.id, value)}
                                                        disabled={updating === profile.id}
                                                    >
                                                        <SelectTrigger className="w-[140px]">
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="client">Cliente</SelectItem>
                                                            <SelectItem value="admin">Administrador</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => {
                                                            setUserToDelete(profile.id)
                                                            setDeleteDialogOpen(true)
                                                        }}
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
                        </CardContent>
                    </Card>

                    {/* Add User Dialog */}
                    <Dialog open={isAddingUser} onOpenChange={setIsAddingUser}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Adicionar Novo Usuário</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={newUser.email}
                                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                        placeholder="email@exemplo.com"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password">Senha</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={newUser.password}
                                        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                                        placeholder="******"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="role">Permissão</Label>
                                    <Select
                                        value={newUser.role}
                                        onValueChange={(value) => setNewUser({ ...newUser, role: value })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="client">Cliente</SelectItem>
                                            <SelectItem value="admin">Administrador</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button variant="outline" onClick={() => setIsAddingUser(false)}>Cancelar</Button>
                                <Button
                                    onClick={handleCreateUser}
                                    disabled={updating === 'creating'}
                                    className="bg-[#1d9b9a] hover:bg-[#16807f]"
                                >
                                    {updating === 'creating' ? 'Criando...' : 'Criar Usuário'}
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                    {/* Delete Confirmation Dialog */}
                    <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Tem certeza que deseja excluir este usuário? Esta ação não pode ser desfeita.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={handleDeleteUser}
                                    className="bg-red-600 hover:bg-red-700"
                                >
                                    Excluir
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
        </div>
    )
}
