import { ReactNode } from "react"
import Image from "next/image"

export interface HeroProps {
  badgeIcon?: ReactNode
  badgeText?: string
  title: ReactNode
  description: ReactNode
  buttons?: ReactNode
  image: {
    src: string
    alt: string
    width: number
    height: number
    className?: string
  }
  children?: ReactNode
}

export function Hero({ badgeIcon, badgeText, title, description, buttons, image, children }: HeroProps) {
  return (
    <section 
      className="relative bg-gradient-to-br from-[#1d9b9a] to-[#16807f] text-white overflow-hidden flex items-center"
      style={{ minHeight: "100svh", paddingTop: "80px" }}
    >
      {/* Decorativo de fundo idêntico à home */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 70% 50%, white 1px, transparent 1px)", backgroundSize: "32px 32px" }}></div>

      <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10 w-full">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          <div className="space-y-4 lg:space-y-6">
            {(badgeIcon || badgeText) && (
              <div className="flex items-center gap-2 lg:gap-3">
                {badgeIcon && (
                  <div className="w-9 h-9 lg:w-12 lg:h-12 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                    {badgeIcon}
                  </div>
                )}
                {badgeText && (
                  <span className="text-white/90 font-semibold text-xs sm:text-sm lg:text-base tracking-widest uppercase">
                    {badgeText}
                  </span>
                )}
              </div>
            )}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight tracking-tight uppercase">
              {title}
            </h1>
            <p className="text-base sm:text-lg lg:text-2xl font-bold text-white/90 leading-snug">
              {description}
            </p>
            {buttons && (
              <div className="pt-1 lg:pt-2 flex flex-col sm:flex-row gap-4">
                {buttons}
              </div>
            )}
          </div>

          {/* Imagem quadrada e escondida em telas menores, como na Home */}
          <div className="hidden md:block relative">
            <div className="absolute -inset-4 bg-white/10 rounded-2xl blur-xl"></div>
            <div className="relative aspect-square w-full max-w-[460px] mx-auto lg:ml-auto lg:mr-0 overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className={`object-cover object-top ${image.className || ''}`.trim()}
                priority
              />
            </div>
            {children}
          </div>
        </div>
      </div>
    </section>
  )
}
