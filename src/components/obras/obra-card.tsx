"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { formatValorMetroQuadrado, formatLocalizacao, getObraPadrao, formatPadraoLabel } from "@/lib/utils"
import type { ObraWithConstrutora } from "@/types/obra"
import { useAuth } from "@/contexts/auth-context"
import { useCotacao } from "@/contexts/cotacao-context"
import { ContactDialog } from "./contact-dialog"
import { PropertyCard } from "@/components/ui/property-card"

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
  const router = useRouter()
  const [contactOpen, setContactOpen] = useState(false)

  const logoUrl =
    obra.construtoras?.logo_url ||
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%231e293b'/><path d='M30 70V30H50C61 30 61 50 50 50H30M50 50L70 70' stroke='%23ea580c' stroke-width='8' fill='none'/></svg>"
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

  const navigateToDetails = () => {
    router.push(`/sup/${obra.slug}`)
  }

  const stats = [
    { label: "Local", value: formatLocalizacao(obra.cidade, obra.estado) }
  ]
  
  if (obra.supplier_rating) {
    stats.push({ label: "Avaliação", value: obra.supplier_rating.score.toFixed(1) })
  }

  const priceValue = isAuthenticated 
    ? (obra.preco_a_partir ? formatValorMetroQuadrado(obra.preco_a_partir) : "Sob Consulta")
    : "🔒"
  const pricePeriod = isAuthenticated ? "" : "Login para ver"

  return (
    <>
      <div className="cursor-pointer h-full" onClick={navigateToDetails}>
        <PropertyCard
          layout={modoExibicao === "lista" ? "list" : "grid"}
          className="h-full hover:border-primary/50 transition-colors"
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
      </div>

      <ContactDialog
        obra={obra}
        open={contactOpen}
        onOpenChange={setContactOpen}
      />
    </>
  )
}
