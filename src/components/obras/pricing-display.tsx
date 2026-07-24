"use client"

import { Lock } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { formatCurrencyBRL, formatValorMetroQuadrado, cn } from "@/lib/utils"
import { CardTitle } from "@/components/ui/card"

export function PricingDisplay({ preco_a_partir }: { preco_a_partir: number }) {
  const { isAuthenticated } = useAuth()

  return (
    <>
      <div className="relative group mt-1 inline-block w-full">
        <CardTitle className={cn(
          "font-heading text-3xl font-bold text-muted-foreground select-none transition-all",
          !isAuthenticated && "blur-md"
        )}>
          {formatValorMetroQuadrado(preco_a_partir)}
        </CardTitle>
        {!isAuthenticated && (
          <div className="absolute inset-0 flex items-center justify-start">
            <span className="text-[11px] font-bold uppercase tracking-wider text-primary bg-background/80 px-1.5 py-0.5 rounded flex items-center gap-1">
              <Lock className="size-3" /> Login para ver preço
            </span>
          </div>
        )}
      </div>
      <p className={cn(
        "text-xs text-muted-foreground mt-2 select-none transition-all",
        !isAuthenticated && "blur-sm"
      )}>
        Orçamento total a partir de {formatCurrencyBRL(preco_a_partir)}
      </p>
    </>
  )
}
