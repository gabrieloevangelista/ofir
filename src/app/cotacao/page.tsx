import type { Metadata } from "next"
import { getCidadesDisponiveis } from "@/lib/obras"
import { MarketplaceShell } from "@/components/layout/marketplace-shell"
import { CotacaoView } from "./cotacao-view"

export const metadata: Metadata = {
  title: "Cotação Consolidada & Orçamento | OFIR Obras",
  description: "Cotação consolidada e simulação de custos aproximados da sua obra por metro quadrado.",
}

export default async function CotacaoPage() {
  const cidades = await getCidadesDisponiveis()

  return (
    <div className="w-full flex flex-col">
      <MarketplaceShell cidades={cidades}>
        <CotacaoView />
      </MarketplaceShell>
    </div>
  )
}
