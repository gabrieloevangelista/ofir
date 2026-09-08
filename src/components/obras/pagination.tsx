"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface PaginationProps {
  paginaAtual: number
  totalPaginas: number
  totalItems: number
  pageSize: number
}

export function Pagination({
  paginaAtual,
  totalPaginas,
  totalItems,
  pageSize,
}: PaginationProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  if (totalPaginas <= 1) return null

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString())
    if (newPage <= 1) {
      params.delete("pagina")
    } else {
      params.set("pagina", newPage.toString())
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: true })
  }

  const startItem = (paginaAtual - 1) * pageSize + 1
  const endItem = Math.min(paginaAtual * pageSize, totalItems)

  const getVisiblePages = () => {
    const delta = 1
    const range: number[] = []
    const rangeWithDots: (number | string)[] = []
    let l: number | undefined

    for (let i = 1; i <= totalPaginas; i++) {
      if (i === 1 || i === totalPaginas || (i >= paginaAtual - delta && i <= paginaAtual + delta)) {
        range.push(i)
      }
    }

    for (const i of range) {
      if (l !== undefined) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1)
        } else if (i - l !== 1) {
          rangeWithDots.push("...")
        }
      }
      rangeWithDots.push(i)
      l = i
    }

    return rangeWithDots
  }

  const visiblePages = getVisiblePages()

  return (
    <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border/70 pt-6">
      <div className="text-sm text-muted-foreground font-medium">
        Mostrando <span className="font-bold text-foreground">{startItem}</span> a{" "}
        <span className="font-bold text-foreground">{endItem}</span> de{" "}
        <span className="font-bold text-foreground">{totalItems}</span> empresas
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={paginaAtual <= 1}
          onClick={() => handlePageChange(paginaAtual - 1)}
          className="rounded-none gap-1.5 text-sm px-3 h-9 font-medium shadow-none"
        >
          <ChevronLeft className="size-4" />
          Anterior
        </Button>

        <div className="flex items-center gap-1">
          {visiblePages.map((p, i) => {
            if (p === "...") {
              return (
                <span key={`dots-${i}`} className="text-muted-foreground text-sm px-1.5 font-medium">
                  ...
                </span>
              )
            }
            return (
              <button
                key={p}
                type="button"
                onClick={() => handlePageChange(p as number)}
                className={cn(
                  "size-9 text-sm font-semibold rounded-none border transition-all flex items-center justify-center shadow-none",
                  p === paginaAtual
                    ? "bg-primary text-primary-foreground border-primary font-bold shadow-none"
                    : "bg-card border-border/80 hover:bg-secondary text-muted-foreground hover:text-foreground"
                )}
              >
                {p}
              </button>
            )
          })}
        </div>

        <Button
          variant="outline"
          size="sm"
          disabled={paginaAtual >= totalPaginas}
          onClick={() => handlePageChange(paginaAtual + 1)}
          className="rounded-none gap-1.5 text-sm px-3 h-9 font-medium shadow-none"
        >
          Próximo
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  )
}
