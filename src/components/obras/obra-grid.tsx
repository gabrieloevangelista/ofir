import { SearchX } from "lucide-react"
import { ObraCard } from "@/components/obras/obra-card"
import type { ObraWithConstrutora } from "@/types/obra"
import { cn } from "@/lib/utils"

export function ObraGrid({
  obras,
  modoExibicao = "grid",
}: {
  obras: ObraWithConstrutora[]
  modoExibicao?: "grid" | "lista"
}) {
  if (obras.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-none border border-dashed border-border py-24 text-center">
        <SearchX className="size-8 text-muted-foreground" />
        <p className="font-heading text-xl text-foreground">
          Nenhuma empresa encontrada
        </p>
        <p className="max-w-sm text-sm text-muted-foreground">
          Tente ajustar a busca ou os filtros para ver mais construtoras e escritórios.
        </p>
      </div>
    )
  }

  return (
    <div
      className={cn(
        modoExibicao === "lista"
          ? "flex flex-col gap-4"
          : "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      )}
    >
      {obras.map((obra, index) => (
        <div
          key={obra.id}
          className="animate-in fade-in slide-in-from-bottom-3 fill-mode-backwards duration-500"
          style={{ animationDelay: `${Math.min(index, 8) * 60}ms` }}
        >
          <ObraCard obra={obra} priority={index < 4} modoExibicao={modoExibicao} />
        </div>
      ))}
    </div>
  )
}
