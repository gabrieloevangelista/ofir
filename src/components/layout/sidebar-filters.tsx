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

export function SidebarFilters({ cidades, className, onApplyMobile }: SidebarFiltersProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [, startTransition] = useTransition()

  const [busca, setBusca] = useState(searchParams.get("busca") ?? "")
  const [openCity, setOpenCity] = useState(false)
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
  const status = searchParams.get("status") ?? "todos"
  const categoria = searchParams.get("categoria") ?? "todas"
  const padrao = searchParams.get("padrao") ?? "todos"

  const hasActiveFilters = Boolean(cidade || (status && status !== "todos") || (categoria && categoria !== "todas") || (padrao && padrao !== "todos") || busca)

  const handleReset = () => {
    setBusca("")
    startTransition(() => {
      router.replace(pathname, { scroll: false })
    })
    if (onApplyMobile) onApplyMobile()
  }

  return (
    <aside className={cn("flex flex-col gap-6 w-full text-foreground rounded-none", className)}>
      {/* Brand Header */}
      <div className="flex items-center justify-between border-b border-border pb-4">
        <Link href="/" className="flex items-center gap-2.5 hover:opacity-90 transition-opacity">
          <div className="flex size-8 items-center justify-center bg-primary text-primary-foreground font-bold shadow-none rounded-none text-sm">
            ✦
          </div>
          <div>
            <span className="font-heading text-xl font-bold tracking-widest text-foreground block leading-none">
              OFIR
            </span>
          </div>
        </Link>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleReset}
            title="Limpar todos os filtros"
            className="size-7 rounded-none text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="size-3.5" />
          </Button>
        )}
      </div>

      {/* 1. Condomínio / Cidade / Região Filter FIRST */}
      {cidades.length > 0 && (
        <div className="space-y-1.5 border-b border-border pb-5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
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
                  className="w-full justify-between bg-card border-border rounded-none shadow-none font-medium text-foreground hover:bg-secondary/40 text-xs px-3 h-10"
                />
              }
            >
              {cidade && cidade !== "todas-cidades"
                ? cidade
                : "Todos os Condomínios e Cidades"}
              <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
            </PopoverTrigger>
            <PopoverContent className="w-full p-0 rounded-none border-border" align="start">
              <Command>
                <CommandInput placeholder="Buscar condomínio ou cidade..." className="h-9 text-xs" />
                <CommandList>
                  <CommandEmpty>Nenhum local encontrado.</CommandEmpty>
                  <CommandGroup>
                    <CommandItem
                      value="todas-cidades"
                      onSelect={(currentValue) => {
                        updateParams({ cidade: null })
                        setOpenCity(false)
                      }}
                      className="rounded-none cursor-pointer text-xs"
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
                    <CommandGroup key={grupo.regiao} heading={`📍 ${grupo.regiao}`}>
                      {grupo.locais.map((c) => (
                        <CommandItem
                          key={c}
                          value={c}
                          onSelect={(currentValue) => {
                            updateParams({ cidade: c })
                            setOpenCity(false)
                          }}
                          className="rounded-none cursor-pointer text-xs"
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
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
          Buscar Construtora / Empresa
        </label>
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Construtora, engenharia, arquiteto..."
            className="pl-9 pr-8 bg-card border-border text-sm placeholder:text-muted-foreground/70 rounded-none"
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

      {/* 3. Padrão de Construção Filter Cards */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <SlidersHorizontal className="size-3 text-primary" />
            Padrão de Construção
          </label>
          {padrao !== "todos" && (
            <button
              type="button"
              onClick={() => updateParams({ padrao: null })}
              className="text-[10px] text-primary hover:underline font-semibold"
            >
              Limpar
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 gap-1.5">
          {/* Alto Padrão */}
          <button
            type="button"
            onClick={() => updateParams({ padrao: padrao === "alto" ? null : "alto" })}
            className={cn(
              "flex items-center justify-between border p-2.5 text-left transition-all duration-150 rounded-none group",
              padrao === "alto"
                ? "border-amber-500 bg-amber-500/10 text-amber-900 dark:text-amber-300 font-semibold"
                : "border-border bg-card hover:bg-secondary/40"
            )}
          >
            <div className="flex items-center gap-2.5">
              <div
                className={cn(
                  "flex size-7 items-center justify-center rounded-none transition-colors",
                  padrao === "alto" ? "bg-amber-500 text-white" : "bg-amber-500/10 text-amber-600 group-hover:bg-amber-500 group-hover:text-white"
                )}
              >
                <Crown className="size-3.5 shrink-0" />
              </div>
              <span className="font-heading text-xs font-semibold text-foreground">Alto Padrão</span>
            </div>
            {padrao === "alto" && <Check className="size-3.5 text-amber-500" />}
          </button>

          {/* Médio Padrão */}
          <button
            type="button"
            onClick={() => updateParams({ padrao: padrao === "medio" ? null : "medio" })}
            className={cn(
              "flex items-center justify-between border p-2.5 text-left transition-all duration-150 rounded-none group",
              padrao === "medio"
                ? "border-slate-600 bg-slate-500/10 text-slate-900 dark:text-slate-200 font-semibold"
                : "border-border bg-card hover:bg-secondary/40"
            )}
          >
            <div className="flex items-center gap-2.5">
              <div
                className={cn(
                  "flex size-7 items-center justify-center rounded-none transition-colors",
                  padrao === "medio" ? "bg-slate-700 text-white" : "bg-slate-500/10 text-slate-600 group-hover:bg-slate-700 group-hover:text-white"
                )}
              >
                <Sparkles className="size-3.5 shrink-0" />
              </div>
              <span className="font-heading text-xs font-semibold text-foreground">Médio Padrão</span>
            </div>
            {padrao === "medio" && <Check className="size-3.5 text-slate-600" />}
          </button>

          {/* Baixo Padrão */}
          <button
            type="button"
            onClick={() => updateParams({ padrao: padrao === "baixo" ? null : "baixo" })}
            className={cn(
              "flex items-center justify-between border p-2.5 text-left transition-all duration-150 rounded-none group",
              padrao === "baixo"
                ? "border-emerald-500 bg-emerald-500/10 text-emerald-900 dark:text-emerald-300 font-semibold"
                : "border-border bg-card hover:bg-secondary/40"
            )}
          >
            <div className="flex items-center gap-2.5">
              <div
                className={cn(
                  "flex size-7 items-center justify-center rounded-none transition-colors",
                  padrao === "baixo" ? "bg-emerald-600 text-white" : "bg-emerald-500/10 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white"
                )}
              >
                <Leaf className="size-3.5 shrink-0" />
              </div>
              <span className="font-heading text-xs font-semibold text-foreground">Baixo Padrão</span>
            </div>
            {padrao === "baixo" && <Check className="size-3.5 text-emerald-600" />}
          </button>
        </div>
      </div>

      {/* 4. Etapas Desmembradas da Obra */}
      <div className="space-y-2">
        <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
          Etapas Desmembradas da Obra
        </label>
        <div className="flex flex-col gap-1">
          {ETAPAS_OBRA.map((item) => {
            const IconComp = item.icon
            const isSelected = categoria === item.id
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => updateParams({ categoria: item.id })}
                className={cn(
                  "flex items-center justify-between border px-3 py-2 text-xs transition-all text-left rounded-none",
                  isSelected
                    ? "border-primary bg-primary/10 text-primary font-semibold"
                    : "border-border/50 bg-card hover:bg-secondary/50 text-muted-foreground hover:text-foreground"
                )}
              >
                <div className="flex items-center gap-2">
                  <IconComp className="size-3.5 shrink-0" />
                  <span className="text-[11px] font-medium">{item.label}</span>
                </div>
                {isSelected && <Check className="size-3.5 text-primary" />}
              </button>
            )
          })}
        </div>
      </div>

    </aside>
  )
}
