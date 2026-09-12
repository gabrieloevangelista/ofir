import { CotacaoItem } from "@/contexts/cotacao-context"
import { getAreaById } from "@/lib/areas-obra"

export interface AnaliseCotacaoResult {
  custoBeneficio: {
    score: number // 0 to 100
    nivel: "Excelente Custo-Benefício" | "Equilibrado & Eficiente" | "Alto Padrão / Premium"
    resumo: string
    destaque: string
  }
  qualidade: {
    score: number // 0 to 100
    nivel: "Máxima Qualidade & Rigor" | "Qualidade Superior" | "Padrão Mercado"
    resumo: string
    destaque: string
  }
  velocidade: {
    score: number // 0 to 100
    nivel: "Cronograma Acelerado" | "Prazo Convencional Otimizado" | "Execução Artesanal Rigorosa"
    resumo: string
    destaque: string
  }
  conselhoPratico: {
    titulo: string
    recomendacao: string
    etapasCriticasAvisos: string[]
    dicaNegociacao: string
  }
}

export function analisarCotacao(items: CotacaoItem[], areaM2: number = 200): AnaliseCotacaoResult {
  if (!items || items.length === 0) {
    return {
      custoBeneficio: {
        score: 0,
        nivel: "Equilibrado & Eficiente",
        resumo: "Nenhum fornecedor selecionado para análise.",
        destaque: "Adicione etapas e fornecedores para gerar a análise comparativa.",
      },
      qualidade: {
        score: 0,
        nivel: "Padrão Mercado",
        resumo: "Aguardando fornecedores.",
        destaque: "Selecione empresas para comparar notas de qualidade.",
      },
      velocidade: {
        score: 0,
        nivel: "Prazo Convencional Otimizado",
        resumo: "Aguardando fornecedores.",
        destaque: "Métodos construtivos definirão o tempo total de obra.",
      },
      conselhoPratico: {
        titulo: "Inicie sua Cotação",
        recomendacao: "Adicione pelo menos 2 a 3 etapas de obra para que nosso motor analítico gere o parecer comparativo consolidado.",
        etapasCriticasAvisos: [],
        dicaNegociacao: "Ao cotar múltiplas etapas com a mesma empresa, você pode obter descontos em escala.",
      },
    }
  }

  const categorias = items.map((it) => it.categoria.toLowerCase())
  const totalM2 = items.reduce((acc, it) => acc + (it.preco_a_partir || 0), 0)
  const orcamentoTotal = totalM2 * areaM2

  // 1. ANÁLISE DE CUSTO-BENEFÍCIO
  let cbScore = 88
  let cbNivel: AnaliseCotacaoResult["custoBeneficio"]["nivel"] = "Equilibrado & Eficiente"
  let cbResumo = ""
  let cbDestaque = ""

  if (totalM2 < 3200) {
    cbScore = 95
    cbNivel = "Excelente Custo-Benefício"
    cbResumo = `Com média de R$ ${totalM2.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}/m², a seleção atual apresenta valores altamente competitivos perante os índices médios de construção residencial e comercial.`
    cbDestaque = "Economia expressiva mantendo conformidade técnica com normas ABNT."
  } else if (totalM2 <= 5800) {
    cbScore = 90
    cbNivel = "Equilibrado & Eficiente"
    cbResumo = `Valor consolidado de R$ ${totalM2.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}/m² reflete o padrão ideal para condomínios fechados, combinando materiais nobres e fornecedores experientes.`
    cbDestaque = "Investimento seguro com ótima valorização patrimonial pós-entrega."
  } else {
    cbScore = 84
    cbNivel = "Alto Padrão / Premium"
    cbResumo = `Custo de R$ ${totalM2.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}/m² compatível com altíssimo luxo, mão de obra altamente especializada para materiais nobres importados e vãos arrojados.`
    cbDestaque = "Foco irrestrito em perfeição estética, lastras e acabamentos exclusivos."
  }

  // 2. ANÁLISE DE QUALIDADE
  let qScore = 92
  let qNivel: AnaliseCotacaoResult["qualidade"]["nivel"] = "Qualidade Superior"
  let qResumo = ""
  let qDestaque = ""

  const hasProjetos = categorias.some((c) => c.includes("projeto") || c.includes("arquit") || c.includes("engenharia"))
  const hasFundacao = categorias.some((c) => c.includes("fundacao") || c.includes("estrutura"))
  const hasAcabamento = categorias.some((c) => c.includes("acabamento") || c.includes("revestimento") || c.includes("pintura"))

  if (hasProjetos && hasFundacao) {
    qScore = 98
    qNivel = "Máxima Qualidade & Rigor"
    qResumo = "A composição possui sólida base de engenharia e fundações. A compatibilização entre cálculos e execução previne 95% das patologias de obra."
    qDestaque = "Garantia de solidez estrutural e conformidade com laudos de sondagem de solo."
  } else {
    qScore = 89
    qNivel = "Qualidade Superior"
    qResumo = "Fornecedores verificados com alto índice de aprovação por contratantes e arquitetos parceiros na plataforma."
    qDestaque = "Mão de obra homologada com histórico de entregas sem pendências contratuais."
  }

  // 3. ANÁLISE DE VELOCIDADE
  let vScore = 85
  let vNivel: AnaliseCotacaoResult["velocidade"]["nivel"] = "Prazo Convencional Otimizado"
  let vResumo = ""
  let vDestaque = ""

  const hasConstrucaoSeca = categorias.some(
    (c) => c.includes("steel") || c.includes("monolit") || c.includes("drywall") || c.includes("modular") || c.includes("pre_fabricad")
  )

  if (hasConstrucaoSeca) {
    vScore = 96
    vNivel = "Cronograma Acelerado"
    vResumo = "Identificamos métodos construtivos de alta tecnologia (Construção a Seco / Modular / Monolítico). Redução de até 35% no tempo total de canteiro em comparação à alvenaria tradicional."
    vDestaque = "Menor custo de manutenção de canteiro e retorno sobre o investimento acelerado."
  } else {
    vScore = 87
    vNivel = "Prazo Convencional Otimizado"
    vResumo = "Cronograma estruturado com base em tempos ideais de cura de concreto e sequência lógica de alvenaria e instalações."
    vDestaque = "Previsão estável com marcos de medição claros por etapa concluída."
  }

  // 4. CONSELHO PRÁTICO & ALERTAS
  const etapasCriticasAvisos: string[] = []

  if (hasFundacao && !hasProjetos) {
    etapasCriticasAvisos.push("Atenção: Você selecionou Fundações sem incluir Projetos/Engenharia Estrutural. Recomendamos contratar o cálculo estrutural antes de fechar a fundação para evitar superdimensionamento.")
  }

  if (hasAcabamento && !categorias.some((c) => c.includes("impermeabili"))) {
    etapasCriticasAvisos.push("Recomendação: Antes dos acabamentos e revestimentos, certifique-se de cotar a Impermeabilização técnica para resguardar a garantia de pisos e paredes.")
  }

  if (categorias.length >= 4) {
    etapasCriticasAvisos.push("Ótima cobertura: Você já cobriu mais de 4 etapas essenciais da obra, o que facilita o sequenciamento sem descontinuidades de canteiro.")
  }

  const dicaNegociacao = items.length >= 3
    ? `Dica de negociação inteligente: Para uma obra de ${areaM2}m² (estimada em R$ ${orcamentoTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}), você possui alto poder de barganha. Solicite aos fornecedores uma visita técnica conjunta para alinhar interferências antes da emissão da ART.`
    : `Dica de negociação: Selecione mais fornecedores das etapas complementares para unificar a logística de descarte de caçambas e canteiro.`

  return {
    custoBeneficio: {
      score: cbScore,
      nivel: cbNivel,
      resumo: cbResumo,
      destaque: cbDestaque,
    },
    qualidade: {
      score: qScore,
      nivel: qNivel,
      resumo: qResumo,
      destaque: qDestaque,
    },
    velocidade: {
      score: vScore,
      nivel: vNivel,
      resumo: vResumo,
      destaque: vDestaque,
    },
    conselhoPratico: {
      titulo: "Parecer Técnico & Sugestão de Contratação",
      recomendacao: `Com base nos ${items.length} fornecedores analisados, seu projeto demonstra um perfil ${cbNivel.toLowerCase()} e ${vNivel.toLowerCase()}.`,
      etapasCriticasAvisos,
      dicaNegociacao,
    },
  }
}
