"use client"

import { useState } from "react"
import Link from "next/link"
import { formatValorMetroQuadrado, formatLocalizacao, getObraPadrao, formatPadraoLabel } from "@/lib/utils"
import type { ObraWithConstrutora } from "@/types/obra"
import { useAuth } from "@/contexts/auth-context"
import { useCotacao } from "@/contexts/cotacao-context"
import { ContactDialog } from "./contact-dialog"
import { PropertyCard } from "@/components/ui/property-card"
import { Lock, Star, MapPin } from "@phosphor-icons/react"

export function ObraCard({
  obra,
  priority = false,
  modoExibicao = "grid",
}: {
  obra: ObraWithConstrutora
  priority?: boolean
  modoExibicao?: "grid" | "lista"
}) {
  const { isAuthenticated, openLoginModal } = useAuth()
  const { isFavorito, toggleItem } = useCotacao()
  const [contactOpen, setContactOpen] = useState(false)

  const logoUrl =
    obra.construtoras?.logo_url ||
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23111111'/><circle cx='50' cy='50' r='30' stroke='%23C5A059' stroke-width='4' fill='none'/><line x1='50' y1='20' x2='50' y2='80' stroke='%23111111' stroke-width='6'/></svg>"
  const empresaNome = obra.construtoras?.nome || obra.nome
  const padrao = getObraPadrao(obra.preco_a_partir)

  const isFav = isFavorito(obra.id)

  const handleContactClick = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    setContactOpen(true)
  }

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!isAuthenticated) {
      openLoginModal()
      return
    }
    toggleItem(obra)
  }

  const stats = [
    {
      label: "Local",
      value: (
        <span className="inline-flex items-center gap-1 max-w-full">
          <MapPin className="size-3.5 text-primary shrink-0" weight="fill" />
          <span className="truncate">{formatLocalizacao(obra.cidade, obra.estado)}</span>
        </span>
      ),
    },
  ]
  
  if (obra.supplier_rating) {
    stats.push({
      label: "Avaliação",
      value: (
        <span className="inline-flex items-center gap-1">
          <Star className="size-3.5 fill-amber-500 text-amber-500 shrink-0" weight="fill" />
          <span>{obra.supplier_rating.score.toFixed(1)}</span>
        </span>
      ),
    })
  }

  const priceValue = isAuthenticated 
    ? (obra.preco_a_partir ? formatValorMetroQuadrado(obra.preco_a_partir) : "Sob Consulta")
    : (
      <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-muted-foreground">
        <Lock className="size-3.5 text-primary shrink-0" weight="bold" />
        <span>Login para ver</span>
      </span>
    )
  const pricePeriod = isAuthenticated ? "" : undefined

  return (
    <>
      <Link href={`/sup/${obra.slug}`} prefetch={true} className="block h-full">
        <PropertyCard
          layout={modoExibicao === "lista" ? "list" : "grid"}
          className="h-full hover:border-primary/50 transition-colors cursor-pointer"
          imageUrl={obra.cover_image_url || logoUrl}
          imageAlt={empresaNome}
          title={empresaNome}
          price={priceValue}
          pricePeriod={pricePeriod}
          description={obra.descricao_curta || "Fornecedor de alto padrão focado em qualidade e excelência."}
          stats={stats}
          actionLabel="Contatar"
          onActionClick={() => handleContactClick()}
          isFavorite={isFav}
          onToggleFavorite={handleToggleFavorite}
        />
      </Link>

      <ContactDialog
        obra={obra}
        open={contactOpen}
        onOpenChange={setContactOpen}
      />
    </>
  )
}
