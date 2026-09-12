"use client"

import React from "react"
import { Heart, Check, Plus, Calculator, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCotacao } from "@/contexts/cotacao-context"
import { useAuth } from "@/contexts/auth-context"
import type { ObraWithConstrutora } from "@/types/obra"
import { cn } from "@/lib/utils"

interface CotacaoToggleButtonProps {
  obra: ObraWithConstrutora
  variant?: "default" | "outline" | "secondary" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
  showText?: boolean
}

export function CotacaoToggleButton({
  obra,
  variant = "outline",
  size = "default",
  className,
  showText = true,
}: CotacaoToggleButtonProps) {
  const { isAuthenticated, openLoginModal } = useAuth()
  const { isFavorito, toggleItem } = useCotacao()
  const isFav = isFavorito(obra.id)

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!isAuthenticated) {
      openLoginModal()
      return
    }
    toggleItem(obra)
  }

  return (
    <Button
      type="button"
      variant={isFav ? "default" : variant}
      size={size}
      onClick={handleClick}
      className={cn(
        "rounded-none transition-all shadow-none font-semibold",
        isFav
          ? "bg-primary text-primary-foreground border-primary hover:bg-primary/90"
          : "border-border/80 hover:bg-secondary/70 text-foreground",
        className
      )}
      title={isFav ? "Remover da cotação" : "Adicionar aos favoritos da cotação"}
    >
      <Heart
        className={cn(
          "size-4 mr-2 transition-transform",
          isFav ? "fill-current text-primary-foreground scale-110" : "text-muted-foreground"
        )}
      />
      {showText && (
        <span>
          {isFav ? "Adicionado à Cotação" : "Adicionar à Cotação"}
        </span>
      )}
    </Button>
  )
}
