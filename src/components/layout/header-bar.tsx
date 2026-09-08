"use client"

import { useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { SlidersHorizontal, ArrowUpDown, LogIn, LogOut, Building2 } from "lucide-react"
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

  const handleLimitChange = (value: string | null) => {
    if (!value) return
    const params = new URLSearchParams(searchParams.toString())
    params.set("limit", value)
    params.delete("pagina") // Reset to page 1
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="flex flex-col gap-4 border-b border-border/70 pb-6 mb-8">
      {/* Top row with Title and Mobile Trigger / Desktop Sort */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-md bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary mb-1.5">
            <Building2 className="size-3.5" />
            <span>{totalResults} {totalResults === 1 ? "empresa credenciada" : "empresas credenciadas"}</span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Construtoras, Engenharia & Arquitetura
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Empresas verificadas e orçamentos médios por m² para sua obra.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Mobile Filter Button */}
          <Sheet open={openMobile} onOpenChange={setOpenMobile}>
            <SheetTrigger
              render={
                <Button variant="outline" className="lg:hidden gap-2 rounded-lg h-10 text-sm font-medium">
                  <SlidersHorizontal className="size-4 text-primary" />
                  <span>Filtros</span>
                </Button>
              }
            />
            <SheetContent side="left" className="w-full sm:max-w-md overflow-y-auto p-4 rounded-r-2xl">
              <SheetHeader className="mb-2">
                <SheetTitle className="text-left font-heading text-lg">Filtros de Busca</SheetTitle>
              </SheetHeader>
              <SidebarFilters cidades={cidades} onApplyMobile={() => setOpenMobile(false)} />
            </SheetContent>
          </Sheet>

          {/* Limit Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden sm:inline-flex">
              Exibir:
            </span>
            <Select value={limit} onValueChange={handleLimitChange}>
              <SelectTrigger className="w-[4.8rem] rounded-lg bg-card border-border/80 text-sm h-10 px-3 shadow-xs">
                <SelectValue placeholder="10" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-border shadow-lg">
                <SelectItem value="10" className="text-sm">10</SelectItem>
                <SelectItem value="50" className="text-sm">50</SelectItem>
                <SelectItem value="100" className="text-sm">100</SelectItem>
                <SelectItem value="200" className="text-sm">200</SelectItem>
                <SelectItem value="500" className="text-sm">500</SelectItem>
                <SelectItem value="1000" className="text-sm">1000</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Desktop Sort Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:inline-flex items-center gap-1.5">
              <ArrowUpDown className="size-3.5 text-muted-foreground" />
              Ordenar:
            </span>
            <Select value={ordenar} onValueChange={handleSortChange}>
              <SelectTrigger className="w-[12rem] rounded-lg bg-card border-border/80 text-sm h-10 shadow-xs">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-border shadow-lg">
                <SelectItem value="recentes" className="text-sm">Mais Recentes</SelectItem>
                <SelectItem value="menor_preco" className="text-sm">Menor Orçamento / m²</SelectItem>
                <SelectItem value="maior_preco" className="text-sm">Maior Orçamento / m²</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Auth Button */}
          <Button
            variant="outline"
            className={cn(
              "rounded-lg h-10 px-4 text-sm font-medium transition-colors shadow-xs",
              isAuthenticated ? "border-primary/50 text-primary hover:bg-primary/10" : "hover:bg-secondary"
            )}
            onClick={isAuthenticated ? logout : () => login()}
          >
            {isAuthenticated ? <LogOut className="size-4 mr-2" /> : <LogIn className="size-4 mr-2" />}
            {isAuthenticated ? "Sair" : "Entrar"}
          </Button>
        </div>
      </div>
    </div>
  )
}
