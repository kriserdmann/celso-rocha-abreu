'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'sonner'

export interface CartItem {
    id: string
    title: string
    price: number
    quantity: number
    imageUrl: string
}

interface CartContextType {
    items: CartItem[]
    addItem: (item: Omit<CartItem, 'quantity'>) => void
    removeItem: (id: string) => void
    updateQuantity: (id: string, quantity: number) => void
    clearCart: () => void
    total: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([])

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('cart')
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart))
            } catch (e) {
                console.error('Failed to parse cart from localStorage', e)
            }
        }
    }, [])

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(items))
    }, [items])

    const addItem = React.useCallback((newItem: Omit<CartItem, 'quantity'>) => {
        setItems((currentItems) => {
            const existingItem = currentItems.find((item) => item.id === newItem.id)

            if (existingItem) {
                toast.success('Quantidade atualizada no carrinho')
                return currentItems.map((item) =>
                    item.id === newItem.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            }

            toast.success('Livro adicionado ao carrinho')
            return [...currentItems, { ...newItem, quantity: 1 }]
        })
    }, [])

    const removeItem = React.useCallback((id: string) => {
        setItems((currentItems) => currentItems.filter((item) => item.id !== id))
        toast.success('Item removido do carrinho')
    }, [])

    const updateQuantity = React.useCallback((id: string, quantity: number) => {
        if (quantity < 1) {
            removeItem(id)
            return
        }

        setItems((currentItems) =>
            currentItems.map((item) =>
                item.id === id ? { ...item, quantity } : item
            )
        )
    }, [removeItem])

    const clearCart = React.useCallback(() => {
        setItems([])
        localStorage.removeItem('cart')
    }, [])

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

    return (
        <CartContext.Provider
            value={{
                items,
                addItem,
                removeItem,
                updateQuantity,
                clearCart,
                total,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider')
    }
    return context
}
