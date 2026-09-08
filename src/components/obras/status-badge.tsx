import { cn } from "@/lib/utils"
import { formatStatusLabel } from "@/lib/utils"
import type { Database } from "@/types/database.types"

type ObraStatus = Database["public"]["Enums"]["obra_status"]

const STATUS_CLASSES: Record<ObraStatus, string> = {
  lancamento: "bg-primary/10 text-primary border-primary/20",
  em_obras: "bg-secondary text-foreground border-border",
  pronto_para_morar: "bg-foreground/5 text-foreground border-border/80",
}

export function StatusBadge({
  status,
  className,
}: {
  status: ObraStatus
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2.5 py-1 text-xs font-semibold tracking-wide uppercase shadow-xs border",
        STATUS_CLASSES[status],
        className
      )}
    >
      {formatStatusLabel(status)}
    </span>
  )
}
