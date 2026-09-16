"use client"

import React, { createContext, useContext, useEffect, useState } from "react"

export type ViewMode = "grid" | "lista"

interface ViewModeContextType {
  modoExibicao: ViewMode
  setModoExibicao: (mode: ViewMode) => void
}

const ViewModeContext = createContext<ViewModeContextType>({
  modoExibicao: "grid",
  setModoExibicao: () => {},
})

export function ViewModeProvider({ children }: { children: React.ReactNode }) {
  const [modoExibicao, setModoExibicaoState] = useState<ViewMode>("grid")

  useEffect(() => {
    // Check URL or localStorage on initial client mount
    try {
      const search = new URLSearchParams(window.location.search)
      const urlMode = search.get("modoExibicao") as ViewMode | null
      if (urlMode === "grid" || urlMode === "lista") {
        setModoExibicaoState(urlMode)
        return
      }
      const saved = localStorage.getItem("ofir_view_mode") as ViewMode | null
      if (saved === "grid" || saved === "lista") {
        setModoExibicaoState(saved)
      }
    } catch {
      // Ignore in SSR / restricted environments
    }
  }, [])

  const setModoExibicao = (mode: ViewMode) => {
    setModoExibicaoState(mode)
    try {
      localStorage.setItem("ofir_view_mode", mode)
      const url = new URL(window.location.href)
      if (mode === "grid") {
        url.searchParams.delete("modoExibicao")
      } else {
        url.searchParams.set("modoExibicao", "lista")
      }
      // Updates browser history without triggering a full Next.js server roundtrip
      window.history.replaceState(null, "", url.toString())
    } catch {
      // Ignore
    }
  }

  return (
    <ViewModeContext.Provider value={{ modoExibicao, setModoExibicao }}>
      {children}
    </ViewModeContext.Provider>
  )
}

export function useViewMode() {
  return useContext(ViewModeContext)
}
