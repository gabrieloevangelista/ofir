"use client"

import { useState } from "react"
import { ShieldCheck, Scale, Wallet, Info, Sliders } from "lucide-react"
import { formatCurrencyBRL } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface PaymentSplitCalculatorProps {
  basePrice: number | null
  providerName: string
}

export function PaymentSplitCalculator({ basePrice, providerName }: PaymentSplitCalculatorProps) {
  const defaultBudget = basePrice || 500000
  const [budget, setBudget] = useState<number>(defaultBudget)
  const [escrowModel, setEscrowModel] = useState<"milestone" | "fifty-fifty">("milestone")

  const platformFeePercentage = 5 // 5% for mediation and split escrow
  const platformFee = (budget * platformFeePercentage) / 100
  const supplierTotal = budget - platformFee

  // Milestones distribution for the supplier portion
  const milestones = [
    { name: "1. Mobilização & Fundações", pct: 20, desc: "Início dos trabalhos e escavações" },
    { name: "2. Estrutura & Alvenaria", pct: 30, desc: "Lajes, pilares e fechamento de paredes" },
    { name: "3. Telhado & Instalações", pct: 25, desc: "Cobertura, fiação hidráulica/elétrica" },
    { name: "4. Revestimentos & Acabamento", pct: 15, desc: "Pisos, azulejos e gesso" },
    { name: "5. Entrega de Chaves (Habite-se)", pct: 10, desc: "Vistoria final e liberação" },
  ]

  const handleBudgetChange = (val: string) => {
    const num = parseFloat(val.replace(/[^0-9]/g, "")) || 0
    setBudget(num)
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-2 border-b border-border/60 pb-4">
        <Sliders className="size-5 text-primary" />
        <h3 className="font-heading text-lg font-semibold text-foreground">
          Simulador de Contrato & Split
        </h3>
      </div>

      {/* Input or Slider to adjust budget */}
      <div className="mt-5 space-y-3">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="custom-budget" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Valor Estimado do Contrato (R$)
          </Label>
          <div className="relative mt-1">
            <span className="absolute inset-y-0 left-3 flex items-center text-sm text-muted-foreground font-medium">
              R$
            </span>
            <Input
              id="custom-budget"
              type="text"
              value={budget.toLocaleString("pt-BR")}
              onChange={(e) => handleBudgetChange(e.target.value)}
              className="pl-9 font-heading text-lg font-medium text-foreground bg-secondary/20"
            />
          </div>
          <span className="text-[11px] text-muted-foreground">
            Ajuste o valor para simular o cronograma de pagamentos da sua construção.
          </span>
        </div>
      </div>

      {/* Payment Split Overview */}
      <div className="mt-6 space-y-4">
        <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
          Distribuição do Split de Pagamentos
        </h4>

        {/* Visual Bar Split */}
        <div className="relative h-6 w-full overflow-hidden rounded-full bg-secondary flex">
          <div
            style={{ width: `${platformFeePercentage}%` }}
            className="bg-primary hover:opacity-90 transition-all duration-300 relative group"
            title={`Garantia da Plataforma: R$ ${platformFee.toLocaleString("pt-BR")}`}
          >
            <span className="sr-only">Plataforma</span>
          </div>
          <div
            style={{ width: `${100 - platformFeePercentage}%` }}
            className="bg-amber-500 hover:opacity-90 transition-all duration-300 relative"
            title={`Liberado ao Construtor: R$ ${supplierTotal.toLocaleString("pt-BR")}`}
          >
            <span className="sr-only">Construtor</span>
          </div>
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
            <div className="flex items-center gap-1.5 text-primary font-semibold">
              <ShieldCheck className="size-4 shrink-0" />
              <span>Taxa Plataforma ({platformFeePercentage}%)</span>
            </div>
            <p className="mt-1 font-heading text-base font-semibold text-foreground">
              {formatCurrencyBRL(platformFee)}
            </p>
            <p className="mt-0.5 text-[10px] text-muted-foreground">
              Garantia do contrato, suporte jurídico e mediação de disputas.
            </p>
          </div>

          <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-3">
            <div className="flex items-center gap-1.5 text-amber-600 font-semibold">
              <Wallet className="size-4 shrink-0" />
              <span>Para {providerName} (95%)</span>
            </div>
            <p className="mt-1 font-heading text-base font-semibold text-foreground">
              {formatCurrencyBRL(supplierTotal)}
            </p>
            <p className="mt-0.5 text-[10px] text-muted-foreground">
              Valores liberados conforme cumprimento das medições de etapas.
            </p>
          </div>
        </div>
      </div>

      {/* Choose Escrow Model */}
      <div className="mt-6">
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Modelo de Escrow (Garantia)
        </label>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setEscrowModel("milestone")}
            className={`rounded-lg border p-2 text-center text-xs font-medium transition-colors ${
              escrowModel === "milestone"
                ? "border-primary bg-primary/5 text-primary font-semibold"
                : "border-border hover:bg-secondary/40 text-muted-foreground"
            }`}
          >
            Milestone (Etapas Físicas)
          </button>
          <button
            type="button"
            onClick={() => setEscrowModel("fifty-fifty")}
            className={`rounded-lg border p-2 text-center text-xs font-medium transition-colors ${
              escrowModel === "fifty-fifty"
                ? "border-primary bg-primary/5 text-primary font-semibold"
                : "border-border hover:bg-secondary/40 text-muted-foreground"
            }`}
          >
            50/50 (Entrada + Chaves)
          </button>
        </div>
      </div>

      {/* Escrow Releases Schedule */}
      <div className="mt-6 border-t border-border/60 pt-5 space-y-3">
        <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
          Cronograma de Liberação de Fundos ({escrowModel === "milestone" ? "Etapas Físicas" : "50/50"})
        </h4>

        {escrowModel === "milestone" ? (
          <div className="space-y-3.5">
            {milestones.map((m, idx) => {
              const val = (supplierTotal * m.pct) / 100
              return (
                <div key={idx} className="flex justify-between items-start gap-4 text-xs">
                  <div className="space-y-0.5">
                    <span className="font-semibold text-foreground block">{m.name}</span>
                    <span className="text-[10px] text-muted-foreground block">{m.desc}</span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-heading font-medium text-foreground block">{formatCurrencyBRL(val)}</span>
                    <span className="text-[10px] font-semibold text-primary block">{m.pct}% do fornecedor</span>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="space-y-3.5">
            <div className="flex justify-between items-start gap-4 text-xs">
              <div className="space-y-0.5">
                <span className="font-semibold text-foreground block">1. Entrada de Início de Obra</span>
                <span className="text-[10px] text-muted-foreground block">Depositado na assinatura do contrato para compra de materiais.</span>
              </div>
              <div className="text-right shrink-0">
                <span className="font-heading font-medium text-foreground block">{formatCurrencyBRL(supplierTotal * 0.5)}</span>
                <span className="text-[10px] font-semibold text-primary block">50% do fornecedor</span>
              </div>
            </div>

            <div className="flex justify-between items-start gap-4 text-xs">
              <div className="space-y-0.5">
                <span className="font-semibold text-foreground block">2. Entrega e Chaves</span>
                <span className="text-[10px] text-muted-foreground block">Retido em escrow da plataforma, liberado após vistoria final.</span>
              </div>
              <div className="text-right shrink-0">
                <span className="font-heading font-medium text-foreground block">{formatCurrencyBRL(supplierTotal * 0.5)}</span>
                <span className="text-[10px] font-semibold text-primary block">50% do fornecedor</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Safety Notice */}
      <div className="mt-6 flex items-start gap-2 rounded-xl bg-secondary/50 p-4 border border-border/40">
        <Info className="size-4 text-primary shrink-0 mt-0.5" />
        <p className="text-[10.5px] leading-relaxed text-muted-foreground">
          <strong className="text-foreground">Proteção Escrow:</strong> O valor total é depositado na conta de garantia e fatiado automaticamente. As parcelas do construtor são liberadas mediante vistoria fotográfica e relatórios assinados.
        </p>
      </div>
    </div>
  )
}
