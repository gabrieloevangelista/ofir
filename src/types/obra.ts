import type { Tables } from "@/types/database.types"
import type { StandardTier } from "@/lib/utils"

export type Obra = Tables<"obras">
export type Construtora = Tables<"construtoras">

export type ReviewRatings = {
  tempo_execucao: number
  experiencia: number
  qualidade: number
  preco: number
}

export type Review = {
  id: string
  author: string
  role: string
  content: string
  rating: number
  ratings: ReviewRatings
  date: string
}

export type ObraWithConstrutora = Obra & {
  construtoras: Pick<Construtora, "id" | "nome" | "logo_url"> | null
  supplier_rating?: {
    score: number
    count: number
  }
  reviews?: Review[]
}

export type ObraFiltros = {
  busca?: string
  categoria?: string
  cidade?: string
  status?: Obra["status"] | "todos"
  ordenar?: "recentes" | "menor_preco" | "maior_preco"
  padrao?: StandardTier | "todos"
  pagina?: number
  modoExibicao?: "grid" | "lista"
}

