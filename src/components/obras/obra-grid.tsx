import { SearchX } from "lucide-react"
import { ObraCard } from "@/components/obras/obra-card"
import type { ObraWithConstrutora } from "@/types/obra"

export function ObraGrid({
  obras,
}: {
  obras: ObraWithConstrutora[]
  modoExibicao?: "grid" | "lista"
}) {
  if (obras.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border py-20 px-4 text-center bg-card/50">
        <div className="flex size-12 items-center justify-center rounded-full bg-secondary text-muted-foreground">
          <SearchX className="size-6" />
        </div>
        <h3 className="font-heading text-xl font-bold text-foreground">
          Nenhuma empresa encontrada
        </h3>
        <p className="max-w-md text-sm text-muted-foreground leading-relaxed">
          Tente ajustar os termos de busca, condomínio ou etapas selecionadas para encontrar construtoras e escritórios.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {obras.map((obra, index) => (
        <div
          key={obra.id}
          className="animate-in fade-in slide-in-from-bottom-2 fill-mode-backwards duration-300"
          style={{ animationDelay: `${Math.min(index, 6) * 50}ms` }}
        >
          <ObraCard obra={obra} priority={index < 4} />
        </div>
      ))}
    </div>
  )
}
