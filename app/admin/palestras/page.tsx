
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Plus, Pencil, Trash2, Search, Filter, MoreVertical, Mic, Calendar, Clock, Users, MapPin, CheckCircle } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"

interface Lecture {
    id: string
    title: string
    description: string
    duration: string
    target_audience: string
    topics: string[]
    image_url: string
    is_active: boolean
}

export default function LecturesManagement() {
    const [lectures, setLectures] = useState<Lecture[]>([])
    const [loading, setLoading] = useState(true)
    const [editingLecture, setEditingLecture] = useState<Lecture | null>(null)
    const [isAddingNew, setIsAddingNew] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [lectureToDelete, setLectureToDelete] = useState<string | null>(null)
    const [searchTerm, setSearchTerm] = useState("")
    const [topicsInput, setTopicsInput] = useState("")
    const supabase = createClient()

    useEffect(() => {
        fetchLectures()
    }, [])

    const fetchLectures = async () => {
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from('lectures')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) throw error

            if (data) {
                setLectures(data)
            }
        } catch (error) {
            console.error('Error fetching lectures:', error)
            toast.error("Erro ao carregar palestras.")
        } finally {
            setLoading(false)
        }
    }

    const handleEditLecture = (lecture: Lecture) => {
        setEditingLecture({ ...lecture })
        setTopicsInput(lecture.topics ? lecture.topics.join(", ") : "")
    }

    const handleSaveLecture = async () => {
        if (editingLecture) {
            try {
                const topicsArray = topicsInput.split(",").map((t) => t.trim()).filter((t) => t !== "")

                const lectureData = {
                    title: editingLecture.title,
                    description: editingLecture.description,
                    duration: editingLecture.duration,
                    target_audience: editingLecture.target_audience,
                    topics: topicsArray,
                    image_url: editingLecture.image_url,
                    is_active: editingLecture.is_active
                }

                if (editingLecture.id) {
                    // Update existing lecture
                    const { error } = await supabase
                        .from('lectures')
                        .update(lectureData)
                        .eq('id', editingLecture.id)

                    if (error) throw error
                    toast.success("Palestra atualizada com sucesso!")
                } else {
                    // Add new lecture
                    const { error } = await supabase
                        .from('lectures')
                        .insert([lectureData])

                    if (error) throw error
                    toast.success("Palestra criada com sucesso!")
                }

                fetchLectures()
                setEditingLecture(null)
                setIsAddingNew(false)
            } catch (error) {
                console.error('Error saving lecture:', error)
                toast.error("Erro ao salvar palestra.")
            }
        }
    }

    const handleDeleteLecture = (lectureId: string) => {
        setLectureToDelete(lectureId)
        setDeleteDialogOpen(true)
    }

    const confirmDeleteLecture = async () => {
        if (lectureToDelete) {
            try {
                const { error } = await supabase
                    .from('lectures')
                    .delete()
                    .eq('id', lectureToDelete)

                if (error) throw error

                toast.success("Palestra excluída com sucesso!")
                fetchLectures()
            } catch (error) {
                console.error('Error deleting lecture:', error)
                toast.error("Erro ao excluir palestra.")
            } finally {
                setDeleteDialogOpen(false)
                setLectureToDelete(null)
            }
        }
    }

    const toggleLectureStatus = async (lectureId: string, currentStatus: boolean) => {
        try {
            const { error } = await supabase
                .from('lectures')
                .update({ is_active: !currentStatus })
                .eq('id', lectureId)

            if (error) throw error

            setLectures(lectures.map(l => l.id === lectureId ? { ...l, is_active: !currentStatus } : l))
            toast.success(`Palestra ${!currentStatus ? 'ativada' : 'desativada'} com sucesso!`)
        } catch (error) {
            console.error('Error updating lecture status:', error)
            toast.error("Erro ao atualizar status.")
        }
    }

    const filteredLectures = lectures.filter(
        (lecture) =>
            lecture.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lecture.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lecture.target_audience.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Gerenciar Palestras</h1>
                    <p className="text-muted-foreground">Adicione, edite ou remova palestras do catálogo.</p>
                </div>
                <Dialog
                    open={isAddingNew || !!editingLecture}
                    onOpenChange={(open) => {
                        if (!open) {
                            setIsAddingNew(false)
                            setEditingLecture(null)
                        }
                    }}
                >
                    <DialogTrigger asChild>
                        <Button
                            onClick={() => {
                                setEditingLecture({
                                    id: "",
                                    title: "",
                                    description: "",
                                    duration: "",
                                    target_audience: "",
                                    topics: [],
                                    image_url: "/placeholder.svg?height=300&width=400",
                                    is_active: true,
                                })
                                setTopicsInput("")
                                setIsAddingNew(true)
                            }}
                            className="bg-[#1d9b9a] hover:bg-[#16807f]"
                        >
                            <Plus className="mr-2 h-4 w-4" /> Nova Palestra
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>{isAddingNew ? "Adicionar Nova Palestra" : "Editar Palestra"}</DialogTitle>
                            <DialogDescription>
                                Preencha os detalhes da palestra abaixo. Clique em salvar quando terminar.
                            </DialogDescription>
                        </DialogHeader>
                        {editingLecture && (
                            <div className="grid gap-6 py-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="title">Título da Palestra</Label>
                                    <Input
                                        id="title"
                                        value={editingLecture.title}
                                        onChange={(e) => setEditingLecture({ ...editingLecture, title: e.target.value })}
                                        placeholder="Ex: Pais e Filhos: Construindo Pontes"
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="description">Descrição</Label>
                                    <Textarea
                                        id="description"
                                        value={editingLecture.description}
                                        onChange={(e) => setEditingLecture({ ...editingLecture, description: e.target.value })}
                                        placeholder="Breve descrição sobre o conteúdo da palestra..."
                                        rows={3}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="duration">Duração</Label>
                                        <Input
                                            id="duration"
                                            value={editingLecture.duration}
                                            onChange={(e) => setEditingLecture({ ...editingLecture, duration: e.target.value })}
                                            placeholder="Ex: 1h30"
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="target_audience">Público-Alvo</Label>
                                        <Input
                                            id="target_audience"
                                            value={editingLecture.target_audience}
                                            onChange={(e) => setEditingLecture({ ...editingLecture, target_audience: e.target.value })}
                                            placeholder="Ex: Pais, Educadores"
                                        />
                                    </div>
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="topics">Tópicos (separados por vírgula)</Label>
                                    <Textarea
                                        id="topics"
                                        value={topicsInput}
                                        onChange={(e) => setTopicsInput(e.target.value)}
                                        placeholder="Ex: Comunicação, Disciplina, Valores"
                                        rows={2}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="image_url">URL da Imagem</Label>
                                    <Input
                                        id="image_url"
                                        value={editingLecture.image_url}
                                        onChange={(e) => setEditingLecture({ ...editingLecture, image_url: e.target.value })}
                                        placeholder="https://..."
                                    />
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id="active"
                                        checked={editingLecture.is_active}
                                        onCheckedChange={(checked) => setEditingLecture({ ...editingLecture, is_active: checked })}
                                    />
                                    <Label htmlFor="active">Palestra Ativa (visível no site)</Label>
                                </div>
                            </div>
                        )}
                        <DialogFooter>
                            <Button variant="outline" onClick={() => {
                                setIsAddingNew(false)
                                setEditingLecture(null)
                            }}>
                                Cancelar
                            </Button>
                            <Button onClick={handleSaveLecture} className="bg-[#1d9b9a] hover:bg-[#16807f]">
                                Salvar Palestra
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardHeader className="pb-3">
                    <CardTitle>Palestras Cadastradas</CardTitle>
                    <CardDescription>Gerencie as palestras disponíveis para contratação.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="relative flex-1">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Buscar palestras..."
                                className="pl-8"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Button variant="outline" size="icon">
                            <Filter className="h-4 w-4" />
                        </Button>
                    </div>

                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Título</TableHead>
                                    <TableHead>Público</TableHead>
                                    <TableHead>Duração</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Ações</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center py-8">
                                            <div className="flex justify-center">
                                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1d9b9a]"></div>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : filteredLectures.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                            Nenhuma palestra encontrada.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredLectures.map((lecture) => (
                                        <TableRow key={lecture.id}>
                                            <TableCell className="font-medium">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded bg-gray-100 flex items-center justify-center overflow-hidden">
                                                        <Mic className="h-5 w-5 text-gray-500" />
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold">{lecture.title}</div>
                                                        <div className="text-xs text-muted-foreground truncate max-w-[200px]">
                                                            {lecture.description}
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>{lecture.target_audience}</TableCell>
                                            <TableCell>{lecture.duration}</TableCell>
                                            <TableCell>
                                                <Badge variant={lecture.is_active ? "default" : "secondary"} className={lecture.is_active ? "bg-green-500 hover:bg-green-600" : ""}>
                                                    {lecture.is_active ? "Ativa" : "Inativa"}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon">
                                                            <MoreVertical className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                                        <DropdownMenuItem onClick={() => handleEditLecture(lecture)}>
                                                            <Pencil className="mr-2 h-4 w-4" /> Editar
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => toggleLectureStatus(lecture.id, lecture.is_active)}>
                                                            {lecture.is_active ? (
                                                                <>
                                                                    <CheckCircle className="mr-2 h-4 w-4" /> Desativar
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <CheckCircle className="mr-2 h-4 w-4" /> Ativar
                                                                </>
                                                            )}
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem
                                                            className="text-red-600 focus:text-red-600"
                                                            onClick={() => handleDeleteLecture(lecture.id)}
                                                        >
                                                            <Trash2 className="mr-2 h-4 w-4" /> Excluir
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Esta ação não pode ser desfeita. Isso excluirá permanentemente a palestra
                            e removerá seus dados de nossos servidores.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={confirmDeleteLecture}
                            className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
                        >
                            Excluir
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
