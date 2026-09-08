import { createClient } from "@/lib/supabase/server"
import type { ObraFiltros, ObraWithConstrutora } from "@/types/obra"
import { getObraPadrao } from "@/lib/utils"
import { FORNECEDORES_EMULADOS } from "@/lib/mock-fornecedores"

const OBRA_SELECT = "*, construtoras ( id, nome, logo_url )"

const CATEGORY_TO_TAG_MAP: Record<string, string> = {
  topografia: "Topografia",
  preparacao_solo: "Preparação do Solo",
  terraplenagem: "Terraplenagem",
  projetos: "Projetos & Arquitetura",
  fundacao: "Fundações",
  alvenaria: "Alvenaria",
  instalacoes: "Instalações",
  acabamento: "Acabamento Fino",
  steel_frame: "Steel Frame",
  sistema_monolitico: "Painel Monolítico",
  gerenciamento: "Gerenciamento",
  reformas: "Reformas & Ampliações",
}

export async function getObras(filtros: ObraFiltros = {}): Promise<ObraWithConstrutora[]> {
  let list: ObraWithConstrutora[] = []

  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from("obras")
      .select(OBRA_SELECT)
      .eq("is_published", true)

    if (!error && data && data.length > 0) {
      // If database has records, enrich them
      list = (data as ObraWithConstrutora[])
    }
  } catch (err) {
    // If Supabase connection fails or is not ready, gracefully fall back to emulated suppliers
    console.warn("Supabase fetch failed, utilizing emulated suppliers dataset.", err)
  }

  // If DB returned nothing or only a few records, use emulated suppliers
  if (list.length === 0) {
    list = [...FORNECEDORES_EMULADOS]
  } else {
    // Ensure all emulated suppliers are available if DB only had legacy data
    const existingSlugs = new Set(list.map((o) => o.slug))
    for (const mock of FORNECEDORES_EMULADOS) {
      if (!existingSlugs.has(mock.slug)) {
        list.push(mock)
      }
    }
  }

  // 1. Text search filter
  if (filtros.busca) {
    const term = filtros.busca.toLowerCase().trim()
    if (term) {
      list = list.filter((o) => {
        const text = [
          o.nome,
          o.cidade,
          o.bairro ?? "",
          o.descricao_curta,
          o.descricao_longa ?? "",
          o.construtoras?.nome ?? "",
          ...o.tags,
        ]
          .join(" ")
          .toLowerCase()
        return text.includes(term)
      })
    }
  }

  // 2. City / Condominium filter
  if (filtros.cidade && filtros.cidade !== "todas-cidades") {
    const rawCid = filtros.cidade.toLowerCase()
    const cleanKeyword = rawCid.split("(")[0].trim().toLowerCase()
    list = list.filter((o) => {
      const locText = `${o.cidade} ${o.bairro ?? ""}`.toLowerCase()
      return (
        locText.includes(rawCid) ||
        locText.includes(cleanKeyword) ||
        o.cidade.toLowerCase().includes(cleanKeyword)
      )
    })
  }

  // 3. Padrão de Construção filter (alto, medio, baixo)
  if (filtros.padrao && filtros.padrao !== "todos") {
    list = list.filter((o) => getObraPadrao(o.preco_a_partir) === filtros.padrao)
  }

  // 4. Category / Construction stage filter
  if (filtros.categoria && filtros.categoria !== "todas") {
    const cat = filtros.categoria.toLowerCase()
    if (["residencial", "comercial", "misto"].includes(cat)) {
      list = list.filter((o) => o.categoria === cat)
    } else {
      const expectedTag = CATEGORY_TO_TAG_MAP[cat]
      if (expectedTag) {
        list = list.filter((o) =>
          o.tags.some((t) => t.toLowerCase().includes(expectedTag.toLowerCase()))
        )
      }
    }
  }

  // 5. Status filter
  if (filtros.status && filtros.status !== "todos") {
    list = list.filter((o) => o.status === filtros.status)
  }

  // 6. Ordering / Sorting
  if (filtros.ordenar === "menor_preco") {
    list.sort((a, b) => (a.preco_a_partir ?? 0) - (b.preco_a_partir ?? 0))
  } else if (filtros.ordenar === "maior_preco") {
    list.sort((a, b) => (b.preco_a_partir ?? 0) - (a.preco_a_partir ?? 0))
  } else {
    // Recentes / default
    list.sort((a, b) => (b.supplier_rating?.score ?? 0) - (a.supplier_rating?.score ?? 0))
  }

  return list
}

export async function getObrasPaginadas(filtros: ObraFiltros = {}, pageSize = 9) {
  const todasAsObras = await getObras(filtros)
  const total = todasAsObras.length
  const totalPaginas = Math.max(1, Math.ceil(total / pageSize))
  const paginaAtual = Math.min(Math.max(1, filtros.pagina || 1), totalPaginas)
  const inicio = (paginaAtual - 1) * pageSize
  const obras = todasAsObras.slice(inicio, inicio + pageSize)

  return {
    obras,
    total,
    paginaAtual,
    totalPaginas,
    pageSize,
  }
}

export async function getObraBySlug(slug: string): Promise<ObraWithConstrutora | null> {
  // First check in emulated suppliers
  const emulado = FORNECEDORES_EMULADOS.find((o) => o.slug === slug)
  if (emulado) {
    return emulado
  }

  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from("obras")
      .select(OBRA_SELECT)
      .eq("slug", slug)
      .eq("is_published", true)
      .maybeSingle()

    if (!error && data) {
      return data as ObraWithConstrutora
    }
  } catch (err) {
    console.warn("Could not query Supabase for slug:", slug, err)
  }

  return null
}

export const LOCAIS_AGRUPADOS = [
  {
    regiao: "Alphaville & Tamboré (Barueri / Santana de Parnaíba)",
    locais: [
      "Alphaville (Barueri / Santana de Parnaíba)",
      "Tamboré (Barueri / Santana de Parnaíba)",
      "Aldeia da Serra (Santana de Parnaíba)",
      "Alpha 0 (Barueri)",
      "Alpha 1 (Barueri)",
      "Alpha 2 (Barueri)",
      "Alpha 3 (Barueri)",
      "Alpha 4 (Barueri)",
      "Alpha 5 (Barueri)",
      "Alpha 6 (Barueri)",
      "Alpha 8 (Santana de Parnaíba)",
      "Alpha 9 (Santana de Parnaíba)",
      "Alpha 10 (Santana de Parnaíba)",
      "Alpha 11 (Santana de Parnaíba)",
      "Alpha 12 (Santana de Parnaíba)",
      "18 do Forte (Barueri)",
      "Burle Marx (Santana de Parnaíba)",
      "Gênesis I (Santana de Parnaíba)",
      "Gênesis II (Santana de Parnaíba)",
      "Itahyê (Santana de Parnaíba)",
      "Melville (Santana de Parnaíba)",
      "Morada das Flores (Barueri)",
      "Morada da Serra (Barueri)",
      "Morada dos Pássaros (Barueri)",
      "New Ville (Santana de Parnaíba)",
      "Parque Imperial (Barueri)",
      "Reserva Santa Anna (Santana de Parnaíba)",
      "Residencial Tamboré 1, 2 e 3 (Barueri)",
      "Tamboré 10 e 11 (Santana de Parnaíba)",
      "Tarumã (Santana de Parnaíba)",
      "Valville I e II (Santana de Parnaíba)",
    ],
  },
  {
    regiao: "Granja Viana, Cotia & Jandira",
    locais: [
      "Granja Viana (Cotia)",
      "Granja Viana II (Cotia)",
      "São Paulo II (Cotia)",
      "Cotia (Granja Viana / São Paulo II)",
      "Jardim Mediterrâneo (Cotia)",
      "Jardim Passárgada (Cotia)",
      "Nova Higienópolis (Jandira)",
      "Palm Hills (Cotia)",
      "Parque dos Príncipes (São Paulo)",
      "Parque Rizzo (Cotia)",
      "Reserva Santa Maria (Cotia)",
      "Reserva Vale Verde (Cotia)",
      "Terras de São Fernando (Cotia)",
      "Vintage (Cotia)",
    ],
  },
  {
    regiao: "Itu, Porto Feliz & Itupeva",
    locais: [
      "Itu (Terras de São José I e II)",
      "Terras de São José I e II (Itu)",
      "Fazenda Boa Vista (Porto Feliz)",
      "Boa Vista Village (Porto Feliz)",
      "Fazenda Alvorada (Porto Feliz)",
      "Fazenda da Grama (Itupeva)",
      "Plaza Athénée (Itu)",
      "Campos de Santo Antônio (Itu)",
      "City Castelo (Itu)",
      "Portal Ville (Porto Feliz)",
      "Porto Feliz (Fazenda Boa Vista)",
      "Villas do Golfe (Itu)",
      "Xapada Parque Ytu (Itu)",
    ],
  },
  {
    regiao: "Sorocaba, Indaiatuba & Araçoiaba",
    locais: [
      "Sorocaba (Ibiti / Mont Blanc / Saint Patrick)",
      "Granja Olga (Sorocaba)",
      "Ibiti Reserva (Sorocaba)",
      "Ibiti Royal Park (Sorocaba)",
      "Sunset Village (Sorocaba)",
      "Saint Patrick (Sorocaba)",
      "Indaiatuba (Helvetia / Maison Du Parc)",
      "Helvetia Country (Indaiatuba)",
      "Maison Du Parc (Indaiatuba)",
      "Dona Lucilla (Indaiatuba)",
      "Evidências (Indaiatuba)",
      "Jardim Quintas da Terracota (Indaiatuba)",
      "Residencial Maria Dulce (Indaiatuba)",
      "Terra Magna (Indaiatuba)",
      "Araçoiaba da Serra",
      "Lago Azul (Araçoiaba da Serra)",
      "Saint Charbel (Araçoiaba da Serra)",
      "Village Ipanema (Sorocaba / Araçoiaba)",
    ],
  },
  {
    regiao: "Campinas, Valinhos, Vinhedo & Jundiaí",
    locais: [
      "Campinas (Swiss Park / Alphaville)",
      "Swiss Park (Campinas)",
      "Alphaville Campinas",
      "Alphaville Dom Pedro (Campinas)",
      "Mont Blanc Residence (Campinas / Sorocaba)",
      "Notre Dame (Campinas)",
      "Parque dos Alecrins (Campinas)",
      "Vinhedo (Marambaia / Campo de Toscana)",
      "Marambaia (Vinhedo)",
      "Campo de Toscana (Vinhedo)",
      "São Joaquim (Vinhedo)",
      "Vista Alegre (Vinhedo)",
      "Valinhos (Portal do Jequitibá / Moinho)",
      "Moinho de Vento (Valinhos)",
      "Portal do Jequitibá (Valinhos)",
      "Vale do Itamaracá (Valinhos)",
      "Jundiaí (Terras de Jundiaí / Brisas)",
      "Brisas Jundiaí",
      "Portal do Paraíso (Jundiaí)",
      "Reserva da Serra (Jundiaí)",
      "Terras de Jundiaí",
    ],
  },
  {
    regiao: "Atibaia & Bragança Paulista",
    locais: [
      "Quinta da Baroneza (Bragança Paulista)",
      "Bragança Paulista (Quinta da Baroneza)",
      "Jardim das Palmeiras (Bragança Paulista)",
      "Portal Horizonte (Bragança Paulista)",
      "Atibaia (Porto Atibaia / Shambala)",
      "Porto Atibaia",
      "Shambala I e II (Atibaia)",
      "Figueira Garden (Atibaia)",
      "Equilibrium (Atibaia)",
    ],
  },
  {
    regiao: "São Paulo Capital & Litoral",
    locais: [
      "São Paulo/SP",
      "Riviera de São Lourenço (Módulos 1 ao 30)",
    ],
  },
]

export async function getCidadesDisponiveis() {
  return LOCAIS_AGRUPADOS.flatMap((g) => g.locais)
}
