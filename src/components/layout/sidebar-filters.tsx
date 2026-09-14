"use client"

import { useCallback, useEffect, useRef, useState, useTransition } from "react"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import {
  Anchor,
  Columns,
  Tractor,
  Tree,
  Cube,
  Nut,
  Wall,
  Recycle,
  Sparkle,
  PaintRoller,
  Feather,
  Cards,
  Armchair,
  Compass,
  HardHat,
  Circuitry,
  Polygon,
  Gauge,
  Lightning,
  Drop,
  Umbrella,
  Warehouse,
  HouseLine,
  Door,
  DiamondsFour,
  Checkerboard,
  Footprints,
  Hammer,
  Diamond,
  Flame,
  Snowflake,
  WifiHigh,
  Sun,
  SwimmingPool,
  ArrowsClockwise,
  Bomb,
  Kanban,
  CalendarCheck,
  Calculator,
  PencilLine,
  Certificate,
  Package,
  Crane,
  Camera,
  Fire,
  Buildings,
  MapPin,
  Check,
  SlidersHorizontal,
  Stack,
  SidebarSimple,
  MagnifyingGlass,
  X,
  CaretDown,
} from "@phosphor-icons/react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { cn } from "@/lib/utils"
import { LOCAIS_AGRUPADOS } from "@/lib/obras"
import { AREAS_OBRA, AreaObra } from "@/lib/areas-obra"

interface SidebarFiltersProps {
  cidades: string[]
  className?: string
  onApplyMobile?: () => void
  collapsed?: boolean
  onToggleCollapse?: () => void
}

// Unique, meaningful Phosphor icon for each of the 45 construction areas
const AREA_ICONS: Record<string, React.ComponentType<{ className?: string; weight?: "bold" | "regular" | "light" | "thin" | "duotone" | "fill" }>> = {
  fundacao: Anchor,
  estrutura: Columns,
  terraplanagem: Tractor,
  paisagismo: Tree,
  sistema_monolitico: Cube,
  steel_frame: Nut,
  alvenaria: Wall,
  tijolo_ecologico: Recycle,
  acabamentos: Sparkle,
  pintura: PaintRoller,
  gesso: Feather,
  drywall: Cards,
  design_interiores: Armchair,
  arquitetura: Compass,
  engenharia_civil: HardHat,
  engenharia_eletrica: Circuitry,
  engenharia_estrutural: Polygon,
  engenharia_hidraulica: Gauge,
  eletrica: Lightning,
  hidraulica: Drop,
  impermeabilizacao: Umbrella,
  cobertura: Warehouse,
  telhado: HouseLine,
  esquadrias: Door,
  vidracaria: DiamondsFour,
  revestimentos: Checkerboard,
  pisos: Footprints,
  marcenaria: Hammer,
  marmoraria: Diamond,
  serralheria: Flame,
  climatizacao: Snowflake,
  automacao: WifiHigh,
  energia_solar: Sun,
  piscinas: SwimmingPool,
  reformas: ArrowsClockwise,
  demolicao: Bomb,
  gerenciamento_obras: Kanban,
  planejamento_obras: CalendarCheck,
  orcamento_obras: Calculator,
  projetos: PencilLine,
  regularizacao_obras: Certificate,
  construcao_modular: Package,
  pre_fabricados: Crane,
  seguranca_eletronica: Camera,
  combate_incendio: Fire,
}

function getIconForArea(id: string) {
  return AREA_ICONS[id.toLowerCase()] || Stack
}

const GRUPOS_FILTRO = [
  { id: "todos", label: "Todas (45)" },
  { id: "Estrutura & Construção", label: "Estrutura" },
  { id: "Instalações & Engenharia", label: "Instalações" },
  { id: "Acabamentos & Interiores", label: "Acabamentos" },
  { id: "Planejamento & Projetos", label: "Projetos" },
  { id: "Áreas Externas & Especiais", label: "Externas" },
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

  const [openCity, setOpenCity] = useState(false)
  const [pesquisaArea, setPesquisaArea] = useState("")
  const [grupoSelecionado, setGrupoSelecionado] = useState("todos")

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
        const targetPath = pathname.startsWith("/sup") ? "/" : pathname
        router.push(`${targetPath}?${params.toString()}`)
      })
    },
    [pathname, router, searchParams, startTransition]
  )

  const cidade = searchParams.get("cidade") ?? ""
  const categoria = searchParams.get("categoria") ?? "todas"

  const hasActiveFilters = Boolean(
    cidade ||
    (categoria && categoria !== "todas")
  )

  const handleReset = () => {
    setPesquisaArea("")
    setGrupoSelecionado("todos")
    startTransition(() => {
      const targetPath = pathname.startsWith("/sup") ? "/" : pathname
      router.push(targetPath)
    })
    if (onApplyMobile) onApplyMobile()
  }

  // Filter 45 areas based on user query and group selection
  const filteredAreas = AREAS_OBRA.filter((area) => {
    const matchesGroup = grupoSelecionado === "todos" || area.grupo === grupoSelecionado
    if (!matchesGroup) return false

    if (!pesquisaArea.trim()) return true
    const q = pesquisaArea.toLowerCase().trim()
    return (
      area.label.toLowerCase().includes(q) ||
      area.descricao.toLowerCase().includes(q) ||
      area.tags.some((t) => t.toLowerCase().includes(q))
    )
  })

  // =========================================================================
  // RENDER: COLLAPSED RAIL MODE
  // =========================================================================
  if (collapsed) {
    return (
      <aside className={cn("flex flex-col items-center py-4 px-2 w-full text-foreground gap-4 rounded-none shadow-none", className)}>
        {/* Top Logo & Expand Button */}
        <div className="flex flex-col items-center gap-3 w-full border-b border-border pb-3">
          <Link
            href="/"
            title="Página Inicial OFIR"
            className="flex size-10 items-center justify-center rounded-none bg-primary text-primary-foreground font-bold shadow-none hover:opacity-90 transition-opacity"
          >
            <Buildings className="size-5" weight="bold" />
          </Link>

          {onToggleCollapse && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleCollapse}
              title="Expandir barra lateral"
              className="size-9 rounded-none text-muted-foreground hover:text-foreground hover:bg-secondary/70 transition-colors shadow-none"
            >
              <SidebarSimple className="size-5" weight="bold" />
            </Button>
          )}
        </div>

        {/* Location Popover in rail */}
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
            <MapPin className="size-4.5" weight="bold" />
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
                    <Check className={cn("ml-auto size-4", !cidade ? "opacity-100" : "opacity-0")} weight="bold" />
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
                        <Check className={cn("ml-auto size-4", cidade === c ? "opacity-100" : "opacity-0")} weight="bold" />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                ))}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {/* Separator */}
        <div className="w-8 border-b border-border my-1" />

        {/* Top 12 quick area icons in rail */}
        <div className="flex flex-col items-center gap-2 w-full overflow-y-auto max-h-[460px] scrollbar-none">
          <button
            type="button"
            onClick={() => updateParams({ categoria: "todas" })}
            title="Todas as 45 Etapas"
            className={cn(
              "flex w-12 h-12 items-center justify-center rounded-md transition-all shadow-none shrink-0",
              categoria === "todas" || !categoria
                ? "bg-primary text-primary-foreground font-semibold"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/70"
            )}
          >
            <Stack className="size-6 shrink-0" weight="thin" />
          </button>

          {AREAS_OBRA.slice(0, 15).map((area) => {
            const IconComp = getIconForArea(area.id)
            const isSelected = categoria === area.id
            return (
              <button
                key={area.id}
                type="button"
                onClick={() => updateParams({ categoria: area.id })}
                title={`${area.label} (R$ ${area.benchmarkPrecoM2}/m²)`}
                className={cn(
                  "flex w-12 h-12 items-center justify-center rounded-md transition-all shadow-none relative shrink-0",
                  isSelected
                    ? "bg-primary text-primary-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/70"
                )}
              >
                <IconComp className="size-6 shrink-0" weight={isSelected ? "regular" : "thin"} />
              </button>
            )
          })}
        </div>

        {hasActiveFilters && (
          <div className="mt-auto pt-3 border-t border-border w-full flex justify-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleReset}
              title="Limpar todos os filtros"
              className="size-9 rounded-none text-muted-foreground hover:text-primary hover:bg-secondary/70 transition-colors shadow-none"
            >
              <ArrowsClockwise className="size-4" weight="bold" />
            </Button>
          </div>
        )}
      </aside>
    )
  }

  // =========================================================================
  // RENDER: EXPANDED MODE (Barra lateral completa com as 45 Áreas)
  // =========================================================================
  return (
    <aside className={cn("flex flex-col gap-5 w-full text-foreground p-5 rounded-none shadow-none", className)}>
      {/* Brand & Collapse Header */}
      <div className="flex items-center justify-between border-b border-border pb-4">
        <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
          <div className="flex size-9 items-center justify-center rounded-none bg-primary text-primary-foreground font-bold shadow-none">
            <Buildings className="size-5" weight="bold" />
          </div>
          <div>
            <span className="font-heading text-xl font-bold tracking-tight text-foreground block leading-none">
              OFIR
            </span>
            <span className="text-[11px] font-medium text-muted-foreground tracking-wide block mt-1">
              Marketplace de Obras
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
              <ArrowsClockwise className="size-4" weight="bold" />
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
              <SidebarSimple className="size-4.5" weight="bold" />
            </Button>
          )}
        </div>
      </div>

      {/* 1. Condomínio / Cidade / Região Filter */}
      {cidades.length > 0 && (
        <div className="space-y-2 border-b border-border pb-5">
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <MapPin className="size-3.5 text-primary shrink-0" weight="bold" />
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
              <CaretDown className="ml-2 size-3.5 shrink-0 opacity-60" weight="bold" />
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
                        weight="bold"
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
                            weight="bold"
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

      {/* 2. 45 Etapas & Especialidades da Obra */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <Stack className="size-3.5 text-primary" weight="bold" />
            45 Áreas & Especialidades
          </label>
          <span className="text-[10px] text-muted-foreground font-mono">
            {filteredAreas.length} de 45
          </span>
        </div>

        {/* Mini Search within 45 areas */}
        <div className="relative">
          <MagnifyingGlass className="absolute left-2.5 top-2.5 size-3.5 text-muted-foreground" weight="bold" />
          <Input
            value={pesquisaArea}
            onChange={(e) => setPesquisaArea(e.target.value)}
            placeholder="Filtrar entre as 45 áreas..."
            className="h-8 pl-8 pr-7 text-xs bg-card border-border rounded-none shadow-none"
          />
          {pesquisaArea && (
            <button
              type="button"
              onClick={() => setPesquisaArea("")}
              className="absolute right-2 top-2 text-muted-foreground hover:text-foreground"
            >
              <X className="size-3.5" weight="bold" />
            </button>
          )}
        </div>

        {/* Group Filter Pills */}
        <div className="flex flex-wrap gap-1">
          {GRUPOS_FILTRO.map((g) => (
            <button
              key={g.id}
              type="button"
              onClick={() => setGrupoSelecionado(g.id)}
              className={cn(
                "text-[10px] px-2 py-1 rounded-none border transition-colors font-medium whitespace-nowrap",
                grupoSelecionado === g.id
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card border-border/70 hover:bg-secondary/60 text-muted-foreground hover:text-foreground"
              )}
            >
              {g.label}
            </button>
          ))}
        </div>

        {/* Clear Area Filter Button */}
        <button
          type="button"
          onClick={() => updateParams({ categoria: "todas" })}
          className={cn(
            "w-full flex items-center justify-between border px-3 py-3 text-sm transition-all text-left rounded-none shadow-none font-semibold",
            categoria === "todas" || !categoria
              ? "border-primary bg-primary/10 text-primary"
              : "border-border/60 bg-card hover:bg-secondary/70 text-foreground"
          )}
        >
          <div className="flex items-center gap-2">
            <Stack className="size-4" weight="bold" />
            <span>Todas as Especialidades</span>
          </div>
          {(categoria === "todas" || !categoria) && <Check className="size-4 text-primary shrink-0" weight="bold" />}
        </button>

        {/* List of 45 areas with benchmark price & icons */}
        <div className="flex flex-col gap-2 max-h-[calc(100vh-320px)] overflow-y-auto pr-1 [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: "none" }}>
          {filteredAreas.map((area) => {
            const IconComp = getIconForArea(area.id)
            const isSelected = categoria === area.id
            return (
              <button
                key={area.id}
                type="button"
                onClick={() => updateParams({ categoria: area.id })}
                className={cn(
                  "flex items-center justify-between border px-2.5 py-3 text-sm transition-all text-left rounded-none shadow-none group",
                  isSelected
                    ? "border-primary bg-primary/10 text-primary font-semibold"
                    : "border-border/60 bg-card hover:bg-secondary/70 text-foreground"
                )}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <IconComp className={cn("size-4 shrink-0", isSelected ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} weight={isSelected ? "regular" : "thin"} />
                  <span className="truncate font-medium">{area.label}</span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0 ml-1">
                  <span className="text-xs text-muted-foreground font-mono">
                    R$ {area.benchmarkPrecoM2}/m²
                  </span>
                  {isSelected && <Check className="size-3.5 text-primary shrink-0" weight="bold" />}
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </aside>
  )
}
