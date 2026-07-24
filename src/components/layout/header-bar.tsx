"use client"

import { useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { SlidersHorizontal, ArrowUpDown, LayoutGrid, List, LogIn, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useAuth } from "@/contexts/auth-context"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { SidebarFilters } from "./sidebar-filters"

export function HeaderBar({ cidades, totalResults }: { cidades: string[]; totalResults: number }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [openMobile, setOpenMobile] = useState(false)
  const { isAuthenticated, login, logout } = useAuth()

  const ordenar = searchParams.get("ordenar") ?? "recentes"
  const modoExibicao = searchParams.get("modoExibicao") ?? "grid"
  const limit = searchParams.get("limit") ?? "10"

  const handleSortChange = (value: string | null) => {
    if (!value) return
    const params = new URLSearchParams(searchParams.toString())
    if (value === "recentes") {
      params.delete("ordenar")
    } else {
      params.set("ordenar", value)
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const handleModeChange = (mode: "grid" | "lista") => {
    const params = new URLSearchParams(searchParams.toString())
    if (mode === "grid") {
      params.delete("modoExibicao")
    } else {
      params.set("modoExibicao", mode)
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const handleLimitChange = (value: string | null) => {
    if (!value) return
    const params = new URLSearchParams(searchParams.toString())
    params.set("limit", value)
    params.delete("pagina") // Reset to page 1
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="flex flex-col gap-4 border-b border-border/60 pb-6 mb-8">
      {/* Top row with Title and Mobile Trigger / Desktop Sort */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            ✦ {totalResults} {totalResults === 1 ? "empresa credenciada" : "empresas & construtoras credenciadas"}
          </span>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-1">
            Construtoras, Engenharia & Arquitetura
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {/* Mobile Filter Button */}
          <Sheet open={openMobile} onOpenChange={setOpenMobile}>
            <SheetTrigger
              render={
                <Button variant="outline" className="lg:hidden gap-2 rounded-none">
                  <SlidersHorizontal className="size-4 text-primary" />
                  <span>Filtros</span>
                </Button>
              }
            />
            <SheetContent side="left" className="w-full sm:max-w-md overflow-y-auto p-6 rounded-none">
              <SheetHeader className="mb-4">
                <SheetTitle className="sr-only">Filtros de Busca</SheetTitle>
              </SheetHeader>
              <SidebarFilters cidades={cidades} onApplyMobile={() => setOpenMobile(false)} />
            </SheetContent>
          </Sheet>

          {/* View Mode Toggle (Grid / Lista) */}
          <div className="flex items-center border border-border bg-card p-0.5 rounded-none">
            <button
              type="button"
              onClick={() => handleModeChange("grid")}
              title="Visualização em Grade (Grid)"
              className={cn(
                "p-1.5 transition-colors rounded-none",
                modoExibicao === "grid"
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <LayoutGrid className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => handleModeChange("lista")}
              title="Visualização em Lista"
              className={cn(
                "p-1.5 transition-colors rounded-none",
                modoExibicao === "lista"
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <List className="size-4" />
            </button>
          </div>

          {/* Limit Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground hidden lg:inline-flex items-center">
              Exibir:
            </span>
            <Select value={limit} onValueChange={handleLimitChange}>
              <SelectTrigger className="w-[4.5rem] rounded-none bg-card border-border/70 text-xs px-2">
                <SelectValue placeholder="10" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
                <SelectItem value="200">200</SelectItem>
                <SelectItem value="500">500</SelectItem>
                <SelectItem value="1000">1000</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Desktop Sort Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground hidden sm:inline-flex items-center gap-1.5">
              <ArrowUpDown className="size-3 shrink-0 text-muted-foreground" />
              Ordenar:
            </span>
            <Select value={ordenar} onValueChange={handleSortChange}>
              <SelectTrigger className="w-[11rem] rounded-none bg-card border-border/70 text-xs">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recentes">Mais Recentes</SelectItem>
                <SelectItem value="menor_preco">Menor Orçamento</SelectItem>
                <SelectItem value="maior_preco">Maior Orçamento</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Auth Button */}
          <Button
            variant="outline"
            className={cn("hidden sm:flex rounded-none h-9 px-4 items-center gap-2 font-medium transition-colors", isAuthenticated ? "border-primary text-primary hover:bg-primary/5" : "")}
            onClick={isAuthenticated ? logout : login}
          >
            {isAuthenticated ? <LogOut className="size-4" /> : <LogIn className="size-4" />}
            {isAuthenticated ? "Sair" : "Entrar"}
          </Button>
        </div>
      </div>
    </div>
  )
}
