"use client"

import { useState, useEffect, useRef } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { SlidersHorizontal, ArrowUpDown, LogIn, LogOut, Building2, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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

export function HeaderBar({ cidades, totalResults, suggestions = [] }: { cidades: string[]; totalResults: number; suggestions?: string[] }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [openMobile, setOpenMobile] = useState(false)
  const { isAuthenticated, login, logout } = useAuth()

  const [busca, setBusca] = useState(searchParams.get("busca") ?? "")
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setBusca(searchParams.get("busca") ?? "")
  }, [searchParams])

  const handleSearchChange = (value: string) => {
    setBusca(value)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString())
      if (value.trim()) {
        params.set("busca", value.trim())
      } else {
        params.delete("busca")
      }
      params.delete("pagina") // Reset to page 1 on new search
      router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    }, 300)
  }

  const handleClearSearch = () => {
    setBusca("")
    if (debounceRef.current) clearTimeout(debounceRef.current)
    const params = new URLSearchParams(searchParams.toString())
    params.delete("busca")
    params.delete("pagina")
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

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
    <div className="flex flex-col gap-5 border-b border-border/70 pb-6 mb-8">
      {/* Top row with Title and Mobile Trigger / Controls */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-none bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary mb-1.5 border border-primary/20 shadow-none">
            <Building2 className="size-3.5" />
            <span>{totalResults} {totalResults === 1 ? "empresa credenciada" : "empresas credenciadas"}</span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Encontre a mão de obra para construir seu sonho
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
                <Button variant="outline" className="lg:hidden gap-2 rounded-none h-10 text-sm font-medium shadow-none">
                  <SlidersHorizontal className="size-4 text-primary" />
                  <span>Filtros</span>
                </Button>
              }
            />
            <SheetContent side="left" className="w-full sm:max-w-md overflow-y-auto p-4 rounded-none shadow-none">
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
              <SelectTrigger className="w-[4.8rem] rounded-none bg-card border-border/80 text-sm h-10 px-3 shadow-none">
                <SelectValue placeholder="10" />
              </SelectTrigger>
              <SelectContent className="rounded-none border-border shadow-none">
                <SelectItem value="10" className="text-sm rounded-none">10</SelectItem>
                <SelectItem value="50" className="text-sm rounded-none">50</SelectItem>
                <SelectItem value="100" className="text-sm rounded-none">100</SelectItem>
                <SelectItem value="200" className="text-sm rounded-none">200</SelectItem>
                <SelectItem value="500" className="text-sm rounded-none">500</SelectItem>
                <SelectItem value="1000" className="text-sm rounded-none">1000</SelectItem>
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
              <SelectTrigger className="w-[12rem] rounded-none bg-card border-border/80 text-sm h-10 shadow-none">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent className="rounded-none border-border shadow-none">
                <SelectItem value="recentes" className="text-sm rounded-none">Mais Recentes</SelectItem>
                <SelectItem value="menor_preco" className="text-sm rounded-none">Menor Orçamento / m²</SelectItem>
                <SelectItem value="maior_preco" className="text-sm rounded-none">Maior Orçamento / m²</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Auth Button */}
          <Button
            variant="outline"
            className={cn(
              "rounded-none h-10 px-4 text-sm font-medium transition-colors shadow-none",
              isAuthenticated ? "border-primary/50 text-primary hover:bg-primary/10" : "hover:bg-secondary"
            )}
            onClick={isAuthenticated ? logout : () => login()}
          >
            {isAuthenticated ? <LogOut className="size-4 mr-2" /> : <LogIn className="size-4 mr-2" />}
            {isAuthenticated ? "Sair" : "Entrar"}
          </Button>
        </div>
      </div>

      {/* Barra de Pesquisa Fixa abaixo do Título do Painel */}
      <div className="w-full mt-1">
        <form 
          className="relative flex items-center w-full"
          onSubmit={(e) => {
            e.preventDefault()
            handleSearchChange(busca)
          }}
        >
          <Search className="pointer-events-none absolute left-3.5 size-4 text-muted-foreground" />
          <Input
            value={busca}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Buscar por construtora, arquiteto, especialidade, condomínio ou cidade..."
            className="h-11 w-full pl-10 pr-10 text-sm bg-card border-border/80 text-foreground placeholder:text-muted-foreground/70 rounded-none shadow-none focus-visible:border-primary"
            list={suggestions.length > 0 ? "header-search-suggestions" : undefined}
          />
          {suggestions.length > 0 && (
            <datalist id="header-search-suggestions">
              {suggestions.map((s, i) => (
                <option key={i} value={s} />
              ))}
            </datalist>
          )}
          {busca && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="absolute right-3 text-muted-foreground hover:text-foreground transition-colors p-1"
              title="Limpar busca"
            >
              <X className="size-4" />
            </button>
          )}
        </form>
      </div>
    </div>
  )
}
