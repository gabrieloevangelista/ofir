"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { MapPin, Building2, ArrowRight, Star, Lock, MessageCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { formatValorMetroQuadrado, formatLocalizacao, getObraPadrao, formatPadraoLabel, cn } from "@/lib/utils"
import type { ObraWithConstrutora } from "@/types/obra"
import { useAuth } from "@/contexts/auth-context"
import { ContactDialog } from "./contact-dialog"

export function ObraCard({
  obra,
  priority = false,
}: {
  obra: ObraWithConstrutora
  priority?: boolean
  modoExibicao?: "grid" | "lista"
}) {
  const { isAuthenticated } = useAuth()
  const [contactOpen, setContactOpen] = useState(false)

  const logoUrl =
    obra.construtoras?.logo_url ||
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%231e293b'/><path d='M30 70V30H50C61 30 61 50 50 50H30M50 50L70 70' stroke='%23ea580c' stroke-width='8' fill='none'/></svg>"
  const empresaNome = obra.construtoras?.nome || obra.nome
  const padrao = getObraPadrao(obra.preco_a_partir)

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setContactOpen(true)
  }

  return (
    <>
      <Link
        href={`/sup/${obra.slug}`}
        className="group/link block h-full focus-visible:outline-none"
      >
        <article className="flex h-full flex-col overflow-hidden rounded-xl bg-card border border-border shadow-xs transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-primary/50 focus-visible:ring-2 focus-visible:ring-ring">
          {/* Cover Image Container */}
          <div className="relative aspect-[16/10] overflow-hidden bg-muted">
            {obra.cover_image_url ? (
              <Image
                src={obra.cover_image_url}
                alt={empresaNome}
                fill
                priority={priority}
                sizes="(min-width: 1280px) 25vw, (min-width: 640px) 45vw, 90vw"
                className="object-cover transition-transform duration-500 ease-out group-hover/link:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                <Building2 className="size-10" />
              </div>
            )}

            {/* Standard badge top right */}
            <div className="absolute top-3 right-3 z-10">
              <span className="inline-flex items-center rounded-md bg-background/90 backdrop-blur-xs px-2.5 py-1 text-xs font-semibold text-foreground shadow-xs border border-border/50">
                {formatPadraoLabel(padrao)}
              </span>
            </div>
          </div>

          {/* Firm Profile Header with Logo Avatar */}
          <div className="p-5 pb-0">
            <div className="flex items-start gap-3.5">
              <div className="relative size-12 rounded-lg border border-border bg-card overflow-hidden shrink-0 shadow-sm -mt-9 z-10">
                <Image
                  src={logoUrl}
                  alt={empresaNome}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <h3 className="font-heading text-base sm:text-lg font-bold text-foreground truncate group-hover/link:text-primary transition-colors leading-tight">
                  {empresaNome}
                </h3>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="size-3 text-primary shrink-0" />
                    <span className="truncate">{formatLocalizacao(obra.cidade, obra.estado)}</span>
                  </span>

                  {obra.supplier_rating && (
                    <span className="flex items-center gap-1 font-semibold text-foreground">
                      <Star className="size-3 fill-amber-500 text-amber-500 shrink-0" />
                      <span>{obra.supplier_rating.score.toFixed(1)}</span>
                      <span className="font-normal text-muted-foreground">({obra.supplier_rating.count})</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Description & Tags Container */}
          <div className="flex flex-1 flex-col justify-between p-5 pt-3 gap-4">
            <p className="line-clamp-2 text-sm text-muted-foreground leading-relaxed">
              {obra.descricao_curta}
            </p>

            {/* Tags */}
            {obra.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {obra.tags.slice(0, 3).map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="text-xs font-medium text-muted-foreground bg-secondary/70 hover:bg-secondary rounded-md px-2 py-0.5 border border-border/40"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Pricing & CTA Row */}
            <div className="pt-3 border-t border-border/70 flex items-center justify-between gap-3">
              <div>
                <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider block">
                  Custo Médio / m²:
                </span>
                <div className="relative group inline-block mt-0.5">
                  <span
                    className={cn(
                      "font-heading text-lg sm:text-xl font-bold text-foreground whitespace-nowrap block leading-tight select-none transition-all",
                      !isAuthenticated && "blur-[5px]"
                    )}
                  >
                    {formatValorMetroQuadrado(obra.preco_a_partir)}
                  </span>
                  {!isAuthenticated && (
                    <div className="absolute inset-0 flex items-center justify-start">
                      <span className="text-xs font-semibold text-primary bg-background/90 px-1.5 py-0.5 rounded flex items-center gap-1 shadow-xs border border-primary/20">
                        <Lock className="size-3" /> Login para ver
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons: Contatar & Detalhes */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleContactClick}
                  title="Contatar fornecedor diretamente"
                  className="inline-flex items-center gap-1.5 h-9 px-3 rounded-lg bg-secondary hover:bg-primary/10 text-foreground hover:text-primary border border-border/80 text-xs font-semibold transition-all shadow-xs"
                >
                  <MessageCircle className="size-3.5 text-primary" />
                  <span>Contatar</span>
                </button>

                <div
                  title="Ver perfil completo"
                  className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-xs group-hover/link:translate-x-0.5 transition-transform shrink-0"
                >
                  <ArrowRight className="size-4" />
                </div>
              </div>
            </div>
          </div>
        </article>
      </Link>

      <ContactDialog
        obra={obra}
        open={contactOpen}
        onOpenChange={setContactOpen}
      />
    </>
  )
}
