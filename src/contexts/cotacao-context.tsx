"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import type { ObraWithConstrutora } from "@/types/obra"

export interface CotacaoItem {
  id: string
  slug: string
  nome: string
  empresaNome: string
  categoria: string
  cidade: string
  estado: string
  preco_a_partir: number | null
  cover_image_url: string | null
  telefone?: string
  whatsapp?: string
}

interface CotacaoContextType {
  items: CotacaoItem[]
  addItem: (obra: ObraWithConstrutora) => void
  removeItem: (id: string) => void
  toggleItem: (obra: ObraWithConstrutora) => void
  clearCotacao: () => void
  isFavorito: (id: string) => boolean
  totalPrecoM2: number
  itemCount: number
  calcularOrcamentoTotal: (areaM2: number) => number
}

const CotacaoContext = createContext<CotacaoContextType | undefined>(undefined)

const STORAGE_KEY = "ofir_cotacao_favoritos_v1"

export function CotacaoProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CotacaoItem[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        setItems(JSON.parse(saved))
      }
    } catch (e) {
      console.error("Erro ao carregar favoritos da cotação:", e)
    }
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
      } catch (e) {
        console.error("Erro ao salvar favoritos da cotação:", e)
      }
    }
  }, [items, mounted])

  const obraToItem = (obra: ObraWithConstrutora): CotacaoItem => ({
    id: obra.id,
    slug: obra.slug,
    nome: obra.nome,
    empresaNome: obra.construtoras?.nome || obra.nome,
    categoria: obra.categoria,
    cidade: obra.cidade,
    estado: obra.estado,
    preco_a_partir: obra.preco_a_partir ?? null,
    cover_image_url: obra.cover_image_url || obra.construtoras?.logo_url || null,
    telefone: obra.contato?.telefone,
    whatsapp: obra.contato?.whatsapp,
  })

  const addItem = (obra: ObraWithConstrutora) => {
    setItems((prev) => {
      if (prev.some((item) => item.id === obra.id)) return prev
      return [...prev, obraToItem(obra)]
    })
  }

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const toggleItem = (obra: ObraWithConstrutora) => {
    setItems((prev) => {
      const exists = prev.some((item) => item.id === obra.id)
      if (exists) {
        return prev.filter((item) => item.id !== obra.id)
      }
      return [...prev, obraToItem(obra)]
    })
  }

  const clearCotacao = () => {
    setItems([])
  }

  const isFavorito = (id: string) => {
    return items.some((item) => item.id === id)
  }

  const totalPrecoM2 = items.reduce((acc, curr) => acc + (curr.preco_a_partir || 0), 0)

  const calcularOrcamentoTotal = (areaM2: number) => {
    return totalPrecoM2 * Math.max(0, areaM2)
  }

  return (
    <CotacaoContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        toggleItem,
        clearCotacao,
        isFavorito,
        totalPrecoM2,
        itemCount: items.length,
        calcularOrcamentoTotal,
      }}
    >
      {children}
    </CotacaoContext.Provider>
  )
}

export function useCotacao() {
  const context = useContext(CotacaoContext)
  if (!context) {
    throw new Error("useCotacao deve ser usado dentro de um CotacaoProvider")
  }
  return context
}
