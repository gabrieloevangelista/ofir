"use client"

import { useCallback, useEffect, useRef, useState, useTransition } from "react"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import {
  Search,
  Crown,
  Sparkles,
  Leaf,
  MapPin,
  RotateCcw,
  SlidersHorizontal,
  X,
  Check,
  Ruler,
  Compass,
  Shovel,
  Tractor,
  Building,
  Frame,
  Component,
  Boxes,
  Zap,
  Paintbrush,
  ClipboardCheck,
  Layers,
  Wrench,
  ChevronsUpDown,
  PanelLeftClose,
  PanelLeftOpen,
  Sliders,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { cn } from "@/lib/utils"
import { LOCAIS_AGRUPADOS } from "@/lib/obras"

interface SidebarFiltersProps {
  cidades: string[]
  className?: string
  onApplyMobile?: () => void
  collapsed?: boolean
  onToggleCollapse?: () => void
}

const ETAPAS_OBRA = [
  { id: "todas", label: "Todas as Etapas & Métodos", icon: Layers },
  { id: "projetos", label: "Projetos & Arquitetura", icon: Ruler },
  { id: "topografia", label: "Topografia", icon: Compass },
  { id: "preparacao_solo", label: "Preparação do Solo", icon: Shovel },
  { id: "terraplenagem", label: "Terraplenagem", icon: Tractor },
  { id: "fundacao", label: "Fundações", icon: Building },
  { id: "steel_frame", label: "Steel Frame", icon: Frame },
  { id: "sistema_monolitico", label: "Painel Monolítico (EPS)", icon: Component },
  { id: "alvenaria", label: "Alvenaria", icon: Boxes },
  { id: "instalacoes", label: "Instalações", icon: Zap },
  { id: "acabamento", label: "Acabamento Fino", icon: Paintbrush },
  { id: "gerenciamento", label: "Gerenciamento", icon: ClipboardCheck },
  { id: "reformas", label: "Reformas & Ampliações", icon: Wrench },
]

export function SidebarFilters({
  cidades,
  className,
  onApplyMobile,
  collapsed = false,
  onToggleCollapse,
}: SidebarFiltersProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [, startTransition] = useTransition()

  const [busca, setBusca] = useState(searchParams.get("busca") ?? "")
  const [openCity, setOpenCity] = useState(false)
  const [openCollapsedSearch, setOpenCollapsedSearch] = useState(false)
  const [openCollapsedPadrao, setOpenCollapsedPadrao] = useState(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString())
      for (const [key, value] of Object.entries(updates)) {
        if (!value || value === "todas" || value === "todos" || value === "recentes" || value === "todas-cidades") {
          params.delete(key)
        } else {
          params.set(key, value)
        }
      }
      startTransition(() => {
        router.replace(`${pathname}?${params.toString()}`, { scroll: false })
      })
    },
    [pathname, router, searchParams, startTransition]
  )

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      updateParams({ busca: busca || null })
    }, 350)
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [busca, updateParams])

  const cidade = searchParams.get("cidade") ?? ""
  const categoria = searchParams.get("categoria") ?? "todas"
  const padrao = searchParams.get("padrao") ?? "todos"

  const hasActiveFilters = Boolean(
    cidade ||
    (categoria && categoria !== "todas") ||
    (padrao && padrao !== "todos") ||
    busca
  )

  const handleReset = () => {
    setBusca("")
    startTransition(() => {
      router.replace(pathname, { scroll: false })
    })
    if (onApplyMobile) onApplyMobile()
  }

  // =========================================================================
  // RENDER: COLLAPSED RAIL MODE (Minimizado apenas com ícones)
  // =========================================================================
  if (collapsed) {
    return (
      <aside className={cn("flex flex-col items-center py-4 px-2 w-full text-foreground gap-5 rounded-none shadow-none", className)}>
        {/* Top Logo & Expand Button */}
        <div className="flex flex-col items-center gap-3 w-full border-b border-border pb-3">
          <Link
            href="/"
            title="Página Inicial OFIR"
            className="flex size-10 items-center justify-center rounded-none bg-primary text-primary-foreground font-bold shadow-none hover:opacity-90 transition-opacity"
          >
            <Building className="size-5" />
          </Link>

          {onToggleCollapse && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleCollapse}
              title="Expandir barra lateral"
              className="size-9 rounded-none text-muted-foreground hover:text-foreground hover:bg-secondary/70 transition-colors shadow-none"
            >
              <PanelLeftOpen className="size-5" />
            </Button>
          )}
        </div>

        {/* Action icons stack */}
        <div className="flex flex-col items-center gap-2 w-full">
          {/* Quick Search Popover */}
          <Popover open={openCollapsedSearch} onOpenChange={setOpenCollapsedSearch}>
            <PopoverTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  title="Buscar por nome ou especialidade"
                  className={cn(
                    "relative size-10 rounded-none transition-colors shadow-none",
                    busca ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-secondary/70"
                  )}
                />
              }
            >
              <Search className="size-4" />
              {busca && <span className="absolute top-2 right-2 size-2 rounded-none bg-primary" />}
            </PopoverTrigger>
            <PopoverContent side="right" align="start" className="w-72 p-3 rounded-none shadow-none border-border">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Buscar Construtora
                </label>
                <div className="relative">
                  <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    placeholder="Nome, especialidade..."
                    className="pl-9 pr-8 h-9 text-sm rounded-none shadow-none border-border"
                    autoFocus
                  />
                  {busca && (
                    <button
                      type="button"
                      onClick={() => setBusca("")}
                      className="absolute top-1/2 right-2.5 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      <X className="size-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* Location / Cidade Popover */}
          <Popover open={openCity} onOpenChange={setOpenCity}>
            <PopoverTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  title={cidade ? `Local: ${cidade}` : "Filtrar por Condomínio / Cidade"}
                  className={cn(
                    "relative size-10 rounded-none transition-colors shadow-none",
                    cidade ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-secondary/70"
                  )}
                />
              }
            >
              <MapPin className="size-4" />
              {cidade && <span className="absolute top-2 right-2 size-2 rounded-none bg-primary" />}
            </PopoverTrigger>
            <PopoverContent side="right" align="start" className="w-80 p-0 rounded-none shadow-none border-border">
              <Command className="rounded-none">
                <CommandInput placeholder="Buscar condomínio ou cidade..." className="h-10 text-sm rounded-none" />
                <CommandList className="max-h-72 rounded-none">
                  <CommandEmpty>Nenhum local encontrado.</CommandEmpty>
                  <CommandGroup>
                    <CommandItem
                      value="todas-cidades"
                      onSelect={() => {
                        updateParams({ cidade: null })
                        setOpenCity(false)
                      }}
                      className="cursor-pointer text-sm py-2 rounded-none"
                    >
                      Todos os Condomínios e Cidades
                      <Check className={cn("ml-auto size-4", !cidade ? "opacity-100" : "opacity-0")} />
                    </CommandItem>
                  </CommandGroup>
                  {LOCAIS_AGRUPADOS.map((grupo) => (
                    <CommandGroup key={grupo.regiao} heading={grupo.regiao}>
                      {grupo.locais.map((c) => (
                        <CommandItem
                          key={c}
                          value={c}
                          onSelect={() => {
                            updateParams({ cidade: c })
                            setOpenCity(false)
                          }}
                          className="cursor-pointer text-sm py-2 rounded-none"
                        >
                          {c}
                          <Check className={cn("ml-auto size-4", cidade === c ? "opacity-100" : "opacity-0")} />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  ))}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          {/* Standard / Padrão Popover */}
          <Popover open={openCollapsedPadrao} onOpenChange={setOpenCollapsedPadrao}>
            <PopoverTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  title={padrao !== "todos" ? `Padrão: ${padrao}` : "Padrão de Construção"}
                  className={cn(
                    "relative size-10 rounded-none transition-colors shadow-none",
                    padrao !== "todos" ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-secondary/70"
                  )}
                />
              }
            >
              <Crown className="size-4" />
              {padrao !== "todos" && <span className="absolute top-2 right-2 size-2 rounded-none bg-primary" />}
            </PopoverTrigger>
            <PopoverContent side="right" align="start" className="w-56 p-2 rounded-none shadow-none border-border">
              <div className="space-y-1">
                <div className="px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Padrão de Construção
                </div>
                <button
                  type="button"
                  onClick={() => {
                    updateParams({ padrao: padrao === "alto" ? null : "alto" })
                    setOpenCollapsedPadrao(false)
                  }}
                  className={cn(
                    "w-full flex items-center justify-between px-2.5 py-2 text-sm rounded-none transition-colors text-left",
                    padrao === "alto" ? "bg-primary/15 text-primary font-semibold" : "hover:bg-secondary/60 text-foreground"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Crown className="size-4 text-primary" />
                    <span>Alto Padrão</span>
                  </div>
                  {padrao === "alto" && <Check className="size-4 text-primary" />}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    updateParams({ padrao: padrao === "medio" ? null : "medio" })
                    setOpenCollapsedPadrao(false)
                  }}
                  className={cn(
                    "w-full flex items-center justify-between px-2.5 py-2 text-sm rounded-none transition-colors text-left",
                    padrao === "medio" ? "bg-primary/15 text-primary font-semibold" : "hover:bg-secondary/60 text-foreground"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="size-4 text-muted-foreground" />
                    <span>Médio Padrão</span>
                  </div>
                  {padrao === "medio" && <Check className="size-4 text-primary" />}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    updateParams({ padrao: padrao === "baixo" ? null : "baixo" })
                    setOpenCollapsedPadrao(false)
                  }}
                  className={cn(
                    "w-full flex items-center justify-between px-2.5 py-2 text-sm rounded-none transition-colors text-left",
                    padrao === "baixo" ? "bg-primary/15 text-primary font-semibold" : "hover:bg-secondary/60 text-foreground"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Leaf className="size-4 text-muted-foreground" />
                    <span>Baixo Padrão</span>
                  </div>
                  {padrao === "baixo" && <Check className="size-4 text-primary" />}
                </button>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Separator */}
        <div className="w-8 border-b border-border my-1" />

        {/* Etapas Icons Rail */}
        <div className="flex flex-col items-center gap-1.5 w-full overflow-y-auto max-h-[460px] scrollbar-none">
          {ETAPAS_OBRA.map((item) => {
            const IconComp = item.icon
            const isSelected = categoria === item.id || (item.id === "todas" && !categoria)
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => updateParams({ categoria: item.id })}
                title={item.label}
                className={cn(
                  "flex size-10 items-center justify-center rounded-none transition-all shadow-none",
                  isSelected
                    ? "bg-primary text-primary-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/70"
                )}
              >
                <IconComp className="size-4.5 shrink-0" />
              </button>
            )
          })}
        </div>

        {/* Reset filters button if active */}
        {hasActiveFilters && (
          <div className="mt-auto pt-3 border-t border-border w-full flex justify-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleReset}
              title="Limpar todos os filtros"
              className="size-9 rounded-none text-muted-foreground hover:text-primary hover:bg-secondary/70 transition-colors shadow-none"
            >
              <RotateCcw className="size-4" />
            </Button>
          </div>
        )}
      </aside>
    )
  }

  // =========================================================================
  // RENDER: EXPANDED MODE (Barra lateral completa)
  // =========================================================================
  return (
    <aside className={cn("flex flex-col gap-6 w-full text-foreground p-5 rounded-none shadow-none", className)}>
      {/* Brand & Collapse Header */}
      <div className="flex items-center justify-between border-b border-border pb-4">
        <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
          <div className="flex size-9 items-center justify-center rounded-none bg-primary text-primary-foreground font-bold shadow-none">
            <Building className="size-5" />
          </div>
          <div>
            <span className="font-heading text-xl font-bold tracking-tight text-foreground block leading-none">
              OFIR
            </span>
            <span className="text-[11px] font-medium text-muted-foreground tracking-wide block mt-1">
              Encontre mão de obra
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-1">
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleReset}
              title="Limpar todos os filtros"
              className="size-8 rounded-none text-muted-foreground hover:text-primary hover:bg-secondary/70 transition-colors shadow-none"
            >
              <RotateCcw className="size-4" />
            </Button>
          )}

          {onToggleCollapse && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleCollapse}
              title="Recolher barra lateral"
              className="size-8 rounded-none text-muted-foreground hover:text-foreground hover:bg-secondary/70 transition-colors shadow-none"
            >
              <PanelLeftClose className="size-4.5" />
            </Button>
          )}
        </div>
      </div>

      {/* 1. Condomínio / Cidade / Região Filter */}
      {cidades.length > 0 && (
        <div className="space-y-2 border-b border-border pb-5">
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <MapPin className="size-3.5 text-primary shrink-0" />
            Condomínio / Cidade / Região
          </label>
          <Popover open={openCity} onOpenChange={setOpenCity}>
            <PopoverTrigger
              render={
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openCity}
                  className="w-full justify-between bg-card border-border rounded-none shadow-none font-medium text-foreground hover:bg-secondary/40 text-sm px-3 h-10"
                />
              }
            >
              <span className="truncate">
                {cidade && cidade !== "todas-cidades"
                  ? cidade
                  : "Todos os Condomínios e Cidades"}
              </span>
              <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
            </PopoverTrigger>
            <PopoverContent className="w-[280px] sm:w-[320px] p-0 rounded-none border-border shadow-none" align="start">
              <Command className="rounded-none">
                <CommandInput placeholder="Buscar condomínio ou cidade..." className="h-10 text-sm rounded-none" />
                <CommandList className="max-h-72 rounded-none">
                  <CommandEmpty>Nenhum local encontrado.</CommandEmpty>
                  <CommandGroup>
                    <CommandItem
                      value="todas-cidades"
                      onSelect={() => {
                        updateParams({ cidade: null })
                        setOpenCity(false)
                      }}
                      className="cursor-pointer text-sm py-2 rounded-none"
                    >
                      Todos os Condomínios e Cidades
                      <Check
                        className={cn(
                          "ml-auto size-4",
                          !cidade || cidade === "todas-cidades" ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  </CommandGroup>
                  {LOCAIS_AGRUPADOS.map((grupo) => (
                    <CommandGroup key={grupo.regiao} heading={grupo.regiao}>
                      {grupo.locais.map((c) => (
                        <CommandItem
                          key={c}
                          value={c}
                          onSelect={() => {
                            updateParams({ cidade: c })
                            setOpenCity(false)
                          }}
                          className="cursor-pointer text-sm py-2 rounded-none"
                        >
                          {c}
                          <Check
                            className={cn(
                              "ml-auto size-4",
                              cidade === c ? "opacity-100" : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  ))}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      )}

      {/* 2. Search Input */}
      <div className="space-y-2 border-b border-border pb-5">
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
          <Search className="size-3.5 text-primary shrink-0" />
          Buscar Construtora / Empresa
        </label>
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Ex: Construtora, engenharia, arquiteto..."
            className="pl-9 pr-8 bg-card border-border text-sm placeholder:text-muted-foreground/70 rounded-none h-10 shadow-none"
          />
          {busca && (
            <button
              type="button"
              onClick={() => setBusca("")}
              className="absolute top-1/2 right-2.5 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
      </div>

      {/* 3. Padrão de Construção Filter Cards */}
      <div className="space-y-2.5 border-b border-border pb-5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <Sliders className="size-3.5 text-primary" />
            Padrão de Construção
          </label>
          {padrao !== "todos" && (
            <button
              type="button"
              onClick={() => updateParams({ padrao: null })}
              className="text-xs text-primary hover:underline font-semibold"
            >
              Limpar
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 gap-2">
          {/* Alto Padrão */}
          <button
            type="button"
            onClick={() => updateParams({ padrao: padrao === "alto" ? null : "alto" })}
            className={cn(
              "flex items-center justify-between border p-3 text-left transition-all rounded-none group shadow-none",
              padrao === "alto"
                ? "border-primary bg-primary/10 text-primary font-semibold"
                : "border-border/80 bg-card hover:bg-secondary/60 text-foreground"
            )}
          >
            <div className="flex items-center gap-2.5">
              <div
                className={cn(
                  "flex size-8 items-center justify-center rounded-none transition-colors",
                  padrao === "alto" ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground group-hover:bg-primary/20 group-hover:text-primary"
                )}
              >
                <Crown className="size-4 shrink-0" />
              </div>
              <span className="text-sm font-semibold">Alto Padrão</span>
            </div>
            {padrao === "alto" && <Check className="size-4 text-primary" />}
          </button>

          {/* Médio Padrão */}
          <button
            type="button"
            onClick={() => updateParams({ padrao: padrao === "medio" ? null : "medio" })}
            className={cn(
              "flex items-center justify-between border p-3 text-left transition-all rounded-none group shadow-none",
              padrao === "medio"
                ? "border-primary bg-primary/10 text-primary font-semibold"
                : "border-border/80 bg-card hover:bg-secondary/60 text-foreground"
            )}
          >
            <div className="flex items-center gap-2.5">
              <div
                className={cn(
                  "flex size-8 items-center justify-center rounded-none transition-colors",
                  padrao === "medio" ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground group-hover:bg-primary/20 group-hover:text-primary"
                )}
              >
                <Sparkles className="size-4 shrink-0" />
              </div>
              <span className="text-sm font-semibold">Médio Padrão</span>
            </div>
            {padrao === "medio" && <Check className="size-4 text-primary" />}
          </button>

          {/* Baixo Padrão */}
          <button
            type="button"
            onClick={() => updateParams({ padrao: padrao === "baixo" ? null : "baixo" })}
            className={cn(
              "flex items-center justify-between border p-3 text-left transition-all rounded-none group shadow-none",
              padrao === "baixo"
                ? "border-primary bg-primary/10 text-primary font-semibold"
                : "border-border/80 bg-card hover:bg-secondary/60 text-foreground"
            )}
          >
            <div className="flex items-center gap-2.5">
              <div
                className={cn(
                  "flex size-8 items-center justify-center rounded-none transition-colors",
                  padrao === "baixo" ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground group-hover:bg-primary/20 group-hover:text-primary"
                )}
              >
                <Leaf className="size-4 shrink-0" />
              </div>
              <span className="text-sm font-semibold">Baixo Padrão</span>
            </div>
            {padrao === "baixo" && <Check className="size-4 text-primary" />}
          </button>
        </div>
      </div>

      {/* 4. Etapas Desmembradas da Obra */}
      <div className="space-y-2.5">
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
          <Layers className="size-3.5 text-primary" />
          Etapas Desmembradas da Obra
        </label>
        <div className="flex flex-col gap-1.5">
          {ETAPAS_OBRA.map((item) => {
            const IconComp = item.icon
            const isSelected = categoria === item.id || (item.id === "todas" && !categoria)
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => updateParams({ categoria: item.id })}
                className={cn(
                  "flex items-center justify-between border px-3 py-2.5 text-sm transition-all text-left rounded-none shadow-none",
                  isSelected
                    ? "border-primary bg-primary/10 text-primary font-semibold"
                    : "border-border/60 bg-card hover:bg-secondary/70 text-foreground"
                )}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <IconComp className={cn("size-4 shrink-0", isSelected ? "text-primary" : "text-muted-foreground")} />
                  <span className="text-xs font-medium truncate">{item.label}</span>
                </div>
                {isSelected && <Check className="size-3.5 text-primary shrink-0 ml-1" />}
              </button>
            )
          })}
        </div>
      </div>
    </aside>
  )
}
