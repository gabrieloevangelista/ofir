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
        const targetPath = pathname === "/" ? pathname : "/"
        router.push(`${targetPath}?${params.toString()}`)
      })
    },
    [pathname, router, searchParams, startTransition]
  )

  const cidade = searchParams.get("cidade") ?? ""
  const categoria = searchParams.get("categoria") ?? "todas"
  const padrao = searchParams.get("padrao") ?? "todos"

  const hasActiveFilters = Boolean(
    cidade ||
    (categoria && categoria !== "todas") ||
    busca
  )

  const handleReset = () => {
    setBusca("")
    startTransition(() => {
      router.push("/")
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
