"use client"
 
import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import {
  Calculator,
  Trash,
  ArrowLeft,
  Buildings,
  MapPin,
  WhatsappLogo,
  ArrowSquareOut,
  Printer,
  Copy,
  Check,
  Sparkle,
  Ruler,
  LockKey,
  UserCheck,
  Funnel,
  Scales,
  SealCheck,
  Lightning,
  LightbulbFilament,
  WarningCircle,
  TrendUp,
  ShieldCheck,
} from "@phosphor-icons/react"
import { useCotacao, CotacaoItem } from "@/contexts/cotacao-context"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { formatValorMetroQuadrado, formatCategoriaLabel, formatLocalizacao, cn } from "@/lib/utils"
import { analisarCotacao } from "@/lib/cotacao-analise"

export function CotacaoView() {
  const { isAuthenticated, openLoginModal } = useAuth()
  const { items, removeItem, clearCotacao, totalPrecoM2, itemCount, calcularOrcamentoTotal } = useCotacao()
  const [areaM2, setAreaM2] = useState<number>(200)
  const [copied, setCopied] = useState(false)
  const [dataEmissao, setDataEmissao] = useState<string>("")
  const searchParams = useSearchParams()

  React.useEffect(() => {
    const agora = new Date()
    setDataEmissao(
      agora.toLocaleDateString("pt-BR") + " às " + agora.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
    )
  }, [])

  const categoriaFiltro = searchParams.get("categoria")
  const cidadeFiltro = searchParams.get("cidade")

  const displayedItems = items.filter((it) => {
    if (categoriaFiltro && categoriaFiltro !== "todas" && it.categoria !== categoriaFiltro) return false
    if (cidadeFiltro && cidadeFiltro !== "todas-cidades" && it.cidade !== cidadeFiltro) return false
    return true
  })

  const orcamentoTotal = calcularOrcamentoTotal(areaM2)
  const analise = analisarCotacao(items, areaM2)

  const handlePrint = () => {
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
      `*ANÁLISE COMPARATIVA DO MOTOR OFIR:*`,
      `• Custo-Benefício (${analise.custoBeneficio.score}/100): ${analise.custoBeneficio.nivel} — ${analise.custoBeneficio.resumo}`,
      `• Qualidade (${analise.qualidade.score}/100): ${analise.qualidade.nivel} — ${analise.qualidade.resumo}`,
      `• Velocidade (${analise.velocidade.score}/100): ${analise.velocidade.nivel} — ${analise.velocidade.resumo}`,
      ``,
      `*PARECER TÉCNICO & CONSELHO:*`,
      `${analise.conselhoPratico.recomendacao}`,
      `${analise.conselhoPratico.dicaNegociacao}`,
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
        <div className="size-20 border-2 border-dashed border-primary/40 bg-primary/5 flex items-center justify-center mb-6 rounded-none">
          <Calculator className="size-10 text-primary" weight="bold" />
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
              <Buildings className="size-4 mr-2" weight="bold" />
              Explorar Fornecedores
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full flex flex-col gap-8 pb-16 print:p-0 print:m-0 print:gap-0 print:pb-0">
      {/* Top Header Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border/70 pb-5 print:hidden">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground mb-2"
          >
            <ArrowLeft className="size-4" weight="bold" />
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
                <Check className="size-3.5 mr-1.5 text-emerald-600" weight="bold" />
                <span>Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="size-3.5 mr-1.5" weight="bold" />
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
            <Printer className="size-3.5 mr-1.5" weight="bold" />
            <span>Imprimir</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={clearCotacao}
            className="rounded-none shadow-none text-xs text-destructive hover:text-destructive hover:bg-destructive/10 h-9"
          >
            <Trash className="size-3.5 mr-1.5" weight="bold" />
            <span>Limpar Tudo</span>
          </Button>
        </div>
      </div>

      {/* Non-authenticated Alert Banner */}
      {!isAuthenticated && (
        <div className="bg-primary/10 border border-primary/30 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
          <div className="flex items-start gap-3">
            <div className="size-9 bg-primary text-primary-foreground flex items-center justify-center shrink-0">
              <LockKey className="size-5" weight="bold" />
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
            <UserCheck className="size-4 mr-2" weight="bold" />
            Desbloquear Preços (Login Demo)
          </Button>
        </div>
      )}

      {/* KPI & Budget Calculator Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 print:hidden">
        {/* KPI 1: Quantidade de Empresas */}
        <Card className="rounded-none border-border shadow-none bg-card">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-xs font-semibold uppercase tracking-wider">Fornecedores Cotados</span>
              <Buildings className="size-4 text-primary" weight="bold" />
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
              <TrendUp className="size-4 text-primary" weight="bold" />
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
                  <LockKey className="size-3" weight="bold" /> Login para liberar
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
              <Calculator className="size-4 text-primary" weight="bold" />
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
                  <LockKey className="size-3" weight="bold" /> Login para liberar
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Simulator Control Bar */}
      <Card className="rounded-none border-border shadow-none bg-card p-4 sm:p-5 print:hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 border border-primary/20">
              <Ruler className="size-5 text-primary" weight="bold" />
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

      {/* ========================================================================= */}
      {/* NOVO: PARECER TÉCNICO & ANÁLISE COMPARATIVA DA COTAÇÃO (CUSTO-BENEFÍCIO, QUALIDADE, VELOCIDADE) */}
      {/* ========================================================================= */}
      <div className="flex flex-col gap-4 border border-border bg-card p-5 sm:p-6 rounded-none print:hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/70 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-primary/10 border border-primary/20 text-primary">
              <Sparkle className="size-5" weight="bold" />
            </div>
            <div>
              <h2 className="font-heading text-lg sm:text-xl font-bold text-foreground tracking-tight">
                Análise Comparativa & Sugestão Técnica da Cotação
              </h2>
              <p className="text-xs text-muted-foreground">
                Avaliação computada sobre os {itemCount} fornecedores selecionados e a área de {areaM2}m².
              </p>
            </div>
          </div>
          <Badge variant="outline" className="rounded-none font-semibold text-xs border-primary/40 text-primary bg-primary/5 self-start sm:self-auto px-2.5 py-1">
            Motor de Inteligência OFIR
          </Badge>
        </div>

        {/* 3 Comparative Cards: Custo-Benefício, Qualidade, Velocidade */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* 1. Custo-Benefício */}
          <div className="border border-border/80 bg-background/50 p-4 flex flex-col justify-between rounded-none">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <Scales className="size-4.5 text-primary" weight="bold" />
                  <span className="font-heading text-sm font-bold text-foreground">Custo-Benefício</span>
                </div>
                <span className="font-mono text-xs font-bold px-2 py-0.5 bg-primary/10 text-primary border border-primary/20">
                  {analise.custoBeneficio.score}/100
                </span>
              </div>
              <div className="w-full bg-secondary h-1.5 mb-3 rounded-none overflow-hidden">
                <div
                  className="bg-primary h-full transition-[color,background-color,border-color,box-shadow,transform] duration-500"
                  style={{ width: `${analise.custoBeneficio.score}%` }}
                />
              </div>
              <p className="text-xs font-bold text-primary mb-1">{analise.custoBeneficio.nivel}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {analise.custoBeneficio.resumo}
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-border/50 text-[11px] text-muted-foreground">
              <span className="font-semibold text-foreground">Ponto forte:</span> {analise.custoBeneficio.destaque}
            </div>
          </div>

          {/* 2. Qualidade & Reputação */}
          <div className="border border-border/80 bg-background/50 p-4 flex flex-col justify-between rounded-none">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <SealCheck className="size-4.5 text-emerald-600" weight="bold" />
                  <span className="font-heading text-sm font-bold text-foreground">Qualidade Técnica</span>
                </div>
                <span className="font-mono text-xs font-bold px-2 py-0.5 bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                  {analise.qualidade.score}/100
                </span>
              </div>
              <div className="w-full bg-secondary h-1.5 mb-3 rounded-none overflow-hidden">
                <div
                  className="bg-emerald-600 h-full transition-[color,background-color,border-color,box-shadow,transform] duration-500"
                  style={{ width: `${analise.qualidade.score}%` }}
                />
              </div>
              <p className="text-xs font-bold text-emerald-600 mb-1">{analise.qualidade.nivel}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {analise.qualidade.resumo}
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-border/50 text-[11px] text-muted-foreground">
              <span className="font-semibold text-foreground">Garantia:</span> {analise.qualidade.destaque}
            </div>
          </div>

          {/* 3. Velocidade & Prazos */}
          <div className="border border-border/80 bg-background/50 p-4 flex flex-col justify-between rounded-none">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <Lightning className="size-4.5 text-amber-500" weight="bold" />
                  <span className="font-heading text-sm font-bold text-foreground">Velocidade & Prazos</span>
                </div>
                <span className="font-mono text-xs font-bold px-2 py-0.5 bg-amber-500/10 text-amber-500 border border-amber-500/20">
                  {analise.velocidade.score}/100
                </span>
              </div>
              <div className="w-full bg-secondary h-1.5 mb-3 rounded-none overflow-hidden">
                <div
                  className="bg-amber-500 h-full transition-[color,background-color,border-color,box-shadow,transform] duration-500"
                  style={{ width: `${analise.velocidade.score}%` }}
                />
              </div>
              <p className="text-xs font-bold text-amber-600 mb-1">{analise.velocidade.nivel}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {analise.velocidade.resumo}
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-border/50 text-[11px] text-muted-foreground">
              <span className="font-semibold text-foreground">Produtividade:</span> {analise.velocidade.destaque}
            </div>
          </div>
        </div>

        {/* Conselho Prático & Alertas de Engenharia */}
        <div className="mt-2 bg-secondary/40 border border-border/80 p-4 sm:p-5 flex flex-col gap-3 rounded-none">
          <div className="flex items-start gap-3">
            <div className="p-1.5 bg-primary/10 text-primary shrink-0 mt-0.5">
              <LightbulbFilament className="size-4.5" weight="bold" />
            </div>
            <div className="flex-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-primary">
                {analise.conselhoPratico.titulo}
              </h4>
              <p className="text-xs sm:text-sm font-medium text-foreground mt-1 leading-relaxed">
                {analise.conselhoPratico.recomendacao}
              </p>
              <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                {analise.conselhoPratico.dicaNegociacao}
              </p>
            </div>
          </div>

          {/* Avisos de etapas críticas faltantes se existirem */}
          {analise.conselhoPratico.etapasCriticasAvisos.length > 0 && (
            <div className="mt-2 pt-3 border-t border-border/60 flex flex-col gap-2">
              {analise.conselhoPratico.etapasCriticasAvisos.map((aviso, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-amber-700 dark:text-amber-400">
                  <WarningCircle className="size-4 shrink-0 mt-0.5" weight="bold" />
                  <span>{aviso}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Items Breakdown List */}
      <div className="flex flex-col gap-4 print:hidden">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <h2 className="font-heading text-xl font-bold text-foreground">
              Detalhamento por Fornecedor ({displayedItems.length}{displayedItems.length !== items.length ? ` de ${items.length}` : ""})
            </h2>
            {(categoriaFiltro || cidadeFiltro) && (
              <Badge variant="secondary" className="rounded-none text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                <Funnel className="size-3 mr-1" weight="bold" />
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
                              <MapPin className="size-3 text-primary" weight="bold" />
                              {formatLocalizacao(item.cidade, item.estado)}
                            </span>
                          </div>

                          <Link
                            href={`/sup/${item.slug}`}
                            className="font-heading text-lg font-bold text-foreground hover:text-primary transition-colors flex items-center gap-1.5 group"
                          >
                            <span className="truncate">{item.empresaNome}</span>
                            <ArrowSquareOut className="size-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-primary shrink-0" weight="bold" />
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
                                <LockKey className="size-3" weight="bold" /> Login para ver
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
                              <WhatsappLogo className="size-3.5" weight="bold" />
                              <span>WhatsApp</span>
                            </a>
                          ) : (
                            <Button
                              onClick={openLoginModal}
                              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-none bg-emerald-600 hover:bg-emerald-700 text-white transition-colors shadow-none h-auto"
                              title="Fazer login para conversar no WhatsApp"
                            >
                              <WhatsappLogo className="size-3.5" weight="bold" />
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
                            <Trash className="size-4" weight="bold" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })
          )}
        </div>
      </div>

      {/* Summary Footer Callout */}
      <div className="bg-secondary/40 border border-border p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
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

      {/* ========================================================================= */}
      {/* CUSTOM PRINT LAYOUT: MINIMALISTA, SIMPLES, COMPACTO (A4 OTIMIZADO) */}
      {/* ========================================================================= */}
      <div className="hidden print:block w-full text-neutral-900 font-sans text-xs space-y-4 pt-1">
        {/* Cabeçalho Minimalista Técnico */}
        <div className="border-b-2 border-black pb-2.5 flex items-end justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black tracking-tighter uppercase font-heading">OFIR</span>
              <span className="text-neutral-400">|</span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-800">
                Marketplace de Construtoras & Fornecedores
              </span>
            </div>
            <p className="text-[10px] text-neutral-600 mt-0.5">
              Relatório Paramétrico de Cotação e Orçamento de Mão de Obra
            </p>
          </div>
          <div className="text-right text-[10px] text-neutral-600 space-y-0.5 font-mono">
            <div><strong>Emissão:</strong> {dataEmissao || "—"}</div>
            <div><strong>Ref. Cotação:</strong> COT-{new Date().getFullYear()}-{String(items.length).padStart(2, "0")}</div>
          </div>
        </div>

        {/* Resumo Paramétrico Executivo - 4 Colunas Compactas */}
        <div className="grid grid-cols-4 border border-neutral-300 divide-x divide-neutral-300 text-center bg-neutral-50/70 print-avoid-break">
          <div className="py-2 px-2">
            <span className="text-[9px] uppercase tracking-wider text-neutral-500 font-semibold block">Área do Projeto</span>
            <span className="text-base font-bold text-black">{areaM2} m²</span>
          </div>
          <div className="py-2 px-2">
            <span className="text-[9px] uppercase tracking-wider text-neutral-500 font-semibold block">Etapas Cotadas</span>
            <span className="text-base font-bold text-black">{items.length} {items.length === 1 ? "empresa" : "empresas"}</span>
          </div>
          <div className="py-2 px-2">
            <span className="text-[9px] uppercase tracking-wider text-neutral-500 font-semibold block">Mão de Obra Total</span>
            <span className="text-base font-bold text-black">
              R$ {totalPrecoM2.toLocaleString("pt-BR", { minimumFractionDigits: 2 })} <span className="text-[10px] font-normal text-neutral-600">/ m²</span>
            </span>
          </div>
          <div className="py-2 px-2 bg-neutral-100">
            <span className="text-[9px] uppercase tracking-wider text-neutral-700 font-bold block">Orçamento Estimado</span>
            <span className="text-base font-extrabold text-black">
              R$ {orcamentoTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        {/* Diagnóstico Técnico do Motor OFIR (Compacto & Minimalista) */}
        <div className="border border-neutral-300 p-3 space-y-2 print-avoid-break">
          <div className="flex items-center justify-between border-b border-neutral-200 pb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-800">
              Parecer Técnico do Motor OFIR (Avaliação de Engenharia)
            </span>
            <span className="text-[9px] text-neutral-500 font-mono">
              Compatibilização Paramétrica
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3 text-[10px]">
            <div className="border-r border-neutral-200 pr-2">
              <div className="font-bold text-neutral-900">
                Custo-Benefício: <span className="font-mono">{analise.custoBeneficio.score}/100</span> ({analise.custoBeneficio.nivel})
              </div>
              <p className="text-neutral-600 mt-0.5 leading-snug">{analise.custoBeneficio.destaque}</p>
            </div>
            <div className="border-r border-neutral-200 pr-2">
              <div className="font-bold text-neutral-900">
                Qualidade Técnica: <span className="font-mono">{analise.qualidade.score}/100</span> ({analise.qualidade.nivel})
              </div>
              <p className="text-neutral-600 mt-0.5 leading-snug">{analise.qualidade.destaque}</p>
            </div>
            <div>
              <div className="font-bold text-neutral-900">
                Velocidade & Prazo: <span className="font-mono">{analise.velocidade.score}/100</span> ({analise.velocidade.nivel})
              </div>
              <p className="text-neutral-600 mt-0.5 leading-snug">{analise.velocidade.destaque}</p>
            </div>
          </div>

          <div className="pt-2 border-t border-neutral-200 text-[10px] space-y-1">
            <p className="text-neutral-800 leading-snug">
              <strong>Recomendação Executiva:</strong> {analise.conselhoPratico.recomendacao}
            </p>
            <p className="text-neutral-600 leading-snug">
              <strong>Dica de Negociação:</strong> {analise.conselhoPratico.dicaNegociacao}
            </p>
            {analise.conselhoPratico.etapasCriticasAvisos.length > 0 && (
              <div className="mt-1 pt-1 border-t border-neutral-150 text-[9px] text-neutral-700">
                <strong>Atenção de Escopo:</strong> {analise.conselhoPratico.etapasCriticasAvisos.join(" | ")}
              </div>
            )}
          </div>
        </div>

        {/* Tabela de Fornecedores & Mão de Obra (Ink Friendly / Compacta) */}
        <div className="print-avoid-break">
          <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-800 mb-1.5 flex justify-between">
            <span>Composição Detalhada de Mão de Obra por Etapa ({items.length} itens)</span>
            <span className="text-[9px] font-normal text-neutral-500">Base de cálculo: {areaM2} m²</span>
          </div>

          <table className="w-full border-collapse border border-neutral-300 text-left text-[10px]">
            <thead>
              <tr className="bg-neutral-100 border-b border-neutral-300 font-bold text-neutral-800 text-[9px] uppercase tracking-wider">
                <th className="py-1.5 px-2 border-r border-neutral-300 w-8 text-center">Item</th>
                <th className="py-1.5 px-2 border-r border-neutral-300 w-32">Etapa da Obra</th>
                <th className="py-1.5 px-2 border-r border-neutral-300">Empresa / Especialista</th>
                <th className="py-1.5 px-2 border-r border-neutral-300 w-28">Localidade</th>
                <th className="py-1.5 px-2 border-r border-neutral-300 w-28">Contato</th>
                <th className="py-1.5 px-2 border-r border-neutral-300 w-24 text-right">Taxa (m²)</th>
                <th className="py-1.5 px-2 w-28 text-right">Subtotal (R$)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {items.map((it, idx) => {
                const subtotal = (it.preco_a_partir || 0) * areaM2
                const phoneDisplay = it.whatsapp || it.telefone || "A consultar"
                return (
                  <tr key={it.id} className={idx % 2 === 1 ? "bg-neutral-50/50" : "bg-white"}>
                    <td className="py-1.5 px-2 border-r border-neutral-300 text-center font-mono font-medium text-neutral-600">
                      {String(idx + 1).padStart(2, "0")}
                    </td>
                    <td className="py-1.5 px-2 border-r border-neutral-300 font-bold text-neutral-900">
                      {formatCategoriaLabel(it.categoria)}
                    </td>
                    <td className="py-1.5 px-2 border-r border-neutral-300">
                      <div className="font-semibold text-neutral-900 leading-tight">{it.empresaNome}</div>
                      <div className="text-[9px] text-neutral-500 leading-tight">{it.nome}</div>
                    </td>
                    <td className="py-1.5 px-2 border-r border-neutral-300 text-neutral-700">
                      {formatLocalizacao(it.cidade, it.estado)}
                    </td>
                    <td className="py-1.5 px-2 border-r border-neutral-300 text-neutral-700 font-mono text-[9px]">
                      {phoneDisplay}
                    </td>
                    <td className="py-1.5 px-2 border-r border-neutral-300 text-right font-mono font-medium text-neutral-900">
                      {it.preco_a_partir
                        ? `R$ ${it.preco_a_partir.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`
                        : "Sob Consulta"}
                    </td>
                    <td className="py-1.5 px-2 text-right font-mono font-bold text-neutral-900">
                      {it.preco_a_partir
                        ? `R$ ${subtotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`
                        : "—"}
                    </td>
                  </tr>
                )
              })}
            </tbody>
            <tfoot>
              <tr className="bg-neutral-100 border-t-2 border-neutral-800 font-bold text-neutral-900">
                <td colSpan={5} className="py-2 px-2 border-r border-neutral-300 text-right uppercase tracking-wider text-[9px]">
                  Total Geral Estimado ({items.length} etapas para {areaM2} m²):
                </td>
                <td className="py-2 px-2 border-r border-neutral-300 text-right font-mono text-[11px]">
                  R$ {totalPrecoM2.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}/m²
                </td>
                <td className="py-2 px-2 text-right font-mono text-[11px] font-black">
                  R$ {orcamentoTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Termo Técnico, Validade e Assinaturas */}
        <div className="pt-2 space-y-4 print-avoid-break">
          <p className="text-[9px] text-neutral-500 leading-relaxed border-t border-neutral-300 pt-2 text-justify">
            * <strong>Nota de Responsabilidade Técnica:</strong> Este documento consolida estimativas paramétricas de mão de obra obtidas via plataforma OFIR com base na área de {areaM2}m². Os valores definitivos, cronograma físico-financeiro e escopo detalhado devem ser validados em vistoria técnica e formalizados mediante contrato com emissão de ART/RRT.
          </p>

          <div className="grid grid-cols-2 gap-8 pt-5">
            <div className="border-t border-neutral-400 pt-1 text-center">
              <span className="text-[10px] font-semibold text-neutral-800 block">Assinatura do Contratante / Proprietário</span>
              <span className="text-[9px] text-neutral-500">Data: _____ / _____ / _________</span>
            </div>
            <div className="border-t border-neutral-400 pt-1 text-center">
              <span className="text-[10px] font-semibold text-neutral-800 block">Responsável Técnico / Engenheiro da Obra</span>
              <span className="text-[9px] text-neutral-500">CREA / CAU: __________________________</span>
            </div>
          </div>

          <div className="text-center text-[8px] text-neutral-400 pt-1 border-t border-neutral-200">
            Documento emitido via OFIR Marketplace de Construtoras & Fornecedores de Obras • www.ofirobras.com.br
          </div>
        </div>
      </div>
    </div>
  )
}
