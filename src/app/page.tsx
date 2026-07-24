import { getCidadesDisponiveis, getObrasPaginadas } from "@/lib/obras"
import { ObraGrid } from "@/components/obras/obra-grid"
import { Pagination } from "@/components/obras/pagination"
import { SidebarFilters } from "@/components/layout/sidebar-filters"
import { HeaderBar } from "@/components/layout/header-bar"
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
    modoExibicao: (toSingle(params.modoExibicao) as ObraFiltros["modoExibicao"]) || "grid",
  }

  const limit = Number(toSingle(params.limit)) || 10

  const [{ obras, total, paginaAtual, totalPaginas, pageSize }, cidades] = await Promise.all([
    getObrasPaginadas(filtros, limit),
    getCidadesDisponiveis(),
  ])

  return (
    <div className="w-full px-4 py-8 sm:px-6 lg:px-8">
      <div className="lg:grid lg:grid-cols-4 lg:gap-8 items-start">
        {/* Left Sticky Sidebar on Desktop */}
        <div className="hidden lg:block lg:col-span-1 lg:sticky lg:top-8 self-start">
          <div className="rounded-none border border-border bg-card p-5 shadow-none">
            <SidebarFilters cidades={cidades} />
          </div>
        </div>

        {/* Main Content Area */}
        <main className="lg:col-span-3 min-w-0">
          <HeaderBar cidades={cidades} totalResults={total} />
          <ObraGrid obras={obras} modoExibicao={filtros.modoExibicao} />
          <Pagination
            paginaAtual={paginaAtual}
            totalPaginas={totalPaginas}
            totalItems={total}
            pageSize={pageSize}
          />
        </main>
      </div>
    </div>
  )
}
