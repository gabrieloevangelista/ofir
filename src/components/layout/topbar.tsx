"use client"

import { useCallback, useEffect, useRef, useState, useTransition } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { ListFilter, Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet"

const CATEGORIA_OPTIONS = [
  { value: "todas", label: "Todas as categorias" },
  { value: "residencial", label: "Residencial" },
  { value: "comercial", label: "Comercial" },
  { value: "misto", label: "Misto" },
]

const PADRAO_OPTIONS = [
  { value: "todos", label: "Todos os padrões" },
  { value: "alto", label: "Alto Padrão" },
  { value: "medio", label: "Médio Padrão" },
  { value: "baixo", label: "Baixo Padrão" },
]

const STATUS_OPTIONS = [
  { value: "todos", label: "Todos os status" },
  { value: "lancamento", label: "Lançamento" },
  { value: "em_obras", label: "Em obras" },
  { value: "pronto_para_morar", label: "Pronto para morar" },
]

const ORDENAR_OPTIONS = [
  { value: "recentes", label: "Mais recentes" },
  { value: "menor_preco", label: "Menor orçamento" },
  { value: "maior_preco", label: "Maior orçamento" },
]

export function Topbar({ cidades }: { cidades: string[] }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [, startTransition] = useTransition()
  const [filtrosAbertos, setFiltrosAbertos] = useState(false)

  const [busca, setBusca] = useState(searchParams.get("busca") ?? "")
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString())
      for (const [key, value] of Object.entries(updates)) {
        if (!value || value === "todas" || value === "todos" || value === "recentes") {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [busca])

  const cidade = searchParams.get("cidade") ?? ""
  const status = searchParams.get("status") ?? "todos"
  const categoria = searchParams.get("categoria") ?? "todas"
  const ordenar = searchParams.get("ordenar") ?? "recentes"
  const padrao = searchParams.get("padrao") ?? "todos"

  const filtrosSecundariosAtivos = [cidade, status !== "todos" ? status : ""].filter(
    Boolean
  ).length

  const limparFiltrosSecundarios = () => {
    updateParams({ cidade: null, status: null })
  }

  return (
    <div className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="w-full flex flex-col gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar por construtor, especialidade, cidade..."
              className="pl-9 bg-card border-border/80 text-foreground"
              aria-label="Buscar construtores"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Select
              value={padrao}
              onValueChange={(value) => updateParams({ padrao: value as string })}
            >
              <SelectTrigger className="min-w-[9.5rem] bg-card border-border/80 text-foreground">
                <SelectValue placeholder="Padrão" />
              </SelectTrigger>
              <SelectContent>
                {PADRAO_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={categoria}
              onValueChange={(value) => updateParams({ categoria: value as string })}
            >
              <SelectTrigger className="min-w-[9.5rem] bg-card border-border/80 text-foreground">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIA_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={ordenar}
              onValueChange={(value) => updateParams({ ordenar: value as string })}
            >
              <SelectTrigger className="min-w-[9.5rem] bg-card border-border/80 text-foreground">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                {ORDENAR_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Sheet open={filtrosAbertos} onOpenChange={setFiltrosAbertos}>
              <SheetTrigger
                render={
                  <Button variant="outline" className="gap-1.5">
                    <ListFilter className="size-4" />
                    Filtros
                    {filtrosSecundariosAtivos > 0 ? (
                      <Badge className="ml-0.5 size-4 justify-center rounded-full p-0 text-[10px]">
                        {filtrosSecundariosAtivos}
                      </Badge>
                    ) : null}
                  </Button>
                }
              />
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filtros</SheetTitle>
                </SheetHeader>

                <div className="flex flex-col gap-5 px-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-muted-foreground">
                      Cidade
                    </label>
                    <Select
                      value={cidade || "todas-cidades"}
                      onValueChange={(value) =>
                        updateParams({
                          cidade: value === "todas-cidades" ? null : (value as string),
                        })
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Todas as cidades" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todas-cidades">Todas as cidades</SelectItem>
                        {cidades.map((c) => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-muted-foreground">
                      Status da obra
                    </label>
                    <Select
                      value={status}
                      onValueChange={(value) => updateParams({ status: value as string })}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        {STATUS_OPTIONS.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <SheetFooter className="flex-row justify-between">
                  <Button
                    variant="ghost"
                    onClick={limparFiltrosSecundarios}
                    className="gap-1.5"
                  >
                    <X className="size-4" />
                    Limpar
                  </Button>
                  <SheetClose render={<Button>Aplicar</Button>} />
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </div>
  )
}
