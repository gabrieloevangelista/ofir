export function Footer() {
  return (
    <footer className="border-t border-border/70 bg-card/60 mt-auto print:hidden">
      <div className="w-full flex flex-col gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <img src="/ofir-horizontal.svg" alt="OFIR" className="h-6 w-auto object-contain" />
          <span className="text-muted-foreground/50">|</span>
          <span className="text-xs text-muted-foreground">Marketplace de Construtoras & Engenharia</span>
        </div>
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} OFIR. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}
