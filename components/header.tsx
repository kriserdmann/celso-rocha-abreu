"use client"

import { useState } from "react"
import Link from "next/link"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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
            <div className="w-10 h-10 md:w-12 md:h-12 bg-[#1d9b9a] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg md:text-xl">CR</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg md:text-xl font-bold text-gray-900">Celso Rocha</h1>
              <p className="text-xs md:text-sm text-gray-600">Método OOBA</p>
            </div>
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
          <div className="hidden lg:block">
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
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
