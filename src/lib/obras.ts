import { createClient } from "@/lib/supabase/server"
import type { ObraFiltros, ObraWithConstrutora } from "@/types/obra"
import { getObraPadrao } from "@/lib/utils"

const OBRA_SELECT = "*, construtoras ( id, nome, logo_url )"

const UNSPLASH_IMAGES: Record<string, { cover: string; gallery: string[] }> = {
  "jardins-do-horizonte": {
    cover: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  "vista-mar-floripa": {
    cover: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  "raiz-batel-office": {
    cover: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  "horizonte-savassi-mix": {
    cover: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  "viva-pinheiros-365": {
    cover: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  "raiz-agua-verde-village": {
    cover: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  "horizonte-lagoa-corporate": {
    cover: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  "viva-savassi-garden": {
    cover: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    ],
  },
}

const FIRM_LOGOS: Record<string, string> = {
  "jardins-do-horizonte": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%230f172a'/><path d='M25 75V25L50 45L75 25V75' stroke='%23f59e0b' stroke-width='7' fill='none'/><circle cx='50' cy='65' r='6' fill='%23f59e0b'/></svg>",
  "vista-mar-floripa": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%230284c7'/><path d='M20 70L50 25L80 70H65L50 45L35 70H20Z' fill='%23ffffff'/></svg>",
  "raiz-batel-office": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%2318181b'/><rect x='25' y='25' width='50' height='50' stroke='%23e2e8f0' stroke-width='6' fill='none'/><path d='M25 25L75 75M75 25L25 75' stroke='%23f59e0b' stroke-width='5'/></svg>",
  "horizonte-savassi-mix": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23334155'/><path d='M30 75V35L50 20L70 35V75Z' stroke='%2338bdf8' stroke-width='6' fill='none'/><line x1='30' y1='50' x2='70' y2='50' stroke='%2338bdf8' stroke-width='4'/></svg>",
  "viva-pinheiros-365": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23047857'/><path d='M25 75V30L50 50L75 30V75' stroke='%23ffffff' stroke-width='7' fill='none'/></svg>",
  "raiz-agua-verde-village": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23111827'/><circle cx='50' cy='50' r='30' stroke='%2310b981' stroke-width='6' fill='none'/><path d='M35 50L45 60L65 40' stroke='%2310b981' stroke-width='6' fill='none'/></svg>",
}

function enhanceObraImages(obra: ObraWithConstrutora): ObraWithConstrutora {
  const mapped = UNSPLASH_IMAGES[obra.slug]
  const defaultLogo = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%231e293b'/><path d='M25 75V25L50 45L75 25V75' stroke='%23e2e8f0' stroke-width='7' fill='none'/></svg>"
  const logo = FIRM_LOGOS[obra.slug] || defaultLogo
  
  let seed = 0
  for (let i = 0; i < String(obra.id).length; i++) {
    seed += String(obra.id).charCodeAt(i)
  }
  
  const actualName = obra.construtoras?.nome || "Construtora Não Identificada"

  const construtoraEnhanced = obra.construtoras
    ? { ...obra.construtoras, logo_url: obra.construtoras.logo_url || logo }
    : { id: "default", nome: actualName, logo_url: logo }

  // Construction & Supplier Tags to override real-estate ones
  const tagsPool = [
    "Topografia", "Preparação do Solo", "Terraplenagem", "Projetos & Arquitetura", 
    "Fundações", "Alvenaria", "Instalações", "Acabamento Fino", "Steel Frame", "Painel Monolítico", "Gerenciamento", "Reformas & Ampliações"
  ]
  const customTags = [
    tagsPool[seed % tagsPool.length],
    tagsPool[(seed * 7) % tagsPool.length]
  ].filter((v, i, a) => a.indexOf(v) === i)

  // Mock Ratings & Reviews for contractors
  let scoreBase = 4.5 + (seed % 5) / 10 // default 4.5 to 4.9
  
  // Explicit User overrides
  if (["MPD Engenharia", "Diase Construtora", "Cazzabella"].includes(actualName)) {
    scoreBase = 5.0
  } else if (["Yellowbrick Houses", "VIDE Construtora", "Build Incorporadora", "Neoin Construção", "Haus Incorporadora"].includes(actualName)) {
    scoreBase = 4.0
  }
  
  const countBase = 12 + (seed % 40) // 12 to 51 reviews
  const supplier_rating = { score: scoreBase, count: countBase }

  const reviews = [
    {
      id: `rev-1-${obra.slug}`,
      author: "Carlos E. (Engenheiro Chefe)",
      role: "Contratante - Obra Comercial",
      content: `Excelente fornecedor. A equipe da ${construtoraEnhanced.nome} entregou o serviço com precisão milimétrica e no prazo estabelecido. Recomendo fortemente para obras de alto padrão.`,
      rating: 5,
      ratings: { tempo_execucao: 5, experiencia: 5, qualidade: 5, preco: 4 },
      date: "Há 2 semanas",
    },
    {
      id: `rev-2-${obra.slug}`,
      author: "Mariana T. (Arquiteta)",
      role: "Contratante - Residência de Luxo",
      content: `O nível de detalhe e acabamento superou nossas expectativas. Foram muito profissionais do início ao fim do projeto, sempre mantendo a obra limpa e organizada.`,
      rating: 5,
      ratings: { tempo_execucao: 4, experiencia: 5, qualidade: 5, preco: 5 },
      date: "Há 1 mês",
    },
    {
      id: `rev-3-${obra.slug}`,
      author: "Roberto F. (Proprietário)",
      role: "Contratante - Condomínio Fechado",
      content: `Ótimo custo-benefício considerando a qualidade entregue. Tivemos um pequeno atraso com materiais, mas a empresa resolveu rapidamente sem repassar o problema.`,
      rating: 4,
      ratings: { tempo_execucao: 3, experiencia: 4, qualidade: 5, preco: 4 },
      date: "Há 3 meses",
    }
  ]

  const unsplashPool = Object.values(UNSPLASH_IMAGES)
  const fallbackImages = unsplashPool[seed % unsplashPool.length]

  const finalCover = obra.cover_image_url || mapped?.cover || fallbackImages.cover
  const finalGallery = (obra.gallery_urls && obra.gallery_urls.length > 0)
    ? obra.gallery_urls
    : (mapped?.gallery || fallbackImages.gallery)

  return {
    ...obra,
    construtoras: construtoraEnhanced,
    cover_image_url: finalCover,
    gallery_urls: finalGallery,
    tags: customTags,
    supplier_rating,
    reviews,
  }
}

export async function getObras(filtros: ObraFiltros = {}) {
  const supabase = createClient()

  let query = supabase
    .from("obras")
    .select(OBRA_SELECT)
    .eq("is_published", true)

  if (filtros.busca) {
    const termo = filtros.busca.trim()
    if (termo) {
      query = query.or(
        `nome.ilike.%${termo}%,cidade.ilike.%${termo}%,descricao_curta.ilike.%${termo}%`
      )
    }
  }

  if (filtros.categoria && filtros.categoria !== "todas") {
    if (["residencial", "comercial", "misto"].includes(filtros.categoria)) {
      query = query.eq("categoria", filtros.categoria as any)
    }
  }

  if (filtros.status && filtros.status !== "todos") {
    query = query.eq("status", filtros.status)
  }

  switch (filtros.ordenar) {
    case "menor_preco":
      query = query.order("preco_a_partir", { ascending: true, nullsFirst: false })
      break
    case "maior_preco":
      query = query.order("preco_a_partir", { ascending: false, nullsFirst: false })
      break
    default:
      query = query.order("created_at", { ascending: false })
  }

  const { data, error } = await query

  if (error) {
    console.error("Supabase error:", error)
  }

  let baseData = ((data ?? []) as ObraWithConstrutora[])
    .filter(o => o.estado === "SP" || o.estado === "PR")

  let result = baseData.map(enhanceObraImages)

  if (filtros.cidade) {
    const rawCid = filtros.cidade.toLowerCase()
    const cleanKeyword = rawCid.split("(")[0].trim()
    result = result.filter((o) => {
      const locText = `${o.cidade} ${o.bairro ?? ""} ${o.nome} ${o.descricao_curta}`.toLowerCase()
      return locText.includes(rawCid) || locText.includes(cleanKeyword) || o.cidade.toLowerCase().includes(cleanKeyword)
    })
  }

  if (filtros.padrao && filtros.padrao !== "todos") {
    result = result.filter((o) => getObraPadrao(o.preco_a_partir) === filtros.padrao)
  }

  if (filtros.categoria && filtros.categoria !== "todas" && !["residencial", "comercial", "misto"].includes(filtros.categoria)) {
    const cat = filtros.categoria
    
    // Map internal filter IDs to the display tags generated in enhanceObraImages
    const categoryToTagMap: Record<string, string> = {
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
      reformas: "Reformas & Ampliações"
    }

    const expectedTag = categoryToTagMap[cat]

    result = result.filter((o) => {
      if (!expectedTag) return true // Fallback if no specific tag mapping exists
      return o.tags.includes(expectedTag)
    })
  }

  return result
}

export async function getObrasPaginadas(filtros: ObraFiltros = {}, pageSize = 6) {
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

export async function getObraBySlug(slug: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("obras")
    .select(OBRA_SELECT)
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle()

  if (error) {
    throw new Error(`Falha ao buscar obra: ${error.message}`)
  }

  if (!data) return null

  return enhanceObraImages(data as ObraWithConstrutora)
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
  {
    regiao: "Curitiba & Região Metropolitana (PR)",
    locais: [
      "Curitiba/PR (Batel / Ecoville / Graciosa)",
      "Alphaville Graciosa (Pinhais)",
      "Alphaville Paraná (Quatro Barras)",
      "Araucária Park (Quatro Barras)",
      "Casas Vitorianas (Curitiba)",
      "Colinas de São Francisco (Curitiba)",
      "Graciosa Country Club (Quatro Barras)",
      "Graciosa Village (Curitiba)",
      "Grand Garden (Curitiba)",
      "Green Park (Curitiba)",
      "Green Village (Curitiba / Quatro Barras)",
      "Harmony Gardens (Curitiba)",
      "Jardins do Lago (Quatro Barras)",
      "Le Monde (Curitiba)",
      "Monte Pascoal (Curitiba)",
      "Parque Tingui (Curitiba)",
      "Parque Wolf (Curitiba)",
      "Paysage Excellence (Curitiba)",
      "Paysage Privilege (Curitiba)",
      "Paysage Royale (Curitiba)",
      "Piazza San Marco (Curitiba)",
      "Portal Romano (Curitiba)",
      "Porto Felice (Curitiba)",
      "Residencial Andorinhas (Pinhais)",
      "Residencial Araucárias (Pinhais)",
      "Residencial Iguaçu (Pinhais)",
      "Residencial Parati (Pinhais)",
      "Residencial Pinheiros (Pinhais)",
      "Royal Santa Felicidade (Curitiba)",
      "Villa Bella (Curitiba)",
      "Villa Romana (Curitiba)",
    ],
  },
]

export const LOCAIS_SP = LOCAIS_AGRUPADOS.slice(0, 7).flatMap((g) => g.locais)
export const LOCAIS_CURITIBA = LOCAIS_AGRUPADOS[7].locais

export async function getCidadesDisponiveis() {
  return LOCAIS_AGRUPADOS.flatMap((g) => g.locais)
}
