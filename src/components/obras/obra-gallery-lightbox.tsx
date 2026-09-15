"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import {
  X,
  CaretLeft,
  CaretRight,
  Images,
  MagnifyingGlassPlus,
  ArrowsOut,
} from "@phosphor-icons/react"
import { cn } from "@/lib/utils"

interface ObraGalleryLightboxProps {
  images: string[]
  title: string
  className?: string
}

export function ObraGalleryLightbox({
  images,
  title,
  className,
}: ObraGalleryLightboxProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!images || images.length === 0) return null

  const openLightbox = (index: number) => {
    setCurrentIndex(index)
    setIsOpen(true)
  }

  const closeLightbox = () => {
    setIsOpen(false)
  }

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }, [images.length])

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }, [images.length])

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = originalOverflow
      }
    }
  }, [isOpen])

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox()
      if (e.key === "ArrowLeft") handlePrev()
      if (e.key === "ArrowRight") handleNext()
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [isOpen, handleNext, handlePrev])

  return (
    <>
      {/* 1. Page Gallery Layout */}
      <div
        className={cn(
          "relative mb-8 grid grid-cols-1 gap-2 overflow-hidden border border-border bg-muted/20 sm:grid-cols-4 sm:grid-rows-2 h-[280px] sm:h-[380px] group/gallery",
          className
        )}
      >
        {/* Main/Featured Image */}
        <div
          onClick={() => openLightbox(0)}
          className={cn(
            "relative h-full w-full cursor-pointer overflow-hidden group/item",
            images.length === 1
              ? "sm:col-span-4 sm:row-span-2"
              : "sm:col-span-2 sm:row-span-2"
          )}
        >
          <Image
            src={images[0]}
            alt={`${title} - Foto Principal`}
            fill
            priority
            sizes="(min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover/item:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover/item:bg-black/20 transition-colors flex items-center justify-center">
            <span className="opacity-0 group-hover/item:opacity-100 transition-opacity flex items-center gap-1.5 px-3 py-1.5 bg-black/60 text-white text-xs font-semibold backdrop-blur-sm">
              <MagnifyingGlassPlus className="size-4" weight="bold" />
              Ampliar
            </span>
          </div>
        </div>

        {/* Secondary Images (up to 2 visible on desktop) */}
        {images.slice(1, 3).map((url, idx) => {
          const imageIndex = idx + 1
          const isLastThumb = idx === 1 || images.length === 2

          return (
            <div
              key={url}
              onClick={() => openLightbox(imageIndex)}
              className="relative h-full w-full hidden sm:block sm:col-span-2 cursor-pointer overflow-hidden group/item"
            >
              <Image
                src={url}
                alt={`${title} - Foto ${imageIndex + 1}`}
                fill
                sizes="50vw"
                className="object-cover transition-transform duration-500 group-hover/item:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover/item:bg-black/20 transition-colors flex items-center justify-center">
                <span className="opacity-0 group-hover/item:opacity-100 transition-opacity flex items-center gap-1.5 px-3 py-1.5 bg-black/60 text-white text-xs font-semibold backdrop-blur-sm">
                  <MagnifyingGlassPlus className="size-4" weight="bold" />
                  Ampliar
                </span>
              </div>
            </div>
          )
        })}

        {/* View All Photos Floating Badge Button */}
        <button
          type="button"
          onClick={() => openLightbox(0)}
          className="absolute bottom-3 right-3 z-10 inline-flex items-center gap-2 border border-border/80 bg-background/90 hover:bg-background px-3.5 py-2 text-xs font-semibold text-foreground shadow-md backdrop-blur-md transition-all hover:scale-105 active:scale-95"
        >
          <Images className="size-4 text-primary" weight="bold" />
          <span>
            {images.length > 1 ? `Ver todas as fotos (${images.length})` : "Ver foto ampliada"}
          </span>
        </button>
      </div>

      {/* 2. Fullscreen Lightbox Modal */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex flex-col bg-black/95 text-white backdrop-blur-md animate-in fade-in duration-200"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between px-4 py-3 sm:px-6 border-b border-white/10 shrink-0 bg-black/40">
            <div className="flex items-center gap-3 min-w-0">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary/20 px-2.5 py-1 border border-primary/30">
                <Images className="size-3.5" weight="bold" />
                <span>Galeria</span>
              </span>
              <h2 className="text-sm sm:text-base font-bold text-white truncate max-w-[200px] sm:max-w-md md:max-w-xl">
                {title}
              </h2>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs font-medium text-white/70 tracking-wider">
                {currentIndex + 1} de {images.length}
              </span>
              <button
                type="button"
                onClick={closeLightbox}
                title="Fechar (Esc)"
                className="flex size-9 items-center justify-center bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="size-5" weight="bold" />
              </button>
            </div>
          </div>

          {/* Center Viewing Stage */}
          <div className="relative flex-1 flex items-center justify-center p-4 sm:p-8 min-h-0 overflow-hidden">
            {/* Prev Arrow */}
            {images.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  handlePrev()
                }}
                title="Foto Anterior (Seta Esquerda)"
                className="absolute left-2 sm:left-6 z-20 flex size-10 sm:size-12 items-center justify-center bg-black/60 hover:bg-black/80 text-white/90 hover:text-white border border-white/20 transition-all hover:scale-110 active:scale-95 shadow-lg"
              >
                <CaretLeft className="size-6" weight="bold" />
              </button>
            )}

            {/* Active Image */}
            <div
              className="relative max-h-full max-w-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                key={images[currentIndex]}
                src={images[currentIndex]}
                alt={`${title} - Foto ${currentIndex + 1}`}
                className="max-h-[70vh] sm:max-h-[75vh] max-w-[92vw] sm:max-w-[85vw] object-contain select-none animate-in fade-in zoom-in-95 duration-200 shadow-2xl border border-white/10"
              />
            </div>

            {/* Next Arrow */}
            {images.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  handleNext()
                }}
                title="Próxima Foto (Seta Direita)"
                className="absolute right-2 sm:right-6 z-20 flex size-10 sm:size-12 items-center justify-center bg-black/60 hover:bg-black/80 text-white/90 hover:text-white border border-white/20 transition-all hover:scale-110 active:scale-95 shadow-lg"
              >
                <CaretRight className="size-6" weight="bold" />
              </button>
            )}
          </div>

          {/* Bottom Thumbnails Strip */}
          {images.length > 1 && (
            <div className="shrink-0 border-t border-white/10 bg-black/60 px-4 py-3">
              <div className="mx-auto flex max-w-4xl items-center justify-center gap-2 overflow-x-auto py-1 scrollbar-none">
                {images.map((url, i) => {
                  const isActive = i === currentIndex
                  return (
                    <button
                      key={url}
                      type="button"
                      onClick={() => setCurrentIndex(i)}
                      className={cn(
                        "relative size-14 sm:size-16 shrink-0 overflow-hidden transition-all duration-200 border-2",
                        isActive
                          ? "border-primary scale-105 opacity-100 shadow-md ring-2 ring-primary/40"
                          : "border-white/20 opacity-50 hover:opacity-90 hover:border-white/50"
                      )}
                    >
                      <Image
                        src={url}
                        alt={`Miniatura ${i + 1}`}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}
