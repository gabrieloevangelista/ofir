import { cn } from "@/lib/utils"
import { formatStatusLabel } from "@/lib/utils"
import type { Database } from "@/types/database.types"

type ObraStatus = Database["public"]["Enums"]["obra_status"]

const STATUS_CLASSES: Record<ObraStatus, string> = {
  lancamento: "bg-status-lancamento text-status-lancamento-foreground",
  em_obras: "bg-status-em-obras text-status-em-obras-foreground",
  pronto_para_morar: "bg-status-pronto text-status-pronto-foreground",
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
        "inline-flex items-center rounded-none px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase shadow-none border border-black/10",
        STATUS_CLASSES[status],
        className
      )}
    >
      {formatStatusLabel(status)}
    </span>
  )
}
