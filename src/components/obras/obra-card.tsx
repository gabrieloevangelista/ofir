"use client"

import Image from "next/image"
import Link from "next/link"
import { MapPin, Building2, Wallet, ArrowRight, Star, Lock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { formatValorMetroQuadrado, formatLocalizacao, cn } from "@/lib/utils"
import type { ObraWithConstrutora } from "@/types/obra"
import { useAuth } from "@/contexts/auth-context"

export function ObraCard({
  obra,
  priority = false,
  modoExibicao = "grid",
}: {
  obra: ObraWithConstrutora
  priority?: boolean
  modoExibicao?: "grid" | "lista"
}) {
  const { isAuthenticated } = useAuth()
  const logoUrl = obra.construtoras?.logo_url || "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%230f172a'/><path d='M25 75V25L50 45L75 25V75' stroke='%23f59e0b' stroke-width='7' fill='none'/></svg>"
  const empresaNome = obra.construtoras?.nome || obra.nome

  if (modoExibicao === "lista") {
    return (
      <Link
        href={`/obras/${obra.slug}`}
        className="group/link block h-full focus-visible:outline-none"
      >
        <article className="flex flex-col sm:flex-row overflow-hidden rounded-none bg-card border border-border shadow-none transition-all duration-200 hover:border-primary focus-visible:ring-2 focus-visible:ring-ring">
          {/* Cover Image Container */}
          <div className="relative aspect-[16/10] sm:aspect-auto sm:w-72 sm:shrink-0 overflow-hidden bg-muted rounded-none">
            {obra.cover_image_url ? (
              <Image
                src={obra.cover_image_url}
                alt={empresaNome}
                fill
                priority={priority}
                sizes="(min-width: 640px) 300px, 100vw"
                className="object-cover transition-transform duration-500 ease-out group-hover/link:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                <Building2 className="size-8" />
              </div>
            )}
          </div>

          {/* Details Container */}
          <div className="flex flex-1 flex-col justify-between p-5 gap-4">
            <div className="space-y-3">
              {/* Profile Header */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative size-10 rounded-none border border-border bg-card overflow-hidden shrink-0 shadow-sm">
                    <Image
                      src={logoUrl}
                      alt={empresaNome}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <h3 className="font-heading text-base font-bold text-foreground truncate group-hover/link:text-primary transition-colors min-w-0 leading-tight">
                      {empresaNome}
                    </h3>
                    {obra.supplier_rating && (
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="size-3 fill-primary text-primary" />
                        <span className="text-[11px] font-bold text-foreground">{obra.supplier_rating.score.toFixed(1)}</span>
                        <span className="text-[10px] text-muted-foreground font-medium">({obra.supplier_rating.count} avaliações)</span>
                      </div>
                    )}
                  </div>
                </div>

                <span className="flex items-center gap-1 shrink-0 bg-secondary/50 px-2.5 py-1 border border-border/50 text-[11px] text-muted-foreground">
                  <MapPin className="size-3 shrink-0 text-primary" />
                  <span className="whitespace-nowrap font-medium text-foreground">{formatLocalizacao(obra.cidade, obra.estado)}</span>
                </span>
              </div>

              <p className="line-clamp-2 text-xs text-muted-foreground leading-relaxed max-w-3xl">
                {obra.descricao_longa ?? obra.descricao_curta}
              </p>
            </div>

            {/* Bottom Row: Tags & Price/m² */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-border/50">
              {obra.tags.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {obra.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-[10px] font-medium text-muted-foreground bg-secondary/60 rounded-none">
                      {tag}
                    </Badge>
                  ))}
                </div>
              ) : <div />}

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="text-[10px] text-muted-foreground uppercase font-semibold block">
                    Custo Médio / m²:
                  </span>
                  <div className="relative group inline-block">
                    <span className={cn(
                      "font-heading text-lg font-bold text-muted-foreground whitespace-nowrap block leading-tight select-none transition-all",
                      !isAuthenticated && "blur-[4px]"
                    )}>
                      {formatValorMetroQuadrado(obra.preco_a_partir)}
                    </span>
                    {!isAuthenticated && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-primary bg-background/80 px-1 rounded-sm flex items-center gap-0.5">
                          <Lock className="size-2.5" /> Login
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="hidden sm:flex size-8 items-center justify-center bg-primary text-primary-foreground font-bold rounded-none group-hover/link:translate-x-0.5 transition-transform">
                  <ArrowRight className="size-4" />
                </div>
              </div>
            </div>
          </div>
        </article>
      </Link>
    )
  }

  return (
    <Link
      href={`/obras/${obra.slug}`}
      className="group/link block h-full focus-visible:outline-none"
    >
      <article className="flex h-full flex-col overflow-hidden rounded-none bg-card border border-border shadow-none transition-all duration-200 hover:-translate-y-0.5 hover:border-primary focus-visible:ring-2 focus-visible:ring-ring">
        {/* Cover Image Container */}
        <div className="relative aspect-[16/10] overflow-hidden bg-muted rounded-none">
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
              <Building2 className="size-8" />
            </div>
          )}
        </div>

        {/* Firm Profile Header with Logo Avatar */}
        <div className="p-4 pb-0 flex items-center justify-between gap-2.5">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative size-11 rounded-none border border-border bg-card overflow-hidden shrink-0 shadow-sm -mt-7 z-10">
              <Image
                src={logoUrl}
                alt={empresaNome}
                fill
                unoptimized
                className="object-cover"
              />
            </div>
            <div className="flex flex-col min-w-0 pt-1">
              <h3 className="font-heading text-sm font-bold text-foreground truncate group-hover/link:text-primary transition-colors min-w-0 leading-tight">
                {empresaNome}
              </h3>
              {obra.supplier_rating && (
                <div className="flex items-center gap-1 mt-1">
                  <Star className="size-3 fill-primary text-primary" />
                  <span className="text-[11px] font-bold text-foreground">{obra.supplier_rating.score.toFixed(1)}</span>
                  <span className="text-[10px] text-muted-foreground font-medium">({obra.supplier_rating.count})</span>
                </div>
              )}
            </div>
          </div>

          <span className="flex items-center gap-1 shrink-0 text-[10px] text-muted-foreground font-medium">
            <MapPin className="size-3 shrink-0 text-primary" />
            <span className="whitespace-nowrap">{formatLocalizacao(obra.cidade, obra.estado)}</span>
          </span>
        </div>

        {/* Details Container */}
        <div className="flex flex-1 flex-col justify-between p-4 pt-3 gap-4">
          <p className="line-clamp-2 text-xs text-muted-foreground leading-relaxed">
            {obra.descricao_curta}
          </p>

          {/* Pricing & Tags */}
          <div className="space-y-3 pt-3 border-t border-border/50">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider flex items-center gap-1 shrink-0">
                <Wallet className="size-3 text-primary shrink-0" />
                Valor m²:
              </span>
              <div className="relative group">
                <span className={cn(
                  "font-heading text-base font-bold text-muted-foreground whitespace-nowrap leading-tight select-none transition-all",
                  !isAuthenticated && "blur-[4px]"
                )}>
                  {formatValorMetroQuadrado(obra.preco_a_partir)}
                </span>
                {!isAuthenticated && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-primary bg-background/80 px-1 rounded-sm flex items-center gap-0.5">
                      <Lock className="size-2.5" /> Login
                    </span>
                  </div>
                )}
              </div>
            </div>

            {obra.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {obra.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-[10px] font-medium text-muted-foreground bg-secondary/60 rounded-none">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </article>
    </Link>
  )
}
