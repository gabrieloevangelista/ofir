"use client"

import { useState, useEffect, useRef } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import {
  SquaresFour,
  ListBullets,
  Buildings,
  MagnifyingGlass,
  Calculator as CalcIcon,
  SignIn,
  SignOut,
  SlidersHorizontal as SlidersIcon,
  X as XIcon,
  ArrowsDownUp,
} from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useAuth } from "@/contexts/auth-context"
import { useCotacao } from "@/contexts/cotacao-context"
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

export function HeaderBar({
  cidades,
  totalResults,
  suggestions = [],
  modoExibicao = "grid",
}: {
  cidades: string[]
  totalResults: number
  suggestions?: string[]
  modoExibicao?: "grid" | "lista"
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [openMobile, setOpenMobile] = useState(false)
  const { isAuthenticated, logout, openLoginModal } = useAuth()
  const { itemCount } = useCotacao()

  const [busca, setBusca] = useState(searchParams.get("busca") ?? "")
  const [isOpen, setIsOpen] = useState(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const filteredSuggestions = suggestions.filter(s => 
    s.toLowerCase().includes(busca.toLowerCase())
  ).slice(0, 8)

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

  const currentModoExibicao = (searchParams.get("modoExibicao") as "grid" | "lista") || modoExibicao || "grid"

  const handleViewModeChange = (mode: "grid" | "lista") => {
    const params = new URLSearchParams(searchParams.toString())
    if (mode === "grid") {
      params.delete("modoExibicao")
    } else {
      params.set("modoExibicao", "lista")
    }
    const qs = params.toString()
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
  }

  return (
    <div className="flex flex-col gap-4 border-b border-border/70 pb-5 mb-8">
      {/* 1. Row Título */}
      <div className="flex flex-col gap-1.5">
        <div className="inline-flex items-center gap-2 rounded-none bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary w-fit border border-primary/20 shadow-none">
          <Buildings className="size-3.5" weight="bold" />
          <span>{totalResults} {totalResults === 1 ? "empresa credenciada" : "empresas credenciadas"}</span>
        </div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Encontre a mão de obra para construir seu sonho
        </h1>
        <p className="text-sm text-muted-foreground">
          Empresas verificadas e orçamentos médios por m² para sua obra.
        </p>
      </div>

      {/* 2. Row de Ações/Controles abaixo do título: elementos alinhados à direita em UMA linha única */}
      <div className="flex items-center justify-between gap-3 w-full border-t border-border/40 pt-3">
        {/* Mobile Filter Button (apenas telas pequenas) */}
        <div className="lg:hidden">
          <Sheet open={openMobile} onOpenChange={setOpenMobile}>
            <SheetTrigger
              render={
                <Button variant="outline" className="gap-2 rounded-none h-10 text-sm font-medium shadow-none">
                  <SlidersIcon className="size-4 text-primary" weight="bold" />
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
        </div>

        {/* Todos os controles à direita em UMA LINHA só */}
        <div className="flex items-center gap-2 sm:gap-2.5 justify-end ml-auto overflow-x-auto py-0.5 scrollbar-none">
          {/* View Mode Switcher (Grid vs Lista) */}
          <div className="flex items-center border border-border/80 bg-card p-0.5 rounded-none shrink-0">
            <button
              type="button"
              onClick={() => handleViewModeChange("grid")}
              title="Modo Grade (Grid)"
              className={cn(
                "flex size-9 items-center justify-center transition-all rounded-none outline-none focus-visible:ring-1 focus-visible:ring-primary",
                currentModoExibicao === "grid"
                  ? "bg-primary text-primary-foreground font-semibold shadow-none"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
              )}
            >
              <SquaresFour className="size-4" weight={currentModoExibicao === "grid" ? "bold" : "regular"} />
            </button>
            <button
              type="button"
              onClick={() => handleViewModeChange("lista")}
              title="Modo Lista"
              className={cn(
                "flex size-9 items-center justify-center transition-all rounded-none outline-none focus-visible:ring-1 focus-visible:ring-primary",
                currentModoExibicao === "lista"
                  ? "bg-primary text-primary-foreground font-semibold shadow-none"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
              )}
            >
              <ListBullets className="size-4" weight={currentModoExibicao === "lista" ? "bold" : "regular"} />
            </button>
          </div>

          {/* Limit Dropdown */}
          <div className="flex items-center gap-1 shrink-0">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden sm:inline-flex">
              Exibir:
            </span>
            <Select value={limit} onValueChange={handleLimitChange}>
              <SelectTrigger className="w-[4.4rem] rounded-none bg-card border-border/80 text-sm h-10 px-2 shadow-none">
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
          <div className="flex items-center gap-1 shrink-0">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:inline-flex items-center gap-1">
              <ArrowsDownUp className="size-3.5 text-muted-foreground" weight="bold" />
              Ordenar:
            </span>
            <Select value={ordenar} onValueChange={handleSortChange}>
              <SelectTrigger className="w-[11.2rem] rounded-none bg-card border-border/80 text-sm h-10 shadow-none">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent className="rounded-none border-border shadow-none">
                <SelectItem value="recentes" className="text-sm rounded-none">Mais Recentes</SelectItem>
                <SelectItem value="menor_preco" className="text-sm rounded-none">Menor Orçamento / m²</SelectItem>
                <SelectItem value="maior_preco" className="text-sm rounded-none">Maior Orçamento / m²</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Minha Cotação Button */}
          <Link
            href="/cotacao"
            className={cn(
              "inline-flex items-center gap-2 rounded-none h-10 px-3.5 text-sm font-semibold border transition-all shadow-none shrink-0",
              itemCount > 0
                ? "bg-primary text-primary-foreground border-primary hover:bg-primary/90"
                : "bg-card hover:bg-secondary/70 text-foreground border-border/80"
            )}
            title="Ver orçamento consolidado e fornecedores selecionados"
          >
            <CalcIcon className="size-4" weight="bold" />
            <span>Minha Cotação</span>
            {itemCount > 0 && (
              <span className="flex items-center justify-center size-5 text-[11px] font-bold bg-white text-primary rounded-none">
                {itemCount}
              </span>
            )}
          </Link>

          {/* Auth Button */}
          <Button
            variant="outline"
            className={cn(
              "rounded-none h-10 px-4 text-sm font-medium transition-colors shadow-none shrink-0",
              isAuthenticated ? "border-primary/50 text-primary hover:bg-primary/10" : "hover:bg-secondary"
            )}
            onClick={isAuthenticated ? logout : openLoginModal}
          >
            {isAuthenticated ? <SignOut className="size-4 mr-2" weight="bold" /> : <SignIn className="size-4 mr-2" weight="bold" />}
            {isAuthenticated ? "Sair" : "Entrar"}
          </Button>
        </div>
      </div>

      {/* Barra de Pesquisa Fixa abaixo do Título do Painel */}
      <div className="w-full mt-1 relative z-50">
        <form 
          className="relative flex items-center w-full"
          onSubmit={(e) => {
            e.preventDefault()
            handleSearchChange(busca)
            setIsOpen(false)
          }}
        >
          <MagnifyingGlass className="pointer-events-none absolute left-3.5 size-4 text-muted-foreground" weight="bold" />
          <Input
            value={busca}
            onChange={(e) => {
              handleSearchChange(e.target.value)
              setIsOpen(true)
            }}
            onFocus={() => setIsOpen(true)}
            onBlur={() => setTimeout(() => setIsOpen(false), 200)}
            placeholder="Buscar por construtora, arquiteto, especialidade, condomínio ou cidade..."
            className="h-11 w-full pl-10 pr-10 text-sm bg-card border-border/80 text-foreground placeholder:text-muted-foreground/70 rounded-none shadow-none focus-visible:border-primary"
            autoComplete="off"
          />
          {busca && (
            <button
              type="button"
              onClick={() => {
                handleClearSearch()
                setIsOpen(false)
              }}
              className="absolute right-3 text-muted-foreground hover:text-foreground transition-colors p-1"
              title="Limpar busca"
            >
              <XIcon className="size-4" weight="bold" />
            </button>
          )}
        </form>

        {isOpen && busca.length >= 3 && filteredSuggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border shadow-md rounded-none max-h-64 overflow-y-auto">
            {filteredSuggestions.map((s, i) => (
              <div 
                key={i} 
                className="px-4 py-3 text-sm cursor-pointer hover:bg-secondary/70 hover:text-foreground text-muted-foreground transition-colors border-b border-border/40 last:border-0"
                onClick={() => {
                  setBusca(s)
                  handleSearchChange(s)
                  setIsOpen(false)
                }}
              >
                <MagnifyingGlass className="inline-block size-3.5 mr-2 opacity-50" weight="bold" />
                {s}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
