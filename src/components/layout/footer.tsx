import { Building } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border/70 bg-card/60 mt-auto">
      <div className="w-full flex flex-col gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold">
            <Building className="size-3.5" />
          </div>
          <span className="font-heading text-base font-bold text-foreground">OFIR</span>
          <span className="text-muted-foreground">|</span>
          <span className="text-xs">Marketplace de Construtoras & Engenharia</span>
        </div>
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} OFIR. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}
