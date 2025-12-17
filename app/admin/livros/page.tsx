'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import AdminNav from '@/components/admin-nav'
import { createClient } from '@/lib/supabase/client'
import {
  Edit,
  Save,
  X,
  Plus,
  Trash2,
  Star,
  Upload,
  ArrowUp,
  ArrowDown
} from 'lucide-react'
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
import { toast } from 'sonner'

interface Book {
  id: string
  title: string
  description: string
  price: number
  stock: number
  sold: number
  isActive: boolean
  category: string
  rating: number
  imageUrl: string
  features: string[]
  display_order: number
}

export default function BookManagement() {
  const [books, setBooks] = useState<Book[]>([])
  const [editingBook, setEditingBook] = useState<Book | null>(null)
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [bookToDelete, setBookToDelete] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    fetchBooks()
  }, [])

  const fetchBooks = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('books')
        .select('*')
        .order('display_order', { ascending: true })

      if (error) throw error

      setBooks(data.map((book: any) => ({
        id: book.id,
        title: book.title,
        description: book.description || '',
        price: book.price,
        stock: book.stock,
        sold: book.sold,
        isActive: book.is_active,
        category: book.category || '',
        rating: book.rating || 0,
        imageUrl: book.image_url || '',
        features: book.features || [],
        display_order: book.display_order || 0
      })))
    } catch (error) {
      console.error('Error fetching books:', error)
      toast.error('Erro ao carregar livros')
    } finally {
      setLoading(false)
    }
  }

  const handleEditBook = (book: Book) => {
    setEditingBook({ ...book })
  }

  const handleSaveBook = async () => {
    if (editingBook) {
      try {
        const bookData = {
          title: editingBook.title,
          description: editingBook.description,
          price: editingBook.price,
          stock: editingBook.stock,
          sold: editingBook.sold,
          is_active: editingBook.isActive,
          category: editingBook.category,
          rating: editingBook.rating,
          image_url: editingBook.imageUrl,
          features: editingBook.features
        }

        if (editingBook.id && !isAddingNew) { // Check for isAddingNew to differentiate between editing an existing book and saving a new one
          // Update existing book
          const { error } = await supabase
            .from('books')
            .update(bookData)
            .eq('id', editingBook.id)

          if (error) throw error
          toast.success('Livro atualizado com sucesso')
        } else {
          // Add new book
          const { error } = await supabase
            .from('books')
            .insert([bookData])

          if (error) throw error
          toast.success('Livro criado com sucesso')
        }

        fetchBooks()
        setEditingBook(null)
        setIsAddingNew(false)
      } catch (error) {
        console.error('Error saving book:', error)
        toast.error('Erro ao salvar livro')
      }
    }
  }

  const handleDeleteBook = (bookId: string) => {
    setBookToDelete(bookId)
    setDeleteDialogOpen(true)
  }

  const confirmDeleteBook = async () => {
    if (bookToDelete) {
      try {
        const { error } = await supabase
          .from('books')
          .delete()
          .eq('id', bookToDelete)

        if (error) throw error

        toast.success('Livro excluído com sucesso')
        fetchBooks()
      } catch (error) {
        console.error('Error deleting book:', error)
        toast.error('Erro ao excluir livro')
      } finally {
        setDeleteDialogOpen(false)
        setBookToDelete(null)
      }
    }
  }

  const handleAddNewBook = () => {
    setEditingBook({
      id: '',
      title: '',
      description: '',
      price: 0,
      stock: 0,
      sold: 0, // Initialize sold for new books
      isActive: true,
      category: '',
      rating: 0,
      imageUrl: '',
      features: [],
      display_order: 0
    })
    setIsAddingNew(true)
  }

  const addFeature = (feature: string) => {
    if (editingBook && feature.trim()) {
      setEditingBook({
        ...editingBook,
        features: [...editingBook.features, feature.trim()]
      })
    }
  }

  const removeFeature = (index: number) => {
    if (editingBook) {
      setEditingBook({
        ...editingBook,
        features: editingBook.features.filter((_, i) => i !== index)
      })
    }
  }

  const toggleBookStatus = async (book: Book, checked: boolean) => {
    try {
      const { error } = await supabase
        .from('books')
        .update({ is_active: checked })
        .eq('id', book.id)

      if (error) throw error

      // Optimistic update
      setBooks(books.map(b => b.id === book.id ? { ...b, isActive: checked } : b))
      toast.success('Status atualizado')
    } catch (error) {
      console.error('Error updating status:', error)
      toast.error('Erro ao atualizar status')
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true)

      if (!e.target.files || e.target.files.length === 0) {
        throw new Error('Você deve selecionar uma imagem para fazer upload.')
      }

      const file = e.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('book-covers')
        .upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      const { data } = supabase.storage.from('book-covers').getPublicUrl(filePath)

      if (editingBook) {
        setEditingBook({ ...editingBook, imageUrl: data.publicUrl })
      }

      toast.success('Imagem enviada com sucesso!')
    } catch (error: any) {
      console.error('Error uploading image:', error)
      toast.error(error.message || 'Erro ao fazer upload da imagem')
    } finally {
      setUploading(false)
    }
  }

  const moveBook = async (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === books.length - 1)
    ) {
      return
    }

    const newBooks = [...books]
    const targetIndex = direction === 'up' ? index - 1 : index + 1

    // Swap items
    const temp = newBooks[index]
    newBooks[index] = newBooks[targetIndex]
    newBooks[targetIndex] = temp

    // Update display_order based on new array index
    const updates = newBooks.map((book, idx) => ({
      id: book.id,
      display_order: idx
    }))

    // Optimistic update
    setBooks(newBooks)

    try {
      // Update all affected books
      for (const update of updates) {
        const { error } = await supabase
          .from('books')
          .update({ display_order: update.display_order })
          .eq('id', update.id)

        if (error) throw error
      }
    } catch (error) {
      console.error('Error reordering books:', error)
      toast.error('Erro ao reordenar livros')
      // Revert on error (would need to re-fetch or keep previous state)
      fetchBooks()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminNav />

      <div className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Gerenciamento de Livros</h1>
              <p className="text-gray-600 mt-1">Gerencie o catálogo de livros, preços e estoque</p>
            </div>
            <Button
              onClick={handleAddNewBook}
              className="bg-[#1d9b9a] hover:bg-[#16807f] rounded-full"
            >
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Livro
            </Button>
          </div>

          {/* Books Grid */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1d9b9a]"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {books.map((book) => (
                <Card key={book.id} className="shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-lg font-semibold text-gray-900 leading-tight">
                          {book.title}
                        </CardTitle>
                        <p className="text-sm text-gray-600 mt-1">{book.category}</p>
                      </div>
                      <div className="flex items-center space-x-1 ml-2">
                        <div className="flex flex-col mr-2">
                          <button
                            onClick={() => moveBook(books.indexOf(book), 'up')}
                            className="text-gray-400 hover:text-[#1d9b9a] disabled:opacity-30"
                            disabled={books.indexOf(book) === 0}
                          >
                            <ArrowUp className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => moveBook(books.indexOf(book), 'down')}
                            className="text-gray-400 hover:text-[#1d9b9a] disabled:opacity-30"
                            disabled={books.indexOf(book) === books.length - 1}
                          >
                            <ArrowDown className="w-4 h-4" />
                          </button>
                        </div>
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{book.rating}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Preço:</span>
                        <span className="font-semibold text-gray-900">R$ {book.price.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Estoque:</span>
                        <span className={`font-semibold ${book.stock < 10 ? 'text-red-600' : 'text-green-600'}`}>
                          {book.stock} unidades
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Vendidos:</span>
                        <span className="font-semibold text-blue-600">{book.sold}</span>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t">
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={book.isActive}
                            onCheckedChange={(checked) => toggleBookStatus(book, checked)}
                          />
                          <span className="text-sm text-gray-600">
                            {book.isActive ? 'Ativo' : 'Inativo'}
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditBook(book)}
                            className="rounded-full border-[#1d9b9a] text-[#1d9b9a] hover:bg-[#1d9b9a] hover:text-white"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteBook(book.id)}
                            className="rounded-full border-red-300 text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Edit/Add Book Modal */}
          {editingBook && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">
                    {isAddingNew ? 'Adicionar Novo Livro' : 'Editar Livro'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Título do Livro</Label>
                        <Input
                          id="title"
                          value={editingBook.title}
                          onChange={(e) => setEditingBook({ ...editingBook, title: e.target.value })}
                          placeholder="Digite o título do livro"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category">Categoria</Label>
                        <Input
                          id="category"
                          value={editingBook.category}
                          onChange={(e) => setEditingBook({ ...editingBook, category: e.target.value })}
                          placeholder="Ex: Guia Completo, Poesia"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Descrição</Label>
                      <Textarea
                        id="description"
                        value={editingBook.description}
                        onChange={(e) => setEditingBook({ ...editingBook, description: e.target.value })}
                        placeholder="Descrição do livro"
                        rows={3}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="price">Preço (R$)</Label>
                        <Input
                          id="price"
                          type="number"
                          step="0.01"
                          value={editingBook.price}
                          onChange={(e) => setEditingBook({ ...editingBook, price: parseFloat(e.target.value) || 0 })}
                          placeholder="0.00"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="stock">Estoque</Label>
                        <Input
                          id="stock"
                          type="number"
                          value={editingBook.stock}
                          onChange={(e) => setEditingBook({ ...editingBook, stock: parseInt(e.target.value) || 0 })}
                          placeholder="0"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="rating">Avaliação</Label>
                        <Input
                          id="rating"
                          type="number"
                          step="0.1"
                          min="0"
                          max="5"
                          value={editingBook.rating}
                          onChange={(e) => setEditingBook({ ...editingBook, rating: parseFloat(e.target.value) || 0 })}
                          placeholder="0.0"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="image">Capa do Livro</Label>
                      <div className="flex items-center gap-4">
                        {editingBook.imageUrl && (
                          <div className="relative w-20 h-28 rounded-md overflow-hidden border">
                            <img
                              src={editingBook.imageUrl}
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1">
                          <Label
                            htmlFor="image-upload"
                            className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <Upload className="w-8 h-8 mb-2 text-gray-400" />
                              <p className="text-sm text-gray-500">
                                {uploading ? 'Enviando...' : 'Clique para fazer upload'}
                              </p>
                            </div>
                            <Input
                              id="image-upload"
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleImageUpload}
                              disabled={uploading}
                            />
                          </Label>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Características do Livro</Label>
                      <div className="flex space-x-2 mb-2">
                        <Input
                          placeholder="Adicionar característica"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault()
                              addFeature((e.target as HTMLInputElement).value)
                                ; (e.target as HTMLInputElement).value = ''
                            }
                          }}
                        />
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {editingBook.features.map((feature, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-[#1d9b9a] text-white"
                          >
                            {feature}
                            <button
                              onClick={() => removeFeature(index)}
                              className="ml-2 text-white hover:text-gray-200"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={editingBook.isActive}
                        onCheckedChange={(checked) => setEditingBook({ ...editingBook, isActive: checked })}
                      />
                      <Label>Livro Ativo</Label>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3 mt-6">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setEditingBook(null)
                        setIsAddingNew(false)
                      }}
                      className="rounded-full"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancelar
                    </Button>
                    <Button
                      onClick={handleSaveBook}
                      className="bg-[#1d9b9a] hover:bg-[#16807f] rounded-full"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Salvar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Delete Confirmation Dialog */}
          <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
                <AlertDialogDescription>
                  Tem certeza que deseja excluir este livro? Esta ação não pode ser desfeita.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="rounded-full">Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  onClick={confirmDeleteBook}
                  className="bg-red-600 hover:bg-red-700 rounded-full"
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