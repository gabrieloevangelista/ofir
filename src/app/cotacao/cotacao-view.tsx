"use client"
 
import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import {
  Calculator,
  Trash2,
  ArrowLeft,
  Building2,
  MapPin,
  MessageCircle,
  ExternalLink,
  Printer,
  Copy,
  Check,
  Sparkles,
  Layers,
  Ruler,
  AlertCircle,
  Building,
  Lock,
  LogIn,
  UserCheck,
  ShieldAlert,
  Filter
} from "lucide-react"
import { useCotacao, CotacaoItem } from "@/contexts/cotacao-context"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { formatValorMetroQuadrado, formatCategoriaLabel, formatLocalizacao, cn } from "@/lib/utils"

export function CotacaoView() {
  const { isAuthenticated, openLoginModal } = useAuth()
  const { items, removeItem, clearCotacao, totalPrecoM2, itemCount, calcularOrcamentoTotal } = useCotacao()
  const [areaM2, setAreaM2] = useState<number>(200)
  const [copied, setCopied] = useState(false)
  const searchParams = useSearchParams()

  const categoriaFiltro = searchParams.get("categoria")
  const cidadeFiltro = searchParams.get("cidade")

  const displayedItems = items.filter((it) => {
    if (categoriaFiltro && categoriaFiltro !== "todas" && it.categoria !== categoriaFiltro) return false
    if (cidadeFiltro && cidadeFiltro !== "todas-cidades" && it.cidade !== cidadeFiltro) return false
    return true
  })

  const orcamentoTotal = calcularOrcamentoTotal(areaM2)

  const handlePrint = () => {
    if (!isAuthenticated) {
      openLoginModal()
      return
    }
    window.print()
  }

  const handleCopySummary = () => {
    if (!isAuthenticated) {
      openLoginModal()
      return
    }
    const lines = [
      `📋 *COTAÇÃO CONSOLIDADA — OFIR OBRAS*`,
      `Área estimada da obra: ${areaM2} m²`,
      `Total de Fornecedores Selecionados: ${itemCount}`,
      `Soma da mão de obra por m²: R$ ${totalPrecoM2.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}/m²`,
      `💰 *ORÇAMENTO ESTIMADO TOTAL: R$ ${orcamentoTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}*`,
      ``,
      `*FORNECEDORES & ETAPAS:*`,
      ...items.map((it, idx) => {
        const subtotal = (it.preco_a_partir || 0) * areaM2
        return `${idx + 1}. ${it.empresaNome} (${formatCategoriaLabel(it.categoria)}) — ${it.cidade}/${it.estado}\n   Valor: ${it.preco_a_partir ? `R$ ${it.preco_a_partir.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}/m² (Subtotal: R$ ${subtotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })})` : "Sob Consulta"}`
      }),
      ``,
      `Gerado via OFIR Marketplace`,
    ]

    navigator.clipboard.writeText(lines.join("\n"))
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  if (itemCount === 0) {
    return (
      <div className="w-full py-12 px-4 flex flex-col items-center justify-center text-center">
        <div className="size-20 border-2 border-dashed border-primary/40 bg-primary/5 flex items-center justify-center mb-6">
          <Calculator className="size-10 text-primary" />
        </div>
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
          Sua Cotação está Vazia
        </h2>
        <p className="mt-2 max-w-md text-sm sm:text-base text-muted-foreground">
          Nenhum fornecedor adicionado ainda. Navegue pelas etapas da obra no marketplace e clique no botão <span className="font-semibold text-foreground">“Cotar”</span> nos fornecedores desejados para somar seus orçamentos automaticamente.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link href="/">
            <Button className="rounded-none font-semibold px-6 h-11 shadow-none">
              <Building className="size-4 mr-2" />
              Explorar Fornecedores
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full flex flex-col gap-8 pb-16">
      {/* Top Header Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border/70 pb-5">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground mb-2"
          >
            <ArrowLeft className="size-4" />
            Voltar para a busca
          </Link>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
            Cotação & Orçamento Consolidado
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Simulação de custos combinando a mão de obra dos fornecedores selecionados.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopySummary}
            className="rounded-none shadow-none text-xs font-semibold h-9"
          >
            {copied ? (
              <>
                <Check className="size-3.5 mr-1.5 text-emerald-600" />
                <span>Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="size-3.5 mr-1.5" />
                <span>Copiar Resumo</span>
              </>
            )}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handlePrint}
            className="rounded-none shadow-none text-xs font-semibold h-9 hidden sm:inline-flex"
          >
            <Printer className="size-3.5 mr-1.5" />
            <span>Imprimir</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={clearCotacao}
            className="rounded-none shadow-none text-xs text-destructive hover:text-destructive hover:bg-destructive/10 h-9"
          >
            <Trash2 className="size-3.5 mr-1.5" />
            <span>Limpar Tudo</span>
          </Button>
        </div>
      </div>

      {/* Non-authenticated Alert Banner */}
      {!isAuthenticated && (
        <div className="bg-primary/10 border border-primary/30 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="size-9 bg-primary text-primary-foreground flex items-center justify-center shrink-0">
              <Lock className="size-4.5" />
            </div>
            <div>
              <h3 className="font-heading text-base font-bold text-foreground">
                Preços e Orçamento Bloqueados
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Para visualizar os valores por m² e o orçamento consolidado dos fornecedores selecionados, faça login ou acesse com uma conta de teste.
              </p>
            </div>
          </div>
          <Button
            type="button"
            onClick={openLoginModal}
            className="rounded-none font-semibold text-xs h-10 px-5 shadow-none shrink-0"
          >
            <UserCheck className="size-4 mr-2" />
            Desbloquear Preços (Login Demo)
          </Button>
        </div>
      )}

      {/* KPI & Budget Calculator Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* KPI 1: Quantidade de Empresas */}
        <Card className="rounded-none border-border shadow-none bg-card">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-xs font-semibold uppercase tracking-wider">Fornecedores Cotados</span>
              <Building2 className="size-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="font-heading text-3xl font-bold text-foreground">
              {itemCount} <span className="text-sm font-normal text-muted-foreground">{itemCount === 1 ? "empresa" : "empresas"}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Etapas selecionadas para sua obra
            </p>
          </CardContent>
        </Card>

        {/* KPI 2: Soma da Taxa por m² */}
        <Card className="rounded-none border-border shadow-none bg-card">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-xs font-semibold uppercase tracking-wider">Mão de Obra Total / m²</span>
              <Layers className="size-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            {isAuthenticated ? (
              <>
                <div className="font-heading text-3xl font-bold text-foreground">
                  R$ {totalPrecoM2.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  <span className="text-sm font-normal text-muted-foreground"> / m²</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Soma das taxas por metro quadrado
                </p>
              </>
            ) : (
              <div onClick={openLoginModal} className="cursor-pointer">
                <div className="font-heading text-2xl font-bold text-muted-foreground blur-[6px] select-none">
                  R$ 3.850,00 / m²
                </div>
                <p className="text-xs text-primary font-bold mt-1 flex items-center gap-1">
                  <Lock className="size-3" /> Login para liberar
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* KPI 3: Orçamento Total Estimado */}
        <Card className="rounded-none border-primary/40 bg-primary/5 shadow-none border">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between text-primary">
              <span className="text-xs font-bold uppercase tracking-wider">Orçamento Estimado Total</span>
              <Calculator className="size-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            {isAuthenticated ? (
              <>
                <div className="font-heading text-3xl font-bold text-primary">
                  R$ {orcamentoTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </div>
                <p className="text-xs text-primary/80 font-medium mt-1">
                  Para {areaM2} m² de área construída
                </p>
              </>
            ) : (
              <div onClick={openLoginModal} className="cursor-pointer">
                <div className="font-heading text-2xl font-bold text-primary blur-[6px] select-none">
                  R$ 770.000,00
                </div>
                <p className="text-xs text-primary font-bold mt-1 flex items-center gap-1">
                  <Lock className="size-3" /> Login para liberar
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Simulator Control Bar */}
      <Card className="rounded-none border-border shadow-none bg-card p-4 sm:p-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 border border-primary/20">
              <Ruler className="size-5 text-primary" />
            </div>
            <div>
              <h3 className="font-heading text-base font-bold text-foreground">
                Simulador de Metragem da Obra
              </h3>
              <p className="text-xs text-muted-foreground">
                Ajuste a metragem estimada do seu projeto para recalcular os subtotais e o total.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-muted-foreground uppercase">Área:</span>
              <div className="relative w-28">
                <Input
                  type="number"
                  min={10}
                  max={5000}
                  step={10}
                  value={areaM2}
                  onChange={(e) => setAreaM2(Number(e.target.value) || 0)}
                  className="rounded-none text-right pr-8 font-bold h-10 border-border bg-background shadow-none"
                />
                <span className="absolute right-2.5 top-2.5 text-xs text-muted-foreground pointer-events-none font-medium">
                  m²
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {[100, 150, 200, 300, 450].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setAreaM2(preset)}
                  className={`text-xs px-2.5 py-1.5 border transition-colors font-medium rounded-none ${
                    areaM2 === preset
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background hover:bg-secondary border-border text-muted-foreground"
                  }`}
                >
                  {preset}m²
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Items Breakdown List */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <h2 className="font-heading text-xl font-bold text-foreground">
              Detalhamento por Fornecedor ({displayedItems.length}{displayedItems.length !== items.length ? ` de ${items.length}` : ""})
            </h2>
            {(categoriaFiltro || cidadeFiltro) && (
              <Badge variant="secondary" className="rounded-none text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                <Filter className="size-3 mr-1" />
                Filtro Ativo: {categoriaFiltro ? formatCategoriaLabel(categoriaFiltro) : ""} {cidadeFiltro ? `• ${cidadeFiltro}` : ""}
              </Badge>
            )}
          </div>
          <span className="text-xs text-muted-foreground">
            Subtotais baseados em {areaM2} m²
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {displayedItems.length === 0 ? (
            <div className="p-8 text-center border border-dashed border-border bg-card">
              <p className="text-sm text-muted-foreground">
                Nenhum fornecedor cotado encontrado para o filtro selecionado.
              </p>
            </div>
          ) : (
            displayedItems.map((item) => {
              const subtotal = (item.preco_a_partir || 0) * areaM2
              const cleanPhone = (item.whatsapp || item.telefone || "5511998765432").replace(/\D/g, "")
              const whatsAppHref = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                `Olá! Selecionei a empresa ${item.empresaNome} na cotação da plataforma OFIR para minha obra em ${item.cidade}. Meu projeto tem aproximadamente ${areaM2}m² e gostaria de formalizar um orçamento.`
              )}`

              return (
                <Card
                  key={item.id}
                  className="rounded-none border-border shadow-none bg-card hover:border-primary/40 transition-colors"
                >
                  <CardContent className="p-4 sm:p-5">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
                      {/* Left: Image & Info */}
                      <div className="flex items-start gap-4 min-w-0">
                        <div className="relative size-16 sm:size-20 shrink-0 overflow-hidden border border-border bg-muted">
                          <Image
                            src={item.cover_image_url || "/icon.svg"}
                            alt={item.empresaNome}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <Badge variant="outline" className="rounded-none text-[11px] font-medium px-2 py-0.5">
                              {formatCategoriaLabel(item.categoria)}
                            </Badge>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <MapPin className="size-3 text-primary" />
                              {formatLocalizacao(item.cidade, item.estado)}
                            </span>
                          </div>

                          <Link
                            href={`/sup/${item.slug}`}
                            className="font-heading text-lg font-bold text-foreground hover:text-primary transition-colors flex items-center gap-1.5 group"
                          >
                            <span className="truncate">{item.empresaNome}</span>
                            <ExternalLink className="size-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-primary shrink-0" />
                          </Link>
                          <p className="text-xs text-muted-foreground mt-0.5 truncate">
                            {item.nome}
                          </p>
                        </div>
                      </div>

                      {/* Right: Values & Actions */}
                      <div className="flex flex-wrap items-center justify-between md:justify-end gap-6 border-t md:border-t-0 pt-3 md:pt-0 border-border/60">
                        <div className="text-left md:text-right">
                          <span className="text-[11px] uppercase tracking-wider text-muted-foreground block font-semibold">
                            Taxa Estimada
                          </span>
                          {isAuthenticated ? (
                            <>
                              <span className="font-heading text-base font-bold text-foreground">
                                {item.preco_a_partir ? formatValorMetroQuadrado(item.preco_a_partir) : "Sob Consulta"}
                              </span>
                              {item.preco_a_partir ? (
                                <span className="text-xs text-primary font-semibold block mt-0.5">
                                  Subtotal: R$ {subtotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                                </span>
                              ) : null}
                            </>
                          ) : (
                            <div onClick={openLoginModal} className="cursor-pointer">
                              <span className="font-heading text-base font-bold text-muted-foreground blur-[4px] select-none">
                                R$ 850,00 / m²
                              </span>
                              <span className="text-[11px] text-primary font-bold flex items-center gap-1 justify-start md:justify-end mt-0.5">
                                <Lock className="size-3" /> Login para ver
                              </span>
                            </div>
                          )}
                        </div>

                      <div className="flex items-center gap-2">
                        {isAuthenticated ? (
                          <a
                            href={whatsAppHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-none bg-emerald-600 hover:bg-emerald-700 text-white transition-colors shadow-none"
                            title="Falar no WhatsApp sobre este orçamento"
                          >
                            <MessageCircle className="size-3.5" />
                            <span>WhatsApp</span>
                          </a>
                        ) : (
                          <Button
                            onClick={openLoginModal}
                            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-none bg-emerald-600 hover:bg-emerald-700 text-white transition-colors shadow-none h-auto"
                            title="Fazer login para conversar no WhatsApp"
                          >
                            <MessageCircle className="size-3.5" />
                            <span>WhatsApp</span>
                          </Button>
                        )}

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id)}
                          className="size-8 rounded-none text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors shadow-none"
                          title="Remover da cotação"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          }))}
        </div>
      </div>

      {/* Summary Footer Callout */}
      <div className="bg-secondary/40 border border-border p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 className="font-heading text-base font-bold text-foreground">
            Deseja fechar contrato com estes fornecedores?
          </h4>
          <p className="text-xs text-muted-foreground mt-1">
            Entre em contato diretamente via WhatsApp com cada fornecedor acima para agendar visitas técnicas e formalizar propostas.
          </p>
        </div>
        <Link href="/">
          <Button variant="outline" className="rounded-none border-border shadow-none text-xs font-semibold whitespace-nowrap">
            Adicionar Mais Fornecedores
          </Button>
        </Link>
      </div>
    </div>
  )
}
