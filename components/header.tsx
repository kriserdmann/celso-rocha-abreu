"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useCart } from "@/context/cart-context"
import { ShoppingCart } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { items } = useCart()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const navLinks = [
    { href: "/quem-sou", label: "Quem Sou" },
    { href: "/metodo-ooba", label: "Método OOBA" },
    { href: "/palestras", label: "Palestras" },
    { href: "/livros", label: "Livros" },
    { href: "/contato", label: "Contato" },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/images/logo-celso.png"
              alt="Celso Rocha de Abreu"
              width={180}
              height={50}
              className="h-10 md:h-12 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-[#1d9b9a] font-medium transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#1d9b9a] transition-all duration-200 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* CTA Button Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link href="/checkout" className="relative p-2 text-gray-700 hover:text-[#1d9b9a] transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {items.length > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                  {items.length}
                </span>
              )}
            </Link>
            <Link href="/agendar-palestra" className="bg-[#1d9b9a] hover:bg-[#16807f] text-white px-6 py-2 rounded-full font-semibold inline-block">
              Agendar Palestra
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 text-gray-700 hover:text-[#1d9b9a] transition-colors"
            aria-label="Toggle menu"
          >
            <span className="text-sm font-medium">{isMenuOpen ? "Close" : "Menu"}</span>
          </button
          >
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 py-4">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-700 hover:text-[#1d9b9a] font-medium transition-colors duration-200 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-100">
                <Link
                  href="/agendar-palestra"
                  className="w-full block text-center bg-[#1d9b9a] hover:bg-[#16807f] text-white py-2 rounded-full font-semibold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Agendar Palestra
                </Link>
                <Link
                  href="/checkout"
                  className="w-full mt-4 flex items-center justify-center space-x-2 text-gray-700 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Carrinho ({items.length})</span>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
