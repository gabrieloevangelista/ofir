"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { SidebarFilters } from "@/components/layout/sidebar-filters"

interface MarketplaceShellProps {
  cidades: string[]
  children: React.ReactNode
}

export function MarketplaceShell({ cidades, children }: MarketplaceShellProps) {
  const [collapsed, setCollapsed] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("ofir_sidebar_collapsed")
    if (saved !== null) {
      setCollapsed(saved === "true")
    }
    setMounted(true)
  }, [])

  const handleToggleCollapse = () => {
    setCollapsed((prev) => {
      const next = !prev
      localStorage.setItem("ofir_sidebar_collapsed", String(next))
      return next
    })
  }

  return (
    <div className="w-full px-4 py-6 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Desktop Collapsible Sidebar Container */}
        <div
          className={cn(
            "hidden lg:block lg:sticky lg:top-6 self-start shrink-0 transition-all duration-300 ease-in-out",
            collapsed ? "w-[76px]" : "w-[300px]"
          )}
        >
          <div className="rounded-none border border-border bg-card shadow-none transition-all duration-300">
            <SidebarFilters
              cidades={cidades}
              collapsed={mounted ? collapsed : false}
              onToggleCollapse={handleToggleCollapse}
            />
          </div>
        </div>

        {/* Main Content Area - dynamically expands when sidebar is collapsed */}
        <main className="flex-1 min-w-0 w-full">
          {children}
        </main>
      </div>
    </div>
  )
}
