import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 border-t border-gray-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-8 pt-8">
          <div className="text-center md:text-left">
            <h3 className="text-3xl font-black mb-4 text-[#1d9b9a] tracking-widest uppercase">
              Celso Rocha de Abreu
            </h3>
            <p className="text-gray-400 text-lg font-light leading-relaxed">
              Escritor, palestrante e criador do Método OOBA.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center md:justify-end items-center">
            <Link
              href="/palestras"
              className="text-gray-300 hover:text-white transition-colors font-medium tracking-wide"
            >
              Palestras
            </Link>
            <Link
              href="/quem-sou"
              className="text-gray-300 hover:text-white transition-colors font-medium tracking-wide"
            >
              Sobre o Celso
            </Link>
            <Link
              href="/livros"
              className="text-gray-300 hover:text-white transition-colors font-medium tracking-wide"
            >
              Livros
            </Link>

            <Button
              asChild
              className="bg-transparent border border-white text-white hover:bg-white hover:text-gray-900 mt-4 sm:mt-0 rounded-sm px-8 font-bold tracking-wide"
            >
              <Link href="/familia">SOLUÇÕES PARA FAMÍLIAS</Link>
            </Button>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm font-light uppercase tracking-widest">
          <p>© {new Date().getFullYear()} Celso Rocha de Abreu. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
