import { getCidadesDisponiveis, getObrasPaginadas } from "@/lib/obras"
import { ObraGrid } from "@/components/obras/obra-grid"
import { Pagination } from "@/components/obras/pagination"
import { HeaderBar } from "@/components/layout/header-bar"
import { MarketplaceShell } from "@/components/layout/marketplace-shell"
import { HeroSearch } from "@/components/ui/hero-search"
import type { ObraFiltros } from "@/types/obra"

type SearchParams = { [key: string]: string | string[] | undefined }

function toSingle(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams

  const filtros: ObraFiltros = {
    busca: toSingle(params.busca),
    categoria: toSingle(params.categoria) as ObraFiltros["categoria"],
    status: toSingle(params.status) as ObraFiltros["status"],
    cidade: toSingle(params.cidade),
    ordenar: toSingle(params.ordenar) as ObraFiltros["ordenar"],
    padrao: toSingle(params.padrao) as ObraFiltros["padrao"],
    pagina: Number(toSingle(params.pagina)) || 1,
    modoExibicao: "grid",
  }

  const limit = Number(toSingle(params.limit)) || 10

  const [{ obras, total, paginaAtual, totalPaginas, pageSize }, cidades] = await Promise.all([
    getObrasPaginadas(filtros, limit),
    getCidadesDisponiveis(),
  ])

  return (
    <div className="w-full flex flex-col">
      <HeroSearch
        title="Encontre a melhor"
        titleLine2="mão de obra qualificada."
        description="Plataforma de alta relevância para contratação de empresas de engenharia e escritórios de arquitetura de alto padrão."
        searchPlaceholder="Buscar obras por nome, cidade ou construtora..."
        searchButtonText="Buscar"
        heroImage="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop"
        heroAlt="Arquitetura de alto padrão"
        bottomTitle="Obras"
        bottomTitleLine2="projetadas para impressionar."
        bottomText="Um catálogo exclusivo de propriedades e projetos de alto padrão."
        animation="subtle"
      />
      <MarketplaceShell cidades={cidades}>
        <HeaderBar cidades={cidades} totalResults={total} />
        <ObraGrid obras={obras} />
        <Pagination
          paginaAtual={paginaAtual}
          totalPaginas={totalPaginas}
          totalItems={total}
          pageSize={pageSize}
        />
      </MarketplaceShell>
    </div>
  )
}
