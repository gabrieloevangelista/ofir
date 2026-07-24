import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Database } from "@/types/database.types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
})

export function formatCurrencyBRL(value: number | null) {
  if (value === null) return "Sob consulta"
  return currencyFormatter.format(value)
}

export function formatValorMetroQuadrado(preco: number | null): string {
  if (!preco) return "Sob consulta"
  return `${currencyFormatter.format(preco)}/m²`
}

const STATUS_LABELS: Record<Database["public"]["Enums"]["obra_status"], string> = {
  lancamento: "Lançamento",
  em_obras: "Em obras",
  pronto_para_morar: "Pronto para morar",
}

export function formatStatusLabel(status: Database["public"]["Enums"]["obra_status"]) {
  return STATUS_LABELS[status]
}

const CATEGORIA_LABELS: Record<string, string> = {
  todas: "Todas as Etapas",
  reformas: "Reformas & Ampliações",
  steel_frame: "Steel Frame & Light Steel Frame",
  sistema_monolitico: "Sistema Monolítico (EPS)",
  projetos: "Projetos & Arquitetura",
  engenharia_estrutural: "Engenharia Estrutural",
  terraplenagem: "Terraplenagem & Escavação",
  fundacao: "Fundação & Sapata",
  alvenaria: "Alvenaria & Vedações",
  instalacoes: "Instalações (Elétrica/Hidráulica)",
  cobertura: "Cobertura & Telhado",
  acabamento: "Acabamento & Pintura",
  residencial: "Residencial",
  comercial: "Comercial",
  misto: "Misto",
}

export function formatCategoriaLabel(categoria: string) {
  return CATEGORIA_LABELS[categoria] || categoria
}

export type StandardTier = "alto" | "medio" | "baixo"

export function getObraPadrao(preco: number | null): StandardTier {
  if (!preco) return "medio"
  if (preco >= 700000) return "alto"
  if (preco >= 400000) return "medio"
  return "baixo"
}

export function formatPadraoLabel(padrao: StandardTier) {
  const labels = {
    alto: "Alto Padrão",
    medio: "Médio Padrão",
    baixo: "Baixo Padrão",
  }
  return labels[padrao]
}

export function formatLocalizacao(cidade: string | null, estado: string | null): string {
  if (!cidade) return ""
  if (cidade.includes("/")) return cidade
  if (!estado) return cidade
  return `${cidade}/${estado}`
}

